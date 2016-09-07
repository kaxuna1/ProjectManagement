package main.models.Project;

import com.fasterxml.jackson.annotation.JsonIgnore;
import main.models.Enum.ProjectStageMovementType;
import main.models.MovementTypes.ProjectStageMovement;
import main.models.DictionaryModels.ProjectStageType;
import main.models.UserManagement.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by kakha on 8/25/2016.
 */
@Entity
@Table(name = "projectStages")
public class ProjectStage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "projectStageId")
    private long id;
    @Column
    private String name;

    @Column
    private Date createDate;

    @Column
    private Date shouldStartDate;

    @Column
    private Date shouldEndDate;

    @Column
    private Date startDate;

    @Column
    private Date endDate;

    @Column
    private int currentStatus;

    @Column
    private Date lastModifyDate;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "projectId")
    @JsonIgnore
    private Project project;

    @OneToMany(mappedBy = "projectStage",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnore
    private List<ProjectStageMovement> projectStageMovements;

    @OneToMany(mappedBy = "projectStage",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnore
    private List<ProjectStageActionExpense> projectStageActionExpenses;

    @OneToMany(mappedBy = "projectStage",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnore
    private List<ProjectStageAction> projectStageActions;



    @ManyToOne
    @JoinColumn(name = "projectStageTypeId")
    private ProjectStageType projectStageType;



    public ProjectStage(String name, User user, Project project,
                        Date shouldStartDate,Date shouldEndDate,ProjectStageType projectStageType) {
        this.currentStatus=ProjectStageMovementType.Registered.getCODE();
        this.name = name;
        this.createDate = new Date();
        this.lastModifyDate = new Date();
        this.user = user;
        this.project = project;
        this.shouldStartDate=shouldStartDate;
        this.shouldEndDate=shouldEndDate;
        this.startDate=null;
        this.endDate=null;
        this.projectStageMovements=new ArrayList<>();
        this.projectStageActions=new ArrayList<>();
        this.projectStageActionExpenses=new ArrayList<>();
        this.projectStageType=projectStageType;
    }
    public ProjectStage(){}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public String getStageStatus(){

        String status="";
        ProjectStageMovement lastMovement=projectStageMovements.get(projectStageMovements.size()-1);

        if(currentStatus== ProjectStageMovementType.Started.getCODE()){

            if (shouldEndDate.getTime()<(new Date().getTime())){
                status="გვიანდება დასრულება";
            }else
            status="დაწყებული";
        }

        if(currentStatus==ProjectStageMovementType.Registered.getCODE()){

            if(shouldStartDate.getTime()<(new Date().getTime()))
                status="დაწყება დაგვიანდა";
            else
                status="დარეგისტრირებული";
        }

        if(currentStatus==ProjectStageMovementType.Ended.getCODE())
            status="დასრულებული";

        return status;
    }

    public Date getShouldStartDate() {
        return shouldStartDate;
    }

    public void setShouldStartDate(Date shouldStartDate) {
        this.shouldStartDate = shouldStartDate;
    }

    public Date getShouldEndDate() {
        return shouldEndDate;
    }

    public void setShouldEndDate(Date shouldEndDate) {
        this.shouldEndDate = shouldEndDate;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public List<ProjectStageMovement> getProjectStageMovements() {
        return projectStageMovements;
    }

    public void setProjectStageMovements(List<ProjectStageMovement> projectStageMovements) {
        this.projectStageMovements = projectStageMovements;
    }

    public int getCurrentStatus() {
        return currentStatus;
    }

    public void setCurrentStatus(int currentStatus) {
        this.currentStatus = currentStatus;
    }

    public List<ProjectStageAction> getProjectStageActions() {
        return projectStageActions;
    }

    public void setProjectStageActions(List<ProjectStageAction> projectStageActions) {
        this.projectStageActions = projectStageActions;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<ProjectStageActionExpense> getProjectStageActionExpenses() {
        return projectStageActionExpenses;
    }

    public void setProjectStageActionExpenses(List<ProjectStageActionExpense> projectStageActionExpenses) {
        this.projectStageActionExpenses = projectStageActionExpenses;
    }

    public ProjectStageType getProjectStageType() {
        return projectStageType;
    }

    public void setProjectStageType(ProjectStageType projectStageType) {
        this.projectStageType = projectStageType;
    }
}
