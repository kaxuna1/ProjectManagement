package main.scheduledtasks;

import main.Repositorys.Lombard.LoanRepo;
import main.models.Lombard.Loan;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.function.Consumer;

/**
 * Created by kakha on 12/29/2015.
 */
@Component
@Transactional
public class ScheduledTasks {
    private static final Logger log = LoggerFactory.getLogger(ScheduledTasks.class);

    @Scheduled(fixedRate = 5000)
    public void calculatePercentsForLoans() {
        List<Loan> loanList=loanRepo.findAll();
        loanList.forEach(new Consumer<Loan>() {
            @Override
            public void accept(Loan loan) {
                log.info(loan.getNumber()+" სესხი");
            }
        });
    }

    @Autowired
    private LoanRepo loanRepo;
}
