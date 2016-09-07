package main.models.DictionaryModels;

import com.fasterxml.jackson.annotation.JsonIgnore;
import main.models.Project.ProjectStageActionExpense;
import main.models.Project.ProjectStageActionExpenseRequestElement;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by kaxa on 9/1/16.
 */
@Entity
@Table(name = "elements")
public class Element {
    @Id
    @Column(name = "elementId")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    private String name;

    @Column
    private String barcode;

    @Column
    private boolean active;

    @OneToMany(mappedBy = "element",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnore
    private List<ProjectStageActionExpense> projectStageActionExpenses;

    @OneToMany(mappedBy = "element",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnore
    private List<ProjectStageActionExpenseRequestElement> projectStageActionExpenseRequestElements;


    public Element(String name, String barcode) {
        this.name = name;
        this.barcode = barcode;
        this.active=true;
        projectStageActionExpenses=new ArrayList<>();
        projectStageActionExpenseRequestElements=new ArrayList<>();
    }
    public Element(){}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBarcode() {
        return barcode;
    }

    public void setBarcode(String barcode) {
        this.barcode = barcode;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public boolean isActive() {
        return active;
    }

    public String getNameBarCode(){
        return name+" "+barcode;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public List<ProjectStageActionExpense> getProjectStageActionExpenses() {
        return projectStageActionExpenses;
    }

    public void setProjectStageActionExpenses(List<ProjectStageActionExpense> projectStageActionExpenses) {
        this.projectStageActionExpenses = projectStageActionExpenses;
    }

    public List<ProjectStageActionExpenseRequestElement> getProjectStageActionExpenseRequestElements() {
        return projectStageActionExpenseRequestElements;
    }

    public void setProjectStageActionExpenseRequestElements(List<ProjectStageActionExpenseRequestElement> projectStageActionExpenseRequestElements) {
        this.projectStageActionExpenseRequestElements = projectStageActionExpenseRequestElements;
    }
}
