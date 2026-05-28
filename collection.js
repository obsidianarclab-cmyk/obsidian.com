let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ADD TO CART
function add(name, price, type){
  cart.push({name, price, type});
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}

// FILTER PRODUCTS
function filter(type){
  let cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    if(type === "all"){
      card.style.display = "block";
    } else {
      if(card.classList.contains(type)){
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    }
  });
}