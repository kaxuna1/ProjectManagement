package main.models.MovementTypes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import main.models.Project.Project;
import main.models.StoreHous.CompanyItem;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by kaxa on 9/7/16.
 */

@Entity
@Table(name = "companyItemMovements")
public class CompanyItemMovement {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "companyItemMovementId")
    private long id;

    @ManyToOne
    @JoinColumn(name = "companyItemId")
    @JsonIgnore
    private CompanyItem companyItem;

    @Column
    private int movementType;

    @Column
    private String movementString;

    @Column
    private Date date;

    @Column
    private long userId;


    public CompanyItemMovement(CompanyItem companyItem, int movementType, String movementString, long userId) {
        this.companyItem = companyItem;
        this.movementType = movementType;
        this.movementString = movementString;
        this.date = new Date();
        this.userId = userId;
    }

    public CompanyItemMovement() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public CompanyItem getCompanyItem() {
        return companyItem;
    }

    public void setCompanyItem(CompanyItem companyItem) {
        this.companyItem = companyItem;
    }

    public int getMovementType() {
        return movementType;
    }

    public void setMovementType(int movementType) {
        this.movementType = movementType;
    }

    public String getMovementString() {
        return movementString;
    }

    public void setMovementString(String movementString) {
        this.movementString = movementString;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }
}
