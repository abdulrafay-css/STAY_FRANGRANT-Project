/*  SHOPPING CART   */


// Store cart in memory (works across pages during same session)
window.cartItems = window.cartItems || [];

// Load cart from sessionStorage when page loads
function loadCart() {
    try {
        const saved = sessionStorage.getItem("stayFragrantCart");
        if (saved) {
            window.cartItems = JSON.parse(saved);
        }
    } catch (e) {
        console.log("Cart loaded from memory");
    }
}

// Save cart to sessionStorage
function saveCart() {
    try {
        sessionStorage.setItem("stayFragrantCart", JSON.stringify(window.cartItems));
    } catch (e) {
        console.log("Cart saved in memory");
    }
}

// Add item to cart
function addToCart(productName, productPrice) {
    // Add item to cart
    window.cartItems.push({
        name: productName,
        price: productPrice
    });

    // Save cart
    saveCart();

    // Show message
    alert(productName + " added to cart!");
}

// Display cart items on cart.html page
function displayCart() {
    // Load cart data
    loadCart();

    // Get elements
    const container = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");

    // Check if we're on cart page
    if (!container || !totalElement) return;

    // Clear container
    container.innerHTML = "";

    // If cart is empty
    if (window.cartItems.length === 0) {
        container.innerHTML = "<p>Your cart is empty!</p>";
        totalElement.innerText = "Total: Rs. 0";
        return;
    }

    // Calculate total
    let total = 0;

    // Display each item
    window.cartItems.forEach(function(item, index) {
        const itemDiv = document.createElement("div");
        itemDiv.style.marginBottom = "15px";
        itemDiv.innerHTML = `
            <p style="font-size: 16px;">
                <strong>${item.name}</strong> - Rs. ${item.price}
                <button onclick="removeItem(${index})" style="margin-left: 15px; padding: 8px 15px; background: #ff4444; color: white; border: none; border-radius: 20px; cursor: pointer; font-weight: 600;">
                    Remove
                </button>
            </p>
        `;
        container.appendChild(itemDiv);

        // Add to total
        total += item.price;
    });

    // Show total
    totalElement.innerText = "Total: Rs. " + total;
}

// Remove item from cart
function removeItem(index) {
    window.cartItems.splice(index, 1);
    saveCart();
    displayCart();
    alert("Item removed!");
}

// Clear entire cart
function clearCart() {
    window.cartItems = [];
    saveCart();
    displayCart();
    alert("Cart cleared!");
}

// Initialize cart when page loads
loadCart();

// Auto-run displayCart if on cart page
if (document.getElementById("cart-items")) {
    displayCart();
}



/*  NAVBAR GLOW WHEN SCROLLING  */


window.addEventListener("scroll", function() {
    const nav = document.querySelector(".navbar");
    if (!nav) return;

    if (window.scrollY > 10) {
        nav.style.boxShadow = "0 0 25px rgba(255,140,0,0.3)";
    } else {
        nav.style.boxShadow = "none";
    }
});


/*  BUTTON GLOW EFFECT  */

const buttons = document.querySelectorAll(".login-btn, .hero-btn");

buttons.forEach(function(button) {
    button.addEventListener("mouseenter", function() {
        button.style.boxShadow = "0 0 20px #ff8c00";
    });

    button.addEventListener("mouseleave", function() {
        button.style.boxShadow = "none";
    });
});

/* PRODUCT CARD TILT EFFECT  */

const productCards = document.querySelectorAll(".product-card");

productCards.forEach(function(card) {
    card.addEventListener("mousemove", function(e) {
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;
        const cardWidth = card.clientWidth;
        const cardHeight = card.clientHeight;

        const tiltX = ((mouseY / cardHeight) - 0.5) * 10;
        const tiltY = ((mouseX / cardWidth) - 0.5) * -10;

        card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
    });

    card.addEventListener("mouseleave", function() {
        card.style.transform = "rotateX(0) rotateY(0) scale(1)";
    });
});


/* DROPDOWN MENU FADE IN */

const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(function(menu) {
    const dropdownContent = menu.querySelector(".dropdown-menu");
    if (!dropdownContent) return;

    menu.addEventListener("mouseenter", function() {
        dropdownContent.style.display = "block";
        dropdownContent.style.opacity = 0;
        setTimeout(function() {
            dropdownContent.style.opacity = 1;
        }, 10);
    });

    menu.addEventListener("mouseleave", function() {
        dropdownContent.style.opacity = 0;
        setTimeout(function() {
            dropdownContent.style.display = "none";
        }, 300);
    });
});