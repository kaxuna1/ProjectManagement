package main.models.Lombard;

import com.fasterxml.jackson.annotation.JsonIgnore;
import main.models.DictionaryModels.Filial;
import main.models.Lombard.Dictionary.LoanCondition;
import main.models.Lombard.ItemClasses.Laptop;
import main.models.Lombard.ItemClasses.MobilePhone;
import main.models.Lombard.MovementModels.LoanMovement;
import main.models.Lombard.TypeEnums.LoanConditionPeryodType;
import main.models.Lombard.TypeEnums.LoanPaymentType;
import main.models.Lombard.TypeEnums.MovementTypes;
import main.models.UserManagement.User;
import org.joda.time.DateTime;
import org.slf4j.LoggerFactory;
import rx.Observable;
import rx.functions.Action1;
import rx.functions.Func1;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by kaxa on 11/16/16.
 */

@Entity
@Table(name = "Loans")
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "loanId")
    private long id;

    @ManyToOne
    @JoinColumn(name = "clientId")
    @JsonIgnore
    private Client client;

    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<MobilePhone> mobilePhones;

    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Laptop> laptops;

    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<LoanMovement> movements;
    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<LoanPayment> payments;

    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<LoanInterest> loanInterests;

    @Column
    private Date nextInterestCalculationDate;

    @Column
    private String number;

    @ManyToOne
    @JoinColumn(name = "filialId")
    @JsonIgnore
    private Filial filial;

    @ManyToOne
    @JoinColumn(name = "loanConditionId")
    private LoanCondition loanCondition;

    @Column
    private float loanSum;


    @Column
    private boolean isActive;

    @Column
    private Date createDate;

    @Column
    private Date lastModifyDate;

    @Column
    private boolean onFirstInterest;


    @ManyToOne
    @JoinColumn(name = "userId")
    @JsonIgnore
    private User user;

    public Loan(Client client, Filial filial, float loanSum, User user) {
        this.loanInterests = new ArrayList<>();
        this.client = client;
        this.filial = filial;
        this.loanSum = loanSum;
        this.mobilePhones = new ArrayList<>();
        this.isActive = true;
        this.createDate = new Date();
        this.lastModifyDate = new Date();
        this.user = user;
        this.movements = new ArrayList<>();
        this.payments = new ArrayList<>();
        this.onFirstInterest = true;
        this.laptops = new ArrayList<>();
    }

    public Loan() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public List<MobilePhone> getMobilePhones() {
        return mobilePhones;
    }

    public void setMobilePhones(List<MobilePhone> mobilePhones) {
        this.mobilePhones = mobilePhones;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Filial getFilial() {
        return filial;
    }

    public void setFilial(Filial filial) {
        this.filial = filial;
    }

    public float getLoanSum() {
        return loanSum;
    }

    public void setLoanSum(float loanSum) {
        this.loanSum = loanSum;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getLastModifyDate() {
        return lastModifyDate;
    }

    public void setLastModifyDate(Date lastModifyDate) {
        this.lastModifyDate = lastModifyDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<LoanMovement> getMovements() {
        return movements;
    }

    public void setMovements(List<LoanMovement> movements) {
        this.movements = movements;
    }

    public List<LoanPayment> getPayments() {
        return payments;
    }

    public void setPayments(List<LoanPayment> payments) {
        this.payments = payments;
    }

    public float getLeftSum() {
        final float[] tempSum = {this.loanSum};
        payments.forEach(loanPayment -> {
            if (loanPayment.isActive()) {
                if (loanPayment.getType() == LoanPaymentType.PARTIAL.getCODE()) {
                    tempSum[0] -= loanPayment.getSum();
                }
            }
        });
        return tempSum[0];
    }

    public float getInterestSum() {
        return (this.getLeftSum() / 100) * this.loanCondition.getPercent();
    }

    public LoanCondition getLoanCondition() {
        return loanCondition;
    }

    public void setLoanCondition(LoanCondition loanCondition) {
        this.loanCondition = loanCondition;
    }

    public List<LoanInterest> getLoanInterests() {
        return loanInterests;
    }

    public void setLoanInterests(List<LoanInterest> loanInterests) {
        this.loanInterests = loanInterests;
    }

    public Date getNextInterestCalculationDate() {
        return nextInterestCalculationDate;
    }

    public void setNextInterestCalculationDate(Date nextInterestCalculationDate) {
        this.nextInterestCalculationDate = nextInterestCalculationDate;
    }

    public float getInterestSumLeft() {
        final float[] val = {0};
        Observable.from(loanInterests).filter(new Func1<LoanInterest, Boolean>() {
            @Override
            public Boolean call(LoanInterest loanInterest) {
                return !loanInterest.isPayed();
            }
        }).subscribe(new Action1<LoanInterest>() {
            @Override
            public void call(LoanInterest loanInterest) {
                val[0] += loanInterest.getLeftToPay();
            }
        });
        return val[0];
    }

    public void recalculateInterestPayments() {

        List<LoanInterest> loanInterestsLocal = new ArrayList<>();

        Observable.from(loanInterests).filter(new Func1<LoanInterest, Boolean>() {
            @Override
            public Boolean call(LoanInterest loanInterest) {
                return !loanInterest.isPayed();
            }
        }).filter(loanInterest -> !loanInterest.isPayed()).subscribe(loanInterest -> {
            Observable.from(payments).filter(loanPayment -> !loanPayment.isUsedFully()).subscribe(loanPayment -> {
                if (!loanInterest.isPayed()) {
                    if (loanPayment.getLeftForUse() < loanInterest.getLeftToPay()) {
                        loanInterest.addToPayedSum(loanPayment.getLeftForUse());
                        loanPayment.setUsedSum(loanPayment.getSum());
                        loanPayment.setUsedFully(true);

                    } else {
                        if (loanPayment.getLeftForUse() > loanInterest.getLeftToPay()) {
                            loanPayment.addToUsedSum(loanInterest.getLeftToPay());
                            loanInterest.addToPayedSum(loanInterest.getLeftToPay());
                            loanInterest.setPayed(true);
                        } else {
                            loanPayment.setUsedSum(loanPayment.getSum());
                            loanPayment.setUsedFully(true);
                            loanInterest.setPayedSum(loanInterest.getSum());
                        }
                    }

                }
            });
            //loanInterest.setPayedSum(loanInterest.getSum()-leftToPayForThisInterest[0]);
            loanInterest.checkIfIsPayed();
            LoggerFactory.getLogger(Loan.class).info(loanInterest.getSum() + "");
        });
    }

    public void addInterest() {
        DateTime dateTime = new DateTime();
        if (loanCondition.getPeriodType() == LoanConditionPeryodType.DAY.getCODE())
            this.nextInterestCalculationDate = dateTime.plusDays(loanCondition.getPeriod()).toDate();
        if (loanCondition.getPeriodType() == LoanConditionPeryodType.WEEK.getCODE())
            this.nextInterestCalculationDate = dateTime.plusWeeks(loanCondition.getPeriod()).toDate();
        if (loanCondition.getPeriodType() == LoanConditionPeryodType.MONTH.getCODE())
            this.nextInterestCalculationDate = dateTime.plusMonths(loanCondition.getPeriod()).toDate();
        if (this.onFirstInterest)
            this.nextInterestCalculationDate = new DateTime(this.nextInterestCalculationDate).minusDays(1).toDate();
        this.loanInterests.add(
                new LoanInterest(this,
                        ((getLeftSum() / 100) * this.loanCondition.PercentLogical(this.isOnFirstInterest())),
                        this.loanCondition.PercentLogical(isOnFirstInterest()), this.nextInterestCalculationDate));
        this.onFirstInterest = false;

        this.recalculateInterestPayments();
    }

    public void addFirstInterest() {
        Date date = new Date();
        DateTime dateTime = new DateTime();
        if (loanCondition.getPeriodType() == LoanConditionPeryodType.DAY.getCODE())
            date = dateTime.plusDays(loanCondition.getPeriod()).toDate();
        if (loanCondition.getPeriodType() == LoanConditionPeryodType.WEEK.getCODE())
            date = dateTime.plusWeeks(loanCondition.getPeriod()).toDate();
        if (loanCondition.getPeriodType() == LoanConditionPeryodType.MONTH.getCODE())
            date = dateTime.plusMonths(loanCondition.getPeriod()).toDate();
        if (this.getLoanCondition().getFirstDayPercent() > 0) {

            float sum = ((getLeftSum() / 100) * this.loanCondition.getFirstDayPercent());
            this.loanInterests.add(
                    new LoanInterest(this,
                            sum,
                            this.loanCondition.getFirstDayPercent(), date));

            this.movements.add(new LoanMovement("დაეკისრა პროცენტი "
                    + sum + "ლარი"
                    , MovementTypes.LOAN_INTEREST_GENERATED.getCODE(), this));
        }
        if (this.getLoanCondition().getPercent() == this.getLoanCondition().getFirstDayPercent()) {
            this.nextInterestCalculationDate = date;
        } else {
            this.nextInterestCalculationDate = new DateTime().plusDays(1).toDate();
        }

        this.recalculateInterestPayments();
    }

    public float getSumForLoanClose() {
        return this.getLeftSum() + this.getInterestSumLeft();
    }


    public boolean isOnFirstInterest() {
        return onFirstInterest;
    }

    public void setOnFirstInterest(boolean onFirstInterest) {
        this.onFirstInterest = onFirstInterest;
    }

    public List<Laptop> getLaptops() {
        return laptops;
    }

    public void setLaptops(List<Laptop> laptops) {
        this.laptops = laptops;
    }

    public String getClientFullName() {
        return this.client.getName() + " " + this.client.getSurname();
    }

    public String getClientPN() {
        return this.client.getPersonalNumber();
    }
    public String getClientMobile(){
        return this.client.getMobile();
    }
    public String getUserFullName(){
        return this.user.getName() + " " + this.user.getSurname();
    }
    public String getUserPN(){
        return this.user.getPersonalNumber();
    }
    public String getConditionName(){
        return this.loanCondition.getName();
    }
    public String getConditionFullName(){
        return this.loanCondition.getFullname();
    }
    public long getClientId(){
        return client.getId();
    }
}
