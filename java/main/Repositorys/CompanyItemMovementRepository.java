package main.Repositorys;

import main.models.MovementTypes.CompanyItemMovement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by kaxa on 9/7/16.
 */
@Transactional
public interface CompanyItemMovementRepository extends JpaRepository<CompanyItemMovement,Long> {
}
