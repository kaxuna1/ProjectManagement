package main.controllers;

import main.Repositorys.ElementRepository;
import main.Repositorys.ProjectStageTypeRepository;
import main.Repositorys.SessionRepository;
import main.models.DictionaryModels.Element;
import main.models.DictionaryModels.ProjectStageType;
import main.models.Enum.JsonReturnCodes;
import main.models.Enum.UserType;
import main.models.JsonMessage;
import main.models.Project.ProjectStage;
import main.models.UserManagement.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by kaxa on 9/8/16.
 */
@Controller
public class ProjectStageTypeController {
    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private ElementRepository elementRepository;
    @Autowired
    private ProjectStageTypeRepository projectStageTypeRepository;
    @RequestMapping("/createprojectstagetype")
    @ResponseBody
    public JsonMessage create(@CookieValue("projectSessionId") long sessionId,
                              @RequestParam(value = "name", required = true, defaultValue = "") String name)
    {

        Session session=sessionRepository.findOne(sessionId);
        if(session.isIsactive()&&session.getUser().getType()== UserType.sa.getCODE()){
            ProjectStageType projectStageType=new ProjectStageType(name);
            try {
                projectStageTypeRepository.save(projectStageType);
            } catch (Exception ex) {

                return new JsonMessage(JsonReturnCodes.ERROR.getCODE(), ex.toString());

            }

            return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "ჩანაწერი შეიქმნა წარმატებით");

        }else {
            return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(),"არ გაქვთ ამ მოქმედების შესრულების უფლება");
        }
    }
    @RequestMapping("/getprojectstagetypes")
    @ResponseBody
    public List<ProjectStageType> getProjectStageTypes(){
        return projectStageTypeRepository.findAll();
    }
}
