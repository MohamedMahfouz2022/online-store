export function getProducts() {
  return JSON.parse(localStorage.getItem('products')) || [];
}

export function saveProducts(products) {
  localStorage.setItem('products', JSON.stringify(products));
}

export function getProductById(productId) {
  const products = getProducts();
  return products.find(product => product.id === productId);
}

export function getReviews(productId) {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
  return reviews[productId] || [];
}

export function saveReviews(productId, reviews) {
  const allReviews = JSON.parse(localStorage.getItem('reviews')) || {};
  allReviews[productId] = reviews;
  localStorage.setItem('reviews', JSON.stringify(allReviews));
}

export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector('.cart-count').textContent = cartCount;
}
