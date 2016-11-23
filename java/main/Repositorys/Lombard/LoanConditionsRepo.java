package main.Repositorys.Lombard;

import main.models.DictionaryModels.Filial;
import main.models.Lombard.Dictionary.LoanCondition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/**
 * Created by kaxa on 11/23/16.
 */
@Transactional
public interface LoanConditionsRepo extends JpaRepository<LoanCondition,Long> {
    List<LoanCondition> findByFilialAndActive(@Param("filial") Filial filial,@Param("active") boolean active);
}
