$("#studNumber").focus();
function validateAndGetFormData() {
    var studNumber = $("#studNumber").val();
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    if (studNumber === "" || !studNumber.match(re)) {
        alert("Please enter valid enrollment number");
        $("#studNumber").focus();
        return "";
    }
    var studName = $("#studName").val();
    if (studName === "") {
        alert("Please enter a valid name");
        $("#studName").focus();
        return "";
    }
    var studEmail = $("#studEmail").val();
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (studEmail === "" || !studEmail.match(validRegex)) {
        alert("Please enter a valid email ID");
        $("#studEmail").focus();
        return "";
    }
    var password = $("#password").val();
    if(password==="")
    {
        alert("Please enter a password");
        $("#password").focus();
        return "";
    }
    var jsonStrObj = {
        studentNumber: studNumber,
        studentName: studName,
        studentEmail: studEmail,
        studentPassword: password, 
    };
    return JSON.stringify(jsonStrObj);
}
// This method is used to create PUT Json request.
function createPUTRequest(connToken, jsonObj, dbName, relName) {
    var putRequest = "{\n"
        + "\"token\" : \""
        + connToken
        + "\","
        + "\"dbName\": \""
        + dbName
        + "\",\n" + "\"cmd\" : \"PUT\",\n"
        + "\"rel\" : \""
        + relName + "\","
        + "\"jsonStr\": \n"
        + jsonObj
        + "\n"
        + "}";
    return putRequest;
}
function executeCommand(reqString, dbBaseUrl, apiEndPointUrl) {
    var url = dbBaseUrl + apiEndPointUrl;
    var jsonObj;
    $.post(url, reqString, function (result) {
        jsonObj = JSON.parse(result);
    }).fail(function (result) {
        var dataJsonObj = result.responseText;
        jsonObj = JSON.parse(dataJsonObj);
    });
    return jsonObj;
}
function resetForm() {
    $("#studNumber").val("")
    $("#studName").val("");
    $("#studEmail").val("");
    $("#password").val("");
    $("#studNumber").focus();
}
function saveDetails() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest("90937548|-31949294783751598|90942561",
        jsonStr, "students", "students-index");
    alert(putReqStr);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommand(putReqStr,
        "http://api.login2explore.com:5577", "/api/iml");
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({ async: true });
    resetForm();
}
