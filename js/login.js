//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
   
    var array = []
    
    const email = document.getElementById("inputEmail");
    const pass = document.getElementById("inputPassword");
    const form = document.getElementById("form");
    
    form.addEventListener("submit",e=> {
        e.preventDefault();
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        if (!regexEmail.test(email.value)) {
            alert("email is not valid");
        }
        else if (pass.value.length < 6) {
            alert("password must have at least 6 digits.");
        }
        else {
            location.href= "index.html";
        }
        
        
           var usr = email.value
           var passvalue = pass.value
           array.push(usr,passvalue)
           localStorage.setItem("usuario",JSON.stringify(array))
        
    })
    
});