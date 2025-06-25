// More real products with reliable images from Unsplash and Pexels
const products = [
    {
        name: "Wireless Headphones",
        desc: "High-fidelity sound, noise-cancelling, 30h battery.",
        price: 69.99,
        img: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80"
    },
    {
        name: "Smart Watch",
        desc: "Track your health, notifications, water-resistant.",
        price: 99.99,
        img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80"
    },
    {
        name: "Bluetooth Speaker",
        desc: "Portable, deep bass, 12h playtime.",
        price: 39.99,
        img: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=400&q=80"
    },
    {
        name: "Fitness Tracker",
        desc: "Step counter, heart rate, sleep tracking.",
        price: 27.99,
        img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
    },
    {
        name: "DSLR Camera",
        desc: "Capture stunning photos, 24MP, Wi-Fi enabled.",
        price: 499.99,
        img: "https://images.unsplash.com/photo-1519183071298-a2962be56693?auto=format&fit=crop&w=400&q=80"
    },
    {
        name: "Tablet Pro 10\"",
        desc: "Ultra-fast, 128GB, vivid display, lightweight.",
        price: 299.99,
        img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
    },
    {
        name: "Gaming Mouse",
        desc: "Ergonomic, RGB lights, 16000 DPI, wired.",
        price: 59.99,
        img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80"
    },
    {
        name: "Laptop Stand",
        desc: "Adjustable height, aluminum, fits all laptops.",
        price: 42.50,
        img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=400&q=80"
    },
    {
        name: "Smartphone - 128GB",
        desc: "Latest model, high-res camera, long battery.",
        price: 699.99,
        img: "https://images.unsplash.com/photo-1512499617640-c2f999098c01?auto=format&fit=crop&w=400&q=80"
    },
    {
        name: "Wireless Charger",
        desc: "Fast charging, universal compatibility, compact.",
        price: 19.99,
        img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80"
    }
];

// Render products
function renderProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    products.forEach((prod, idx) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
      <img src="${prod.img}" alt="${prod.name}" class="product-img"/>
      <h4>${prod.name}</h4>
      <p>${prod.desc}</p>
      <div class="product-price">$${prod.price.toFixed(2)}</div>
      <button class="add-to-cart" data-idx="${idx}">Add to Cart</button>
    `;
        grid.appendChild(card);
    });
}

// Add to cart functionality
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('add-to-cart')) {
        const idx = e.target.getAttribute('data-idx');
        const prod = products[idx];
        alert(`Added "${prod.name}" to cart!`);
    }
});

// Newsletter form (if exists)
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing, ${email}!`);
        this.reset();
    });
}

// Contact form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        // Normally, you'd send data to a server here
        document.getElementById('contact-success').classList.remove('hidden');
        setTimeout(() => {
            document.getElementById('contact-success').classList.add('hidden');
            contactForm.reset();
        }, 3500);
    });
}

// Run on page load
renderProducts();
