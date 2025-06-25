const products = [
  { name: "Topor coada fibră", price: 350 },
  { name: "Topor despicat lemne", price: 280 },
  { name: "Topor de tăiat lemne", price: 300 },
  { name: "Topor lamă oțel și coadă fibră", price: 400 },
  { name: "Mini lopată", price: 150 },
  { name: "Lopată pliabilă multifuncțională", price: 280 },
  { name: "Hârleț profesional", price: 220 },
  { name: "Hârleț simplu", price: 120 },
  { name: "Hârleț cu coadă metalică", price: 190 },
  { name: "Greblă reglabilă", price: 210 },
  { name: "Greblă pentru sol", price: 180 },
  { name: "Greblă fân Kotarbau", price: 300 },
  { name: "Foarfecă pentru grădinărit", price: 230 },
  { name: "Foarfecă de cules legume", price: 200 },
  { name: "Foarfecă universală", price: 280 }
];
const cartKey = "cart";
function normalizeName(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ș/g, "s")
    .replace(/ț/g, "t")
    .replace(/\s+/g, "-");
}
function getCart() {
  return JSON.parse(localStorage.getItem(cartKey)) || [];
}
function setCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}
function addToCart(productName) {
  let cart = getCart();
  const index = cart.findIndex(p => p.name === productName);
  if (index === -1) {
    cart.push({ name: productName, quantity: 1 });
  } else {
    cart[index].quantity++;
  }
  setCart(cart);
  renderProducts();
  renderCart();
}
function removeFromCart(productName) {
  let cart = getCart();
  cart = cart.filter(p => p.name !== productName);
  setCart(cart);
  renderCart();
  renderProducts();
}
function changeQuantity(productName, delta) {
  let cart = getCart();
  const index = cart.findIndex(p => p.name === productName);
  if (index === -1) return;
  cart[index].quantity += delta;
  if (cart[index].quantity < 1) {
    cart.splice(index, 1);
  }
  setCart(cart);
  renderCart();
  renderProducts();
}
function isInCart(productName) {
  return getCart().some(p => p.name === productName);
}
function getQuantity(productName) {
  const item = getCart().find(p => p.name === productName);
  return item ? item.quantity : 0;
}
function renderProducts() {
  const container = document.getElementById("products");
  container.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    const img = document.createElement("img");
    const imgFileName = normalizeName(product.name) + ".png";
    img.src = "Unelte_Images/" + imgFileName;
    img.alt = product.name;
    const title = document.createElement("div");
    title.className = "product-name";
    title.textContent = product.name;
    const cost = document.createElement("div");
    cost.className = "product-price";
    cost.textContent = `${product.price} Lei`;
    const icon = document.createElement("div");
    icon.className = "cart-icon";
    icon.textContent = isInCart(product.name) ? "✔️" : "🛒";
    icon.title = isInCart(product.name) ? "În coș" : "Adaugă în coș";
    icon.style.color = isInCart(product.name) ? "#2e7d32" : "#666";
    icon.style.cursor = "pointer";
    icon.addEventListener("click", () => {
      addToCart(product.name);
    });
    const qtySpan = document.createElement("span");
    qtySpan.style.marginLeft = "10px";
    const qty = getQuantity(product.name);
    if (qty > 0) {
      qtySpan.textContent = `Cantitate în coș: ${qty}`;
      qtySpan.style.fontWeight = "600";
      qtySpan.style.color = "#2e7d32";
    }
    card.append(img, title, cost, icon, qtySpan);
    container.appendChild(card);
  });
  document.getElementById("product-count").textContent = `Total: ${products.length} Produse`;
}
function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  if (!cartContainer) return;
  const subtotalEl = document.getElementById("subtotal");
  const deliveryCostEl = document.getElementById("delivery-cost");
  const grandTotalEl = document.getElementById("grand-total");
  const cart = getCart();
  cartContainer.innerHTML = "";
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Coșul este gol.</p>";
    if (subtotalEl) subtotalEl.textContent = "Subtotal: 0 Lei";
    if (deliveryCostEl) deliveryCostEl.textContent = "Livrare: 0 Lei";
    if (grandTotalEl) grandTotalEl.textContent = "Total: 0 Lei";
    return;
  }
  let subtotal = 0;
  cart.forEach(({ name, quantity }) => {
    const product = products.find(p => p.name === name);
    if (!product) return;
    subtotal += product.price * quantity;
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <img src="Unelte_Images/${normalizeName(name)}.png" alt="${name}" class="cart-product-img" />
      <span>${name}</span>
      <span>${product.price} Lei</span>
      <div>
        <button class="qty-btn" title="Scade cantitatea">–</button>
        <span style="margin: 0 10px;">${quantity}</span>
        <button class="qty-btn" title="Crește cantitatea">+</button>
      </div>
      <span><strong>${product.price * quantity} Lei</strong></span>
      <button class="remove-btn" title="Elimină produsul">❌</button>
    `;
    itemDiv.querySelector(".qty-btn:first-of-type").addEventListener("click", () => {
      changeQuantity(name, -1);
    });
    itemDiv.querySelector(".qty-btn:last-of-type").addEventListener("click", () => {
      changeQuantity(name, 1);
    });
    itemDiv.querySelector(".remove-btn").addEventListener("click", () => {
      removeFromCart(name);
    });
    cartContainer.appendChild(itemDiv);
  });
  let deliveryCost = 0;
  if (subtotal < 1000 && subtotal > 0) {
    deliveryCost = 100;
  }
  const grandTotal = subtotal + deliveryCost;
  if (subtotalEl) subtotalEl.textContent = `Subtotal: ${subtotal} Lei`;
  if (deliveryCostEl) deliveryCostEl.textContent = `Livrare: ${deliveryCost} Lei`;
  if (grandTotalEl) grandTotalEl.textContent = `Total: ${grandTotal} Lei`;
}
document.getElementById("sort").addEventListener("change", e => {
  const value = e.target.value;
  if (value === "asc") {
    products.sort((a, b) => a.price - b.price);
  } else if (value === "desc") {
    products.sort((a, b) => b.price - a.price);
  } else if (value === "name-az") {
    products.sort((a, b) => a.name.localeCompare(b.name));
  } else if (value === "name-za") {
    products.sort((a, b) => b.name.localeCompare(a.name));
  }
  renderProducts();
});
window.onload = () => {
  renderProducts();
  renderCart();
};
