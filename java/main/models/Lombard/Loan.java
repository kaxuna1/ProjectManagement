package main.models.Lombard;

import com.fasterxml.jackson.annotation.JsonIgnore;
import main.models.DictionaryModels.Filial;
import main.models.Lombard.ItemClasses.MobilePhone;
import main.models.Lombard.MovementModels.LoanMovement;
import main.models.UserManagement.User;

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
    private Client client;

    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<MobilePhone> mobilePhones;

    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<LoanMovement> movements;
    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<LoanPayment> payments;

    @Column
    private String number;

    @ManyToOne
    @JoinColumn(name = "filialId")
    @JsonIgnore
    private Filial filial;

    @Column
    private float loanSum;


    @Column
    private boolean isActive;

    @Column
    private Date createDate;

    @Column
    private Date lastModifyDate;


    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;


    public Loan(Client client, Filial filial, float loanSum,User user) {
        this.client = client;
        this.filial = filial;
        this.loanSum = loanSum;
        this.mobilePhones=new ArrayList<>();
        this.isActive = true;
        this.createDate=new Date();
        this.lastModifyDate=new Date();
        this.user=user;
        this.movements=new ArrayList<>();
        this.payments=new ArrayList<>();
    }
    public Loan(){}


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
}
