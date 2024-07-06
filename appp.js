// products.js

// Product data
const product = [
    { id: 0, image: '3.jpg', title: 'Coconut', price: 7000 },
    { id: 1, image: '3.jpg', title: 'Coconut 2', price: 220000 },
    { id: 2, image: '3.jpg', title: 'A la Coco', price: 3220000 },
    { id: 3, image: '3.jpg', title: 'Bruised Ego', price: 720000 }
];

// Render product cards on the page
const categories = [...new Set(product.map(item => item))];
let i = 0;

document.getElementById('root').innerHTML = categories.map(item => {
    var { image, title, price } = item;
    return (
        `<div class='box'>
            <div class='img-box'>
                <img class='images' src='${image}' alt='${title}'>
            </div>
            <div class='bottom'>
                <p>${title}</p>
                <h2># ${price}.00</h2>` +
        "<button onclick='addtocart(" + (i++) + ")'>Add To Cart</button>" +
        `</div>
        </div>`
    );
}).join('');

var cart = [];

// Function to update cart count
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cart.length;
}

// Load cart from local storage and update count on page load
window.onload = function() {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = savedCart;
    updateCartCount();
    renderCartItems();
}

// Toggle cart dropdown visibility
// function toggleCart() {
//     const cartDropdown = document.getElementById('cart-dropdown');
//     cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
// }

// JavaScript to Toggle Nav Links
function toggleNavLinks() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show'); // Toggle the 'show' class
}




function toggleCart() {
    const cartDropdown = document.getElementById('cart-dropdown');
    if (cartDropdown.style.display === 'block') {
        cartDropdown.style.display = 'none';
    } else {
        cartDropdown.style.display = 'block';
    }
}





function addtocart(a) {
    cart.push({ ...categories[a] });
    saveCartToLocalStorage();
    updateCartCount();
    renderCartItems();
}

function delElement(index) {
    cart.splice(index, 1);
    saveCartToLocalStorage();
    updateCartCount();
    renderCartItems();
}

// Function to render cart items in the dropdown
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    cartItemsContainer.innerHTML = ''; // Clear the container

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your Cart is Empty</p>';
    } else {
        let total = 0;

        cart.forEach((item, index) => {
            const { image, title, price } = item;
            total += price;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <div class="cart-item-content">
                    <img src='${image}' alt='${title}' class='cart-item-image'>
                    <div class='cart-item-details'>
                        <p class='cart-item-title'>${title}</p>
                        <p class='cart-item-price'># ${price}.00</p>
                    </div>
                </div>
                <button class='cart-item-remove' onclick='delElement(${index})'>
                    <i class='fas fa-trash'></i> <!-- Updated icon class to include font awesome icon -->
                </button>
            `;

            cartItemsContainer.appendChild(cartItem);
        });

        // Update total price
        document.getElementById('cart-total').textContent = `# ${total}.00`;

        // Show the checkout button if there are items in the cart
        const checkoutButton = document.getElementById('checkout-btn');
        checkoutButton.style.display = cart.length > 0 ? 'block' : 'none';
    }
}

// Save cart to local storage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Checkout function to redirect to checkout page
function checkout() {
    saveCartToLocalStorage();
    window.location.href = 'checkout.html'; // Redirect to checkout page
}