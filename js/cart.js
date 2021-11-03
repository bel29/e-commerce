let productosCarrito = [];


let moneda = "UYU";

/*completa la función para actualizar el subtotal del producto al modificar la cantidad del mismo*/
function updateProductoSubtotal(id) {
    let costo = convertir(productosCarrito[id - 1].unitCost, productosCarrito[id - 1].currency);
    let cantidad = document.getElementById(id).value;
    if (cantidad <= 0) {
        cantidad = 1;
        document.getElementById(id).value = 1;
    }
    document.getElementById("subtotal" + id).innerHTML = cantidad * costo;
    sumaSubtotales();

}


/*modificar la función showCarrito para que aparezca el subtotal del producto en base a la cantidad y precio unitario*/
function showCarrito() {
    /*mostrar los productos del carrito con el input correspondiente a la cantidad*/
    let htmlToAppend = "";
    let htmlToAppend2 = "";

    let id = 1;
    let costo = 0;
    for (let article of productosCarrito) {
        costo = convertir(article.unitCost, article.currency);

        htmlToAppend += `
        <tr>
        <td><img src="${article.src}" class = "img-fluid" style ="max-width:60px!important"></td>
        <td class="align-middle">${article.name}</td>
        <td class="align-middle" id="unitCost${id}">${moneda} ${costo}</td>
        <td id="subtotal${id}">${article.count * costo}</td>
        <td class="align-middle"><input id="${id}" onchange="updateProductoSubtotal(${id});" type="number" min ="1" value=${article.count}></td>
        </tr>`

        id++;
    }

    htmlToAppend2 = `
        <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>Suma de subtotales </td>
        <td id="sumaSubtotal"></td>
        </tr>`



    document.getElementById("carritoo").innerHTML = htmlToAppend + htmlToAppend2;

}


function cambiarMonedas() {
    let costoUnitario = 0;
    let cantidad = 0;
    for (let i = 1; i <= productosCarrito.length; i++) {
        costoUnitario = convertir(productosCarrito[i - 1].unitCost, productosCarrito[i - 1].currency)
        cantidad = document.getElementById(i).value;
        if (cantidad <= 0) {
            cantidad = 1;
            document.getElementById(i).value = 1;        }
        document.getElementById("subtotal" + i).innerHTML = cantidad * costoUnitario;
        document.getElementById("unitCost" + i).innerHTML = moneda + " " + costoUnitario;

    }
    sumaSubtotales();
}

//mostrar suma de subtotales
function sumaSubtotales() {

    let subtotal = 0;
    for (let i = 1; i <= productosCarrito.length; i++) {

        subtotal = subtotal + parseFloat(document.getElementById("subtotal" + i).textContent);
    }

    document.getElementById("sumaSubtotal").innerHTML = subtotal;
    costos()
}
function costos() {
    var subtot = parseFloat(document.getElementById("sumaSubtotal").innerHTML)
    console.log(subtot)
    document.getElementById("ticketsubtotal").innerHTML = ` <h6 class=" text-muted"> ${subtot } </h6>`;
   //mas costo envio

}
function convertir(costo, currency) {
    if (moneda == 'UYU' && currency == 'USD') {
        costo = costo * 40;
    } else if (moneda == 'USD' && currency == 'UYU') {
        costo = costo / 40;
    }
    return costo;
}

async function getCarrito(url) {

    return fetch(url)
        .then(respuesta => {
            return respuesta.json();
        })

}


document.addEventListener("DOMContentLoaded", function (e) {
    getCarrito("https://japdevdep.github.io/ecommerce-api/cart/654.json")
        .then(respuesta => {
            productosCarrito = respuesta.articles;
            moneda = 'UYU';
            showCarrito();
            sumaSubtotales();

            document.getElementById("uruguayos").addEventListener("click", function (e) {
                moneda = 'UYU';
                cambiarMonedas();

            });
            document.getElementById("dolares").addEventListener("click", function (e) {
                moneda = 'USD';
                cambiarMonedas();

            });
            console.log(productosCarrito);
        })
})

document.getElementById("premium").addEventListener("click", function (e) {
    var subtot = parseFloat(document.getElementById("sumaSubtotal").innerHTML)
    var x = subtot + subtot * 0.15
    document.getElementById("total").innerHTML = ` <h6> ${ x}</h6>`;
    document.getElementById("envio").innerHTML =` <h6> ${ subtot * 0.15}</h6>`;
});
document.getElementById("express").addEventListener("click", function (e) {
    var subtot = parseFloat(document.getElementById("sumaSubtotal").innerHTML)
    var x = subtot + subtot * 0.07
    document.getElementById("total").innerHTML = ` <h6> ${ x}</h6>`;
    document.getElementById("envio").innerHTML =` <h6> ${ subtot * 0.07}</h6>`;
});
document.getElementById("standard").addEventListener("click", function (e) {
    var subtot = parseFloat(document.getElementById("sumaSubtotal").innerHTML)
    var x = subtot + subtot * 0.05
    document.getElementById("total").innerHTML = ` <h6> ${ x}</h6>`;
    document.getElementById("envio").innerHTML =` <h6> ${ subtot * 0.05}</h6>`;
});


 function agregarform(){
     var agregar = `  <form action="/action_page.php" class="was-validated">
     <div class="form-group">
       <label for="uname">Numero de tarjeta:</label>
       <input type="text" class="form-control" id="numtarjeta" placeholder="Ingrese numero de tarjeta" required>
       <div class="valid-feedback">Valido.</div>
       <div class="invalid-feedback">Complete este campo.</div>
     </div>
     <div class="form-group">
       <label for="pwd">Codigo de seg:</label>
       <input type="password" class="form-control" id="codigo" placeholder="Ingrese codigo"  required>
       <div class="valid-feedback">Valido.</div>
       <div class="invalid-feedback">Complete este campo.</div>
     </div>
     <div class="form-group">
       <label for="pwd">Vencimiento (MM/AA):</label>
       <input type="password" class="form-control" id="vencimiento" placeholder="Ingrese vencimiento"  required>
       <div class="valid-feedback">Valido.</div>
       <div class="invalid-feedback">Complete este campo.</div>
     </div>
    
   </form>`
   document.getElementById("addb").innerHTML= ""
     document.getElementById("add").innerHTML = agregar
 }
 function addb(){
    document.getElementById("add").innerHTML = ""
    document.getElementById("addb").innerHTML = ` <div class="form-group">
    <label for="pwd">Numero de cuenta:</label>
    <input type="password" class="form-control" id="num" placeholder="ingrese numero de cuenta" required>
    <div class="valid-feedback">Valid.</div>
    <div class="invalid-feedback">Please fill out this field.</div>
  </div>` 
 }