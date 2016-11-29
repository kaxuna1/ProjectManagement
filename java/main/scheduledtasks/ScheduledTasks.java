package main.scheduledtasks;

import main.Repositorys.Lombard.LoanRepo;
import main.models.Lombard.Loan;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Created by kakha on 12/29/2015.
 */
@Component
@Transactional
public class ScheduledTasks {
    private static final Logger log = LoggerFactory.getLogger(ScheduledTasks.class);

    @Scheduled(cron = "* * * * * *")
    public void calculatePercentsForLoans() {


        Calendar calendar = new Calendar.Builder().build();
        calendar.setTime(new Date());
        log.info(calendar.getTime().toString());


        List<Loan> loanList=loanRepo.findByNextInterestCalculationDateAndIsActiveAndClosed(new Date(),true,false);
    }

    @Autowired
    private LoanRepo loanRepo;
}
