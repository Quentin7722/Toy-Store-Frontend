let cartTitles = document.getElementById('cart-titles');
let panierHtml = document.getElementById('panier');
let totalProduct = document.getElementById('total-product');
let total = null;
let newForm = document.getElementById('new-form');
let firstName = document.getElementById('first-name');
let secondName = document.getElementById('name');
let email = document.getElementById('input-email');
let address = document.getElementById('input-address');
let city = document.getElementById('input-city');
let formBtn = document.getElementById('form-btn');
let form = document.getElementsByClassName('form');

onLoadCartNumbers();

/*Requête HTTP à l'API pour la page du panier*/

function getProduct(productId) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(this.responseText);
            const result = response.filter(item => item._id === productId);
            let product = result[0];
            total += product.price * quantity[productId];
            document.getElementById("cart-title").textContent = "Votre panier"
            cartTitles.innerHTML = `<h2 class="cart-titles col-md-2 offset-md-4 col-sm-2 col-2 offset-sm-3 offset-3">Nom</h2><h2 class="cart-titles title-quantity col-md-3 col-sm-4 col-4">Quantité</h2><h2 class="cart-titles col-md-3 col-sm-2 col-2">Prix</h2>`
            panierHtml.innerHTML += `<div class="row cart-line">
                <a href="" class="col-md-1 col-sm-1 col-1 child" onclick="deleteItem('${productId}')"><i class="fas fa-times-circle"></i></a>
                <div class="cart col-md-2 col-sm-2 col-2"><img class="cart cart-image " src="${product.imageUrl}"/></div>
                <p class="cart cart-name col-md-2 offset-md-1 col-sm-2 col-2 offset-md-1">${product.name}</p>
                <p class="cart cart-quantity col-md-2 col-sm-4 col-4"><a href="" id="arrow-left" onclick="removeItem('${productId}')"><i class="fas fa-minus-circle"></i></a> ${quantity[productId]} <a href="" id="arrow-right" onclick="addItem('${productId}')"><i class="fas fa-plus-circle" ></i></a></p>      
                <p class="cart cart-price col-md-3 offset-md-1  col-sm-1 col-1 offset-md-1">${(((product.price * quantity[productId]) / 100).toFixed(2)).toString().replace(".", ",")} €</p>
            </div>`
            totalProduct.innerHTML = `<p class="total col-md-12 col-sm-12">(${tableauPanier.length} articles) Sous-total : ${((total / 100).toFixed(2)).toString().replace(".", ",")} €</p>`
        }
    };
    request.open("GET", "http://localhost:3000/api/teddies");
    request.send();
}

// Fonction pour supprimer un ou plusieurs articles

function deleteItem(product) {
    let panier = JSON.parse(localStorage.getItem("products"));
    const removedItems = panier.filter(item => item.id != product);
    localStorage.setItem("products", [JSON.stringify(removedItems)]);
}

// Fonction pour supprimer un seul article

function removeItem(product) {
    let panier = JSON.parse(localStorage.getItem("products"));
    var removeIndex = panier.map(function (item) { return item.id; }).indexOf(product);
    panier.splice(removeIndex, 1);
    localStorage.setItem("products", [JSON.stringify(panier)]);
}

// Fonction pour ajouter un article

function addItem(product) {
    let panier = JSON.parse(localStorage.getItem("products"));
    var informationsObjet = {
        "id": product
    };
    panier.push(informationsObjet);
    localStorage.setItem("products", [JSON.stringify(panier)]);
}

// Boucle pour la quantité

let tableauPanier = JSON.parse(localStorage.getItem("products"));
var quantity = {};
for (var i = 0; i < tableauPanier.length; i++) {
    let key = tableauPanier[i].id;
    if (key in quantity) {
        quantity[key] += 1;
    }
    else {
        getProduct(key);
        quantity[key] = 1;
    }
}

// Ecoute de l'évenement pour soumettre le formulaire

formBtn.addEventListener('click', (event) => {
    event.preventDefault();
    validation();
});

// Fonctions pour vérifier les champs du formulaire

function validation() {

    const firstNameValue = firstName.value.trim();
    const nameValue = secondName.value.trim();
    const emailValue = email.value.trim();
    const addressValue = address.value.trim();
    const cityValue = city.value.trim();

    if (firstNameValue === '') {
        setErrorFor(firstName, 'Le champ prénom est vide');
    } else if (!isName(firstNameValue)) {
        setErrorFor(firstName, "Le prénom n'est pas valide");
    } else {
        setSuccessFor(firstName);
    }

    if (nameValue === '') {
        setErrorFor(secondName, 'Le champ nom est vide');
    } else if (!isName(nameValue)) {
        setErrorFor(secondName, "Le nom n'est pas valide");
    } else {
        setSuccessFor(secondName);
    }

    if (emailValue === '') {
        setErrorFor(email, 'Le champ email est vide');
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, "L'email est pas valide");
    } else {
        setSuccessFor(email);
    }

    if (addressValue === '') {
        setErrorFor(address, 'Le champ adresse est vide');
    } else if (!isAddress(addressValue)) {
        setErrorFor(address, "L'adresse est pas valide");
    } else {
        setSuccessFor(address);
    }

    if (cityValue === '') {
        setErrorFor(city, 'Le champ ville est vide');
    } else if (!isName(cityValue)) {
        setErrorFor(city, "La ville n'est pas valide");
    } else {
        setSuccessFor(city);
    }

    if (isName(firstNameValue) == true && isName(nameValue) == true && isEmail(emailValue) && isAddress(addressValue) == true && isName(cityValue) == true) {
        send();
    }
}

function isName(name) {
    return /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/.test(name);
}
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
function isAddress(address) {
    return /[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*/.test(address);
}

// Fonction pour afficher une erreur dans le formulaire

function setErrorFor(input, message) {
    const formGroup = input.parentElement;
    const small = formGroup.querySelector('small');
    formGroup.className = 'form-group error';
    small.innerText = message;
}

// Fonction pour afficher la validation du formulaire

function setSuccessFor(input) {
    const formGroup = input.parentElement;
    formGroup.className = 'form-group success';
}

// Requête HTTP à l'API pour l'envoi de la commande

function send() {

    var arrayLoop = [];
    for (var i = 0; i < tableauPanier.length; i++) {
        arrayLoop.push(tableauPanier[i].id);
    }
    const opts = {
        contact: {
            firstName: firstName.value,
            lastName: secondName.value,
            email: email.value,
            address: address.value,
            city: city.value
        },
        products: arrayLoop
    }

    fetch('http://localhost:3000/api/teddies/order', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(opts)
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        localStorage.setItem("orderId", [JSON.stringify(data.orderId)]);
        localStorage.setItem("total", [JSON.stringify(total)]);
        document.location.href = "confirmation.html";
    });
}

// Fonction pour cacher le formulaire

function displayForm() {
    if (Array.isArray(tableauPanier) && tableauPanier.length) {
        newForm.className = 'form-submit';
    } else {
        newForm.className = 'form-hidden';
    }
}

displayForm();
onLoadCartNumbers();





