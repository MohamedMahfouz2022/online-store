document.addEventListener('DOMContentLoaded', () => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  updateCartCount();
  renderCartItems();

  function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="text-gray-600">Your cart is empty.</p>';
      return;
    }

    cart.forEach(item => {
      const product = getProductById(item.id); // افترض أن هذه الدالة تسترجع تفاصيل المنتج بواسطة معرفه
      const cartItem = document.createElement('div');
      cartItem.classList.add('flex', 'justify-between', 'items-center', 'bg-white', 'p-6', 'rounded-lg', 'shadow-lg', 'mb-4');
      cartItem.innerHTML = `
              <div class="flex items-center">
                  <img src="${product.image}" alt="${product.name}" class="w-20 h-20 object-cover">
                  <div class="ml-4">
                      <h3 class="text-lg font-semibold text-gray-800">${product.name}</h3>
                      <p class="text-gray-600">$${product.price}</p>
                  </div>
              </div>
              <div class="flex items-center">
                  <input type="number" value="${item.quantity}" class="px-4 py-2 border rounded w-16 update-quantity" data-id="${item.id}">
                  <button class="ml-4 px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg remove-item" data-id="${item.id}">Remove</button>
              </div>
          `;
      cartItemsContainer.appendChild(cartItem);
    });

    document.querySelectorAll('.update-quantity').forEach(input => {
      input.addEventListener('change', event => {
        const productId = event.target.dataset.id;
        const newQuantity = parseInt(event.target.value);
        updateCartQuantity(productId, newQuantity);
      });
    });

    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', event => {
        const productId = event.target.dataset.id;
        removeFromCart(productId);
      });
    });
  }

  function updateCartQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
      item.quantity = newQuantity;
      if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCartItems();
      updateCartCount();
    }
  }

  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
    updateCartCount();
  }

  function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = cartCount;
  }

  function getProductById(productId) {
    const products = getProducts(); // افترض أن هذه الدالة تسترجع قائمة المنتجات
    return products.find(product => product.id === productId);
  }

  function getProducts() {
    return [
      { id: 1, name: 'Product 1', price: 20.00, image: 'product1.jpg' },
      { id: 2, name: 'Product 2', price: 30.00, image: 'product2.jpg' },
      { id: 3, name: 'Product 3', price: 40.00, image: 'product3.jpg' },
      // أضف المزيد من المنتجات هنا
    ];
  }
});
