/**
 * Created by kakha on 8/25/2016.
 */
function dynamicCreateForm(div,url,data,callback){
    var random=Math.floor((Math.random() * 10000) + 1);
    var random2=Math.floor((Math.random() * 10000) + 1);
    var random3=Math.floor((Math.random() * 10000) + 1);

    console.log(data);
    for(key in data){
        var element=data[key];
        console.log(element);
        if(element.type==="text"){
            
            div.append('<div class="form-group"><label for="'+key+random+'">'+element.name+'</label>' +
                "<input class='form-control' type='text' placeholder='"+element.name+"' value='"+
                (element.value?element.value:"")+"' name='"+key+"' id='"+key+random+"' />" +
                "</div>")

        }
        if(element.type==="hidden"){
            div.append("<input value='"+(element.value?element.value:"")+"' type='hidden' name='"+key+random+"' id='"+key+random+"'/>")
        }
        if(element.type==="date"){
            div.append('<div class="form-group"><label for="'+key+random+'">'+element.name+'</label>' +
                "<input class='form-control' type='date' placeholder='"+element.name+"' value='"+
                (element.value?element.value:"")+"' name='"+key+"' id='"+key+random+"' />" +
                "</div>")
        }
        if(element.type==="comboBox"){
            div.append('<div class="form-group"><label for="'+key+random+'">'+element.name+'</label>' +
                "<select  data-search='true' class='form-control'   value='"+
                (element.value?element.value:"")+"' name='"+key+"' id='"+key+random+"'>" +
                "</select>" +
                "</div>")
            var localKey=key;
            var localValueField=element.valueField;
            var localNameField=element.nameField;
            var localelement=element;
            $.getJSON(element.url,function (result) {
                console.log(result);
                for(key2 in result){
                    console.log("#"+localKey+random);
                    $("#"+localKey+random+"").append('<option value="'+result[key2][localValueField]+'">'+
                        result[key2][localNameField]+'</option>')
                }
                $("#"+localKey+random+"").select2();
            })
        }
    }
    div.append("<button class='btn' id='save"+random+"'>შენახვა</button>")
    $("#save"+random).click(function () {
        var sendData={};
        for(key in data){
            if(data[key].type==="date"){
                sendData[key]=moment($("#"+key+random).val().trim()).toDate();
            }else{
                sendData[key]=$("#"+key+random).val().trim();
            }

        }
        $.ajax({
            url: url,
            data: sendData
        }).done(function (result) {
            //TODO ეტაპების განახლება ახლის შექმნის შემდეგ
            if(result)
            callback();
            else
                alert("error");
        });
    })


}