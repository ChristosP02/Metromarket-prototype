let cartTotal = 0;
let cartCount = 0;

/* Quantity button controls */
function changeQty(button, delta) {
    const card = button.closest('.product-card');
    const qtyEl = card.querySelector('.qty-value');
    let qty = parseInt(qtyEl.textContent, 10) || 1;

    qty += delta;
    if (qty < 1) qty = 1;

    qtyEl.textContent = qty;
}

/* Add items to cart and show a toast notification */
function addToCart(button, name, price) {
    const card = button.closest('.product-card');
    const qtyEl = card.querySelector('.qty-value');
    const qty = parseInt(qtyEl.textContent, 10) || 1;

    const lineTotal = price * qty;
    cartTotal += lineTotal;
    cartCount += qty;

    document.getElementById("cart-total").textContent = `$${cartTotal.toFixed(2)}`;
    document.getElementById("cart-count").textContent = cartCount;

    showToast(`Added ${qty} × ${name}`, `Cart total: $${cartTotal.toFixed(2)}`);
}

/* Create and display a toast message */
function showToast(title, subtitle) {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.innerHTML = `<strong>${title}</strong><br><span>${subtitle}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/* Banner data for manual switching */
const banners = [
    {
        title: "DASH IN FOR",
        subtitle: "GREAT DEALS",
        tagline: "THIS XMAS",
        colors: ["#1a1d27", "#0d0f16"]
    },
    {
        title: "FRESH SAVINGS",
        subtitle: "FRUIT & VEG",
        tagline: "EVERYDAY VALUE",
        colors: ["#155e1a", "#0c3b10"]
    },
    {
        title: "BACK TO SCHOOL",
        subtitle: "LUNCH BOX",
        tagline: "SNACKS & MORE",
        colors: ["#153e75", "#0c274a"]
    }
];

let currentBanner = 0;

/* Update the banner content and active dot */
function updateBanner() {
    const b = banners[currentBanner];
    document.getElementById("banner-title").textContent = b.title;
    document.getElementById("banner-subtitle").textContent = b.subtitle;
    document.getElementById("banner-tagline").textContent = b.tagline;

    const banner = document.querySelector(".banner");
    banner.style.background = `linear-gradient(to right, ${b.colors[0]}, ${b.colors[1]})`;

    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentBanner);
    });
}

/* Banner navigation */
function nextBanner() {
    currentBanner = (currentBanner + 1) % banners.length;
    updateBanner();
}

function prevBanner() {
    currentBanner = (currentBanner - 1 + banners.length) % banners.length;
    updateBanner();
}

function setBanner(index) {
    currentBanner = index;
    updateBanner();
}

/* Form submission and store selector events */
document.addEventListener("DOMContentLoaded", () => {

    updateBanner();

    // Contact form handling
    const form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !subject || !message) {
                showToast("Please fill in all required fields.", "");
                return;
            }

            showToast("Message sent!", `Thanks, ${name}. We'll get back to you soon.`);
            form.reset();
        });
    }

    // Store selection dropdown
    const storeSelect = document.getElementById("store-select");
    if (storeSelect) {
        storeSelect.addEventListener("change", (e) => {
            const store = e.target.value;
            showToast("Store updated", `Current store: ${store}`);
        });
    }
});
