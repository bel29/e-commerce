var prod= [];

function showImagesGallery(array){

    let imageSrc = array[0];
    let htmlContentToAppend = "";
    htmlContentToAppend += `
    <div class="carousel-inner">
<div class="carousel-item active">
  <img class="d-block w-100" src="${imageSrc}" alt="First slide">
</div> `
    for(let i = 0; i < array.length; i++){
        let img = array[i]

        htmlContentToAppend += `
      
    <div class="carousel-item">
      <img class="d-block w-100" src="${img}" alt="Second slide">
    </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            prod = resultObj.data;
            
            let ProductNameHTML  = document.getElementById("productName");
            let ProductDescriptionHTML = document.getElementById("productDescription");
            let ProductSoldCountHTML = document.getElementById("SoldCount");
            let ProductCategoryHTML = document.getElementById("productCategory");
            let ProductCostHTML = document.getElementById("productCost");
        
            ProductNameHTML.innerHTML = prod.name;
            ProductDescriptionHTML.innerHTML = prod.description;
            ProductSoldCountHTML.innerHTML = prod.soldCount;
            ProductCategoryHTML.innerHTML = prod.category;
            ProductCostHTML.innerHTML = prod.currency + ' ' + prod.cost;

            //Muestro las imagenes en forma de galería
            showImagesGallery(prod.images);
            getJSONData(PRODUCTS_URL).then(function (resultObj2) {
                if (resultObj2.status === "ok") {
                    productos = resultObj2.data;
                    related = prod.relatedProducts;
                    agregarProductosRelacionados(productos, related)
                
                }
            });
        }
        });

        function agregarProductosRelacionados(products, related){
            let htmlContentToAppend = "";
        
            for (let i = 0; i < related.length; i++) {
                let prodRel = products[related[i]];
                htmlContentToAppend += `
                <td>
                <div  class="card text-dark bg-light mb-3" style="max-width: 18rem; display= inline-block;" >
                    <img class="card-img-top" src="${prodRel.imgSrc}" alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title">${prodRel.name}</h5>
                      <p class="card-text">${prodRel.description}</p>
                      <a href="#" class="btn btn-primary">Ver</a>
                    </div>
                </div>
                </td>
                `
                document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
            }
        }



        getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj2){
            coment = resultObj2.data
            
            
            let htmlContentToAppend = "";
            
            for(let i = 0; i < coment.length; i++){
                var pintadas = "";
                let comentario = coment[i];
                for (let i=1; i<=comentario.score;i++){
                    pintadas+= `<span class="fa fa-star checked"></span>`
                 }
         
         var sinpintar = "";
                 for (let i=1; i<=5-comentario.score;i++){
                     sinpintar += `<span class="fa fa-star"></span>`
                 }
                htmlContentToAppend += `  <div class="d-flex flex-row align-items-center commented-user">
                <h5 class="mr-2" >${comentario.user}</h5><span class="dot mb-1"></span><span class="mb-1 ml-2">${comentario.dateTime}</span>
            </div>
            <div class="comment-text-sm"><span>${comentario.description}</span></div>
            <div class="reply-section">
                <div class="d-flex flex-row align-items-center voting-icons"><i class="fa fa-sort-up fa-2x mt-3 hit-voting"></i><i class="fa fa-sort-down fa-2x mb-3 hit-voting"></i><span class="ml-2">0</span><span class="dot ml-2"></span>
                    <h6 class="ml-2 mt-1">Puntuacion 
                    ${pintadas}${sinpintar}
                    </h6>
                </div>
            </div>`
        
        
                document.getElementById("comment").innerHTML = htmlContentToAppend;
        
              
            }
           
        })
    });
    function agregarComentario(){
        let date = new Date();
    
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
    
        if(month < 10){
            month = `0${month}`;
        }
        if (day < 10){
            day = `0${day}`;
        }
        var hour = date.getHours();
        if (hour < 10){
            hour = `0${hour}`;
        }
       
        var dateTime = `${year}-${month}-${day} `;
        var agregar = document.getElementById("comentario").value
        var user = JSON.parse(localStorage.getItem("usuario"))
        var pintadas = "";
        var score = document.getElementById("score").value
        for (let i=1; i<=score;i++){
           pintadas+= `<span class="fa fa-star checked"></span>`
        }

var sinpintar = "";
        for (let i=1; i<=5-score;i++){
            sinpintar += `<span class="fa fa-star"></span>`
        }
        let htmlContentToAppend = "";
         htmlContentToAppend  += `  <div class="d-flex flex-row align-items-center commented-user">
        <h5 class="mr-2" >${user[0]}</h5><span class="dot mb-1"></span><span class="mb-1 ml-2">${dateTime}</span>
    </div>
    <div class="comment-text-sm"><span>${agregar}</span></div>
    <div class="reply-section">
        <div class="d-flex flex-row align-items-center voting-icons"><i class="fa fa-sort-up fa-2x mt-3 hit-voting"></i><i class="fa fa-sort-down fa-2x mb-3 hit-voting"></i><span class="ml-2">0</span><span class="dot ml-2"></span>
            <h6 class="ml-2 mt-1">Puntuacion 
           ${pintadas}${sinpintar}
            </h6>
        </div>
    </div>`


        document.getElementById("comment").innerHTML += htmlContentToAppend;
    }

 