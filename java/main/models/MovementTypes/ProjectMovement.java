package main.models.MovementTypes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import main.models.Project.Project;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by kaxa on 8/31/16.
 */

@Entity
@Table(name = "projectMovements")
public class ProjectMovement {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "projectMovementId")
    private long id;

    @ManyToOne
    @JoinColumn(name = "projectId")
    @JsonIgnore
    private Project project;

    @Column
    private int movementType;

    @Column
    private String movementString;

    @Column
    private Date date;

    @Column
    private long userId;


    public ProjectMovement(Project project, int movementType, String movementString,long userId) {
        this.project = project;
        this.movementType = movementType;
        this.movementString = movementString;
        this.date=new Date();
        this.userId=userId;
    }
    public ProjectMovement(){}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
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
