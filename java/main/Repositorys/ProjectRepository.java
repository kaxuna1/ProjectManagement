package main.Repositorys;

import main.models.Project.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Created by kakha on 8/24/2016.
 */
public interface ProjectRepository extends JpaRepository<Project, Long> {
    @Query("select u from Project u WHERE u.name LIKE CONCAT('%',:name,'%')")
    Page<Project> findByNameAndPage(@Param("name")String name, Pageable pageable);
}
