package main.controllers.Lombard;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.zxing.MultiFormatWriter;
import main.Repositorys.Lombard.*;
import main.Repositorys.SessionRepository;
import main.Services.Service1;
import main.StaticData;
import main.models.Enum.JsonReturnCodes;
import main.models.Enum.UserType;
import main.models.JsonMessage;
import main.models.Lombard.ItemClasses.Uzrunvelyofa;
import main.models.Lombard.Loan;
import main.models.Lombard.LoanInterest;
import main.models.Lombard.MovementModels.LoanMovement;
import main.models.Lombard.TypeEnums.MovementTypes;
import main.models.Lombard.TypeEnums.UzrunvelyofaStatusTypes;
import main.models.Lombard.TypeEnums.UzrunvelyofaTypes;
import main.models.UserManagement.Session;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.function.BiConsumer;

/**
 * Created by kaxa on 11/19/16.
 */
@Controller
public class LoanController {
    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private MobileBrandRepo mobileBrandRepo;
    @Autowired
    private MobilePhoneRepo mobilePhoneRepo;
    @Autowired
    private LoanRepo loanRepo;
    @Autowired
    private ClientsRepo clientsRepo;
    @Autowired
    private LoanMovementsRepo loanMovementsRepo;
    @Autowired
    private LoanConditionsRepo loanConditionsRepo;
    @Autowired
    private LoanInterestRepo loanInterestRepo;
    @Autowired
    private Service1 service1;
    @Autowired
    private LaptopBrandRepo laptopBrandRepo;
    @Autowired
    private LaptopRepo laptopRepo;
    @Autowired
    private BrandRepo brandRepo;
    @Autowired
    private UzrunvelyofaRepo uzrunvelyofaRepo;

