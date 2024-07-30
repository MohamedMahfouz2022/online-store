import { getProducts } from './utils.js';

// عند تحميل الوثيقة بالكامل يتم تنفيذ الكود التالي
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput'); // الحصول على حقل إدخال البحث
    const searchResults = document.getElementById('searchResults'); // الحصول على قائمة نتائج البحث

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase(); // الحصول على نص البحث وتحويله إلى أحرف صغيرة
        if (query.length > 0) {
            const products = getProducts(); // الحصول على قائمة المنتجات
            const results = products.filter(product => product.name.toLowerCase().includes(query)); // تصفية المنتجات بناءً على نص البحث
            displayResults(results); // عرض النتائج
        } else {
            searchResults.classList.add('hidden'); // إخفاء قائمة النتائج في حالة عدم وجود نص بحث
        }
    });

    function displayResults(results) {
        searchResults.innerHTML = ''; // إفراغ قائمة النتائج
        if (results.length > 0) {
            results.forEach(product => {
                const item = document.createElement('div');
                item.classList.add('p-2', 'hover:bg-gray-200', 'cursor-pointer'); // إضافة الفئات العنصرية
                item.textContent = product.name; // تعيين نص العنصر لاسم المنتج
                item.addEventListener('click', () => {
                    window.location.href = `product.html?id=${product.id}`; // إعادة توجيه المستخدم إلى صفحة المنتج عند النقر على العنصر
                });
                searchResults.appendChild(item); // إضافة العنصر إلى قائمة النتائج
            });
            searchResults.classList.remove('hidden'); // إظهار قائمة النتائج
        } else {
            searchResults.classList.add('hidden'); // إخفاء قائمة النتائج في حالة عدم وجود نتائج
        }
    }
});
