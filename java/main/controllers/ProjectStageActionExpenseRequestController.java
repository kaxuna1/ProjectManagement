package main.controllers;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import main.Functions.PermisionChecks;
import main.Repositorys.*;
import main.models.Enum.JsonReturnCodes;
import main.models.Enum.ProjectStageActionExpenseRequestMovementType;
import main.models.Enum.UserType;
import main.models.JsonMessage;
import main.models.MovementTypes.ProjectStageActionExpenseRequestMovement;
import main.models.Project.ProjectStage;
import main.models.Project.ProjectStageAction;
import main.models.Project.ProjectStageActionExpenseRequest;
import main.models.Project.ProjectStageActionExpenseRequestElement;
import main.models.RequestJsonModel;
import main.models.UserManagement.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by kakha on 9/5/2016.
 */
@Controller
public class ProjectStageActionExpenseRequestController {

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
    @Autowired
    private ProjectStageActionExpenseRequestRepository psaerr;
    @Autowired
    private ProjectStageActionExpenseRequestElementRepository psaerer;
    @Autowired
    private ProjectStageActionExpenseRequestMovementRepository projectStageActionExpenseRequestMovementRepository;


    @RequestMapping("/requestforaction")
    @ResponseBody
    public JsonMessage requestForAction(@CookieValue("projectSessionId") long sessionId,
                                        @RequestParam(value = "productRequests") String requests,
                                        long actionId, Date date) {
        Session session = sessionRepository.findOne(sessionId);
        if (session.isIsactive() && session.getUser().getType() == UserType.prarab.getCODE()) {
            ProjectStageAction action = projectStageActionRepository.findOne(actionId);
            if (PermisionChecks.checkIfProjectContainsPrarab(session.getUser(), action.getProjectStage().getProject())) {
                ProjectStageActionExpenseRequest request = new ProjectStageActionExpenseRequest(date, session.getUser(), action);
                try {
                    psaerr.save(request);
                    ProjectStageActionExpenseRequestMovement movement =
                            new ProjectStageActionExpenseRequestMovement(request,
                                    ProjectStageActionExpenseRequestMovementType.Registered.getCODE(),
                                    "დარეგისტირდა",
                                    session.getUser().getId());
                    projectStageActionExpenseRequestMovementRepository.save(movement);


                    JsonParser jsonParser = new JsonParser();
                    Gson gson = new Gson();
                    JsonArray jsonArray = jsonParser.parse(requests).getAsJsonArray();
                    for (int i = 0; i < jsonArray.size(); i++) {
                        RequestJsonModel requestJsonModel =
                                gson.fromJson(jsonParser.parse(jsonArray.get(i).getAsString()).getAsJsonObject(),
                                        RequestJsonModel.class);
                        ProjectStageActionExpenseRequestElement expenseRequestElement =
                                new ProjectStageActionExpenseRequestElement(elementRepository.findOne(requestJsonModel.getId()),
                                requestJsonModel.getSum(), request);
                        psaerer.save(expenseRequestElement);
                    }
                    return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "ჩანაწერი შეიქმნა წარმატებით");
                } catch (Exception e) {
                    return new JsonMessage(JsonReturnCodes.ERROR.getCODE(), "მოხდა შეცდომა ჩანაწერის გაკეთებისას");
                }

            } else {
                return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(),
                        "არ გაქვთ ამ პროექტისთვის მოთხოვნის გაკეთების უფლება");
            }
        } else {
            return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(), "არ გაქვთ ამ მოქმედების შესრულების უფლება");
        }
    }

    @RequestMapping("/acceptrequest")
    @ResponseBody
    public JsonMessage confirmRequest(@CookieValue("projectSessionId") long sessionId, long id) {
        Session session = sessionRepository.findOne(sessionId);
        if (session.isIsactive() && session.getUser().getType() == UserType.manager.getCODE()) {
            ProjectStageActionExpenseRequest request = psaerr.findOne(id);
            if (request.getStatus() == ProjectStageActionExpenseRequestMovementType.SentForRevision.getCODE()) {
                request.setStatus(ProjectStageActionExpenseRequestMovementType.Accapted.getCODE());
                request.setLastModifyDate(new Date());
                psaerr.save(request);
                ProjectStageActionExpenseRequestMovement movement =
                        new ProjectStageActionExpenseRequestMovement(request,
                                ProjectStageActionExpenseRequestMovementType.Accapted.getCODE(),
                                "დადასტურდა მენეჯერის მიერ",
                                session.getUser().getId());
                projectStageActionExpenseRequestMovementRepository.save(movement);
                return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "მოთხოვნა დადსტურდა");
            } else {
                return new JsonMessage(JsonReturnCodes.LOGICERROR.getCODE(),
                        "მოთხოვნის დადასტურება შეუძლებელია. ჯერ არ არის გამოგზავნილი");
            }


        } else {
            return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(), "არ გაქვთ ამ მოქმედების შესრულების უფლება");
        }

    }

    @RequestMapping("/declinerequest")
    @ResponseBody
    public JsonMessage declineRequest(@CookieValue("projectSessionId") long sessionId, long id) {
        Session session = sessionRepository.findOne(sessionId);
        if (session.isIsactive() && session.getUser().getType() == UserType.manager.getCODE()) {
            ProjectStageActionExpenseRequest request = psaerr.findOne(id);
            if (request.getStatus() == ProjectStageActionExpenseRequestMovementType.SentForRevision.getCODE()) {
                request.setStatus(ProjectStageActionExpenseRequestMovementType.Rejected.getCODE());
                request.setLastModifyDate(new Date());
                psaerr.save(request);
                ProjectStageActionExpenseRequestMovement movement =
                        new ProjectStageActionExpenseRequestMovement(request,
                                ProjectStageActionExpenseRequestMovementType.Rejected.getCODE(),
                                "უარყო მენეჯერის მიერ",
                                session.getUser().getId());
                projectStageActionExpenseRequestMovementRepository.save(movement);
                return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "მოთხოვნა უარყოფილია");
            } else {
                return new JsonMessage(JsonReturnCodes.LOGICERROR.getCODE(),
                        "მოთხოვნის უარყოფა შეუძლებელია. ჯერ არ არის გამოგზავნილი");
            }
        } else {
            return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(), "არ გაქვთ ამ მოქმედების შესრულების უფლება");
        }
    }

    @RequestMapping("/sendrequest")
    @ResponseBody
    public JsonMessage sendRequest(@CookieValue("projectSessionId") long sessionId, long id) {
        Session session = sessionRepository.findOne(sessionId);
        if (session.isIsactive() && session.getUser().getType() == UserType.manager.getCODE()) {
            ProjectStageActionExpenseRequest request = psaerr.findOne(id);
            if (request.getStatus() != ProjectStageActionExpenseRequestMovementType.SentForRevision.getCODE()&&
                    request.getStatus() != ProjectStageActionExpenseRequestMovementType.Accapted.getCODE()&&
                    PermisionChecks.checkIfProjectContainsPrarab(session.getUser(),
                            request.getProjectStageAction().getProjectStage().getProject())) {
                request.setStatus(ProjectStageActionExpenseRequestMovementType.SentForRevision.getCODE());
                request.setLastModifyDate(new Date());
                psaerr.save(request);
                ProjectStageActionExpenseRequestMovement movement =
                        new ProjectStageActionExpenseRequestMovement(request,
                                ProjectStageActionExpenseRequestMovementType.SentForRevision.getCODE(),
                                "გაგზავნილია დასადასტურებლად",
                                session.getUser().getId());
                projectStageActionExpenseRequestMovementRepository.save(movement);
                return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "გაგზავნილია დასადასტურებლად");
            } else {
                return new JsonMessage(JsonReturnCodes.LOGICERROR.getCODE(),
                        "მოთხოვნის გაგზავნა შეუძლებელია.");
            }
        } else {
            return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(), "არ გაქვთ ამ მოქმედების შესრულების უფლება");
        }
    }
    @RequestMapping("/getrequestsbyproject/{id}")
    @ResponseBody
    public List<ProjectStageActionExpenseRequest> getRequestsByProject(@PathVariable("id") long id){
        return psaerr.findByProject(id);
    }
    @RequestMapping("/getrequestsbyprojectstage/{id}")
    @ResponseBody
    public List<ProjectStageActionExpenseRequest> getRequestsByProjectStage(@PathVariable("id") long id){
        return psaerr.findByProjectStage(id);
    }
    @RequestMapping("/getrequestsbyprojectstageaction/{id}")
    @ResponseBody
    public List<ProjectStageActionExpenseRequest> getRequestsByProjectStageAction(@PathVariable("id") long id){
        return psaerr.findByProjectStageAction(id);
    }
}




