    @RequestMapping("/send")
    @ResponseBody
    public String sendMessage(String s){

        StaticData.emitterHashMap.forEach(new BiConsumer<Long, SseEmitter>() {
            @Override
            public void accept(Long s, SseEmitter sseEmitter) {
                try {
                    sseEmitter.send(s+" session:"+s);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });

        return s;
    }



    @RequestMapping(method = RequestMethod.GET, value = "/sse")
    public SseEmitter getSseEmitter(@CookieValue("projectSessionId") long sessionId) {
        SseEmitter emitter;
        if(StaticData.emitterHashMap.get(sessionId)==null){
            emitter = new SseEmitter();
        }else{
            emitter=StaticData.emitterHashMap.get(sessionId);
        }

        try {
            emitter.send("kaxa");
            emitter.complete();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return emitter;
    }


    @RequestMapping("loanbarcode/{id}")
    @ResponseBody
    public byte[] getLoanBarcode(@CookieValue("projectSessionId") long sessionId, @PathVariable("id") long id){
        Loan loan=loanRepo.findOne(id);
        MultiFormatWriter writer=new MultiFormatWriter();
        String data=loan.getNumber();
/*
        try {
            BitMatrix bm=writer.encode(data, BarcodeFormat.CODE_128,180,40);
        } catch (WriterException e) {
            e.printStackTrace();
            return null;
        }*/
        return null;

    }

    @RequestMapping("/getloan/{id}")
    @ResponseBody
    public Loan getLoan(@CookieValue("projectSessionId") long sessionId, @PathVariable("id") long id) {
        return loanRepo.findOne(id);
    }

    @RequestMapping("/getloans")
    @ResponseBody
    public Page<Loan> getLoans(@CookieValue("projectSessionId") long sessionId,
                               @RequestParam(value = "index", required = true, defaultValue = "0") int index,
                               @RequestParam(value = "search", required = true, defaultValue = "") String search,
                               @RequestParam(value = "closed", required = true, defaultValue = "false") boolean closed) {
        Session session = sessionRepository.findOne(sessionId);
        if(!search.isEmpty())
            return loanRepo.findMyFilialLoansWithSearch(search, session.getUser().getFilial(),closed, constructPageSpecification(index));
        else
            return loanRepo.findMyFilialLoans(session.getUser().getFilial(),closed,constructPageSpecification(index));
    }

    @RequestMapping("/getClientloans/{id}")
    @ResponseBody
    public List<Loan> getClientLoans(@CookieValue("projectSessionId") long sessionId, @PathVariable("id") long id) {
        Session session = sessionRepository.findOne(sessionId);
        return loanRepo.findClientLoans(id);
    }

    @RequestMapping("/createloan")
    @ResponseBody
    @Transactional
    public JsonMessage createLoan(@CookieValue("projectSessionId") long sessionId,
                                  @RequestParam(value = "json") String jsonString) {


        Session session = sessionRepository.findOne(sessionId);

        if (session.isIsactive() & session.getUser().getType() == UserType.lombardOperator.getCODE()) {

            try {
                List<Uzrunvelyofa> uzrunvelyofas=new ArrayList<>();
                float loanSum = 0;


                JsonParser jsonParser = new JsonParser();
                Gson gson = new Gson();



                JsonObject mainObject = jsonParser.parse(jsonString).getAsJsonObject();
                JsonObject clientObject = mainObject.getAsJsonObject("client");

                JsonArray mobiles = mainObject.getAsJsonArray("mobiles");
                JsonArray laptopsJson = mainObject.getAsJsonArray("laptops");

                long conditionId = mainObject.get("condition").getAsLong();
                long clientId = clientObject.get("id").getAsLong();



                for (int i = 0; i < mobiles.size(); i++) {
                    JsonObject mobile = mobiles.get(i).getAsJsonObject();
                    Uzrunvelyofa mobilePhoneTemp = new Uzrunvelyofa();
                    mobilePhoneTemp.setUzrunvelyofaMovements(new ArrayList<>());
                    mobilePhoneTemp.setSum(mobile.get("sum").getAsFloat());
                    mobilePhoneTemp.setActive(true);
                    mobilePhoneTemp.setComment(mobile.get("comment").getAsString());
                    mobilePhoneTemp.setIMEI(mobile.get("imei").getAsString());
                    mobilePhoneTemp.setLoan(null);
                    mobilePhoneTemp.setType(UzrunvelyofaTypes.MOBILE.getCODE());
                    mobilePhoneTemp.setModel(mobile.get("model").getAsString());
                    mobilePhoneTemp.setBrand(brandRepo.findOne(mobile.get("brand").getAsLong()));
                    mobilePhoneTemp.setStatus(UzrunvelyofaStatusTypes.DATVIRTULI.getCODE());
                    uzrunvelyofas.add(mobilePhoneTemp);
                    loanSum += mobile.get("sum").getAsFloat();
                }
                for (int i = 0; i < laptopsJson.size(); i++) {
                    JsonObject laptop = laptopsJson.get(i).getAsJsonObject();
                    Uzrunvelyofa laptopTemp=new Uzrunvelyofa();
                    laptopTemp.setUzrunvelyofaMovements(new ArrayList<>());
                    laptopTemp.setActive(true);
                    laptopTemp.setBrand(brandRepo.findOne(laptop.get("brand").getAsLong()));
                    laptopTemp.setModel(laptop.get("model").getAsString());
                    laptopTemp.setCpu(laptop.get("cpu").getAsString());
                    laptopTemp.setGpu(laptop.get("gpu").getAsString());
                    laptopTemp.setRam(laptop.get("ram").getAsString());
                    laptopTemp.setHdd(laptop.get("hdd").getAsString());
                    laptopTemp.setType(UzrunvelyofaTypes.LAPTOP.getCODE());
                    laptopTemp.setStatus(UzrunvelyofaStatusTypes.DATVIRTULI.getCODE());
                    laptopTemp.setSum(laptop.get("sum").getAsFloat());
                    laptopTemp.setComment(laptop.get("comment").getAsString());
                    loanSum+=laptop.get("sum").getAsFloat();
                    uzrunvelyofas.add(laptopTemp);
                }



                Loan loan = new Loan(clientsRepo.findOne(clientId),
                        session.getUser().getFilial(), loanSum, session.getUser());
                loan.setLoanCondition(loanConditionsRepo.findOne(conditionId));
                loan=loanRepo.save(loan);
                long id=loan.getId();
                int year=new DateTime().getYear()-2000;
                loan.setNumber("LN"+StaticData.hashids.encode(id)+year);
                final Loan finalLoan = loan;
                uzrunvelyofas.forEach(uzrunvelyofa -> uzrunvelyofa.setLoan(finalLoan));
                uzrunvelyofas=uzrunvelyofaRepo.save(uzrunvelyofas);
                uzrunvelyofas.forEach(uzrunvelyofa -> uzrunvelyofa.setNumber("LP"+StaticData.hashids.encode(uzrunvelyofa.getId()+year)));
                uzrunvelyofas=uzrunvelyofaRepo.save(uzrunvelyofas);
                LoanMovement loanMovement = new LoanMovement("სესხი დარეგისტრირდა", MovementTypes.REGISTERED.getCODE(), loan);
                loanMovementsRepo.save(loanMovement);
                loan.addFirstInterest();
                loanRepo.save(loan);

                return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "ok");
            } catch (Exception e) {
                e.printStackTrace();
                return new JsonMessage(JsonReturnCodes.ERROR.getCODE(), e.getMessage());
            }

        } else {
            return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(), "permission problem");
        }


    }

    @RequestMapping("/getsumforloanclosing/{id}")
    @ResponseBody
    public JsonMessage getSumForLoanClosing(@CookieValue("projectSessionId") long sessionId,
                                            @PathVariable("id") long id){
        Session session = sessionRepository.findOne(sessionId);
        Loan loan = loanRepo.findOne(id);
        if(session.getUser().getFilial().getId()==loan.getFilial().getId()){
            return new JsonMessage(JsonReturnCodes.Ok.getCODE(),loan.getSumForLoanClose()+"");
        }else{
            return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(),"DONTHAVEPERMISSION");
        }
    }

