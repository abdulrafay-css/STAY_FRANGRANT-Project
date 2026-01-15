/*   NAVBAR GLOW   */

window.addEventListener("scroll", () => {
    const nav = document.querySelector(".navbar");
    if (!nav) return;

    if (window.scrollY > 10) {
        nav.style.boxShadow = "0 0 25px rgba(255,140,0,0.3)";
    } else {
        nav.style.boxShadow = "none";
    }
});

/*   BUTTON GLOW   */
document.querySelectorAll(".login-btn, .hero-btn").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        btn.style.boxShadow = "0 0 20px #ff8c00";
    });
    btn.addEventListener("mouseleave", () => {
        btn.style.boxShadow = "none";
    });
});

/*    PRODUCT 3D HOVER    */

document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("mousemove", e => {
        const x = e.offsetX;
        const y = e.offsetY;
        const w = card.clientWidth;
        const h = card.clientHeight;

        const rotateX = ((y / h) - 0.5) * 10;
        const rotateY = ((x / w) - 0.5) * -10;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0) scale(1)";
    });
});

/*     DROPDOWN FADE    */

document.querySelectorAll(".dropdown").forEach(menu => {
    const drop = menu.querySelector(".dropdown-menu");
    if (!drop) return;

    menu.addEventListener("mouseenter", () => {
        drop.style.display = "block";
        drop.style.opacity = 0;
        setTimeout(() => drop.style.opacity = 1, 10);
    });

    menu.addEventListener("mouseleave", () => {
        drop.style.opacity = 0;
        setTimeout(() => drop.style.display = "none", 300);
    });
});

/*    INFINITE SLIDER (NO STUTTER)    */

const slider = document.querySelector(".slider-inner");
const track = document.querySelector(".slider-track");

if (slider && track) {
    let pos = 0;
    const speed = 0.5;
    let isPaused = false;

    slider.addEventListener("mouseenter", () => isPaused = true);
    slider.addEventListener("mouseleave", () => isPaused = false);

    function loop() {
        if (!isPaused) {
            pos -= speed;

            if (Math.abs(pos) >= track.scrollWidth / 2) {
                pos = 0;
            }

            slider.style.transform = `translateX(${pos}px)`;
        }

        requestAnimationFrame(loop);
    }

    loop();
}

/* CART */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price){
    cart.push({name, price});
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart!");
}
