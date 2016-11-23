package main.models.Lombard.Dictionary;

import com.fasterxml.jackson.annotation.JsonIgnore;
import main.models.DictionaryModels.Filial;
import main.models.Lombard.Loan;
import main.models.Lombard.TypeEnums.LoanConditionPeryodType;

import javax.persistence.*;
import java.util.List;

/**
 * Created by kaxa on 11/23/16.
 */

@Entity
@Table(name = "LoanConditions")
public class LoanCondition {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "loanConditionlId")
    private long id;

    @Column
    private float percent;

    @Column
    private int period;

    @Column
    private int periodType;
    @Column
    private String name;


    @JsonIgnore
    @OneToMany(mappedBy = "loanCondition",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Loan> loans;

    @ManyToOne
    @JoinColumn(name = "filialId")
    @JsonIgnore
    private Filial filial;
    @Column
    private boolean active;


    public LoanCondition(float percent, int period, int periodType,Filial filial,String name) {
        this.percent = percent;
        this.period = period;
        this.periodType = periodType;
        this.filial=filial;
        this.active=true;
        this.name=name;
    }
    public LoanCondition(){}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public float getPercent() {
        return percent;
    }

    public void setPercent(float percent) {
        this.percent = percent;
    }

    public int getPeriod() {
        return period;
    }

    public void setPeriod(int period) {
        this.period = period;
    }

    public int getPeriodType() {
        return periodType;
    }

    public void setPeriodType(int periodType) {
        this.periodType = periodType;
    }

    public List<Loan> getLoans() {
        return loans;
    }

    public void setLoans(List<Loan> loans) {
        this.loans = loans;
    }

    public Filial getFilial() {
        return filial;
    }

    public void setFilial(Filial filial) {
        this.filial = filial;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public String getFullname(){

        String periodTypeString=this.periodType== LoanConditionPeryodType.DAY.getCODE()?" დღე":
                (this.periodType== LoanConditionPeryodType.WEEK.getCODE()?" კვირა":" თვე");

        return this.name+" "+this.percent+"% ყოველ "+this.period+periodTypeString+"ში";
    }
}
