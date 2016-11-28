package main.controllers.Lombard;

import main.Repositorys.Lombard.ClientsRepo;
import main.Repositorys.Lombard.LoanMovementsRepo;
import main.Repositorys.Lombard.LoanPaymentRepo;
import main.Repositorys.Lombard.LoanRepo;
import main.Repositorys.SessionRepository;
import main.models.Enum.JsonReturnCodes;
import main.models.Enum.UserType;
import main.models.JsonMessage;
import main.models.Lombard.Loan;
import main.models.Lombard.LoanPayment;
import main.models.Lombard.MovementModels.LoanMovement;
import main.models.Lombard.TypeEnums.LoanPaymentType;
import main.models.Lombard.TypeEnums.MovementTypes;
import main.models.UserManagement.Session;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by kaxa on 11/23/16.
 */
@Controller
public class LoanPaymentController {

    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private LoanPaymentRepo loanPaymentRepo;
    @Autowired
    private LoanRepo loanRepo;
    @Autowired
    private ClientsRepo clientsRepo;
    @Autowired
    private LoanMovementsRepo loanMovementsRepo;



    @RequestMapping("/makePayment")
    @ResponseBody
    public JsonMessage makePayment(@CookieValue("projectSessionId") long sessionId,long loanId,float sum,int paymentType){

        Session session=sessionRepository.findOne(sessionId);
        Loan loan=loanRepo.findOne(loanId);
        if(session.isIsactive()&
                session.getUser().getType()== UserType.lombardOperator.getCODE()&
                loan.getFilial().getId()==session.getUser().getFilial().getId()){
            try{


                if(paymentType==LoanPaymentType.FULL.getCODE()){
                    if(sum==loan.getSumForLoanClose()){
                        float sumForUse=sum;
                        sumForUse-=loan.getInterestSumLeft();

                        LoanPayment loanPayment = new LoanPayment(loan,loan.getInterestSumLeft(),LoanPaymentType.PERCENT.getCODE());
                        loan.getPayments().add(loanPayment);

                        LoanMovement loanMovement=new LoanMovement("პროცენტის გადახდა",MovementTypes.LOAN_PAYMENT_MADE_PERCENT.getCODE(),loan);
                        loanMovementsRepo.save(loanMovement);

                        LoanPayment loanPaymentPartial=new LoanPayment(loan,sumForUse,LoanPaymentType.PARTIAL.getCODE());
                        loanPaymentPartial.setUsedFully(true);
                        loanPaymentPartial.setUsedSum(loanPaymentPartial.getSum());
                        loan.getPayments().add(loanPaymentPartial);

                        loan=loanRepo.save(loan);

                        LoanMovement loanMovement2=new LoanMovement("ძირის დაფარვა",MovementTypes.LOAN_PAYMENT_MADE_PARTIAL.getCODE(),loan);
                        loanMovementsRepo.save(loanMovement2);

                        List<LoanPayment>payments=loan.getPayments();
                        loan.recalculateInterestPayments();
                        loanRepo.save(loan);
                    }else{

                    }

                }else{
                    LoanPayment loanPayment = new LoanPayment(loan,sum,paymentType);
                    loanPaymentRepo.save(loanPayment);
                    int movementType=(paymentType== LoanPaymentType.FULL.getCODE()? MovementTypes.LOAN_PAYMENT_MADE_FULL.getCODE():
                            (paymentType== LoanPaymentType.PARTIAL.getCODE()?MovementTypes.LOAN_PAYMENT_MADE_PARTIAL.getCODE():
                                    MovementTypes.LOAN_PAYMENT_MADE_PERCENT.getCODE()));
                    String movementText=(paymentType== LoanPaymentType.FULL.getCODE()? "სესხის სრულიად დაფარვა":
                            (paymentType== LoanPaymentType.PARTIAL.getCODE()?"სესხის ნაწილობრივი დაფარვა":
                                    "პროცენტის გადახდა"));
                    LoanMovement loanMovement=new LoanMovement(movementText,movementType,loan);
                    loanMovementsRepo.save(loanMovement);
                    loan=loanRepo.findOne(loan.getId());
                    loan.recalculateInterestPayments();
                    loanRepo.save(loan);
                }
                return new JsonMessage(JsonReturnCodes.Ok.getCODE(),"ok");
            }catch (Exception e){
                return new JsonMessage(JsonReturnCodes.ERROR.getCODE(),"error");
            }
        }else{
            return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(),"არ გაქვთ ამ მოქმედების უფლება");
        }



    }

    @RequestMapping("/filialpayments/{page}")
    @ResponseBody
    public Page<LoanPayment> getFilialPayments(@CookieValue("projectSessionId") long sessionId,
                                               @PathVariable("page")int page){
        Session session=sessionRepository.findOne(sessionId);
        return loanPaymentRepo.findFilialPayments(session.getUser().getFilial(),constructPageSpecification(page));
    }

    @RequestMapping("/getloanpayments/{id}")
    @ResponseBody
    public List<LoanPayment> getLoanPayment(@CookieValue("projectSessionId") long sessionId,
                                            @PathVariable("id")long id){
        Session session=sessionRepository.findOne(sessionId);

        return loanPaymentRepo.findByLoanAndActive(loanRepo.findOne(id),true);
    }




    private Pageable constructPageSpecification(int pageIndex) {
        Pageable pageSpecification = new PageRequest(pageIndex, 5);
        return pageSpecification;
    }
}
