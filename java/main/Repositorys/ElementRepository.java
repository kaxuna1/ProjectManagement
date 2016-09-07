package main.Repositorys;

import main.models.DictionaryModels.Element;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by kaxa on 9/2/16.
 */
@Transactional
public interface ElementRepository extends JpaRepository<Element, Long> {
    List<Element> findByActive(@Param("active")boolean active);
}
