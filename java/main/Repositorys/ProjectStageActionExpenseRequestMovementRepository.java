package main.Repositorys;

import main.models.MovementTypes.ProjectStageActionExpenseRequestMovement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by kaxa on 9/6/16.
 */
@Transactional
public interface ProjectStageActionExpenseRequestMovementRepository extends JpaRepository<ProjectStageActionExpenseRequestMovement,Long> {
}
