package main.Repositorys;

import main.models.MovementTypes.ProjectStageMovement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by kaxa on 8/31/16.
 */

@Transactional
public interface ProjectStageMovementRepository extends JpaRepository<ProjectStageMovement, Long> {
}
