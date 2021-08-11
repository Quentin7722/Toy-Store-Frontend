/* Requête HTTP à l'API pour la page d'acceuil' */

let listproduct = document.getElementById('list-product');

function index() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(this.responseText);
            for (let i = 0; i < response.length; i++) {
                let item = response[i];
                listproduct.innerHTML += `
                <a class="col-sm-12 col-md-10 col-lg-4 product-link" href="Product.html?id=${item._id}">
                    <div class="product span3">
                        <img class="product-image col-md-12 col-sm-11" src="${item.imageUrl}" />
                        <h3 class="product-name">${item.name}</h3>       
                        <p class="product-price">${((item.price / 100).toFixed(2)).toString().replace(".", ",")} €</p>
                        <button class="btn btn-primary" type="button">En savoir plus</button>
                    </div>
                </a>`;
            }
        }
    };
    request.open("GET", "http://localhost:3000/api/teddies");
    request.send();
}

onLoadCartNumbers();
index();






