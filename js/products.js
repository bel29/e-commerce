//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var productsArray = [];
var prod = [];
const ORDER_ASC_BY_PRICE = "mayor_precio";
const ORDER_DESC_BY_PRICE = "menor_precio";
const ORDER_BY_SOLD_COUNT = "Sold.";
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;


function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if ( aCount < bCount ){ return -1; }
            if ( aCount > bCount ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });
    
    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });
    
    document.getElementById("sortBySoldC").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });
    
        document.getElementById("clearRangeFilter").addEventListener("click", function(){
            document.getElementById("rangeFilterCostMin").value = "";
            document.getElementById("rangeFilterCostMax").value = "";
    
            minCost = undefined;
            maxCost = undefined;
    
            showProductsList();
        });
        document.getElementById("rangeFilterCost").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;
    
        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }
    
        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }
    
        showProductsList();
    });
    });
function sortAndShowProducts(sortCriteria, prodArray){
    currentSortCriteria = sortCriteria;
    
    if(prodArray != undefined){
        productsArray = prodArray;
    }

    productsArray = sortProducts(currentSortCriteria, productsArray);

    //Muestro los prod ordenados
    showProductsList();
}
//Funcion para mostrar los productos
function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < productsArray.length ; i++){
        let product = productsArray[i];
        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
        ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))){

        htmlContentToAppend += `
        <a href="product-info.html" class=" list-group-item-action">
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class=" snip1325 snip0015 col-3">
                <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                <figcaption> </figcaption>
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name +`</h4>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small>
                        </div>
                        <p class="text-muted">` + product.description + ` </p>
                        <p class = "mb-1 precio">  `+ product.currency+ `   `+product.cost +`   </p>

                </div>
            </div>
        </div>
        </a>
        `
        }
        document.getElementById("product-list-container").innerHTML = htmlContentToAppend; //Los agrego con inner
    }
}

