package main.Repositorys.Lombard;

import main.models.Lombard.Dictionary.MobileBrand;
import main.models.Lombard.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by kaxa on 11/17/16.
 */

@Transactional
public interface MobileBrandRepo extends JpaRepository<MobileBrand,Long> {
}
