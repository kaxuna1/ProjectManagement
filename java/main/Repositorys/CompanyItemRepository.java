package main.Repositorys;

import main.models.StoreHous.CompanyItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by kaxa on 9/7/16.
 */
@Transactional
public interface CompanyItemRepository extends JpaRepository<CompanyItem,Long> {
}
