package main.Repositorys;

import main.models.Project.Project;
import main.models.Project.ProjectStage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by kakha on 8/25/2016.
 */

@Transactional
public interface ProjectStageRepository extends JpaRepository<ProjectStage, Long> {
    List<ProjectStage> findByProjectOrderByCreateDateDesc(@Param("project")Project project);
}
