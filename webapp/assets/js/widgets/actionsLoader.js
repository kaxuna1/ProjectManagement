/**
 * Created by kaxa on 9/3/16.
 */
function loadActions(data, DOMElements) {
    console.log(data);
    DOMElements.bodyPanelStages.hide("slow");
    DOMElements.buttonsPanelStages.hide("slow");
    DOMElements.bodyPanelActions.show("slow");
    DOMElements.buttonsPanelActions.show("slow");
    DOMElements.buttonsPanelActions.html("");
    DOMElements.bodyPanelActions.html("");
    createButtonWithHandlerr(DOMElements.buttonsPanelActions, "უკან დაბრუნება", function () {
        DOMElements.bodyPanelStages.show("slow");
        DOMElements.buttonsPanelStages.show("slow");
        DOMElements.bodyPanelActions.hide("slow");
        DOMElements.buttonsPanelActions.hide("slow");
    });
    loadActionsInGrid(data, DOMElements, 0);
    createButtonWithHandlerr(DOMElements.buttonsPanelActions, "მოქმედების დამატება", function () {
        showModalWithTableInside(function (header, body, modal) {
            header.html("ახალი მოქმედების დარეგისტრირება");
            body.append("<div id='etapiForm'></div>");
            var formBody = $("#etapiForm");
            dynamicCreateForm(formBody, "/createaction", {
                name: {
                    name: "სახელი",
                    type: "text"
                },
                id: {
                    type: "hidden",
                    value: "" + data["id"]
                }
            }, function () {
                modal.modal("hide");

                loadActionsInGrid(data, DOMElements, 0);
            })


        }, {
            "დამატებითი ღილაკი": function () {

            }
        });
    });


}
function loadActionsInGrid(data, DOMElements, type) {
    $.getJSON("/getactions?id=" + data.id + "&type=" + type, function (result) {
        console.log(result);
        DOMElements.bodyPanelActions.html(actionsPageTemplate);
        var actionsContainerDiv = $("#actionsContainerDiv");
        var tab2Content = $("#tab2ContentActions");

        for (key in result) {
            var element = result[key];
            var statusString = '<span class="label label-danger">' + element.actionStatus + '</span> ';
            var actionString = '<span class="subject-text">New contract</span>';


            actionsContainerDiv.append('<div value="' + key + '" class="action-item message-item media">' +
                '<div class="media">' +
                '<img src="assets/images/avatars/avatar11_big.png" alt="avatar 3" width="40" class="sender-img">' +
                '   <div class="media-body">' +
                '   <div class="sender">' + element.name + '</div>' +
                '<div style="width: 40%;" class="subject">' + statusString + actionString + '</div>' +
                '<div class="date">' + moment(element.createDate).locale("ka").format("LLLL") + '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        }
        $(".action-item").click(function () {
            var currentItem = result[$(this).attr("value")];
            console.log(currentItem);
            DOMElements.bodyPanelActions.hide("slow");
            DOMElements.buttonsPanelActions.hide("slow");
            DOMElements.bodyPanelAction.show("slow");
            DOMElements.buttonsPanelAction.show("slow");
            DOMElements.buttonsPanelAction.html("");
            DOMElements.bodyPanelAction.html("");
            DOMElements.bodyPanelAction.html(actionItemsListTemplate);
            createButtonWithHandlerr(DOMElements.buttonsPanelAction,"უკან დაბრუნება",function () {
                DOMElements.bodyPanelActions.show("slow");
                DOMElements.buttonsPanelActions.show("slow");
                DOMElements.bodyPanelAction.hide("slow");
                DOMElements.buttonsPanelAction.hide("slow");
            });
            if(currentItem.status===1){
                createButtonWithHandlerr(DOMElements.buttonsPanelAction,"პრარაბთან გაგზავნა",function () {
                    $.getJSON("/sendactiontoprarab/"+currentItem.id,function (result) {
                        if(result.code==0){

                            DOMElements.bodyPanelStages.show("slow");
                            DOMElements.buttonsPanelStages.show("slow");
                            DOMElements.bodyPanelAction.hide("slow");
                            DOMElements.buttonsPanelAction.hide("slow");
                            $.getJSON("/getprojectstages/" + currentProjectID, function (result2) {
                                loadStages(DOMElements, result2);
                            });
                        }else{
                            alert("მოხდა შეცდომა");
                        }

                    })


                });
            }
            loadExpanses(currentItem,DOMElements);
            //loadActions(currentItem,DOMElements)
        })
    })
}