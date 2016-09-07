package main.Repositorys;

import main.models.Project.ProjectStageActionExpenseRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by kakha on 9/5/2016.
 */
@Transactional
public interface ProjectStageActionExpenseRequestRepository extends JpaRepository<ProjectStageActionExpenseRequest,Long> {
    @Query(value = "SELECT aer.* FROM project_stage_action_expense_requests aer " +
            "JOIN project_stage_actions a on a.project_stage_actiont_id=aer.project_stage_actiont_id " +
            "JOIN project_stages ps on ps.project_stage_id=a.project_stage_id " +
            "WHERE ps.project_id=:id order BY aer.last_modify_date",nativeQuery = true)
    List<ProjectStageActionExpenseRequest> findByProject(@Param("id") long id);
    @Query(value = "SELECT aer.* FROM project_stage_action_expense_requests aer " +
            "JOIN project_stage_actions a on a.project_stage_actiont_id=aer.project_stage_actiont_id " +
            "JOIN project_stages ps on ps.project_stage_id=a.project_stage_id " +
            "WHERE ps.project_stage_id=:id order BY aer.last_modify_date",nativeQuery = true)
    List<ProjectStageActionExpenseRequest> findByProjectStage(@Param("id") long id);
    @Query(value = "SELECT aer.* FROM project_stage_action_expense_requests aer " +
            "JOIN project_stage_actions a on a.project_stage_actiont_id=aer.project_stage_actiont_id " +
            "JOIN project_stages ps on ps.project_stage_id=a.project_stage_id " +
            "WHERE a.project_stage_actiont_id=:id order BY aer.last_modify_date",nativeQuery = true)
    List<ProjectStageActionExpenseRequest> findByProjectStageAction(@Param("id") long id);
}
