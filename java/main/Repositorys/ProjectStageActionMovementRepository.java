package main.Repositorys;

import main.models.MovementTypes.ProjectStageActionMovement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by kaxa on 9/2/16.
 */
@Transactional
public interface ProjectStageActionMovementRepository extends JpaRepository<ProjectStageActionMovement,Long> {
}
