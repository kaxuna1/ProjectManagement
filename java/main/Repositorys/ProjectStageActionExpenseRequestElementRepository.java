package main.Repositorys;

import main.models.Project.ProjectStageActionExpenseRequestElement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by kakha on 9/5/2016.
 */
@Transactional
public interface ProjectStageActionExpenseRequestElementRepository extends JpaRepository<ProjectStageActionExpenseRequestElement,Long> {
}
