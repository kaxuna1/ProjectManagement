package main.Repositorys;

import main.models.Project.ProjectStage;
import main.models.Project.ProjectStageAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by kaxa on 9/2/16.
 */
@Transactional
public interface ProjectStageActionRepository extends JpaRepository<ProjectStageAction,Long> {
    List<ProjectStageAction> findByProjectStageAndActiveOrderByCreateDateDesc(@Param("projectStage")ProjectStage projectStage, @Param("active") boolean active);


    @Query(value = "SELECT psa.* FROM project_stage_actions psa " +
            "JOIN project_stages ps on psa.project_stage_id=ps.project_stage_id " +
            "WHERE ps.project_id=:p and psa.active=1 and psa.status in (2,5,6) order by psa.last_modify_date",nativeQuery = true)
    List<ProjectStageAction> findActiveForMainPageByProject(@Param("p")Long p);
    @Query(value = "SELECT psa.* FROM project_stage_actions psa " +
            "JOIN project_stages ps on psa.project_stage_id=ps.project_stage_id " +
            "WHERE psa.active=1 and psa.status in (1,2,3,5,6) AND ps.project_id=:p",nativeQuery = true)
    List<ProjectStageAction> findActiveForHierarchy(@Param("p")Long p);

    @Query(value = "select psa.* FROM project_stage_actions psa " +
            "JOIN project_stages ps ON psa.project_stage_id=ps.project_stage_id " +
            "WHERE ps.project_id=:id and psa.active=1 AND psa.status in (5,6,7) " +
            "ORDER BY psa.last_modify_date DESC",nativeQuery = true)
    List<ProjectStageAction> findByProjectForPrarab(@Param("id")long id);
    @Query(value = "SELECT * FROM project_stage_actions psa\n" +
            "JOIN project_stages ps on psa.project_stage_id=ps.project_stage_id\n" +
            "WHERE ps.project_stage_id=:id AND psa.status in (5,6,7) AND psa.active=1",nativeQuery = true)
    List<ProjectStageAction> findStageActionsForPrarab(@Param("id")long id);
}
