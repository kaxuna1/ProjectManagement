package main.Repositorys.Lombard;

import main.models.DictionaryModels.Filial;
import main.models.Lombard.Loan;
import main.models.Lombard.LoanPayment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by kaxa on 11/23/16.
 */
@Transactional
public interface LoanPaymentRepo extends JpaRepository<LoanPayment,Long>{
    List<LoanPayment> findByLoanAndActive(@Param("loan")Loan loan,@Param("active")boolean active);


    @Query("select lp from  LoanPayment lp join lp.loan l where l.filial = :filial")
    Page<LoanPayment> findFilialPayments(@Param("filial")Filial filial,Pageable pageable);
}
