const products = [
  { name: "Ingrasamant pentru legume", price: 105 },
  { name: "Ingrasamant pentru rododendroni", price: 110 },
  { name: "Ingrasamant pentru plantele", price: 95 },
  { name: "Uree granule", price: 80 },
  { name: "Ingrasamant Plante", price: 120 },
  { name: "Ingrasamant pentru gazon", price: 130 },
  { name: "Ingrasamant spraypentru orhidee", price: 150 },
  { name: "Ingrasamant pentru frunze", price: 90 },
  { name: "Elixir pelargoni si plante balcon", price: 115 },
  { name: "Ingrasamant pentru arbusti", price: 100 },
  { name: "Ferticomplex NPK", price: 140 },
  { name: "Accelerator de compost", price: 85 },
  { name: "Ingrasamant pentru soluri acide", price: 125 },
  { name: "Pachet Start A-Z", price: 160 },
  { name: "Calciu premium", price: 75 }
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
    img.src = "Pamant_Images/" + imgFileName;
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
      <img src="Pamant_Images/${normalizeName(name)}.png" alt="${name}" class="cart-product-img" />
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
