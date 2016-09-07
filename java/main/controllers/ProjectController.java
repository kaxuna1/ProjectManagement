package main.controllers;

import main.Repositorys.*;
import main.models.*;
import main.models.Enum.JsonReturnCodes;
import main.models.Enum.ProjectMovementType;
import main.models.Enum.UserType;
import main.models.MovementTypes.ProjectMovement;
import main.models.Project.Project;
import main.models.UserManagement.Session;
import main.models.UserManagement.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

/**
 * Created by kakha on 8/24/2016.
 */
@Controller
public class ProjectController {



    @RequestMapping("/createproject")
    @ResponseBody
    public JsonMessage create(@CookieValue("projectSessionId") long sessionId,
                              @RequestParam(value = "name", required = true, defaultValue = "") String name,
                              @RequestParam(value = "sak", required = true, defaultValue = "") String sak,
                              @RequestParam(value = "address", required = true, defaultValue = "") String address,
                              @RequestParam(value = "x", required = true, defaultValue = "") String x,
                              @RequestParam(value = "y", required = true, defaultValue = "") String y) {

        Session session=sessionRepository.findOne(sessionId);
        if(session.isIsactive()&&session.getUser().getType()== UserType.sa.getCODE()){
            Project project=new Project(name,sak, x,y,session.getUser(),address);
            try {

                projectRepository.save(project);
                ProjectMovement projectMovement=new ProjectMovement(project,
                        ProjectMovementType.Registered.getCODE(),"დარეგისტრირდა",session.getUser().getId());
                projectMovementRepository.save(projectMovement);
            } catch (Exception ex) {

                return new JsonMessage(JsonReturnCodes.ERROR.getCODE(), ex.toString());

            }

            return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "მომხმარებელი შეიქმნა წარმატებით");

        }else {
            return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(),"არ გაქვთ ამ მოქმედების შესრულების უფლება");
        }
    }
    @RequestMapping("/getprojects")
    @ResponseBody
    public Page<Project> getProducts(@CookieValue("projectSessionId") long sessionId, int index, String search) {
        Session session = sessionRepository.findOne(sessionId);
        return projectRepository.findByNameAndPage(search, constructPageSpecification(index));
    }

    @RequestMapping("/giveprojectprarab")
    @ResponseBody
    public JsonMessage mapOneActionToAnother(
            @CookieValue("projectSessionId") long sessionId,
            @RequestParam(value = "id1", required = true, defaultValue = "0") long id1,
            @RequestParam(value = "id2", required = true, defaultValue = "0") long id2) {

        Session session = sessionRepository.findOne(sessionId);
        if (session.isIsactive() && session.getUser().getType() == UserType.sa.getCODE()) {

            Project project=projectRepository.findOne(id1);
            User prarab=userRepository.findOne(id2);
            project.getPrarabs().add(prarab);
            project.setLastModifyDate(new Date());
            projectRepository.save(project);
            ProjectMovement movement=new ProjectMovement(project,ProjectMovementType.prarabAdded.getCODE(),
                    "პროექტზე დაინიშნა პრარაბი",session.getUser().getId());
            return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "ჩანაწერი დაკავშირდა წარმატებით");
        } else {
            return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(), "არ გაქვთ ამ მოქმედების შესრულების უფლება");
        }
    }
    @RequestMapping("/getprojectprarabs/{id}")
    @ResponseBody
    public List<User> getProejectPrarabs(@CookieValue("projectSessionId") long sessionId,@PathVariable("id") long id){
        return projectRepository.findOne(id).getPrarabs();
    }




    private Pageable constructPageSpecification(int pageIndex) {
        Pageable pageSpecification = new PageRequest(pageIndex, 30);
        return pageSpecification;
    }

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProjectMovementRepository projectMovementRepository;
    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private FilialRepository filialRepository;
    @Autowired
    private ProjectRepository projectRepository;

}
