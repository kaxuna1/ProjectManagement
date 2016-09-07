package main.controllers;

import main.Repositorys.*;
import main.models.Enum.JsonReturnCodes;
import main.models.Enum.ProjectMovementType;
import main.models.Enum.StoreHouseType;
import main.models.Enum.UserType;
import main.models.JsonMessage;
import main.models.MovementTypes.ProjectMovement;
import main.models.Project.Project;
import main.models.StoreHous.StoreHouse;
import main.models.StoreHous.StoreHouseBox;
import main.models.UserManagement.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by kaxa on 9/7/16.
 */
@Controller
public class StoreHouseController {

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
    @Autowired
    private StoreHouseRepository storeHouseRepository;
    @Autowired
    private StoreHouseBoxRepository storeHouseBoxRepository;
    @Autowired
    private CompanyItemMovementRepository companyItemMovementRepository;
    @Autowired
    private CompanyItemRepository companyItemRepository;




    @RequestMapping("/createstore")
    @ResponseBody
    public JsonMessage create(@CookieValue("projectSessionId") long sessionId,
                              @RequestParam(value = "name", required = true, defaultValue = "") String name,
                              @RequestParam(value = "address", required = true, defaultValue = "") String address,
                              @RequestParam(value = "type", required = true, defaultValue = "0") int type,
                              @RequestParam(value = "projectId", required = true, defaultValue = "0") long projectId) {

        Session session=sessionRepository.findOne(sessionId);
        if(session.isIsactive()&&session.getUser().getType()== UserType.sa.getCODE()){
            StoreHouse storeHouse=new StoreHouse(name,address,type);
            if(type== StoreHouseType.ProjectStore.getCODE()){
                Project project=projectRepository.findOne(projectId);
                storeHouse.setProject(project);
            }
            try {
                storeHouseRepository.save(storeHouse);
            } catch (Exception ex) {

                return new JsonMessage(JsonReturnCodes.ERROR.getCODE(), ex.toString());

            }

            return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "ჩანაწერი შეიქმნა წარმატებით");

        }else {
            return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(),"არ გაქვთ ამ მოქმედების შესრულების უფლება");
        }
    }


}
