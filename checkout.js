// checkout.js

document.addEventListener("DOMContentLoaded", function() {
    const orderSummary = document.getElementById("order-summary");
    const totalAmount = document.getElementById("total-amount");
    
    // Retrieve cart data from local storage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    // Display the cart items in the order summary
    if (cart.length === 0) {
        orderSummary.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        orderSummary.innerHTML = cart.map((item) => {
            total += item.price;
            return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                    <div class="cart-item-info">
                        <p class="cart-item-title">${item.title}</p>
                        <p class="cart-item-price">#${item.price}.00</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Display the total amount
    totalAmount.textContent = `# ${total}.00`;

    // Handle form submission
    document.getElementById("billing-form").addEventListener("submit", function(event) {
        event.preventDefault();
        
        // Collect form data
        const formData = new FormData(event.target);
        
        // Add cart data to the form data
        formData.append("cart", JSON.stringify(cart));
        formData.append("total", total);

        // Send the data to the server
        fetch('process_order.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Order placed successfully!");
                // Clear cart
                localStorage.removeItem("cart");
                // Redirect to a thank you page or order confirmation page
                window.location.href = 'thank_you.html';
            } else {
                alert("There was an error processing your order. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("There was an error processing your order. Please try again.");
        });
    });
});
