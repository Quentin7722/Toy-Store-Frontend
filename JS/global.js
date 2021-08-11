/*Rafraîchissement de la page*/

function onLoadCartNumbers() {
    let panier = JSON.parse(localStorage.getItem("products")) || [];
    let productNumbers = localStorage.getItem('products');
    if (productNumbers && panier.length > 0) {
        document.querySelector('.cart-span').textContent = panier.length;
    } else {
        document.querySelector('.cart-span').textContent = "";
    }
}