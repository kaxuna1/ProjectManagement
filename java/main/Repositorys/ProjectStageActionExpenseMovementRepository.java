package main.Repositorys;

import main.models.MovementTypes.ProjectStageActionExpenseMovement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by kaxa on 9/4/16.
 */
@Transactional
public interface ProjectStageActionExpenseMovementRepository extends JpaRepository<ProjectStageActionExpenseMovement,Long> {
}
