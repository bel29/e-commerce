const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const CART_LETRA = "https://japdevdep.github.io/ecommerce-api/cart/654.json"

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  agregarNombreUsuario()
  if (document.getElementById("cerrar")!==null){
    document.getElementById("cerrar").addEventListener("click", function(event){
       localStorage.clear();
    })
  }
});



function agregarNombreUsuario(){
  if (localStorage.getItem("usuario")!=null){
    localStorage.getItem("usuario")
    var datos = JSON.parse(localStorage.getItem("usuario"))

   
 //document.getElementById("dropdownMenu").innerHTML += " "+ datos[0]
    var agregar= `<div class="dropdown show">
    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <strong> Bienvenido </strong> ${datos[0]}</a>
    
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <a class="dropdown-item" href="my-profile.html"> Mi Perfil </a>
                      <a id="cerrar" class="dropdown-item" href="login.html"> Cerrar sesión </a>
                      <a id="carrito" class="dropdown-item" href="cart.html"> Mi Carrito </a>
                  </div>
                </div>`;
    
    document.getElementById("navbar").innerHTML += agregar;
  }
}