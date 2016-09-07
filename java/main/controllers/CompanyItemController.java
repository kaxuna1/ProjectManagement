package main.controllers;

import main.Repositorys.*;
import main.models.Enum.CompanyItemMovementType;
import main.models.Enum.JsonReturnCodes;
import main.models.Enum.UserType;
import main.models.JsonMessage;
import main.models.MovementTypes.CompanyItemMovement;
import main.models.StoreHous.CompanyItem;
import main.models.StoreHous.StoreHouse;
import main.models.StoreHous.StoreHouseBox;
import main.models.UserManagement.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by kaxa on 9/7/16.
 */
@Controller
public class CompanyItemController {

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




    @RequestMapping("/createcompanyitem")
    @ResponseBody
    public JsonMessage create(@CookieValue("projectSessionId") long sessionId,
                              @RequestParam(value = "name", required = true, defaultValue = "") String name,
                              @RequestParam(value = "address", required = true, defaultValue = "") String barcode) {

        Session session=sessionRepository.findOne(sessionId);
        if(session.isIsactive()&&session.getUser().getType()== UserType.sa.getCODE()){
            CompanyItem companyItem=new CompanyItem(name,barcode);
            try {
                companyItemRepository.save(companyItem);
                CompanyItemMovement movement=new CompanyItemMovement(companyItem,
                        CompanyItemMovementType.Registered.getCODE(),
                        "დარეგისტრირდა",
                        session.getId());
                companyItemMovementRepository.save(movement);
            } catch (Exception ex) {

                return new JsonMessage(JsonReturnCodes.ERROR.getCODE(), ex.toString());

            }

            return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "ჩანაწერი შეიქმნა წარმატებით");

        }else {
            return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(),"არ გაქვთ ამ მოქმედების შესრულების უფლება");
        }
    }
    @RequestMapping("itemtostorehouse")
    @ResponseBody
    public JsonMessage assigneItemToStoreHouse(@CookieValue("projectSessionId") long sessionId,
                                               @RequestParam(value = "itemId", required = true, defaultValue = "0") long itemId,
                                               @RequestParam(value = "storeId", required = true, defaultValue = "0") long storeId){
        Session session=sessionRepository.findOne(sessionId);
        if(session.isIsactive()&&session.getUser().getType()== UserType.sa.getCODE()){
            StoreHouse storeHouse=storeHouseRepository.findOne(storeId);
            CompanyItem companyItem=companyItemRepository.findOne(itemId);
            List<StoreHouseBox> storeHouseBoxes=storeHouseBoxRepository.findByCompanyItemAndActive(companyItem,true);
            for(StoreHouseBox box: storeHouseBoxes){
                box.setActive(false);
                storeHouseBoxRepository.save(box);
            }
            StoreHouseBox box=new StoreHouseBox(storeHouse,companyItem);
            storeHouseBoxRepository.save(box);
            CompanyItemMovement movement=new CompanyItemMovement(companyItem,
                    CompanyItemMovementType.AsignedToStore.getCODE(),
                    "მიენიჭა საწყობს : "+(storeHouse.getName()),session.getUser().getId());
            companyItemMovementRepository.save(movement);
            return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "ჩანაწერი შეიქმნა წარმატებით");

        }  else {
            return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(),"არ გაქვთ ამ მოქმედების შესრულების უფლება");
        }
    }
    
}
