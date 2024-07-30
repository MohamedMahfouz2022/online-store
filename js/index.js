import { getProducts, updateCartCount } from './utils.js'; // استيراد دالة getProducts من ملف utils.js

// عند تحميل الوثيقة بالكامل يتم تنفيذ الكود التالي
document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('productList'); // الحصول على قائمة المنتجات

    renderProductList(); // عرض قائمة المنتجات

    function renderProductList() {
        const products = getProducts(); // الحصول على قائمة المنتجات من التخزين المحلي
        productList.innerHTML = products.map(product => `
            <div class="bg-white p-6 rounded-lg shadow-lg">
                <img src="${product.image}" alt="${product.name}" class="w-full h-32 sm:h-48 object-cover">
                <h3 class="mt-2 text-gray-800 text-lg font-semibold">${product.name}</h3>
                <p class="mt-2 text-gray-600">$${product.price}</p>
                <a href="product.html?id=${product.id}" class="mt-4 inline-block px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg">View Product</a>
            </div>
        `).join(''); // عرض قائمة المنتجات في HTML
    }
    updateCartCount()
});
