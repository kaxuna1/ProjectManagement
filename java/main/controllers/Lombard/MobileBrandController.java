package main.controllers.Lombard;

import main.Repositorys.Lombard.LaptopBrandRepo;
import main.Repositorys.Lombard.MobileBrandRepo;
import main.models.Lombard.Dictionary.LaptopBrand;
import main.models.Lombard.Dictionary.MobileBrand;
import main.models.Lombard.ItemClasses.Laptop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by kaxa on 11/19/16.
 */
@Controller
public class MobileBrandController {

    @ResponseBody
    @RequestMapping("/getbrends")
    public List<MobileBrand> get(){
        return mobileBrandRepo.findAll();
    }
    @ResponseBody
    @RequestMapping("/getlaptopbrends")
    public List<LaptopBrand> getLaptopBrands(){
        return laptopBrandRepo.findByActive(true);
    }


    @Autowired
    private LaptopBrandRepo laptopBrandRepo;
    @Autowired
    private MobileBrandRepo mobileBrandRepo;
}
