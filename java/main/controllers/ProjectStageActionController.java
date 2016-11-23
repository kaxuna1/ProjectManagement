package main.controllers;

import main.Repositorys.*;
import main.models.*;
import main.models.Enum.*;
import main.models.MovementTypes.ProjectMovement;
import main.models.MovementTypes.ProjectStageActionMovement;
import main.models.MovementTypes.ProjectStageMovement;
import main.models.Project.Project;
import main.models.Project.ProjectStage;
import main.models.Project.ProjectStageAction;
import main.models.UserManagement.Session;
import main.models.UserManagement.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by kaxa on 9/2/16.
 */
@Controller
public class ProjectStageActionController {
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
    private ProjectMovementRepository projectMovementRepository;

    @RequestMapping("/createaction")
    @ResponseBody
    public JsonMessage create(@CookieValue("projectSessionId") long sessionId,
                              @RequestParam(value = "name", required = true, defaultValue = "0") String name,
                              @RequestParam(value = "id", required = true, defaultValue = "0") long id) {


        Session session = sessionRepository.findOne(sessionId);
        if (session.isIsactive() && session.getUser().getType() == UserType.sa.getCODE()) {


            try {
                ProjectStage projectStage = projectStageRepository.findOne(id);
                projectStage.setLastModifyDate(new Date());
                projectStage.getProject().setLastModifyDate(new Date());
                projectStageRepository.save(projectStage);
                projectRepository.save(projectStage.getProject());
                ProjectStageAction projectStageAction = new ProjectStageAction(name, projectStage);
                projectStageActionRepository.save(projectStageAction);
                ProjectStageActionMovement projectStageActionMovement =
                        new ProjectStageActionMovement(projectStageAction,
                                ProjectStageActionMovementType.Registered.getCODE(),
                                "დარეგისტრირდა",session.getUser().getId());
                projectStageActionMovementRepository.save(projectStageActionMovement);

            } catch (Exception ex) {

                return new JsonMessage(JsonReturnCodes.ERROR.getCODE(), ex.toString());
            }
            return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "ჩანაწერი შეიქმნა წარმატებით");

        } else {
            return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(), "არ გაქვთ ამ მოქმედების შესრულების უფლება");
        }
    }

    @ResponseBody
    @RequestMapping("/getactions")
    List<ProjectStageAction> getActions(@CookieValue("projectSessionId") long sessionId, long id, int type) {
        List<ProjectStageAction> projectStageActions = new ArrayList<>();
        Session session = sessionRepository.findOne(sessionId);
        User user = session.getUser();
        ProjectStage projectStage = projectStageRepository.findOne(id);
        if (type == 0) {
            projectStageActions = projectStageActionRepository.findByProjectStageAndActiveOrderByCreateDateDesc(projectStage, true);
        }
        return projectStageActions;
    }

    @RequestMapping("/maponeactiontoanother")
    @ResponseBody
    public JsonMessage mapOneActionToAnother(
            @CookieValue("projectSessionId") long sessionId,
            @RequestParam(value = "id1", required = true, defaultValue = "0") long id1,
            @RequestParam(value = "id2", required = true, defaultValue = "0") long id2) {

        //id1-ის მშობლად ინიშნება id2
        Session session = sessionRepository.findOne(sessionId);
        if (session.isIsactive() && session.getUser().getType() == UserType.sa.getCODE()) {

            ProjectStageAction action1 = projectStageActionRepository.findOne(id1);
            ProjectStageAction action2 = projectStageActionRepository.findOne(id2);
            action1.getList1().add(action2);
            projectStageActionRepository.save(action1);
            return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "ჩანაწერი დაკავშირდა წარმატებით");
        } else {
            return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(), "არ გაქვთ ამ მოქმედების შესრულების უფლება");
        }
    }

    @RequestMapping("/getactionparents")
    @ResponseBody
    public List<ProjectStageAction> getActionParents(long id) {
        //list1 ინახავს მშობლებს.
        return projectStageActionRepository.findOne(id).getList1();
    }

    @RequestMapping("/startaction")
    @ResponseBody
    public JsonMessage startaction(@CookieValue("projectSessionId") long sessionId,long id) {
        Session session=sessionRepository.findOne(sessionId);
        ProjectStageAction action = projectStageActionRepository.findOne(id);
        boolean parentFinished = true;
        for (int i = 0; i < action.getList1().size(); i++) {
            if (action.getList1().get(i).getStatus() != ProjectStageActionMovementType.finishedByPrarab.getCODE()) {
                parentFinished = false;
            }
        }
        if (parentFinished) {
            if (action.getStatus() != ProjectStageActionMovementType.inProgress.getCODE()) {
                action.setStatus(ProjectStageActionMovementType.inProgress.getCODE());
                action.setLastModifyDate(new Date());
                action.getProjectStage().setLastModifyDate(new Date());
                action.getProjectStage().getProject().setLastModifyDate(new Date());
                projectStageActionRepository.save(action);
                ProjectStageActionMovement movement = new ProjectStageActionMovement(action,
                        ProjectStageActionMovementType.inProgress.getCODE(),
                        "დაწყებულია მუშაობა",session.getUser().getId());
                projectStageActionMovementRepository.save(movement);
                return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "ჩანაწერი განახლდა წარმატებით");
            } else {
                return new JsonMessage(JsonReturnCodes.ACTIONALLREADYINPROGRESS.getCODE(), "მოქმედების უკვე დაწყებულია");
            }

        } else {
            return new JsonMessage(JsonReturnCodes.PARENTNOTFINISHED.getCODE(), "მოქმედების დაწყება არ შეიძლება იერარქიულად");
        }
    }

    @RequestMapping("/finishaction/{id}")
    @ResponseBody
    public JsonMessage finishAction(@CookieValue("projectSessionId") long sessionId, @PathVariable("id") long id) {
        Session session = sessionRepository.findOne(sessionId);
        if (session.isIsactive() && (session.getUser().getType() == UserType.prarab.getCODE()||
                session.getUser().getType() == UserType.sa.getCODE())) {
            ProjectStageAction action=projectStageActionRepository.findOne(id);
            if(action.getStatus()!=ProjectStageActionMovementType.inProgress.getCODE())
                return new JsonMessage(JsonReturnCodes.ACTIONOTINPROGRESS.getCODE(),
                        "მოქმედება ჯერ არ დაწყებულა");
            if(session.getUser().getType() == UserType.sa.getCODE()){
                action.setStatus(ProjectStageActionMovementType.finishedByPrarab.getCODE());
                try {
                    action.setLastModifyDate(new Date());
                    action.getProjectStage().setLastModifyDate(new Date());
                    action.getProjectStage().getProject().setLastModifyDate(new Date());
                    projectStageActionRepository.save(action);
                    ProjectStageActionMovement movement=new ProjectStageActionMovement(action,
                            ProjectStageActionMovementType.finishedByPrarab.getCODE(),"მოქმედება შეასრულა ადმინისტრატორმა",
                            session.getUser().getId());
                    projectStageActionMovementRepository.save(movement);
                    return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "ჩანაწერი განახლდა წარმატებით");
                }catch (Exception e){
                    e.printStackTrace();
                    return new JsonMessage(JsonReturnCodes.ERROR.getCODE(), "მოხმდა შეცდომა ჩანაწერის ცვლილების დროს");
                }

            }else{
                Project project=action.getProjectStage().getProject();
                List<User> prarabs=project.getPrarabs();
                if(prarabs.contains(session.getUser())){
                    action.setStatus(ProjectStageActionMovementType.finishedByPrarab.getCODE());
                    action.setLastModifyDate(new Date());
                    action.getProjectStage().setLastModifyDate(new Date());
                    action.getProjectStage().getProject().setLastModifyDate(new Date());
                    try {
                        projectStageActionRepository.save(action);
                        ProjectStageActionMovement movement=new ProjectStageActionMovement(action,
                                ProjectStageActionMovementType.finishedByPrarab.getCODE(),"მოქმედება შეასრულა პრარაბმა",
                                session.getUser().getId());
                        projectStageActionMovementRepository.save(movement);
                        return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "ჩანაწერი განახლდა წარმატებით");
                    }catch (Exception e){
                        e.printStackTrace();
                        return new JsonMessage(JsonReturnCodes.ERROR.getCODE(), "მოხმდა შეცდომა ჩანაწერის ცვლილების დროს");
                    }

                }else{
                    return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(),
                            "არ გაქვთ უფლება მითითებულ მოქმედების პროექტზე შეასრულოთ ცვლილება!!!");
                }
            }

        }else{
            return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(),
                    "არ გაქვთ ამ მოქმედების შესრულების უფლება");
        }
    }
    @RequestMapping("/sendactiontoprarab/{id}")
    @ResponseBody
    public JsonMessage sendActionToPrarab(@CookieValue("projectSessionId") long sessionId, @PathVariable("id") long id){
        Session session = sessionRepository.findOne(sessionId);
        if (session.isIsactive() && (session.getUser().getType() == UserType.manager.getCODE()||
                session.getUser().getType() == UserType.sa.getCODE())) {
            ProjectStageAction action=projectStageActionRepository.findOne(id);
            if(action.getStatus()==ProjectStageActionMovementType.Registered.getCODE()){
                action.setStatus(ProjectStageActionMovementType.sentToPrarab.getCODE());
                action.setLastModifyDate(new Date());
                action.getProjectStage().setLastModifyDate(new Date());
                action.getProjectStage().getProject().setLastModifyDate(new Date());
                if(action.getProjectStage().getProject().getStatus()== ProjectMovementType.Registered.getCODE()){
                    action.getProjectStage().getProject().setStatus(ProjectMovementType.InProgress.getCODE());
                    ProjectMovement projectMovement=new ProjectMovement(action.getProjectStage().getProject(),
                            ProjectMovementType.InProgress.getCODE(),"დაიწყო პრეოქტი",session.getUser().getId());
                    projectMovementRepository.save(projectMovement);
                }
                if(action.getProjectStage().getCurrentStatus()== ProjectStageMovementType.Registered.getCODE()){
                    action.getProjectStage().setCurrentStatus(ProjectStageMovementType.Started.getCODE());
                    ProjectStageMovement projectStageMovement=new ProjectStageMovement(action.getProjectStage(),
                            ProjectStageMovementType.Started.getCODE(),"დაიწყო ეტაპი",session.getUser().getId());
                }
                try {
                    projectStageActionRepository.save(action);
                    ProjectStageActionMovement movement=new ProjectStageActionMovement(action,
                            ProjectStageActionMovementType.sentToPrarab.getCODE(),"გადაიგზავნა პრარაბთან",
                            session.getUser().getId());
                    projectStageActionMovementRepository.save(movement);




                    return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "ჩანაწერი განახლდა წარმატებით");
                }catch (Exception e){
                    e.printStackTrace();
                    return new JsonMessage(JsonReturnCodes.ERROR.getCODE(), "მოხმდა შეცდომა ჩანაწერის ცვლილების დროს");
                }
            }else{
                return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(),
                        "არ გაქვთ ამ მოქმედების შესრულების უფლება");
            }

        }else {
            return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(),
                    "არ გაქვთ ამ მოქმედების შესრულების უფლება");
        }
    }
    @RequestMapping("/projectactiveactions/{id}")
    @ResponseBody
    public List<ProjectStageAction> getProjectActiveActions(@CookieValue("projectSessionId") long sessionId,
                                                            @PathVariable("id") long id){
        return projectStageActionRepository.findActiveForMainPageByProject(id);
    }
    @RequestMapping("/projectswithactionforhierarchytree/{id}")
    @ResponseBody
    public List<ProjectStageAction> projectsWithActions(@CookieValue("projectSessionId") long sessionId,
                                                        @PathVariable("id") long id){
        return projectStageActionRepository.findActiveForHierarchy(id);
    }
    @RequestMapping("/getprojectactionsforprarab/{id}")
    @ResponseBody
    public List<ProjectStageAction> getprojectactionsforprarab(@CookieValue("projectSessionId") long sessionId,
                                                               @PathVariable("id") long id){
        return projectStageActionRepository.findByProjectForPrarab(id);
    }
    @RequestMapping("/getstageactionsforprarab/{id}")
    @ResponseBody
    public List<ProjectStageAction> getstageactionsforprarab(@CookieValue("projectSessionId") long sessionId,
                                                               @PathVariable("id") long id){

        return projectStageActionRepository.findStageActionsForPrarab(id);
    }
}
