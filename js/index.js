document.addEventListener("DOMContentLoaded",function(e){
   
    if(!localStorage.getItem("usuario"))
    location.href = "login.html"
    localStorage.getItem("usuario")
    var datos = JSON.parse(localStorage.getItem("usuario"))

   
 document.getElementById("dropdownMenu").innerHTML += " "+ datos[0]

})
