package main.controllers;

import main.Repositorys.ElementRepository;
import main.Repositorys.SessionRepository;
import main.models.*;
import main.models.DictionaryModels.Element;
import main.models.Enum.JsonReturnCodes;
import main.models.Enum.UserType;
import main.models.UserManagement.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by kaxa on 9/2/16.
 */
@Controller
public class ElementController {
    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private ElementRepository elementRepository;


    @RequestMapping("/createelement")
    @ResponseBody
    public JsonMessage create(@CookieValue("projectSessionId") long sessionId,
                              @RequestParam(value = "name", required = true, defaultValue = "") String name,
                              @RequestParam(value = "bar", required = true, defaultValue = "") String bar)
    {

        Session session=sessionRepository.findOne(sessionId);
        if(session.isIsactive()&&session.getUser().getType()== UserType.sa.getCODE()){

            Element element=new Element(name,bar);
            try {
                elementRepository.save(element);

            } catch (Exception ex) {

                return new JsonMessage(JsonReturnCodes.ERROR.getCODE(), ex.toString());

            }

            return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "ჩანაწერი შეიქმნა წარმატებით");

        }else {
            return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(),"არ გაქვთ ამ მოქმედების შესრულების უფლება");
        }
    }
    @RequestMapping("/getelements")
    @ResponseBody
    public List<Element> getElements(){
        return elementRepository.findByActive(true);
    }
    @RequestMapping("/deleteelement")
    @ResponseBody
    public boolean deleteProduct(@CookieValue("projectSessionId") long sessionId, long id){
        try{
            Session session=sessionRepository.findOne(sessionId);
            if(session.getUser().getType()== UserType.sa.getCODE()||session.getUser().getType()==UserType.admin.getCODE()){
                Element element=elementRepository.findOne(id);
                element.setActive(false);
                elementRepository.save(element);
            }
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }

        return true;
    }



}
