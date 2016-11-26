/**
 * Created by kaxa on 11/19/16.
 */

var openLoanGlobal = null;
var currentLoanID = 0;
var currentLoanObj = null;
function loadLoansData(index, search) {
    var sendLoanData = {};
    var brands = {};
    var conditions = {};
    $.getJSON("getloans?index=" + index + "&search=" + search, function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < loanColumns.length; i++) {
            var currentElement = loanColumns[i];
            $("#dataGridHeader").append('<th style="font-family: font1;">' + currentElement + "</th>")
        }
        currentData = result;
        var dataArray = result["content"];
        var totalPages = result["totalPages"];
        var totalElements = result["totalElements"];
        for (i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i];
            console.log(new Date(currentElement["createDate"]))

            console.log(currentElement["createDate"])
            $("#dataGridBody").append("<tr>" +
                "<td><input value='" + currentElement["id"] + "' class='checkboxParcel' type='checkbox' /></td>" +
                "<td style='font-family: font1;' value='" + i + "' class='gridRow'>" + currentElement["number"] + "</td>" +
                "<td style='font-family: font1;' value='" + i + "' class='gridRow'>" + currentElement["client"]["name"] +
                " " + currentElement["client"]["surname"] + "</td>" +
                "<td style='font-family: font1;' value='" + i + "' class='gridRow'>" + currentElement["loanSum"] + "</td>" +
                "<td style='font-family: font1;' value='" + i + "' class='gridRow'>" +
                moment(new Date(currentElement["createDate"])).locale("ka").format("LLLL") + "</td>" +

                "<td><a value='" + currentElement['id'] + "' class='deleteProduct' href='#'><i class='fa fa-times'></i></a></td>" +
                "</tr>");

        }
        var checkboxParcel = $(".checkboxParcel");
        checkboxParcel.unbind();
        checkboxParcel.change(function () {

        });
        var gridRow = $('.gridRow');
        gridRow.css('cursor', 'pointer');
        gridRow.unbind();
        for (i = 0; i < totalPages; i++) {
            $("#paginationUl").append('<li value="' + i + '" class="paginate_button ' + (index == i ? 'active"' : '') + '"><a href="#">' + (i + 1) + '</a></li>');
        }
        $(".paginate_button").click(function () {
            //console.log($(this).val())
            currentPage = $(this).val();
            loadLoansData(currentPage, search)

        });
        gridRow.click(function () {
            var currentElement = dataArray[$(this).attr("value")];
            console.log($(this).attr("value"));

            openLoanGlobal(currentElement);
        });
        $("#addNewDiv").html(
            '<button id="addNewButton" data-target="#myModal" style="font-family: font1;" class="btn btn-sm btn-dark">' +
            'ახალი სესხის გაცემა' +
            '</button>');
        $("#addNewButton").click(function () {
            sendLoanData = {mobiles: []};
            var modal7 = $("#myModal7");
            var tab7_1 = $("#tab7_1");
            var tab7_2 = $("#tab7_2");
            var tab7_3 = $("#tab7_3");
            var projectName = $("#projectName2");
            var clientChooserPlace = $("#clientChooserPlace");
            var uzrunvelyofaInputPlace = $("#uzrunvelyofaInputPlace");
            var loanDataBodyDiv = $("#loanDataBodyDiv");
            var loanActionsDiv = $("#loanActionsDiv");
            var DOMElements = {
                projectName: projectName,
                clientChooserPlace: clientChooserPlace,
                uzrunvelyofaInputPlace: uzrunvelyofaInputPlace,
                loanDataBodyDiv: loanDataBodyDiv,
                loanActionsDiv: loanActionsDiv,
                uzrunvelyofaFormPlace: $("#uzrunvelyofaFormPlace"),
                uzrunvelyofaGridPlace: $("#uzrunvelyofaGridPlace"),
                modal: modal7
            };
            projectName.html("ახალი სესხის გაცემა");


            drawClientChooser(DOMElements);
            drawLoanInfoAdder(DOMElements);
            updateSideInfo(DOMElements)


            modal7.modal("show");
        })
    })


    function drawClientChooser(DOMElements) {
        DOMElements.clientChooserPlace.html(clientChooserTemplate);
        var clientsContainerDiv = $("#clientsContainerDiv");
        DOMElements.clientsContainerDiv = clientsContainerDiv;
        loadClientsDataInChooser(DOMElements, 0, "")
    }

    function loadClientsDataInChooser(DOMElements, index, search) {
        DOMElements.clientsContainerDiv.html("");
        $.getJSON("/getClients?index=" + index + "&search=" + search, function (result) {
            var data = result["content"];
            var totalPages = result["totalPages"];
            var totalElements = result["totalElements"];


            for (var key in data) {
                var element = data[key];
                var statusString = '<span class="label label-default">' + element.personalNumber + '</span> '+
                    '<span style=" margin-right: 0px" class="label label-default"><i class="fa fa-phone" aria-hidden="true"></i>' + element.mobile + '</span> ';
                DOMElements.clientsContainerDiv.append('<div value="' + key + '" class="client-item stage-item message-item media">' +
                    '<div class="media">' +
                    '<img src="assets/images/avatars/avatar11_big.png" alt="avatar 3" width="40" class="sender-img">' +
                    '   <div class="media-body">' +
                    '   <div style="width: 30%;" class="sender">' + element.name + " " + element.surname + '</div>' +
                    '<div style="width: 40%;" class="subject">' + statusString + '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                );
            }
            var clientItem = $(".client-item");
            clientItem.unbind();
            clientItem.click(function () {
                clientItem.attr("style", "");
                $(this).attr("style", "background-color:grey;")
                sendLoanData.client = data[$(this).attr("value")];
                console.log(sendLoanData);
                updateSideInfo(DOMElements);
            });
            var clientSearch = $("#clientSearch");
            console.log(clientSearch);
            clientSearch.unbind();
            clientSearch.change(function (e) {
                loadClientsDataInChooser(DOMElements, index, clientSearch.val());
            })


        })

    }

    function drawLoanInfoAdder(DOMElements) {
        DOMElements.uzrunvelyofaInputPlace.html("");
        var createUzrunvelyofaButton = createButtonWithHandlerr(DOMElements.uzrunvelyofaInputPlace,
            "უზრუნველყოფის დამატება", function () {
                loanConditionChooserButton.enabled(false);
                createUzrunvelyofaButton.enabled(false);
            brands = {};
            dynamicCreateToArray(DOMElements.uzrunvelyofaFormPlace, sendLoanData.mobiles, {

                brand: {
                    name: "ბრენდი",
                    type: "comboBox",
                    valueField: "id",
                    nameField: "name",
                    url: "/getbrends",
                    IdToNameMap: brands
                },
                model: {
                    name: "მოდელი",
                    type: "text"
                },
                imei: {
                    name: "IMEI",
                    type: "text"
                },
                sum: {
                    name: "შეფასება",
                    type: "number"
                },
                comment: {
                    name: "კომენტარი",
                    type: "text"
                }
            }, function () {
                loanConditionChooserButton.enabled(true);
                createUzrunvelyofaButton.enabled(true);
                drawUzrunvelyofaGrid(DOMElements);
                updateSideInfo(DOMElements);
            });
        });
        var loanConditionChooserButton = createButtonWithHandlerr(DOMElements.uzrunvelyofaInputPlace,
        "საპროცენტო განაკვეთის მითითება",function () {
                loanConditionChooserButton.enabled(false);
                createUzrunvelyofaButton.enabled(false);
                dynamicChooserToCallback(DOMElements.uzrunvelyofaFormPlace,{
                    name: "საპროცენტო განაკვეთი",
                    type: "comboBox",
                    valueField: "id",
                    nameField: "fullname",
                    url: "/getconditions",
                    IdToNameMap: conditions
                },function (value) {
                    sendLoanData["condition"]=value;
                    loanConditionChooserButton.enabled(true);
                    createUzrunvelyofaButton.enabled(true);
                    drawUzrunvelyofaGrid(DOMElements);
                    updateSideInfo(DOMElements);
                })

            });

    }

    function drawUzrunvelyofaGrid(DOMElements) {
        DOMElements.uzrunvelyofaGridPlace.html(uzrunvelyofaGridTemplate);
        DOMElements.uzrunvelyofaContainerDiv = $("#uzrunvelyofaContainerDiv");
        var data = sendLoanData.mobiles;
        console.log(brands);
        for (var key in data) {
            var element = data[key];
            var statusString = '<span class="label label-danger">' + element.imei + '</span>' +
                '<span class="label label-danger">' + element.sum + ' ლარი</span>';
            DOMElements.uzrunvelyofaContainerDiv.append('<div value="' + key + '" class="uzrunvelyofa-item stage-item message-item media">' +
                '<div class="media">' +
                '<img src="assets/images/phone.png" alt="avatar 3" width="40" class="sender-img">' +
                '   <div class="media-body">' +
                '   <div class="sender">' + brands[element.brand] + " " + element.model + '</div>' +
                '<div style="width: 40%;" class="subject">' + statusString + '<span value="' + key + '" class="remove-uzrunvelyofa label label-danger">X</span></div>' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        }
        $(".remove-uzrunvelyofa").click(function () {
            var key = $(this).attr("value");
            delete data[key];
            updateSideInfo(DOMElements);
            drawUzrunvelyofaGrid(DOMElements);
        })


    }

    function updateSideInfo(DOMElements) {
        DOMElements.loanDataBodyDiv.html("");
        DOMElements.loanActionsDiv.html("");
        var enabled = true;
        var sum = 0;
        if (sendLoanData.client) {
            DOMElements.loanDataBodyDiv.append("<div>კლიენტი: <strong style='font-family: font1'>" + sendLoanData.client.name + " " + sendLoanData.client.surname + "</strong> </div>");
            DOMElements.loanDataBodyDiv.append("<div>პირადი ნომერი: <strong style='font-family: font1'>" + sendLoanData.client.personalNumber + "</strong> </div>");
        } else {
            enabled = false;
        }
        if(sendLoanData.condition){
            DOMElements.loanDataBodyDiv.append("<div>საპროცენტო განაკვეთი: <strong style='font-family: font1'>" + conditions[sendLoanData.condition] + "</strong> </div>");
        }else{
            enabled = false;
        }
        if (sendLoanData.mobiles.length > 0) {
            DOMElements.loanDataBodyDiv.append("<div>უწრუნველყოფის ნივთები: </div>");
            for (var mobileKey in sendLoanData.mobiles) {
                var mobile = sendLoanData.mobiles[mobileKey];
                sum += parseFloat(mobile.sum);
                DOMElements.loanDataBodyDiv.append("<div><strong style='font-family: font1'> მობილური: " + brands[mobile.brand] + " " + mobile.model + " " + mobile.sum + " ლარი</strong></div>");
            }
            DOMElements.loanDataBodyDiv.append("<div>ჯამური თანხა: <strong style='font-family: font1'>" + parseFloat(sum) + " ლარი</strong></div>");
        } else {
            enabled = false;
        }


        var createLoanButton = createButtonWithHandlerr(DOMElements.loanActionsDiv, "დადასტურება", function () {
            console.log(sendLoanData);
            $.ajax({
                url: "createloan",
                method: "POST",
                data: {json: JSON.stringify(sendLoanData)}
            }).done(function (msg) {
                if (msg) {
                    if (msg.code === 0) {
                        DOMElements.modal.modal("hide")
                        loadLoansData(0, "")
                    }
                } else {

                    alert("მოხმდა შეცდომა. შეცდომის ხშირი განმეორების შემთხვევაში დაუკავშირდით ადმინისტრაციას.")
                }
            })
        });
        console.log(createLoanButton);
        createLoanButton.enabled(enabled);

    }

    function loadClientDataForLoan(DOMElements) {
        DOMElements.clientInfoButtonsPlace.html("");
        DOMElements.clientInfoDataPlace.html("");
        DOMElements.clientContactButton = createButtonWithHandlerr(DOMElements.clientInfoButtonsPlace,
            "შეტყობინების გაგზავნა", function () {
                showModalWithTableInside(function (head, body, modal) {
                    dynamicCreateForm(body, "/sendmessagetoclient", {
                        message: {
                            name: "შეტყობინება",
                            type: "text"
                        },
                        client: {
                            type: "hidden",
                            value: "" + DOMElements.currentObj.client.id
                        }
                    }, function () {
                        modal.modal("hide")
                    })
                })
            });
        DOMElements.clientProfileOpenButton = createButtonWithHandlerr(DOMElements.clientInfoButtonsPlace,
            "პროფილის გახსნა", function () {
                openUserGlobal(DOMElements.currentObj.client);
            });
        DOMElements.clientInfoDataPlace.append("<div>კლიენტი: <strong style='font-family: font1'>" +
            DOMElements.currentObj.client.name + " " +
            DOMElements.currentObj.client.surname + "</strong></div>");
        DOMElements.clientInfoDataPlace.append("<div>პ/ნ: <strong style='font-family: font1'>" +
            DOMElements.currentObj.client.personalNumber + "</strong></div>");
        DOMElements.clientInfoDataPlace.append("<div>ტელეფონი: <strong style='font-family: font1'>" +
            DOMElements.currentObj.client.mobile + "</strong></div>");
    }

    function loadLoanInfoData(DOMElements) {
        DOMElements.loanInfoDiv.html("");
        DOMElements.loanInfoDiv.append("<div>გაცემული თანხა: <strong style='font-family: font1'>" + DOMElements.currentObj.loanSum + " ლარი</strong></div>");
        DOMElements.loanInfoDiv.append("<div>დარჩენილი გადასახდელი თანხა: <strong style='font-family: font1'>" + DOMElements.currentObj.leftSum + " ლარი</strong></div>");
        DOMElements.loanInfoDiv.append("<div>სესხის დასახურად გადასახდელი თანხა: <strong style='font-family: font1'>" + DOMElements.currentObj.sumForLoanClose + " ლარი</strong></div>");
        DOMElements.loanInfoDiv.append("<div>საპროცენტო განაქვეთი: <strong style='font-family: font1'>" + DOMElements.currentObj.loanCondition.name + "</strong></div>");
        DOMElements.loanInfoDiv.append("<div>მომდევნო %-ის დარიცხვის თარიღი: <strong style='font-family: font1'>" +
            moment(new Date(DOMElements.currentObj.nextInterestCalculationDate)).locale("ka").format("L")+ "</strong></div>");
        DOMElements.loanInfoDiv.append("<div>მომდევნო %-ის გადახდის თარიღი: <strong style='font-family: font1'>" +
            moment(new Date(DOMElements.currentObj.nextInterestPaymentDueDate)).locale("ka").format("L")+ "</strong></div>");
        DOMElements.loanInfoDiv.append("<div>დაერირცხება: <strong style='font-family: font1'>" + DOMElements.currentObj.loanCondition.percent+"% ყოველ "+
            DOMElements.currentObj.loanCondition.period+" "+periodTypes[DOMElements.currentObj.loanCondition.periodType] +
            "ში</strong></div>");
        DOMElements.loanInfoDiv.append("<div>სესხის გამცემი: <strong style='font-family: font1'>" + DOMElements.currentObj.user.nameSurname + "</strong></div>");
        DOMElements.loanInfoDiv.append("<div>პ/ნ: <strong style='font-family: font1'>" + DOMElements.currentObj.user.personalNumber + "</strong></div>");

        DOMElements.loanInfoDiv.append("<div>გაცემის დრო: <strong style='font-family: font1'>" +
            moment(new Date(DOMElements.currentObj.createDate)).locale("ka").format("LLLL") + "</strong></div>");
    }

    function loadUzrunvelyofaDataForLoan(DOMElements) {
        $.getJSON("/getLoanPhones?loan=" + DOMElements.currentObj.id, function (result) {
            DOMElements.currentObj.uzrunvelyofa = result;
            drawUzrunvelyofaGridForLoanInfo(DOMElements);
        })
    }

    function drawUzrunvelyofaGridForLoanInfo(DOMElements) {
        DOMElements.uzrunvelyofaDataGridDiv.html(uzrunvelyofaGridTemplate);
        DOMElements.uzrunvelyofaContainerDiv = $("#uzrunvelyofaContainerDiv");
        var data = DOMElements.currentObj.uzrunvelyofa.mobilePhones;
        for (var key in data) {
            var element = data[key];
            var statusString = '<span class="label label-danger">' + element.imei + '</span>' +
                '<span class="label label-danger">' + element.sum + ' ლარი</span>';
            DOMElements.uzrunvelyofaContainerDiv.append('<div value="' + key + '" class="uzrunvelyofa-item stage-item message-item media">' +
                '<div class="media">' +
                '<img src="assets/images/phone.png" alt="avatar 3" width="40" class="sender-img">' +
                '   <div class="media-body">' +
                '   <div style="width: 30%;" class="sender">' + element.brandName + " " + element.modelName + '</div>' +
                '<div style="width: 40%;" class="subject">' + statusString + '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        }
        $(".uzrunvelyofa-item").click(function () {
            var item = data[$(this).attr("value")];
            showModalWithTableInside(function (head, body, modal) {
                body.append("<div class='row'>" +
                    "<div class='col-md-3'><img style='height: 75px;' src='assets/images/phone.png'/></div>" +
                    "<div class='col-md-9' style='background: #F7F7F7'>" +
                    "<div>ბრენდი: <strong style='font-family: font1;'>" + item.brandName + "</strong></div>" +
                    "<div>მოდელი: <strong style='font-family: font1;'>" + item.modelName + "</strong></div>" +
                    "<div>IMEI: <strong style='font-family: font1;'>" + item.imei + "</strong></div>" +
                    "<div>ჩაბარების ფასი: <strong style='font-family: font1;'>" + item.sum + " ლარი</strong></div>" +
                    "<div><p>კომენტარი: <strong style='font-family: font1;'>" + item.comment + "</strong></p></div>" +
                    "</div>" +
                    "</div>");
            })
        })


    }

    function loadMovementsDataForLoan(DOMElements) {
        DOMElements.movementsGridDiv.html(loanMovementsGridTemplate);
        DOMElements.loanMovementsContainerDiv=$("#loanMovementsContainerDiv");
        $.getJSON("/getloansmovements/"+DOMElements.currentObj.id,function (result) {
            for(var key in result){
                var element = result[key];
                var statusString = '<span class="label label-danger">' +
                    moment(new Date(element.createDate)).locale("ka").format("LLL")  + '</span>';
                DOMElements.loanMovementsContainerDiv.append('<div value="' + key + '" class="movement-item stage-item message-item media">' +
                    '<div class="media">' +
                    '<img src="assets/images/avatars/avatar11_big.png" alt="avatar 3" width="40" class="sender-img">' +
                    '   <div class="media-body">' +
                    '   <div style="width: 40%; font-size: 11px" class="sender">' + element.text+ '</div>' +
                    '<div style="width: 40%;" class="subject">' + statusString + '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                );
            }
            $(".movement-item").click(function () {

            })
        })
    }

    function loadLoanDoActions(DOMElements) {
        DOMElements.loanDoActionsDiv.html("");
        createButtonWithHandlerr(DOMElements.loanDoActionsDiv, "გადახდა", function () {
            showModalWithTableInside(function (head, body, modal) {
                dynamicCreateForm(body, "makePayment", {
                    loanId: {
                        type: "hidden",
                        value: "" + DOMElements.currentObj.id
                    },
                    paymentType:{
                        type:"comboBox",
                        valueField:"id",
                        nameField:"name",
                        name:"გადახდის ტიპი",
                        data:[
                            {id:"1",name:"ნაწილობრივი"},
                            {id:"2",name:"სრული"},
                            {id:"3",name:"პროცენტი"}
                        ]
                    },
                    sum:{
                        type: "number",
                        name: "გადახდის თანხა"
                    }
                }, function () {
                    modal.modal("hide");
                    $.getJSON("/getloan/"+DOMElements.currentObj.id,function (result) {
                        openLoanGlobal(result);
                    });

                })
            }, function () {

            }, 500)
        });
        createButtonWithHandlerr(DOMElements.loanDoActionsDiv, "პროცენტის დაკისრება", function () {
            $.getJSON("/addInterestToLoan/"+DOMElements.currentObj.id,function (result) {
                $.getJSON("/getloan/"+DOMElements.currentObj.id,function (result2) {
                    openLoanGlobal(result2);
                });
            });
        });
    }

    function loadLoanInterestsGrid(DOMElements) {
        DOMElements.loanInterestsGridDiv.html(loanInterestGridTemplate);
        DOMElements.loanInterestsContainerDiv=$("#loanInterestsContainerDiv");
        $.getJSON("/getloaninterests/"+DOMElements.currentObj.id,function (result) {
            for(var key in result){
                var element = result[key];
                var statusString = '<span class="label label-blue">' +
                    moment(new Date(element.createDate)).locale("ka").format("L")  + ' - ' +
                    moment(new Date(element.dueDate)).locale("ka").format("L")+
                    '</span>'+

                    '<span class="label'+(element.payed?" label-default":" label-danger")+'">' +


                    (element.payed?"გადახდილია":(element.payedSum==0?"არ არის გადახდილი":"გადახდილია "+element.payedSum+"/"
                    +element.sum+"-დან"))+ '</span>';
                DOMElements.loanInterestsContainerDiv.append('<div value="' + key + '" class="movement-item stage-item message-item media">' +
                    '<div class="media">' +
                    '   <div class="media-body">' +
                    '   <div style="width: 30%; font-size: 11px;margin-left: 20px;" class="sender">დაერიცხა ' + element.percent+ "%" +
                    " "
                    + element.sum+ 'ლარი' +
                    '</div>' +
                    '<div style="width: 65%;" class="subject">' + statusString + '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                );
            }
            $(".movement-item").click(function () {

            })
        })
    }

    function loadLoanPaymentsGrid(DOMElements) {
        DOMElements.loanPaymentsGridDiv.html(loanPaymentGridTemplate);
        DOMElements.loanPaymentsContainerDiv=$("#loanPaymentsContainerDiv");
        $.getJSON("/getloanpayments/"+DOMElements.currentObj.id,function (result) {
            for(var key in result){
                var element = result[key];
                var statusString = '<span class="label label-blue">' +
                    moment(new Date(element.createDate)).locale("ka").format("LLL")  + '</span>'+
                    '<span class="label label-danger">' +
                    (element.usedFully?"გამოყენებულია":(element.usedSum==0?"არ არის გამოყენებული":"გამოყენებულია "+element.usedSum+"/"
                    +element.sum+"-დან"))+ '</span>';
                DOMElements.loanPaymentsContainerDiv.append('<div value="' + key + '" class="movement-item stage-item message-item media">' +
                    '<div class="media">' +
                    '   <div class="media-body">' +
                    '   <div style="width: 30%;font-weight: bold; font-size: 11px;margin-left: 20px;" class="sender">'+
                    "გადახდა "
                    + element.sum+ 'ლარი' +
                    '</div>' +
                    '<div style="width: 65%;" class="subject">' + statusString + '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                );
            }
            $(".movement-item").click(function () {

            })
        })



    };

    openLoanGlobal = function (currentElement) {
        var modal6 = $("#myModal6");

        var tab2_1 = $("#tab2_1");
        var tab2_2 = $("#tab2_2");
        var tab2_3 = $("#tab2_3");

        var buttonsPanelStages = $("#buttonsPanelStages");
        var bodyPanelStages = $("#bodyPanelStages");
        var bodyPanelActions = $("#bodyPanelActions");
        var buttonsPanelActions = $("#buttonsPanelActions");
        var buttonsPanelAction = $("#buttonsPanelAction");
        var bodyPanelAction = $("#bodyPanelAction");
        var projectName = $("#projectName");
        var movementsGridDiv = $("#movementsGridDiv");
        var projectCharts = $("#projectCharts");
        var uzrunvelyofaDataGridDiv = $("#uzrunvelyofaDataGridDiv");
        var projectInfoColumn2Header = $("#projectInfoColumn2Header");
        var clientInfoDataPlace = $("#clientInfoDataPlace");
        var clientInfoButtonsPlace = $("#clientInfoButtonsPlace");
        var loanInfoDiv = $("#loanInfoDiv");
        var loanDoActionsDiv = $("#loanDoActionsDiv");
        var loanInterestsGridDiv=$("#loanInterestsGridDiv");
        var loanPaymentsGridDiv=$("#loanPaymentsGridDiv");
        var DOMElements = {
            buttonsPanelStages: buttonsPanelStages,
            bodyPanelStages: bodyPanelStages,
            bodyPanelActions: bodyPanelActions,
            buttonsPanelActions: buttonsPanelActions,
            bodyPanelAction: bodyPanelAction,
            buttonsPanelAction: buttonsPanelAction,
            projectName: projectName,
            movementsGridDiv: movementsGridDiv,
            projectCharts: projectCharts,
            uzrunvelyofaDataGridDiv: uzrunvelyofaDataGridDiv,
            clientInfoDataPlace: clientInfoDataPlace,
            clientInfoButtonsPlace: clientInfoButtonsPlace,
            currentObj: currentElement,
            loanInfoDiv: loanInfoDiv,
            loanDoActionsDiv: loanDoActionsDiv,
            loanInterestsGridDiv:loanInterestsGridDiv,
            loanPaymentsGridDiv:loanPaymentsGridDiv

        };


        buttonsPanelActions.hide();
        bodyPanelActions.hide();
        buttonsPanelAction.hide();
        bodyPanelAction.hide();
        bodyPanelStages.show();
        buttonsPanelStages.show();
        buttonsPanelStages.html("");
        bodyPanelStages.html("");
        currentLoanID = currentElement["id"];
        projectName.html("<strong style='font-family: font1'>სესხი #" + currentElement["number"] + " // "+ currentElement.leftSum+" ლარი</strong>");
        loadClientDataForLoan(DOMElements);
        loadLoanInfoData(DOMElements);
        loadUzrunvelyofaDataForLoan(DOMElements);
        loadMovementsDataForLoan(DOMElements);
        loadLoanDoActions(DOMElements);
        loadLoanInterestsGrid(DOMElements);
        loadLoanPaymentsGrid(DOMElements);
        modal6.modal("show");
    }

}

