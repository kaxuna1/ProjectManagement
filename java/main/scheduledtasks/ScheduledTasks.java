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

        Calendar cal = Calendar.getInstance(); // locale-specific
        cal.setTime(new Date());
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        long time = cal.getTimeInMillis();
        log.info(cal.getTime().toString());


        List<Loan> loanList=
                loanRepo.
                        findByIsActiveAndClosedAndNextInterestCalculationDateBetween(true,
                                false,
                                cal.getTime(),
                                new DateTime(cal.getTime().getTime()).plusDays(1).toDate());
        loanList.forEach(Loan::addInterest);
        loanRepo.save(loanList);
    }

    @Autowired
    private LoanRepo loanRepo;
}
