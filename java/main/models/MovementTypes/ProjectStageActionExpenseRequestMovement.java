package main.models.MovementTypes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import main.models.Project.ProjectStageActionExpense;
import main.models.Project.ProjectStageActionExpenseRequest;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by kaxa on 9/6/16.
 */
@Entity
@Table(name = "projectStageActionExpenseRequestMovements")
public class ProjectStageActionExpenseRequestMovement {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "projectStageActionExMovementId")
    private long id;

    @ManyToOne
    @JoinColumn(name = "projectStageActiontExpenseRequestId")
    @JsonIgnore
    private ProjectStageActionExpenseRequest projectStageActionExpenseRequest;

    @Column
    private int movementType;

    @Column
    private String movementString;

    @Column
    private Date date;

    @Column
    private long userId;


    public ProjectStageActionExpenseRequestMovement(ProjectStageActionExpenseRequest projectStageActionExpenseRequest,
                                             int movementType, String movementString,long userId) {
        this.projectStageActionExpenseRequest = projectStageActionExpenseRequest;
        this.movementType = movementType;
        this.movementString = movementString;
        this.date=new Date();
        this.userId=userId;
    }
    public ProjectStageActionExpenseRequestMovement(){}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public ProjectStageActionExpenseRequest getProjectStageAction() {
        return projectStageActionExpenseRequest;
    }

    public void setProjectStageAction(ProjectStageActionExpenseRequest projectStageActionExpense) {
        this.projectStageActionExpenseRequest = projectStageActionExpenseRequest;
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
