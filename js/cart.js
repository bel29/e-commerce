const USD = 40;
const ENVIOS = { standar: 5, express: 7, premium: 15 };
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


function showCarrito(cart) {
    htmlContentToAppend = '';
    for (let i = 0; i < cart.length; i++) {
        htmlContentToAppend += `
        <tr onchange="update(event)">
        <th scope="col" class="${'prod'+i}"><img src="${cart[i].src}" width="100px"></th>
            <th scope="col" class="${'prod'+i}">${cart[i].name}</th>
            <th scope="col" class="${'prod'+i}">${cart[i].currency} <span class="cost">${cart[i].unitCost}</span></th>
            <th scope="col" class="${'prod'+i}"><input type="number" min="1" value="${cart[i].count}" data-class="${'prod'+i}"></th>
            <th scope="col" class="${'prod'+i}">${cart[i].currency} <span class="subTotal" data-currency="${cart[i].currency}" data-subtotal="${cart[i].unitCost * cart[i].count}">${cart[i].unitCost * cart[i].count}</span></th>
            </tr>
            `
        }
        document.getElementById('products').innerHTML = htmlContentToAppend;
        ActualizarCostos();
    }
    
    function update(event) {
        dataProd = document.getElementsByClassName(event.target.dataset.class);
        // act subtotal
        if (parseInt(dataProd[3].getElementsByTagName('input')[0].value) <= 0) {
            dataProd[3].getElementsByTagName('input')[0].value = 1;
        }
        let subtotal = parseFloat(dataProd[2].getElementsByClassName('cost')[0].innerHTML) * parseInt(dataProd[3].getElementsByTagName('input')[0].value);
        let elem = dataProd[4].getElementsByClassName('subTotal')[0];
        elem.innerHTML = subtotal;
        elem.dataset.subtotal = subtotal;
        ActualizarCostos();
    }
    
    function ActualizarCostos() {
        let Tipoenvio = document.querySelector('input[type=radio]:checked');
        let subtotal = 0;
        let costoEnvio = 0;
        let total = 0;
        let subtotalProds = document.getElementsByClassName('subTotal');
        for (elem of subtotalProds) {
            if (elem.dataset.currency === 'USD') {
              
                subtotal += USD * parseFloat(elem.dataset.subtotal);
            } else {
                subtotal += parseFloat(elem.dataset.subtotal);
            }
        }
    
        document.getElementById('sub').innerHTML = subtotal;
     
        costoEnvio = subtotal * ENVIOS[Tipoenvio.id] / 100;
        document.getElementById('env').innerHTML = costoEnvio;
       
        total = subtotal + costoEnvio;
        document.getElementById('total').innerHTML = total;
      
    }
    
    function comprar(nameForm) {
        let form = document.getElementById(nameForm);
        let error = '';
        for (let input of document.getElementsByClassName(nameForm + 'req')) {
            if (input.value === '') {
                error = alert(" Asegurese de completar los campos correspondientes a la direccion" );
                break;
            }
        }
        
        if (error === '') {
            form.reset();
          
            localStorage.setItem('compraExitosa', 'true');
        
        } else {
           
            return false;
        }
    }
    document.addEventListener("DOMContentLoaded", function(e) {
        getJSONData(CART_LETRA).then(cart => {
            if (cart.status === 'ok') {
                articles = cart.data.articles;
                showCarrito(articles);
             
            }
        });
        
        if (localStorage.getItem('compraExitosa') === 'true') {
            localStorage.removeItem('compraExitosa');
            document.getElementById('compraExitosa').innerHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Su compra se realizo exitosamente.</strong> 
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `;
        }
    });