package main.models.StoreHous;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by kaxa on 9/7/16.
 */

@Entity
@Table(name = "StoreHouseBoxes")
public class StoreHouseBox {
    @Id
    @Column(name = "storeHouseBoxId")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name = "storeHouseId")
    @JsonIgnore
    private StoreHouse storeHouse;

    @ManyToOne
    @JoinColumn(name = "companyItemId")
    @JsonIgnore
    private CompanyItem companyItem;

    @Column
    private boolean active;

    @Column
    private Date createDate;

    @Column
    private Date removeDate;


    public StoreHouseBox(StoreHouse storeHouse, CompanyItem companyItem) {
        this.storeHouse = storeHouse;
        this.companyItem = companyItem;
        this.active=true;
        this.createDate=new Date();
        this.removeDate=null;

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public StoreHouse getStoreHouse() {
        return storeHouse;
    }

    public void setStoreHouse(StoreHouse storeHouse) {
        this.storeHouse = storeHouse;
    }

    public CompanyItem getCompanyItem() {
        return companyItem;
    }

    public void setCompanyItem(CompanyItem companyItem) {
        this.companyItem = companyItem;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getRemoveDate() {
        return removeDate;
    }

    public void setRemoveDate(Date removeDate) {
        this.removeDate = removeDate;
    }
}
