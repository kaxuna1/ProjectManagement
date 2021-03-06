/**
 * Created by KGelashvili on 10/26/2015.
 */


var currentFunction;

$.getJSON("/getsessionstatus", function (result) {
    if (!result["isactive"]) {
        eraseCookie("projectSessionId");
        window.location.href = "/login.html";
    }
});
$(document).ready(function () {
    $("#logoutBtn").click(function () {
        $.getJSON("/logout", function (result) {
            if (result) {
                eraseCookie("projectSessionId");
                window.location.href = "/login.html";
            }
        })

    });
    var navigation = $("#navigationUl");
    $("#settingsBtn").click(function () {

        showModalEditPage({
            "password": {
                value: "",
                url: "/edituser",
                name: "პაროლი"
            }
        }, {});

    });
    if (readCookie("projectUserType") === "1" || readCookie("projectUserType") === "2") {

        navigation.append('<li id="loadProjectsButton" class="k">' +
            '<a href="#"><i class="icon-note"></i><span data-translate="პროექტები">პროექტები</span></a></li>');
        navigation.append('<li id="loadFilialsButton" class="k">' +
            '<a href="#"><i class="icon-screen-desktop"></i><span data-translate="ფილიალები">ფილიალები</span></a></li>');
        navigation.append('<li id="loadUsersButton" class="k">' +
            '<a href="#"><i class="icon-picture"></i><span data-translate="მომხმარებლები">მომხმარებლები</span></a></li>');
        navigation.append('<li id="loadElementsButton" class="k">' +
            '<a href="#"><i class="icon-note"></i><span data-translate="მასალის ტიპები">მასალის ტიპები</span></a></li>');
        navigation.append('<li id="loadStageTypesButton" class="k">' +
            '<a href="#"><i class="icon-note"></i><span data-translate="ეტაპის ტიპები">ეტაპის ტიპები</span></a></li>');
        /*navigation.append('<li id="loadAcceptedRequestsButton" class="k">' +
         '<a href="#"><i class="icon-layers"></i><span data-translate="დადასტურებული მოთხოვნები">დადასტურებული მოთხოვნები</span></a></li>');
         navigation.append('<li id="loadTendersButton" class="k">' +
         '<a href="#"><i class="icon-layers"></i><span data-translate="ტენდერები">ტენდერები</span></a></li>');*/
        /*navigation.append('<li id="loadRejectedByTenderUser" class="k">' +
         '<a href="#"><i class="icon-note"></i><span data-translate="უარყოფილი მოთხოვნები">უარყოფილი მოთხოვნები</span></a></li>');*/

        $("#loadProjectsButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            loadProjectsData(0, "");


        });


        $("#loadFilialsButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#addNewDiv").html('<button id="addNewButton" data-target="#myModal" class="btn btn-sm btn-dark">ახალი ფილიალის დამატება </button>')
            $("#addNewButton").click(function () {
                $("#myModalLabel").html("ახალი ფილიალის დამატება")
                var modalBody = $("#modalBody");
                modalBody.html(filialsRegistrationFormTemplate);
                $('#myModal').modal("show");
                $("#registrationModalSaveButton").unbind()
                $("#registrationModalSaveButton").click(function () {
                    var registerData = {
                        name: $("#nameField").val().trim(),
                        address: $("#addressField").val().trim()
                    }
                    var valid = true;
                    for (key in registerData) {
                        if (registerData[key] == "") {
                            valid = false
                        }
                    }
                    if (valid) {
                        $.ajax({
                            url: "/createfilial",
                            method: "POST",
                            data: registerData
                        }).done(function (msg) {
                            if (msg) {
                                loadFilialsData(0, "")
                                $('#myModal').modal("hide");
                            } else {
                                $('#myModal').modal("hide");
                                alert("მოხმდა შეცდომა. შეცდომის ხშირი განმეორების შემთხვევაში დაუკავშირდით ადმინისტრაციას.")
                            }
                        })
                    } else {
                        alert("შეავსეთ ყველა ველი რეგისტრაციისთვის")
                    }

                    console.log(registerData);
                })
            });
            loadFilialsData(0, "");
        });
        $("#loadUsersButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            loadUsersData(0, "");
        });


        $("#loadElementsButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            loadElementTypes();

        });
        $("#loadStageTypesButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            loadProjectStageTypes();

        });

        $("#loadAcceptedRequestsButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#addNewDiv").html('')
            loadAcceptedRequests(0)
        });
        $("#loadTendersButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#addNewDiv").html('<button id="addNewButton" data-target="#myModal" class="btn btn-sm btn-dark">ახალი ტენდერის შექმნა </button>' +
                '<button id="loadBeforeStarted" data-target="#myModal" class="btn btn-sm btn">მიმდინარე ტენდერები</button>' +
                '<button id="loadStarted" data-target="#myModal" class="btn btn-sm btn">დაწყებული ტენდერები</button>' +
                '<button id="loadEnded" data-target="#myModal" class="btn btn-sm">დასრულებული ტენდერები</button>');
            $("#addNewButton").click(function () {
                $("#myModalLabel").html("ახალი ტენდერის დამატება");
                var modalBody = $("#modalBody");
                modalBody.html(tenderRegistrationFormTemplate);
                $("#registrationModalSaveButton").unbind()
                $("#registrationModalSaveButton").click(function () {
                    var registerData = {
                        name: $("#nameField").val().trim(),
                        startDate: moment($("#dateStartField").val()).toDate(),
                        endDate: moment($("#dateEndField").val()).toDate()
                    }
                    var valid = true;
                    for (key in registerData) {
                        if (registerData[key] == "") {
                            valid = false
                        }
                    }
                    if (valid) {
                        $.ajax({
                            url: "/createtender",
                            method: "POST",
                            data: registerData
                        }).done(function (msg) {
                            if (msg) {
                                loadTenders(0, 1)
                                $('#myModal').modal("hide");
                            } else {
                                $('#myModal').modal("hide");
                                alert("მოხმდა შეცდომა. შეცდომის ხშირი განმეორების შემთხვევაში დაუკავშირდით ადმინისტრაციას.")
                            }
                        })
                    } else {
                        alert("შეავსეთ ყველა ველი რეგისტრაციისთვის")
                    }


                });
                $('#myModal').modal("show");
            });
            $("#loadBeforeStarted").click(function () {
                loadTenders(0, 1);
            });
            $("#loadStarted").click(function () {
                loadTenders(0, 2);
            });
            $("#loadEnded").click(function () {
                loadTenders(0, 3);
            });
            loadTenders(0, 1);
        });
        $("#loadRejectedByTenderUser").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#addNewDiv").html('');
            requestsfromtenders();

        });
        loadProjectsData(0, "");
    }

    if (readCookie("projectUserType") === "3") {
        navigation.append('<li id="loadProjectsButton" class="k">' +
            '<a href="#"><i class="icon-note"></i><span data-translate="პროექტები">პროექტები</span></a></li>');
        $("#loadProjectsButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            loadProjectsForPrarab();
        });
        $("#loadProductRequestsButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#addNewDiv").html('');
            loadProductRequestsData(0, 2);

        });
        loadProjectsForPrarab();
    }
    if (readCookie("projectUserType") === "4") {
        navigation.append('<li id="loadTendersButton" class="k">' +
            '<a href="#"><i class="icon-layers"></i><span data-translate="ტენდერები">მიმდინარე ტენდერები</span></a></li>');
        navigation.append('<li id="loadMyWonTenders" class="k">' +
            '<a href="#"><i class="icon-layers"></i><span data-translate="ტენდერები">ჩემი მოგებული ტენდერები</span></a></li>');
        navigation.append('<li id="loadEndedTenders" class="k">' +
            '<a href="#"><i class="icon-layers"></i><span data-translate="ტენდერები">დასრულებული ტენდერები</span></a></li>');
        navigation.append('<li id="loadRequestsFromTender" class="k">' +
            '<a href="#"><i class="icon-layers"></i><span data-translate="დამატებითი მოთხოვნები">დამატებითი მოთხოვნები</span></a></li>');
        $("#loadTendersButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#addNewDiv").html('');
            loadTenders(0, 2);
        });
        $("#loadMyWonTenders").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#addNewDiv").html('');
            loadTendersWon(0);
        });
        $("#loadEndedTenders").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#addNewDiv").html('');
            loadTenders(0, 3);
        });
        $("#loadRequestsFromTender").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#addNewDiv").html('');
            requestsfromtenders();
        });

        loadTenders(0, 2);
    }

    if (readCookie("projectUserType") === "1" || readCookie("projectUserType") === "2" || readCookie("projectUserType") === "3") {
        canCreateUsers = true;
    }

    if (readCookie("projectUserType") === "1" || readCookie("projectUserType") === "2") {
        canCreateProject = true;
    }

    if (readCookie("projectUserType") === "5") {
        navigation.append('<li id="loadWaitProductsButton" class="k">' +
            '<a href="#"><i class="icon-note"></i><span data-translate="მოსატანი პროდუქცია">მოსატანი პროდუქცია</span></a></li>');
        $("#loadWaitProductsButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");

            loadMosatani();
        });
        loadMosatani();
    }

    if (readCookie("projectUserType") === "6") {
        navigation.append('<li id="loadTendersButton" class="k">' +
            '<a href="#"><i class="icon-layers"></i><span data-translate="ტენდერები">მიმდინარე ტენდერები</span></a></li>');
        navigation.append('<li id="loadEndedTenders" class="k">' +
            '<a href="#"><i class="icon-layers"></i><span data-translate="ტენდერები">დასრულებული ტენდერები</span></a></li>');
        $("#loadTendersButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#addNewDiv").html('');
            loadTenders(0, 2);
        });
        $("#loadEndedTenders").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#addNewDiv").html('');
            loadTenders(0, 3);
        });


        loadTenders(0, 2);
    }

    if (readCookie("projectUserType") === "21") {
        navigation.append('<li id="loadClientsButton" class="k">' +
            '<a href="#">' +
            '<i class="fa fa-address-book-o" aria-hidden="true"></i>' +
            '<span style="font-family: font1;" data-translate="კლიენტები">კლიენტები</span></a></li>');
        navigation.append('<li id="loadLoansButton" class="k">' +
            '<a href="#">' +
            '<i class="fa fa-balance-scale" aria-hidden="true"></i> ' +
            '<span style="font-family: font1;" data-translate="სესხები">სესხები</span></a></li>');
        navigation.append('<li id="loadConfiscatedButton" class="k">' +
            '<a href="#"><i class="fa fa-mobile" aria-hidden="true"></i>' +
            '<span style="font-family: font1;" data-translate=" დაკავებული ნივთები"> დაკავებული ნივთები</span></a></li>');
        navigation.append('<li id="loadConditionsButton" class="k">' +
            '<a href="#"><i class="fa fa-percent" aria-hidden="true"></i>' +
            '<span style="font-family: font1;" data-translate=" განაკვეთები"> განაკვეთები</span></a></li>');


        $("#loadClientsButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#searchparams").html("");
            loadClientsData(0, "");
            currentFunction = loadClientsData;
        });
        
        $("#loadConfiscatedButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#searchparams").html("");
            loadConfiscatedData(0, "");
            currentFunction = loadConfiscatedData;
        });

        $("#loadLoansButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#searchparams").html("");
            $("#searchparams").append('<div class="input-group">  ' +
                '<div class="icheck-list">      ' +
                '<label><input id="closedParam" type="checkbox" data-checkbox="icheckbox_square-blue">დახურული</label>');
            $('input').iCheck({
                checkboxClass: 'icheckbox_minimal',
                radioClass: 'iradio_minimal',
                increaseArea: '20%' // optional
            })
            loadLoansData(0, "");
            currentFunction = loadLoansData;

        });
        $("#loadConditionsButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#searchparams").html("");
            loadLoanConditions(0,"");
            currentFunction = loadLoanConditions;

        });


        currentFunction = loadClientsData;
        loadClientsData(0, "");
    }
    //loadProductsData(0, "");
});
function search(e) {
    if (e === 13) {
        console.log(e)
        currentFunction(0, $("#searchText").val());
    }
}