    @RequestMapping("/getloansmovements/{id}")
    @ResponseBody
    public List<LoanMovement> getLoansMovements(@CookieValue("projectSessionId") long sessionId,
                                                @PathVariable("id") long id) {
        Session session = sessionRepository.findOne(sessionId);
        Loan loan = loanRepo.findOne(id);
        return loanMovementsRepo.findByLoan(loan);
    }
    @RequestMapping("/getloaninterests/{id}")
    @ResponseBody
    public List<LoanInterest> getLoanInterests(@CookieValue("projectSessionId") long sessionId, @PathVariable("id") long id){
        Session session = sessionRepository.findOne(sessionId);
        Loan loan = loanRepo.findOne(id);
        return loan.getLoanInterests();
    }
    @RequestMapping("/addInterestToLoan/{id}")
    @ResponseBody
    public JsonMessage addInterestToLoan(@CookieValue("projectSessionId") long sessionId, @PathVariable("id") long id){
        Session session = sessionRepository.findOne(sessionId);
        Loan loan=loanRepo.findOne(id);
        loan.addInterest();
        loanRepo.save(loan);
        return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "ok");
    }

    @RequestMapping("/closewithconfiscation/{id}")
    @ResponseBody
    public JsonMessage closeLoanWithConfiscation(@CookieValue("projectSessionId") long sessionId,
                                                 @PathVariable("id") long id){
        Session session = sessionRepository.findOne(sessionId);
        Loan loan=loanRepo.findOne(id);
        if(session.isIsactive()&&
                loan.getFilial().getId()==session.getUser().getFilial().getId()&&
                loan.isOverdue()){
            try{
                loan.confiscateAndCloseLoan();
                loanRepo.save(loan);

                return new JsonMessage(JsonReturnCodes.Ok.getCODE(),
                        "წარმატებით შესრულდა ოპერაცია");
            }catch (Exception e){
                e.printStackTrace();
                return new JsonMessage(JsonReturnCodes.ERROR.getCODE(),
                        "მოხდა შეცდომა ოპერაციის შესრულებისას");
            }



        }else{
            return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(),
                    "არგაქვთ ამ მოქმედების უფლება");
        }

    }



    private Pageable constructPageSpecification(int pageIndex) {
        Pageable pageSpecification = new PageRequest(pageIndex, 30);
        return pageSpecification;
    }

}
