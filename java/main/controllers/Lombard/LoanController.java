package main.controllers.Lombard;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import main.Repositorys.Lombard.*;
import main.Repositorys.SessionRepository;
import main.models.Enum.JsonReturnCodes;
import main.models.Enum.UserType;
import main.models.JsonMessage;
import main.models.LoanCreateModel;
import main.models.Lombard.Client;
import main.models.Lombard.Dictionary.MobileBrand;
import main.models.Lombard.ItemClasses.MobilePhone;
import main.models.Lombard.Loan;
import main.models.Lombard.LoanInterest;
import main.models.Lombard.MovementModels.LoanMovement;
import main.models.Lombard.TypeEnums.LoanConditionPeryodType;
import main.models.Lombard.TypeEnums.MovementTypes;
import main.models.RequestJsonModel;
import main.models.UserManagement.Session;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

/**
 * Created by kaxa on 11/19/16.
 */
@Controller
public class LoanController {
    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private MobileBrandRepo mobileBrandRepo;
    @Autowired
    private MobilePhoneRepo mobilePhoneRepo;
    @Autowired
    private LoanRepo loanRepo;
    @Autowired
    private ClientsRepo clientsRepo;
    @Autowired
    private LoanMovementsRepo loanMovementsRepo;
    @Autowired
    private LoanConditionsRepo loanConditionsRepo;
    @Autowired
    private LoanInterestRepo loanInterestRepo;

    @RequestMapping("/getloan/{id}")
    @ResponseBody
    public Loan getLoan(@CookieValue("projectSessionId") long sessionId, @PathVariable("id") long id) {
        return loanRepo.findOne(id);
    }

    @RequestMapping("/getloans")
    @ResponseBody
    public Page<Loan> getLoans(@CookieValue("projectSessionId") long sessionId,
                               @RequestParam(value = "index", required = true, defaultValue = "0") int index,
                               @RequestParam(value = "search", required = true, defaultValue = "") String search) {
        Session session = sessionRepository.findOne(sessionId);
        return loanRepo.findMyFilialLoans(search, session.getUser().getFilial(), constructPageSpecification(index));
    }

    @RequestMapping("/getClientloans/{id}")
    @ResponseBody
    public List<Loan> getClientLoans(@CookieValue("projectSessionId") long sessionId, @PathVariable("id") long id) {
        Session session = sessionRepository.findOne(sessionId);
        return loanRepo.findClientLoans(id);
    }

    @RequestMapping("/createloan")
    @ResponseBody
    public JsonMessage createLoan(@CookieValue("projectSessionId") long sessionId,
                                  @RequestParam(value = "json") String jsonString) {

        Session session = sessionRepository.findOne(sessionId);

        if (session.isIsactive() & session.getUser().getType() == UserType.lombardOperator.getCODE()) {

            try {
                List<MobilePhone> mobilePhones = new ArrayList<>();
                float loanSum = 0;


                JsonParser jsonParser = new JsonParser();
                Gson gson = new Gson();
                JsonObject mainObject = jsonParser.parse(jsonString).getAsJsonObject();
                JsonObject clientObject = mainObject.getAsJsonObject("client");
                JsonArray mobiles = mainObject.getAsJsonArray("mobiles");

                long conditionId = mainObject.get("condition").getAsLong();
                long clientId = clientObject.get("id").getAsLong();
                for (int i = 0; i < mobiles.size(); i++) {
                    JsonObject mobile = mobiles.get(i).getAsJsonObject();
                    MobilePhone mobilePhoneTemp = new MobilePhone();
                    mobilePhoneTemp.setSum(mobile.get("sum").getAsFloat());
                    mobilePhoneTemp.setActive(true);
                    mobilePhoneTemp.setComment(mobile.get("comment").getAsString());
                    mobilePhoneTemp.setIMEI(mobile.get("imei").getAsString());
                    mobilePhoneTemp.setLoan(null);
                    mobilePhoneTemp.setModelName(mobile.get("model").getAsString());
                    mobilePhoneTemp.setMobileBrand(mobileBrandRepo.findOne(mobile.get("brand").getAsLong()));
                    mobilePhoneTemp.setNumber("1234321");
                    mobilePhones.add(mobilePhoneTemp);
                    loanSum += mobile.get("sum").getAsFloat();
                }
                Loan loan = new Loan(clientsRepo.findOne(clientId),
                        session.getUser().getFilial(), loanSum, session.getUser());
                loan.setNumber("234432");
                loan.setLoanCondition(loanConditionsRepo.findOne(conditionId));
                loanRepo.save(loan);
                final Loan finalLoan = loan;
                mobilePhones.forEach(new Consumer<MobilePhone>() {
                    @Override
                    public void accept(MobilePhone mobilePhone) {
                        mobilePhone.setLoan(finalLoan);
                    }
                });
                mobilePhoneRepo.save(mobilePhones);
                LoanMovement loanMovement = new LoanMovement("სესხი დარეგისტრირდა", MovementTypes.REGISTERED.getCODE(), loan);
                loanMovementsRepo.save(loanMovement);
                loan = addFirstInterest(loan);
                loanRepo.save(loan);
                LoanMovement loanMovementInterest = new LoanMovement("დაეკისრა პროცენტი "
                        + loan.getInterestSum() + "ლარი"
                        , MovementTypes.LOAN_INTEREST_GENERATED.getCODE(), loan);
                loanMovementsRepo.save(loanMovementInterest);

                return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "ok");
            } catch (Exception e) {
                return new JsonMessage(JsonReturnCodes.ERROR.getCODE(), "პრობლემა მოხდა სესხის რეგისტრაციის დროს");
            }

        } else {
            return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(), "permission problem");
        }


    }

    private Loan addFirstInterest(Loan loan) {
        DateTime dateTime = new DateTime(loan.getCreateDate());
        DateTime dueDate = new DateTime();
        if (loan.getLoanCondition().getPeriodType() == LoanConditionPeryodType.DAY.getCODE())
            dueDate = dateTime.plusDays(loan.getLoanCondition().getPeriod());
        else if (loan.getLoanCondition().getPeriodType() == LoanConditionPeryodType.WEEK.getCODE())
            dueDate = dateTime.plusWeeks(loan.getLoanCondition().getPeriod());
        else
            dueDate = dateTime.plusMonths(loan.getLoanCondition().getPeriod());

        LoanInterest loanInterest = new LoanInterest(loan, loan.getInterestSum(), loan.getLoanCondition().getPercent(), dueDate.toDate());

        loanInterestRepo.save(loanInterest);

        loan.setNextInterestCalculationDate(dateTime.toDate());

        return loan;
    }

    @RequestMapping("/getloansmovements/{id}")
    @ResponseBody
    public List<LoanMovement> getLoansMovements(@CookieValue("projectSessionId") long sessionId, @PathVariable("id") long id) {
        Session session = sessionRepository.findOne(sessionId);
        Loan loan = loanRepo.findOne(id);
        return loanMovementsRepo.findByLoan(loan);
    }

    private Pageable constructPageSpecification(int pageIndex) {
        Pageable pageSpecification = new PageRequest(pageIndex, 5);
        return pageSpecification;
    }

}
