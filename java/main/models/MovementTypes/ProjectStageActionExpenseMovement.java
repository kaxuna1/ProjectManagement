package main.models.MovementTypes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import main.models.Project.ProjectStageActionExpense;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by kaxa on 9/3/16.
 */
@Entity
@Table(name = "projectStageActionExpenseMovements")
public class ProjectStageActionExpenseMovement {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "projectStageActionExMovementId")
    private long id;

    @ManyToOne
    @JoinColumn(name = "projectStageActiontExpenseId")
    @JsonIgnore
    private ProjectStageActionExpense projectStageActionExpense;

    @Column
    private int movementType;

    @Column
    private String movementString;

    @Column
    private Date date;

    @Column
    private long userId;


    public ProjectStageActionExpenseMovement(ProjectStageActionExpense projectStageActionExpense,
                                             int movementType, String movementString,long userId) {
        this.projectStageActionExpense = projectStageActionExpense;
        this.movementType = movementType;
        this.movementString = movementString;
        this.date=new Date();
        this.userId=userId;
    }
    public ProjectStageActionExpenseMovement(){}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public ProjectStageActionExpense getProjectStageAction() {
        return projectStageActionExpense;
    }

    public void setProjectStageAction(ProjectStageActionExpense projectStageActionExpense) {
        this.projectStageActionExpense = projectStageActionExpense;
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
