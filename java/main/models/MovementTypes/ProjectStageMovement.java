package main.models.MovementTypes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import main.models.Project.ProjectStage;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by kaxa on 8/31/16.
 */
@Entity
@Table(name = "projectStageMovements")
public class ProjectStageMovement {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "projectStageMovementId")
    private long id;

    @ManyToOne
    @JoinColumn(name = "projectStageId")
    @JsonIgnore
    private ProjectStage projectStage;

    @Column
    private int movementType;

    @Column
    private String movementString;

    @Column
    private Date date;

    @Column
    private long userId;


    public ProjectStageMovement(ProjectStage projectStage, int movementType,
                                String movementString,long userId) {
        this.projectStage = projectStage;
        this.movementType = movementType;
        this.movementString = movementString;
        this.date=new Date();
        this.userId=userId;
    }

    public ProjectStageMovement(){}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public ProjectStage getProjectStage() {
        return projectStage;
    }

    public void setProjectStage(ProjectStage projectStage) {
        this.projectStage = projectStage;
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
