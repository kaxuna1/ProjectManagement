package main.models.Project;

import com.fasterxml.jackson.annotation.JsonIgnore;
import main.models.Enum.ProjectStageActionExpenseRequestMovementType;
import main.models.UserManagement.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by kaxa on 9/5/16.
 */
@Entity
@Table(name = "projectStageActionExpenseRequests")
public class ProjectStageActionExpenseRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "projectStageActionExpenseRequestId")
    private long id;

    @OneToMany(mappedBy = "projectStageActionExpenseRequest", cascade = CascadeType.ALL)
    private List<ProjectStageActionExpenseRequestElement> projectStageActionExpenseRequestElements;

    @Column
    private Date createDate;

    @Column
    private Date chabarebisDate;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "projectStageActiontId")
    @JsonIgnore
    private ProjectStageAction projectStageAction;

    @Column
    private boolean accaptedByShesyidvebi;

    @Column
    private boolean finishedByPrarab;

    @Column
    private boolean active;

    @Column
    private Date lastModifyDate;

    @Column
    private int status;


    public ProjectStageActionExpenseRequest(Date chabarebisDate, User user, ProjectStageAction projectStageAction) {
        this.chabarebisDate = chabarebisDate;
        this.user = user;
        this.projectStageAction = projectStageAction;
        this.createDate = new Date();
        this.active = true;
        this.finishedByPrarab = false;
        this.accaptedByShesyidvebi = false;
        this.projectStageActionExpenseRequestElements = new ArrayList<>();
        this.status= ProjectStageActionExpenseRequestMovementType.Registered.getCODE();
        this.lastModifyDate=new Date();

    }

    public ProjectStageActionExpenseRequest() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<ProjectStageActionExpenseRequestElement> getProjectStageActionExpenseRequestElements() {
        return projectStageActionExpenseRequestElements;
    }

    public void setProjectStageActionExpenseRequestElements(List<ProjectStageActionExpenseRequestElement> projectStageActionExpenseRequestElements) {
        this.projectStageActionExpenseRequestElements = projectStageActionExpenseRequestElements;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getChabarebisDate() {
        return chabarebisDate;
    }

    public void setChabarebisDate(Date chabarebisDate) {
        this.chabarebisDate = chabarebisDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ProjectStageAction getProjectStageAction() {
        return projectStageAction;
    }

    public void setProjectStageAction(ProjectStageAction projectStageAction) {
        this.projectStageAction = projectStageAction;
    }

    public boolean isAccaptedByShesyidvebi() {
        return accaptedByShesyidvebi;
    }

    public void setAccaptedByShesyidvebi(boolean accaptedByShesyidvebi) {
        this.accaptedByShesyidvebi = accaptedByShesyidvebi;
    }

    public boolean isFinishedByPrarab() {
        return finishedByPrarab;
    }

    public void setFinishedByPrarab(boolean finishedByPrarab) {
        this.finishedByPrarab = finishedByPrarab;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Date getLastModifyDate() {
        return lastModifyDate;
    }

    public void setLastModifyDate(Date lastModifyDate) {
        this.lastModifyDate = lastModifyDate;
    }
}
