package main.Repositorys.Lombard;

import main.models.Lombard.LoanInterest;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by kaxa on 11/24/16.
 */
public interface LoanInterestRepo extends JpaRepository<LoanInterest,Long> {
}
