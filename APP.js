let cart = JSON.parse(localStorage.getItem("obsidian_cart")) || [];

function addToCart(name, price, extra = {}){
  cart = JSON.parse(localStorage.getItem("obsidian_cart")) || [];

  cart.push({
    name: name,
    price: Number(price),
    ...extra
  });

  localStorage.setItem("obsidian_cart", JSON.stringify(cart));

  alert("Added to cart!");
}

function renderCart(){
  const box = document.getElementById("cartBox");
  if(!box) return;

  cart = JSON.parse(localStorage.getItem("obsidian_cart")) || [];

  box.innerHTML = "";
  let total = 0;

  if(cart.length === 0){
    box.innerHTML = `
      <div class="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Go back to collection and add products.</p>
        <a href="collection.html">ENTER COLLECTION</a>
      </div>
    `;

    document.getElementById("subtotal").innerText = "RM 0";
    document.getElementById("total").innerText = "RM 0";
    return;
  }

  cart.forEach((item, i) => {
    total += Number(item.price);

    box.innerHTML += `
      <div class="cart-card">
        <div class="cart-icon">✦</div>

        <div class="cart-details">
          <h3>${item.name}</h3>
          <p class="cart-price">RM ${item.price}</p>
          <p><b>Colour:</b> ${item.color || "-"}</p>
          <p><b>Text:</b> ${item.text || "-"}</p>
          <p><b>Text Length:</b> ${item.textLength || "-"}</p>
          <p><b>Size:</b> ${item.size || "-"}</p>
          <p><b>Material:</b> ${item.material || "-"}</p>
          <p><b>Weight:</b> ${item.weight || "-"}</p>
        </div>

        <button class="remove-btn" onclick="removeItem(${i})">
          REMOVE
        </button>
      </div>
    `;
  });

  document.getElementById("subtotal").innerText = "RM " + total;
  document.getElementById("total").innerText = "RM " + total;
}

function removeItem(index){
  cart = JSON.parse(localStorage.getItem("obsidian_cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("obsidian_cart", JSON.stringify(cart));
  renderCart();
}

function checkout(){
  window.location.href = "checkout.html";
}
function sendCartWhatsapp(){
  cart = JSON.parse(localStorage.getItem("obsidian_cart")) || [];

  let phone = "60123456789";

  if(cart.length === 0){
    alert("Cart is empty");
    return;
  }

  let message = "Hi Obsidian Arc Lab, I want to order:\n\n";

  cart.forEach((item, i) => {
    message +=
      (i + 1) + ". " + item.name + "\n" +
      "Price: RM " + item.price + "\n" +
      "Colour: " + (item.color || "-") + "\n" +
      "Text: " + (item.text || "-") + "\n" +
      "Text Length: " + (item.textLength || "-") + "\n" +
      "Size: " + (item.size || "-") + "\n" +
      "Material: " + (item.material || "-") + "\n" +
      "Weight: " + (item.weight || "-") + "\n\n";
  });

  let total = cart.reduce((sum, item) => sum + Number(item.price), 0);
  message += "Total: RM " + total;

  window.open(
    "https://wa.me/" + phone + "?text=" + encodeURIComponent(message),
    "_blank"
  );
}