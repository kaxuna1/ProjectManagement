/**
 * Created by kaxa on 11/23/16.
 */
function loadLoanConditions() {
    $.getJSON("getconditions", function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < loanConditionsColumns.length; i++) {
            var currentElement = loanConditionsColumns[i];
            $("#dataGridHeader").append('<th style="font-family: font1;">' + currentElement + "</th>")
        }
        currentData = result;
        var dataArray = result;
        for (i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i];
            console.log(new Date(currentElement["createDate"]))
            
            $("#dataGridBody").append("<tr>" +
                "<td><input value='" + currentElement["id"] + "' class='checkboxParcel' type='checkbox' /></td>" +
                "<td style='font-family: font1;' value='" + i + "' class='gridRow'>" + currentElement["name"] + "</td>" +
                "<td style='font-family: font1;' value='" + i + "' class='gridRow'>" + currentElement["percent"] + "</td>" +
                "<td style='font-family: font1;' value='" + i + "' class='gridRow'>" + currentElement["period"] + "</td>" +
                "<td style='font-family: font1;' value='" + i + "' class='gridRow'>" + periodTypes[currentElement["periodType"]] + "</td>" +
                "</tr>");

        }
    })
}