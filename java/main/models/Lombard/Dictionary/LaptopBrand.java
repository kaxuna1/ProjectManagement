package main.models.Lombard.Dictionary;

import javax.persistence.*;

/**
 * Created by kaxa on 11/16/16.
 */

@Entity
@Table(name = "LaptopBrands")
public class LaptopBrand {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "laptopBrandId")
    private long id;
}
