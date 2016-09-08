package main.models.Project;

import com.fasterxml.jackson.annotation.JsonIgnore;
import main.models.Enum.ProjectStageActionMovementType;
import main.models.MovementTypes.ProjectStageActionMovement;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by kaxa on 9/1/16.
 */
@Entity
@Table(name = "projectStageActions")
public class ProjectStageAction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "projectStageActiontId")
    private long id;

    @Column
    private String name;

    @Column
    private Date createDate;

    @Column
    private Date startDate;

    @Column
    private Date endDate;

    @Column
    private Date lastModifyDate;

    @JoinTable(name = "action_to_action", joinColumns = {
            @JoinColumn(name = "val1", referencedColumnName = "projectStageActiontId", nullable = false)}, inverseJoinColumns = {
            @JoinColumn(name = "val2", referencedColumnName = "projectStageActiontId", nullable = false)})
    @ManyToMany
    @JsonIgnore
    private List<ProjectStageAction> list1;

    @ManyToMany(mappedBy = "list1")
    @JsonIgnore
    private List<ProjectStageAction> list2;

    @ManyToOne
    @JoinColumn(name = "projectStageId")
    @JsonIgnore
    private ProjectStage projectStage;

    @OneToMany(mappedBy = "projectStageAction", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnore
    private List<ProjectStageActionMovement> projectStageActionMovements;

    @OneToMany(mappedBy = "projectStageAction", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnore
    private List<ProjectStageActionExpense> projectStageActionExpenses;

    @OneToMany(mappedBy = "projectStageAction", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnore
    private List<ProjectStageActionExpenseRequest> projectStageActionExpenseRequests;

    @Column
    private int status;

    @Column
    private boolean active;

    public ProjectStageAction(String name, ProjectStage projectStage) {
        this.name = name;
        this.projectStage = projectStage;
        this.createDate = new Date();
        this.startDate = null;
        this.endDate = null;
        this.lastModifyDate=new Date();
        this.projectStageActionMovements = new ArrayList<>();
        this.status = ProjectStageActionMovementType.Registered.getCODE();
        this.active = true;
        this.projectStageActionExpenses = new ArrayList<>();
        this.list1 = new ArrayList<>();
        this.list2 = new ArrayList<>();
        this.projectStageActionExpenseRequests=new ArrayList<>();
    }

    public ProjectStageAction() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

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

    public ProjectStage getProjectStage() {
        return projectStage;
    }

    public void setProjectStage(ProjectStage projectStage) {
        this.projectStage = projectStage;
    }

    public List<ProjectStageActionMovement> getProjectStageActionMovements() {
        return projectStageActionMovements;
    }

    public void setProjectStageActionMovements(List<ProjectStageActionMovement> projectStageActionMovements) {
        this.projectStageActionMovements = projectStageActionMovements;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getActionStatus() {
        String statusToSend = "ამოუცნობი";
        if (status == ProjectStageActionMovementType.Registered.getCODE()) {
            statusToSend = "დარეგისტრირებული";
        }
        if (status == ProjectStageActionMovementType.sentToPrarab.getCODE()){
            statusToSend = "გადაგზავნილია პრარაბთან";
        }
        return statusToSend;
    }

    public List<ProjectStageActionExpense> getProjectStageActionExpenses() {
        return projectStageActionExpenses;
    }

    public void setProjectStageActionExpenses(List<ProjectStageActionExpense> projectStageActionExpenses) {
        this.projectStageActionExpenses = projectStageActionExpenses;
    }

    public List<ProjectStageAction> getList1() {
        return list1;
    }

    public void setList1(List<ProjectStageAction> list1) {
        this.list1 = list1;
    }

    public List<ProjectStageAction> getList2() {
        return list2;
    }

    public void setList2(List<ProjectStageAction> list2) {
        this.list2 = list2;
    }

    public List<ProjectStageActionExpenseRequest> getProjectStageActionExpenseRequests() {
        return projectStageActionExpenseRequests;
    }

    public void setProjectStageActionExpenseRequests(List<ProjectStageActionExpenseRequest> projectStageActionExpenseRequests) {
        this.projectStageActionExpenseRequests = projectStageActionExpenseRequests;
    }

    public Date getLastModifyDate() {
        return lastModifyDate;
    }

    public void setLastModifyDate(Date lastModifyDate) {
        this.lastModifyDate = lastModifyDate;
    }

    public String getStageName(){
        return projectStage.getName();
    }
}
