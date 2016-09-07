package main.models.Project;

import com.fasterxml.jackson.annotation.JsonIgnore;
import main.models.DictionaryModels.Element;
import main.models.MovementTypes.ProjectStageActionExpenseMovement;
import main.models.Project.Project;
import main.models.Project.ProjectStage;
import main.models.Project.ProjectStageAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by kaxa on 9/3/16.
 */
@Entity
@Table(name = "projectStageActionExpenses")
public class ProjectStageActionExpense {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "projectStageActionExpenseId")
    private long id;

    @ManyToOne
    @JoinColumn(name = "elementId")
    @JsonIgnore
    private Element element;

    @Column
    private float quantity;

    @Column
    private float price;

    @Column
    private Date createDate;

    @Column
    private boolean active;

    @Column
    private Date lastModifyDate;

    @ManyToOne
    @JoinColumn(name = "projectStageActionId")
    @JsonIgnore
    private ProjectStageAction projectStageAction;

    @ManyToOne
    @JoinColumn(name = "projectStageId")
    @JsonIgnore
    private ProjectStage projectStage;

    @ManyToOne
    @JoinColumn(name = "projectId")
    @JsonIgnore
    private Project project;

    @OneToMany(mappedBy = "projectStageActionExpense",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnore
    private List<ProjectStageActionExpenseMovement> projectStageActionExpenseMovements;


    public ProjectStageActionExpense(Element element, float quantity, float price, ProjectStageAction projectStageAction) {
        this.element = element;
        this.quantity = quantity;
        this.price = price;
        this.active=true;
        this.createDate=new Date();
        this.lastModifyDate=new Date();
        this.projectStageAction = projectStageAction;
        this.projectStage=projectStageAction.getProjectStage();
        this.project=projectStageAction.getProjectStage().getProject();
        this.projectStageActionExpenseMovements=new ArrayList<>();
    }
    public ProjectStageActionExpense(){}


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Element getElement() {
        return element;
    }

    public void setElement(Element element) {
        this.element = element;
    }

    public float getQuantity() {
        return quantity;
    }

    public void setQuantity(float quantity) {
        this.quantity = quantity;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Date getLastModifyDate() {
        return lastModifyDate;
    }

    public void setLastModifyDate(Date lastModifyDate) {
        this.lastModifyDate = lastModifyDate;
    }

    public ProjectStageAction getProjectStageAction() {
        return projectStageAction;
    }

    public void setProjectStageAction(ProjectStageAction projectStageAction) {
        this.projectStageAction = projectStageAction;
    }
    public String getElementName(){
        return element.getName();
    }

    public ProjectStage getProjectStage() {
        return projectStage;
    }

    public void setProjectStage(ProjectStage projectStage) {
        this.projectStage = projectStage;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public List<ProjectStageActionExpenseMovement> getProjectStageActionExpenseMovements() {
        return projectStageActionExpenseMovements;
    }

    public void setProjectStageActionExpenseMovements(List<ProjectStageActionExpenseMovement> projectStageActionExpenseMovements) {
        this.projectStageActionExpenseMovements = projectStageActionExpenseMovements;
    }
}
