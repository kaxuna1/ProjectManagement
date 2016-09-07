package main.Repositorys;

import main.models.Project.ProjectStage;
import main.models.Project.ProjectStageAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by kaxa on 9/2/16.
 */
@Transactional
public interface ProjectStageActionRepository extends JpaRepository<ProjectStageAction,Long> {
    List<ProjectStageAction> findByProjectStageAndActiveOrderByCreateDateDesc(@Param("projectStage")ProjectStage projectStage, @Param("active") boolean active);

}
