/* Requête HTTP à l'API pour la page de description */

let quantity = document.getElementById('quantity');
let imgDescription = document.getElementById('img-des');
let textDescription = document.getElementById('txt-des');
let nameDescription = document.getElementById('name');
let price = document.getElementById('price');
let dropdown = document.getElementById('dropdown-menu');
let productlink = document.getElementById('product-link');
let url = window.location.search;
let id = url.split('=');

function description() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(this.responseText);
            imgDescription.innerHTML = `<img class="description-image col-md-12 col-sm-11" src="${response.imageUrl}" />`;
            textDescription.innerHTML = response.description;
            nameDescription.innerHTML = response.name;
            price.innerHTML = "prix : " + ((response.price / 100).toFixed(2)).toString().replace(".", ",") + " €";
            for (let i = 0; i < response.colors.length; i++) {
                dropdown.innerHTML += `<option>${response.colors[i]}</option>`;
            }
        }
    };
    request.open("GET", `http://localhost:3000/api/teddies/${url.slice(4, 35)}`);
    request.send();
}

description();

/* Ecoute de l'événement pour ajouter au panier */

let carts = document.getElementById('add-cart');

carts.addEventListener('click', () => {
    saveItems(id[1]);
})

/* Ajout du produit au panier */

function saveItems(productId) {
    
    let productQuantity = document.getElementById('quantity').value;
    let panier = JSON.parse(localStorage.getItem("products")) || [];
    var informationsObjet = {
        "id": productId
    };

    if (!panier) {
        for (var i = 0; i < productQuantity; i++) {
            localStorage.setItem("products", [JSON.stringify(informationsObjet)]);
        }
    } else {
        for (var i = 0; i < productQuantity; i++) {
            panier.push(informationsObjet);
            localStorage.setItem("products", [JSON.stringify(panier)]);
        }
    }
    document.querySelector('.cart-span').textContent = panier.length;
};

// Sélection de la quantité de produit

var select = '';
for (i=1;i<=10;i++){
    select += '<option val=' + i + '>' + i + '</option>';
}
 quantity.innerHTML = select;
onLoadCartNumbers(); 
