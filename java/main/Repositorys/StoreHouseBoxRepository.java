package main.Repositorys;

import main.models.StoreHous.CompanyItem;
import main.models.StoreHous.StoreHouseBox;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by kaxa on 9/7/16.
 */
@Transactional
public interface StoreHouseBoxRepository extends JpaRepository<StoreHouseBox,Long> {
    List<StoreHouseBox> findByCompanyItemAndActive(@Param("companyItem")CompanyItem companyItem, @Param("active")boolean active);
}
