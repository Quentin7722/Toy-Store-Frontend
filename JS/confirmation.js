let orderPrice = document.getElementById('order-price');
let orderId = document.getElementById('order-id');

// Affichage de l'indentifiant de la commande et de son montant total

function confirmation() {
  let total = JSON.parse(localStorage.getItem("total"));
  let id = JSON.parse(localStorage.getItem("orderId"));
  orderId.textContent = "Votre identifiant de commande est : " + id;
  orderPrice.textContent = "Le montant total de votre commande est de : " + ((total / 100).toFixed(2)).toString().replace(".", ",") + " €";
  localStorage.clear();
}

confirmation();