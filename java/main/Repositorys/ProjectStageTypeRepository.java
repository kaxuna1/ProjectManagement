package main.Repositorys;

import main.models.DictionaryModels.ProjectStageType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by kaxa on 9/4/16.
 */
@Transactional
public interface ProjectStageTypeRepository extends JpaRepository<ProjectStageType,Long> {
}
