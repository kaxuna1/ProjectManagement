/**
 * Created by kakha on 11/12/2015.
 */
var currentPage = 0;
var currentData;
var projectColumns = ["#","სახელი","მისამართი","საკადასტრო"];
var userColumns = ["სახელი", "გვარი", "მომხმარებლის სახელი", "პირადი ნომერი", "მობილური"];
var filialColumns = ["სახელი", 'მისამართი'];
var elementColumns = ["კოდი", 'სახელი'];
var regionColumns = ["სახელი"];
var formatColumns = ["სახელი", "ფასი"];
var productRequestsColumns = ["#","ფილიალი", "თარიღი","მოთხოვნილი პროდუქტების რაოდენობა"];
var mosataniColumns=["#","პროდუქტი","რაოდენობა","მოიტანს"];
var tenderColumns=["#","სახელი","შექმნის დრო","დაწყების დრო","დამთავრების დრო"];
var zoneColumns = ["სახელი", "რეგიონი"];
var tenderWonColumns=["#","ტენდერი","პროდუქტი","რაოდენობა","ფასი"];
var requestFromTenderColumns=["#","ტენდერი","პროდუქტი","რაოდენობა","ფილიალი","#"];

var userTypes = {
    "1": "sa",
    "2":"admin",
    "3":"პრარაბი"
};
var canCreateProject = false;
var canCreateUsers = false;
var topPanelButtons=$("#topPanelButtons");
var addZoneToSelectedVisible=false;
var quantTypes=['','კგ.', "ცალი"];