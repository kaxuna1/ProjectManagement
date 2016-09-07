package main.models.Project;

import com.fasterxml.jackson.annotation.JsonIgnore;
import main.models.Enum.ProjectMovementType;
import main.models.MovementTypes.ProjectMovement;
import main.models.StoreHous.StoreHouse;
import main.models.UserManagement.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by kakha on 8/24/2016.
 */
@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "projectId")
    private long id;

    @Column
    private String name;

    @Column
    private Date createDate;

    @Column
    private Date lastModifyDate;

    @Column
    private String sakadastro;

    @Column
    private String address;

    @Column
    private String xCoordinate;

    @Column
    private int status;

    @Column
    private String yCoordinate;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @OneToMany(mappedBy = "project",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnore
    private List<ProjectStage> projectStages;

    @OneToMany(mappedBy = "project",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnore
    private List<ProjectMovement> projectMovements;

    @OneToMany(mappedBy = "project",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnore
    private List<ProjectStageActionExpense> projectStageActionExpenses;


    @OneToMany(mappedBy = "project",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnore
    private List<StoreHouse> storeHouses;


    @Column
    private Date startDate;

    @Column
    private Date endDate;

    @JoinTable(name = "project_to_prarab", joinColumns = {
            @JoinColumn(name = "val1", referencedColumnName = "projectId", nullable = false)}, inverseJoinColumns = {
            @JoinColumn(name = "val2", referencedColumnName = "userId", nullable = false)})
    @ManyToMany
    @JsonIgnore
    private List<User> prarabs;


    public Project(String name, String sakadastro, String xCoordinate, String yCoordinate, User user, String address) {
        this.name = name;
        this.sakadastro = sakadastro;
        this.address = address;
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.user = user;
        this.createDate=new Date();
        this.lastModifyDate=new Date();
        this.projectMovements=new ArrayList<>();
        this.projectStageActionExpenses=new ArrayList<>();
        this.prarabs=new ArrayList<>();
        this.status= ProjectMovementType.Registered.getCODE();
        this.storeHouses=new ArrayList<>();
    }
    public Project(){}

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

    public Date getLastModifyDate() {
        return lastModifyDate;
    }

    public void setLastModifyDate(Date lastModifyDate) {
        this.lastModifyDate = lastModifyDate;
    }

    public String getSakadastro() {
        return sakadastro;
    }

    public void setSakadastro(String sakadastro) {
        this.sakadastro = sakadastro;
    }

    public String getxCoordinate() {
        return xCoordinate;
    }

    public void setxCoordinate(String xCoordinate) {
        this.xCoordinate = xCoordinate;
    }

    public String getyCoordinate() {
        return yCoordinate;
    }

    public void setyCoordinate(String yCoordinate) {
        this.yCoordinate = yCoordinate;
    }

    public String getAddress() {
        return address;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public List<ProjectMovement> getProjectMovements() {
        return projectMovements;
    }

    public void setProjectMovements(List<ProjectMovement> projectMovements) {
        this.projectMovements = projectMovements;
    }

    public List<ProjectStage> getProjectStages() {
        return projectStages;
    }

    public void setProjectStages(List<ProjectStage> projectStages) {
        this.projectStages = projectStages;
    }

    public List<ProjectStageActionExpense> getProjectStageActionExpenses() {
        return projectStageActionExpenses;
    }

    public void setProjectStageActionExpenses(List<ProjectStageActionExpense> projectStageActionExpenses) {
        this.projectStageActionExpenses = projectStageActionExpenses;
    }

    public List<User> getPrarabs() {
        return prarabs;
    }

    public void setPrarabs(List<User> prarabs) {
        this.prarabs = prarabs;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public List<StoreHouse> getStoreHouses() {
        return storeHouses;
    }

    public void setStoreHouses(List<StoreHouse> storeHouses) {
        this.storeHouses = storeHouses;
    }
}
