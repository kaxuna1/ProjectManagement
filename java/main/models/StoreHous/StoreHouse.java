package main.models.StoreHous;

import com.fasterxml.jackson.annotation.JsonIgnore;
import main.models.Project.Project;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Created by kaxa on 9/7/16.
 */
@Entity
@Table(name = "StoreHouses")
public class StoreHouse {
    @Id
    @Column(name = "storeHouseId")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    @Column
    private String name;

    @NotNull
    @Column
    private String address;

    @Column
    private int type;

    @Column
    private boolean active;

    @ManyToOne
    @JoinColumn(name = "projectId")
    @JsonIgnore
    private Project project;

    @OneToMany(mappedBy = "storeHouse",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnore
    private List<StoreHouseBox> storeHouseBoxes;


    public StoreHouse(String name, String address, int type) {
        this.name = name;
        this.address = address;
        this.type = type;
    }

    public StoreHouse(){}

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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public List<StoreHouseBox> getStoreHouseBoxes() {
        return storeHouseBoxes;
    }

    public void setStoreHouseBoxes(List<StoreHouseBox> storeHouseBoxes) {
        this.storeHouseBoxes = storeHouseBoxes;
    }
}
