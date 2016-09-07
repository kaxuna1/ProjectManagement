/**
 * Created by kakha on 8/25/2016.
 */
function createButtonWithHandlerr(div,name,func){
    var random=Math.floor((Math.random() * 10000) + 1);
    var random2=Math.floor((Math.random() * 10000) + 1);

    div.append("<button class='btn' id='btn"+random+""+random2+"'>"+name+"</button>");
    $("#btn"+random+""+random2).click(func)
}