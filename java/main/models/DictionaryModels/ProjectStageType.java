package main.models.DictionaryModels;

import com.fasterxml.jackson.annotation.JsonIgnore;
import main.models.Project.ProjectStage;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by kaxa on 9/4/16.
 */

@Entity
@Table(name = "projectStageTypes")
public class ProjectStageType {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "projectStageTypeId")
    private long id;

    @OneToMany(mappedBy = "projectStageType",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnore
    private List<ProjectStage> projectStages;

    @Column
    private String name;

    public ProjectStageType(String name) {
        this.name = name;
        this.projectStages=new ArrayList<>();
    }
    public ProjectStageType(){}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<ProjectStage> getProjectStages() {
        return projectStages;
    }

    public void setProjectStages(List<ProjectStage> projectStages) {
        this.projectStages = projectStages;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
