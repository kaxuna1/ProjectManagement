package main.controllers;

import main.Repositorys.*;
import main.models.*;
import main.models.DictionaryModels.Element;
import main.models.Enum.JsonReturnCodes;
import main.models.Enum.ProjectStageActionExpenseMovementType;
import main.models.Enum.UserType;
import main.models.MovementTypes.ProjectStageActionExpenseMovement;
import main.models.Project.Project;
import main.models.Project.ProjectStage;
import main.models.Project.ProjectStageAction;
import main.models.Project.ProjectStageActionExpense;
import main.models.UserManagement.Session;
import main.models.chartDataModels.ColumnChartKeyValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * Created by kaxa on 9/3/16.
 */
@Controller
public class ProjectStageActionExpansesController {
    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private ProjectStageActionRepository projectStageActionRepository;
    @Autowired
    private ProjectStageRepository projectStageRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private ProjectStageActionMovementRepository projectStageActionMovementRepository;
    @Autowired
    private ProjectStageActionExpenseRepository projectStageActionExpenseRepository;
    @Autowired
    private ElementRepository elementRepository;
    @Autowired
    private ProjectStageActionExpenseMovementRepository projectStageActionExpenseMovementRepository;

    @RequestMapping("/createxpanse")
    @ResponseBody
    public JsonMessage create(@CookieValue("projectSessionId") long sessionId,
                              @RequestParam(value = "a", required = true, defaultValue = "0") long a,
                              @RequestParam(value = "e", required = true, defaultValue = "0") long e,
                              @RequestParam(value = "q", required = true, defaultValue = "0") float q,
                              @RequestParam(value = "p", required = true, defaultValue = "0") float p) {



        Session session=sessionRepository.findOne(sessionId);
        if(session.isIsactive()&&session.getUser().getType()== UserType.sa.getCODE()){
            try {
                ProjectStageAction projectStageAction=projectStageActionRepository.findOne(a);
                projectStageAction.setLastModifyDate(new Date());
                projectStageActionRepository.save(projectStageAction);
                Element element = elementRepository.findOne(e);
                ProjectStageActionExpense projectStageActionExpense=
                        new ProjectStageActionExpense(element,q,p,projectStageAction);
                projectStageActionExpenseRepository.save(projectStageActionExpense);
                ProjectStageActionExpenseMovement expenseMovement=
                        new ProjectStageActionExpenseMovement(projectStageActionExpense,
                        ProjectStageActionExpenseMovementType.Registered.getCODE(),
                                "დარეგისტრირდა",session.getUser().getId());
                projectStageActionExpenseMovementRepository.save(expenseMovement);

            } catch (Exception ex) {

                return new JsonMessage(JsonReturnCodes.ERROR.getCODE(), ex.toString());
            }
            return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "ჩანაწერი შეიქმნა წარმატებით");

        }else {
            return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(),
                    "არ გაქვთ ამ მოქმედების შესრულების უფლება");
        }
    }

    @RequestMapping("/getexpenses/{id}")
    @ResponseBody
    List<ProjectStageActionExpense> getExpenses(@CookieValue("projectSessionId") long sessionId,
                                                @PathVariable("id") long id){
        List<ProjectStageActionExpense> list=new ArrayList<>();
        try{
            ProjectStageAction projectStageAction=projectStageActionRepository.findOne(id);
            list=projectStageActionExpenseRepository.findByProjectStageActionAndActiveOrderByCreateDateDesc(
                    projectStageAction,true);

        }catch (Exception e){
            e.printStackTrace();
        }

        return list;
    }
    @RequestMapping("/getstageexpanses/{id}")
    @ResponseBody
    List<ProjectStageActionExpense> getStageExpenses(@CookieValue("projectSessionId") long sessionId,
                                                @PathVariable("id") long id){
        ProjectStage stage=projectStageRepository.findOne(id);
       /* for(int i=0;i<stage.getProjectStageActions().size();i++){
            list.addAll(stage.getProjectStageActions().get(i).getProjectStageActionExpenses());
        }*/
        return projectStageActionExpenseRepository.findByProjectStageAndActiveOrderByCreateDateDesc(stage,true);
    }
    @RequestMapping("/getprojectexpanses/{id}")
    @ResponseBody
    List<ProjectStageActionExpense> getProjectExpenses(@CookieValue("projectSessionId") long sessionId,
                                                     @PathVariable("id") long id){

        Project project=projectRepository.findOne(id);

        return projectStageActionExpenseRepository.findByProjectAndActiveOrderByCreateDateDesc(project,true);
    }
    @RequestMapping("/projectexpansescolumnchart/{id}")
    @ResponseBody
    HashMap<Long,ColumnChartKeyValue> getProjectExpansesPieChartData(@CookieValue("projectSessionId") long sessionId,
                                                                     @PathVariable("id") long id){
        HashMap<Long,ColumnChartKeyValue> hashMap=new HashMap<>();
        List<ProjectStageActionExpense> list=getProjectExpenses(sessionId,id);
        for(ProjectStageActionExpense expense:list){
            if(!hashMap.containsKey(expense.getElement().getId())){
                ColumnChartKeyValue value=new ColumnChartKeyValue(expense.getElement().getName(),(expense.getPrice()*expense.getQuantity()));
                hashMap.put(expense.getElement().getId(),value);
            }else{
                ColumnChartKeyValue value=hashMap.get(expense.getElement().getId());
                value.setSum(value.getSum()+(expense.getQuantity()*expense.getPrice()));
                hashMap.put(expense.getElement().getId(),value);
            }
        }

        return hashMap;

    }
}




















