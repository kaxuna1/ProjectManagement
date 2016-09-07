package main.models.StoreHous;

import com.fasterxml.jackson.annotation.JsonIgnore;
import main.models.MovementTypes.CompanyItemMovement;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by kaxa on 9/7/16.
 */

@Entity
@Table(name = "companyItems")
public class CompanyItem {
    @Id
    @Column(name = "companyItemId")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @NotNull
    @Column
    private String name;
    @NotNull
    @Column
    private String barCode;

    @OneToMany(mappedBy = "companyItem",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnore
    private List<StoreHouseBox> storeHouseBoxes;

    @Column
    private boolean active;

    @OneToMany(mappedBy = "companyItem",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnore
    private List<CompanyItemMovement> companyItemMovements;

    public CompanyItem(String name, String barCode) {
        this.name = name;
        this.barCode = barCode;
        this.companyItemMovements=new ArrayList<>();
    }
    public CompanyItem(){}

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

    public String getBarCode() {
        return barCode;
    }

    public void setBarCode(String barCode) {
        this.barCode = barCode;
    }

    public List<StoreHouseBox> getStoreHouseBoxes() {
        return storeHouseBoxes;
    }

    public void setStoreHouseBoxes(List<StoreHouseBox> storeHouseBoxes) {
        this.storeHouseBoxes = storeHouseBoxes;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public List<CompanyItemMovement> getCompanyItemMovements() {
        return companyItemMovements;
    }

    public void setCompanyItemMovements(List<CompanyItemMovement> companyItemMovements) {
        this.companyItemMovements = companyItemMovements;
    }
}
