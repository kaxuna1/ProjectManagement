package main.controllers.Lombard;

import main.Repositorys.FilialRepository;
import main.Repositorys.Lombard.LoanConditionsRepo;
import main.Repositorys.Lombard.LoanRepo;
import main.Repositorys.SessionRepository;
import main.models.DictionaryModels.Filial;
import main.models.Enum.JsonReturnCodes;
import main.models.JsonMessage;
import main.models.Lombard.Dictionary.LoanCondition;
import main.models.UserManagement.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by kaxa on 11/23/16.
 */
@Controller
public class LoanConditionController {
    @RequestMapping("/createcondition")
    @ResponseBody
    public JsonMessage createCondition(@CookieValue("projectSessionId") long sessionId,
                                       @RequestParam(value = "percent", required = true, defaultValue = "0") float percent,
                                       @RequestParam(value = "period", required = true, defaultValue = "0") int period,
                                       @RequestParam(value = "periodType", required = true, defaultValue = "0") int periodType,
                                       @RequestParam(value = "name", required = true, defaultValue = "NoName") String name,
                                       @RequestParam(value = "firstPercent", required = true, defaultValue = "0") float firstPercent) {
        Session session = sessionRepository.findOne(sessionId);
        if(session.isIsactive()){
            try {
                LoanCondition loanCondition = new LoanCondition(percent, period,
                        periodType, session.getUser().getFilial(),name,firstPercent);
                loanConditionsRepo.save(loanCondition);
            }catch (Exception e){
                return new JsonMessage(JsonReturnCodes.ERROR.getCODE(), "Error");
            }

            return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "ok");
        }else {
            return new JsonMessage(JsonReturnCodes.NOTLOGGEDIN.getCODE(), "არ ხართ სისტემაში შესული");
        }
    }
    @RequestMapping("/getconditions")
    @ResponseBody
    public List<LoanCondition> getFilialConditions(@CookieValue("projectSessionId") long sessionId){
        Session session=sessionRepository.findOne(sessionId);
        return loanConditionsRepo.findByFilialAndActive(session.getUser().getFilial(),true);
    }

    @Autowired
    private LoanRepo loanRepo;
    @Autowired
    private FilialRepository filialRepository;
    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private LoanConditionsRepo loanConditionsRepo;

}
