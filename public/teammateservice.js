document.addEventListener("DOMContentLoaded", function () {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", '/display');
    // important to set this for body-parser
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // setup callback function
    xmlhttp.onloadend = function (e) {
        console.log(xmlhttp.responseText);
        let data = JSON.parse(xmlhttp.responseText);
        document.getElementById('history').innerHTML=data[0].passage;
        
    }
    // all set up!  Send off the HTTP request
    xmlhttp.send();

});
