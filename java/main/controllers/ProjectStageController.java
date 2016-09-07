package main.controllers;

import main.Repositorys.*;
import main.models.*;
import main.models.DictionaryModels.ProjectStageType;
import main.models.Enum.JsonReturnCodes;
import main.models.Enum.ProjectStageMovementType;
import main.models.Enum.UserType;
import main.models.MovementTypes.ProjectStageMovement;
import main.models.Project.ProjectStage;
import main.models.UserManagement.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

/**
 * Created by kakha on 8/25/2016.
 */
@Controller
public class ProjectStageController {
    @RequestMapping("/createprojectstage")
    @ResponseBody
    public JsonMessage create(@CookieValue("projectSessionId") long sessionId,
                              @RequestParam(value = "name", required = true, defaultValue = "0") String name,
                              @RequestParam(value = "id", required = true, defaultValue = "0") long id,
                              @RequestParam(value = "typeId", required = true, defaultValue = "0") long typeId,
                              @RequestParam(value = "start", required = true, defaultValue = "") Date start,
                              @RequestParam(value = "end", required = true, defaultValue = "") Date end) {




        Session session=sessionRepository.findOne(sessionId);
        if(session.isIsactive()&&session.getUser().getType()== UserType.sa.getCODE()){
            ProjectStageType projectStageType=projectStageTypeRepository.findOne(typeId);
            ProjectStage projectStage=new ProjectStage(name,session.getUser(),
                    projectRepository.findOne(id),start,end,projectStageType);
            try {

                projectStageRepository.save(projectStage);
                ProjectStageMovement projectStageMovement=
                        new ProjectStageMovement(projectStage,
                                ProjectStageMovementType.Registered.getCODE(),"დარეგისტრირდა",session.getUser().getId());
                projectStageMovementRepository.save(projectStageMovement);
            } catch (Exception ex) {

                return new JsonMessage(JsonReturnCodes.ERROR.getCODE(), ex.toString());
            }
            return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "მომხმარებელი შეიქმნა წარმატებით");

        }else {
            return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(),"არ გაქვთ ამ მოქმედების შესრულების უფლება");
        }
    }
    @RequestMapping("/getprojectstages/{id}")
    @ResponseBody
    public List<ProjectStage> getProjectStages(@PathVariable("id") long id){
        return projectStageRepository.findByProjectOrderByCreateDateDesc(projectRepository.findOne(id));
    }

    private Pageable constructPageSpecification(int pageIndex) {
        Pageable pageSpecification = new PageRequest(pageIndex, 30);
        return pageSpecification;
    }



    @Autowired
    private ProjectStageMovementRepository projectStageMovementRepository;
    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private FilialRepository filialRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private ProjectStageRepository projectStageRepository;
    @Autowired
    private ProjectStageTypeRepository projectStageTypeRepository;
}
