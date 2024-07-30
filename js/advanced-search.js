import { getProducts } from './utils.js';

// عند تحميل الوثيقة بالكامل يتم تنفيذ الكود التالي
document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm'); // الحصول على نموذج البحث المتقدم
    const searchResults = document.getElementById('searchResults'); // الحصول على قائمة نتائج البحث

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = document.getElementById('searchQuery').value.toLowerCase(); // الحصول على نص البحث وتحويله إلى أحرف صغيرة
        const minPrice = parseFloat(document.getElementById('minPrice').value) || 0; // الحصول على السعر الأدنى
        const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity; // الحصول على السعر الأقصى
        const category = document.getElementById('category').value.toLowerCase(); // الحصول على الفئة وتحويلها إلى أحرف صغيرة
        const minRating = parseInt(document.getElementById('minRating').value) || 0; // الحصول على التقييم الأدنى

        const products = getProducts(); // الحصول على قائمة المنتجات
        const results = products.filter(product => {
            const matchesQuery = product.name.toLowerCase().includes(query); // التحقق من تطابق النص
            const matchesPrice = product.price >= minPrice && product.price <= maxPrice; // التحقق من تطابق السعر
            const matchesCategory = !category || product.category.toLowerCase().includes(category); // التحقق من تطابق الفئة
            const matchesRating = getAverageRating(product.id) >= minRating; // التحقق من تطابق التقييم

            return matchesQuery && matchesPrice && matchesCategory && matchesRating; // إرجاع المنتجات التي تتطابق مع جميع المعايير
        });

        displayResults(results); // عرض النتائج
    });

    function displayResults(results) {
        searchResults.innerHTML = ''; // إفراغ قائمة النتائج
        searchResults.innerHTML = results.map(product => `
            <div class="bg-white p-4 rounded-lg shadow mb-2">
                <h3 class="text-lg font-semibold">${product.name}</h3>
                <p>$${product.price}</p>
                <p>Category: ${product.category}</p>
                <p>Rating: ${getAverageRating(product.id)}</p>
                <a href="product.html?id=${product.id}" class="text-blue-500">View Product</a>
            </div>
        `).join(''); // إضافة المنتجات إلى القائمة
    }

    function getAverageRating(productId) {
        const reviews = getReviews(productId); // الحصول على المراجعات للمنتج
        const totalRating = reviews.reduce((total, review) => total + review.rating, 0); // حساب إجمالي التقييمات
        return reviews.length ? (totalRating / reviews.length).toFixed(1) : 'No ratings'; // حساب متوسط التقييم
    }
});
