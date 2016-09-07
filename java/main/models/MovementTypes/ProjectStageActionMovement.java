package main.models.MovementTypes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import main.models.Project.ProjectStageAction;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by kaxa on 9/2/16.
 */
@Entity
@Table(name = "projectStageActionMovements")
public class ProjectStageActionMovement {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "projectStageActionMovementId")
    private long id;

    @ManyToOne
    @JoinColumn(name = "projectStageActiontId")
    @JsonIgnore
    private ProjectStageAction projectStageAction;

    @Column
    private int movementType;

    @Column
    private String movementString;

    @Column
    private Date date;

    @Column
    private long userId;


    public ProjectStageActionMovement(ProjectStageAction projectStageAction,
                                      int movementType, String movementString,long userId) {
        this.projectStageAction = projectStageAction;
        this.movementType = movementType;
        this.movementString = movementString;
        this.date=new Date();
        this.userId=userId;
    }
    public ProjectStageActionMovement(){}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public ProjectStageAction getProjectStageAction() {
        return projectStageAction;
    }

    public void setProjectStageAction(ProjectStageAction projectStageAction) {
        this.projectStageAction = projectStageAction;
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
