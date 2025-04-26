// Sample Product Data
const products = [
    { id: 1, name: "Monstera Deliciosa", price: 29.99, image: "https://via.placeholder.com/200" },
    { id: 2, name: "Snake Plant", price: 19.99, image: "https://via.placeholder.com/200" },
    { id: 3, name: "Fiddle Leaf Fig", price: 39.99, image: "https://via.placeholder.com/200" },
    { id: 4, name: "Pothos", price: 14.99, image: "https://via.placeholder.com/200" },
    { id: 5, name: "ZZ Plant", price: 24.99, image: "https://via.placeholder.com/200" },
    { id: 6, name: "Peace Lily", price: 22.99, image: "https://via.placeholder.com/200" },
];

// Cart State
let cart = [];

// DOM Elements
const productGrid = document.getElementById("product-grid");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const checkoutBtn = document.getElementById("checkout-btn");

// Render Products
function renderProducts() {
    productGrid.innerHTML = "";
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
    });
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update Cart UI
function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <span>${item.name} (${item.quantity})</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Checkout
checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert(`Order placed! Total: $${cartTotal.textContent}`);
        cart = [];
        updateCart();
    }
});

// Initialize
renderProducts();
updateCart();