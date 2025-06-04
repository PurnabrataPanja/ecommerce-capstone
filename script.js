// DOM Elements
const productList = document.getElementById("product-list");
const categoryFilter = document.getElementById("category-filter");
const sortBy = document.getElementById("sort-by");

// Render product cards
function displayProducts(productArray) {
  productList.innerHTML = "";

  if (productArray.length === 0) {
    productList.innerHTML = "<p>No products found.</p>";
    return;
  }

  productArray.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}

// Filter and sort logic
function updateProductList() {
  let filtered = [...products];

  // Filter by category
  const selectedCategory = categoryFilter.value;
  if (selectedCategory !== "all") {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  // Sort
  const sort = sortBy.value;
  if (sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "name-asc") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "name-desc") {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  displayProducts(filtered);
}

// Add to Cart
function addToCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find(p => p.id === productId);
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart`);
}

// Event Listeners
categoryFilter.addEventListener("change", updateProductList);
sortBy.addEventListener("change", updateProductList);

// Initial Load
displayProducts(products);
