const products = [
  {
    id: "seaside",
    name: "Seaside Drift",
    description: "Bright citrus with marine musk and white woods.",
    price: 98,
    tags: ["Fresh", "Citrus", "Day"],
  },
  {
    id: "noir",
    name: "Noir Atelier",
    description: "Black pepper, suede, and smoky vetiver.",
    price: 112,
    tags: ["Woody", "Night"],
  },
  {
    id: "copper",
    name: "Copper Ember",
    description: "Spiced amber with vanilla and tonka bean.",
    price: 120,
    tags: ["Amber", "Warm"],
  },
  {
    id: "garden",
    name: "Garden Linen",
    description: "Green fig leaves, jasmine, and crisp cotton.",
    price: 96,
    tags: ["Floral", "Clean"],
  },
];

const cart = [];

const grid = document.getElementById("product-grid");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const cartPanel = document.getElementById("cart");
const openCart = document.getElementById("open-cart");
const closeCart = document.getElementById("close-cart");

const formatCurrency = (value) => `$${value}`;

const renderProducts = () => {
  grid.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="tags">
        ${product.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
      <div class="price-row">
        <span>${formatCurrency(product.price)}</span>
        <button class="primary" data-product="${product.id}">Add to cart</button>
      </div>
    `;
    grid.appendChild(card);
  });
};

const renderCart = () => {
  cartItems.innerHTML = "";
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
  }

  let total = 0;
  cart.forEach((item) => {
    total += item.price;
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <strong>${item.name}</strong>
      <span>${formatCurrency(item.price)}</span>
    `;
    cartItems.appendChild(row);
  });

  cartTotal.textContent = formatCurrency(total);
  cartCount.textContent = cart.length.toString();
};

const addToCart = (id) => {
  const product = products.find((item) => item.id === id);
  if (!product) {
    return;
  }
  cart.push(product);
  renderCart();
};

const toggleCart = (open) => {
  cartPanel.classList.toggle("open", open);
};

renderProducts();
renderCart();

document.body.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-product]");
  if (button) {
    addToCart(button.dataset.product);
  }
});

openCart.addEventListener("click", () => toggleCart(true));
closeCart.addEventListener("click", () => toggleCart(false));

cartPanel.addEventListener("click", (event) => {
  if (event.target.id === "cart") {
    toggleCart(false);
  }
});

const newsletter = document.querySelector(".newsletter");
newsletter.addEventListener("submit", (event) => {
  event.preventDefault();
  newsletter.reset();
  alert("Thanks for joining! We'll send sample drops soon.");
});
