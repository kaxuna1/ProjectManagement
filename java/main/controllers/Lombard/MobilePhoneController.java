package main.controllers.Lombard;

import main.Repositorys.Lombard.LoanRepo;
import main.Repositorys.Lombard.MobileBrandRepo;
import main.Repositorys.Lombard.MobileModelRepo;
import main.Repositorys.Lombard.MobilePhoneRepo;
import main.Repositorys.SessionRepository;
import main.models.Enum.JsonReturnCodes;
import main.models.Enum.UserType;
import main.models.JsonMessage;
import main.models.Lombard.Dictionary.MobileBrand;
import main.models.Lombard.ItemClasses.Laptop;
import main.models.Lombard.ItemClasses.MobilePhone;
import main.models.Lombard.Loan;
import main.models.Lombard.ReturnedCombinedModels.ReturnCombinedModel;
import main.models.UserManagement.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by kaxa on 11/19/16.
 */
@Controller
public class MobilePhoneController {
    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private MobileModelRepo mobileModelRepo;
    @Autowired
    private LoanRepo loanRepo;
    @Autowired
    private MobilePhoneRepo mobilePhoneRepo;
    @Autowired
    private MobileBrandRepo mobileBrandRepo;
    @ResponseBody
    @RequestMapping("/createMobilePhone")
    public JsonMessage create(@CookieValue("projectSessionId") long sessionId,
                              @RequestParam(value = "imei", required = true, defaultValue = "") String imei,
                              @RequestParam(value = "brand", required = true, defaultValue = "") long brand,
                              @RequestParam(value = "comment", required = true, defaultValue = "") String comment,
                              @RequestParam(value = "model", required = true, defaultValue = "") String model,
                              @RequestParam(value = "loan", required = true, defaultValue = "") long loan,
                              @RequestParam(value = "sum", required = true, defaultValue = "0") float sum){
        Session session=sessionRepository.findOne(sessionId);
        if(session.isIsactive()&&
                (session.getUser().getType()== UserType.lombardOperator.getCODE()
                        ||session.getUser().getType()== UserType.lombardManager.getCODE())){
            try {
                MobilePhone mobilePhone=new MobilePhone(imei,mobileBrandRepo.findOne(brand),loanRepo.findOne(loan),comment,model,sum);
                mobilePhoneRepo.save(mobilePhone);
            }catch (Exception e){
                e.printStackTrace();
                return new JsonMessage(JsonReturnCodes.ERROR.getCODE(), e.toString());
            }
            return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "კლიენტი შეიქმნა წარმატებით");




        }else {
            return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(),"არ გაქვთ ამ მოქმედების შესრულების უფლება");
        }

    }
    @RequestMapping("/getLoanPhones")
    @ResponseBody
    public ReturnCombinedModel getLoanPhones(@CookieValue("projectSessionId") long sessionId,
                                             @RequestParam(value = "loan", required = true, defaultValue = "0") long loan){
        Session session = sessionRepository.findOne(sessionId);
        Loan loanObj = loanRepo.findOne(loan);
        ReturnCombinedModel returnCombinedModel=new ReturnCombinedModel(loanObj.getMobilePhones(),loanObj.getLaptops());
        return returnCombinedModel;
    }
    @RequestMapping("/getFilialPhones")
    @ResponseBody
    public Page<MobilePhone> getMyFilialPhones(@CookieValue("projectSessionId") long sessionId, int index){
        Session session = sessionRepository.findOne(sessionId);

        return mobilePhoneRepo.findForMyFilialByIndex(session.getUser().getFilial(),constructPageSpecification(index));
    }
    private Pageable constructPageSpecification(int pageIndex) {
        Pageable pageSpecification = new PageRequest(pageIndex, 1);
        return pageSpecification;
    }
}
