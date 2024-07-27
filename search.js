document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      if (query.length > 0) {
          const products = getProducts(); // استرجاع المنتجات من مصدر البيانات
          const results = products.filter(product => product.name.toLowerCase().includes(query));
          displayResults(results);
      } else {
          searchResults.classList.add('hidden');
      }
  });

  function displayResults(results) {
      searchResults.innerHTML = '';
      if (results.length > 0) {
          results.forEach(product => {
              const item = document.createElement('div');
              item.classList.add('p-2', 'hover:bg-gray-200', 'cursor-pointer');
              item.textContent = product.name;
              item.addEventListener('click', () => {
                  window.location.href = `product.html?id=${product.id}`;
              });
              searchResults.appendChild(item);
          });
          searchResults.classList.remove('hidden');
      } else {
          searchResults.classList.add('hidden');
      }
  }

  function getProducts() {
      return [
          { id: 1, name: 'Product 1', price: 20.00 },
          { id: 2, name: 'Product 2', price: 30.00 },
          { id: 3, name: 'Product 3', price: 40.00 },
          // أضف المزيد من المنتجات هنا
      ];
  }
});
