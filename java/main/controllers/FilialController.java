package main.controllers;

import main.Repositorys.FilialRepository;
import main.Repositorys.SessionRepository;
import main.models.Enum.UserType;
import main.models.DictionaryModels.Filial;
import main.models.UserManagement.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/*
 * Created by kakha on 11/25/2015.
 */
@Controller
public class FilialController {

    @RequestMapping("/createfilial")
    @ResponseBody
    public Filial createFilial(String name,String address){
        Filial filial=new Filial(name,address);
        filialRepository.save(filial);
        return filial;
    }

    @RequestMapping("/getfilials")
    @ResponseBody
    public List<Filial> getFilials(){
        return filialRepository.findAll();
    }


    @RequestMapping("/deletefilial")
    @ResponseBody
    public boolean deleteProduct(@CookieValue("projectSessionId") long sessionId, long id){
        try{
            Session session=sessionRepository.findOne(sessionId);
            int k=4;
            if(session.getUser().getType()== UserType.sa.getCODE()||session.getUser().getType()==UserType.admin.getCODE()){
                filialRepository.delete(id);
            }
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }

        return true;
    }






    private Pageable constructPageSpecification(int pageIndex) {
        Pageable pageSpecification = new PageRequest(pageIndex, 10);
        return pageSpecification;
    }
    @Autowired
    SessionRepository sessionRepository;
    @Autowired
    FilialRepository filialRepository;
}
