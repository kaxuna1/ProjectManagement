package main.Repositorys.Lombard;

import main.models.DictionaryModels.Filial;
import main.models.Lombard.Loan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Temporal;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.TemporalType;
import java.util.Date;
import java.util.List;

/**
 * Created by kaxa on 11/17/16.
 */

@Transactional
public interface LoanRepo extends JpaRepository<Loan,Long> {


    @Query(value = "select l from Loan l join l.filial f where f=:filial " +
            "and l.closed=:closed and l.isActive=true order by l.createDate desc")
    Page<Loan> findMyFilialLoans(@Param("filial") Filial filial,@Param("closed") boolean closed, Pageable pageable);

    @Query(value = "select l from Loan l join l.filial f join l.client c where f=:filial " +
            "and l.isActive=true and l.closed=:closed and ( l.number  LIKE CONCAT('%',:search,'%') or c.personalNumber LIKE CONCAT('%',:search,'%')) order by l.createDate desc")
    Page<Loan> findMyFilialLoansWithSearch(@Param("search") String search,
                                           @Param("filial") Filial filial,@Param("closed") boolean closed, Pageable pageable);


    @Query(value = "select l from Loan l join l.client c where c.id=:id order by l.createDate desc")
    List<Loan> findClientLoans(@Param("id")long id);

    List<Loan> findByNextInterestCalculationDateAndIsActiveAndClosed(@Temporal(TemporalType.DATE)Date nextInterestCalculationDate,
                                                                     boolean active, boolean closed);
}
