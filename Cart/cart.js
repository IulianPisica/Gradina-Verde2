const products = [
  { name: "Semințe de ardei gogoșar", price: 120 },
  { name: "Semințe pentru gazon ornamental", price: 140 },
  { name: "Semințe pentru gazonul din parc", price: 130 },
  { name: "Semințe de ardei lung", price: 110 },
  { name: "Semințe de roșii", price: 100 },
  { name: "Semințe de ridichi", price: 90 },
  { name: "Substrat universal", price: 150 },
  { name: "Semințe de vinete", price: 115 },
  { name: "Semințe de varză", price: 105 },
  { name: "Semințe de morcov", price: 85 },
  { name: "Semințe de ardei iute", price: 125 },
  { name: "Semințe de lavandă", price: 160 },
  { name: "Semințe de lucernă", price: 95 },
  { name: "Semințe Gura Leului", price: 135 },
  { name: "Semințe gazon sport", price: 145 },
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
  { name: "Foarfecă universală", price: 280 },
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
function getCart() {
  return JSON.parse(localStorage.getItem(cartKey)) || [];
}
function setCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}
function addToCart(productName) {
  let cart = getCart();
  const itemIndex = cart.findIndex(i => i.name === productName);
  if (itemIndex > -1) {
    cart[itemIndex].quantity++;
  } else {
    cart.push({ name: productName, quantity: 1 });
  }
  setCart(cart);
  renderCart();
}
function decreaseQuantity(productName) {
  let cart = getCart();
  const itemIndex = cart.findIndex(i => i.name === productName);
  if (itemIndex > -1) {
    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity--;
    } else {
      cart.splice(itemIndex, 1);
    }
    setCart(cart);
    renderCart();
  }
}
function removeFromCart(productName) {
  let cart = getCart();
  cart = cart.filter(item => item.name !== productName);
  setCart(cart);
  renderCart();
}
function normalizeName(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ș/g, "s")
    .replace(/ț/g, "t")
    .replace(/\s+/g, "-");
}
function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  const subtotalEl = document.getElementById("subtotal");
  const deliveryCostEl = document.getElementById("delivery-cost");
  const grandTotalEl = document.getElementById("grand-total");
  const cart = getCart();
  cartContainer.innerHTML = "";
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Coșul este gol.</p>";
    subtotalEl.textContent = "Subtotal: 0 Lei";
    deliveryCostEl.textContent = "Livrare: 0 Lei";
    grandTotalEl.textContent = "Total: 0 Lei";
    return;
  }
  let subtotal = 0;
  cart.forEach(({ name, quantity }) => {
    const product = products.find(p => p.name === name);
    if (!product) return;
    const linePrice = product.price * quantity;
    subtotal += linePrice;
    const isSeminte = product.name.toLowerCase().includes("semințe") || product.name.toLowerCase().includes("seminte");
    const imgFileName = normalizeName(product.name) + ".png";
    let imgSrc = "";
    if (isSeminte) {
      imgSrc = "/Seminte/Seminte_Images/" + imgFileName;
    } else if (product.name.toLowerCase().includes("pamant") || product.name.toLowerCase().includes("substrat") || product.name.toLowerCase().includes("ingrasamant")) {
      imgSrc = "/Pamant/Pamant_Images/" + imgFileName;
    } else {
      imgSrc = "/Unelte/Unelte_Images/" + imgFileName;
    }
    const itemLi = document.createElement("li");
    itemLi.innerHTML = `
      <div class="cart-item-info">
        <img src="${imgSrc}" alt="${product.name}" class="cart-product-img" />
        <div>
          <span class="cart-product-name">${product.name}</span>
          <span class="cart-product-price">${product.price} Lei</span>
          <div class="quantity-controls">
            <button class="decrease-btn" title="Scade cantitatea">–</button>
            <span class="quantity">${quantity}</span>
            <button class="increase-btn" title="Crește cantitatea">+</button>
          </div>
        </div>
      </div>
      <div class="cart-item-actions">
        <span class="price-info">${linePrice} Lei</span>
        <button class="remove-btn" title="Elimină produsul">❌</button>
      </div>
    `;
    itemLi.querySelector(".increase-btn").addEventListener("click", () => addToCart(product.name));
    itemLi.querySelector(".decrease-btn").addEventListener("click", () => decreaseQuantity(product.name));
    itemLi.querySelector(".remove-btn").addEventListener("click", () => removeFromCart(product.name));
    cartContainer.appendChild(itemLi);
  });
  let deliveryCost = 0;
  if (subtotal > 0 && subtotal < 1000) deliveryCost = 100;
  const grandTotal = subtotal + deliveryCost;
  subtotalEl.textContent = `Subtotal: ${subtotal} Lei`;
  deliveryCostEl.textContent = `Livrare: ${deliveryCost} Lei`;
  grandTotalEl.textContent = `Total: ${grandTotal} Lei`;
}
window.onload = renderCart;
function openMap() {
  alert("Funcționalitate Ridicare din magazin nu este implementată încă.");
}
