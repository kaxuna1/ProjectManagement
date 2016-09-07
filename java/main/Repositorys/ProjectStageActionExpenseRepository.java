package main.Repositorys;

import main.models.Project.Project;
import main.models.Project.ProjectStage;
import main.models.Project.ProjectStageAction;
import main.models.Project.ProjectStageActionExpense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by kaxa on 9/3/16.
 */
@Transactional
public interface ProjectStageActionExpenseRepository extends JpaRepository<ProjectStageActionExpense,Long> {
    List<ProjectStageActionExpense> findByProjectStageActionAndActiveOrderByCreateDateDesc(
            @Param("projectStageAction")ProjectStageAction projectStageAction,
            @Param("active")boolean active);

    List<ProjectStageActionExpense> findByProjectStageAndActiveOrderByCreateDateDesc(
            @Param("projectStage")ProjectStage projectStage, @Param("active")boolean active);

    List<ProjectStageActionExpense> findByProjectAndActiveOrderByCreateDateDesc(
            @Param("project")Project project, @Param("active")boolean active);
}
