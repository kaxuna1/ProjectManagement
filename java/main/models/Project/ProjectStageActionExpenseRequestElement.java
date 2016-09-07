package main.models.Project;

import com.fasterxml.jackson.annotation.JsonIgnore;
import main.models.DictionaryModels.Element;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by kaxa on 9/5/16.
 */
@Entity
@Table(name = "projectStageActionExpenseRequestElements")
public class ProjectStageActionExpenseRequestElement {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "projectStageActionExpenseRequestElementId")
    private long id;

    @ManyToOne
    @JoinColumn(name = "elementId")
    @JsonIgnore
    private Element element;

    @Column
    private Date createDate;

    @Column
    private float quant;

    @ManyToOne
    @JoinColumn(name = "projectStageActionExpenseRequestId")
    @JsonIgnore
    private ProjectStageActionExpenseRequest projectStageActionExpenseRequest;


    public ProjectStageActionExpenseRequestElement(Element element,
                                                   float quant,
                                                   ProjectStageActionExpenseRequest
                                                           projectStageActionExpenseRequest) {
        this.element = element;
        this.quant = quant;
        this.projectStageActionExpenseRequest = projectStageActionExpenseRequest;
    }

    public ProjectStageActionExpenseRequestElement(){}

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

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public float getQuant() {
        return quant;
    }

    public void setQuant(float quant) {
        this.quant = quant;
    }

    public ProjectStageActionExpenseRequest getProjectStageActionExpenseRequest() {
        return projectStageActionExpenseRequest;
    }

    public void setProjectStageActionExpenseRequest(ProjectStageActionExpenseRequest projectStageActionExpenseRequest) {
        this.projectStageActionExpenseRequest = projectStageActionExpenseRequest;
    }
}
