import { getProductById, updateCartCount, getProducts } from './utils.js'; // استيراد دوال المساعدة من ملف utils.js

// عند تحميل الوثيقة بالكامل يتم تنفيذ الكود التالي
document.addEventListener('DOMContentLoaded', () => {
    const productId = getProductIdFromURL(); // الحصول على معرف المنتج من عنوان URL
    const product = getProducts()

    // const product = getProductById(productId); // الحصول على تفاصيل المنتج باستخدام المعرف

    if (product) {
        displayProductDetails(product[productId-1]); // عرض تفاصيل المنتج
    } else {
        alert('Product not found'); // تنبيه في حالة عدم العثور على المنتجظ
        window.location.href = 'index.html'; // إعادة توجيه المستخدم إلى الصفحة الرئيسية
    }

    function getProductIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id'); // الحصول على قيمة المعرف من عنوان URL
    }

    function displayProductDetails(product) {
        const productDetails = document.getElementById('productDetails');
        productDetails.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover"> <!-- عرض صورة المنتج -->
            <h1 class="mt-4 text-3xl font-semibold text-gray-800">${product.name}</h1> <!-- عرض اسم المنتج -->
            <p class="mt-2 text-xl text-gray-600">$${product.price}</p> <!-- عرض سعر المنتج -->
            <p class="mt-4 text-gray-700">${product.description}</p> <!-- عرض وصف المنتج -->
            <p class="mt-4 text-gray-700">Available Quantity: ${product.availableQuantity}</p> <!-- عرض كمية المنتج المتاحة -->
            <button id="addToCartButton" class="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg">Add to Cart</button> <!-- زر إضافة المنتج إلى العربة -->
        `;

        document.getElementById('addToCartButton').addEventListener('click', () => {
            addToCart(product.id); // إضافة المنتج إلى العربة عند النقر على الزر
        });
    }

    function addToCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || []; // الحصول على عناصر العربة من التخزين المحلي
        const existingItem = cart.find(item => item.id === productId); // التحقق من وجود المنتج في العربة

        if (existingItem) {
            existingItem.quantity += 1; // زيادة كمية المنتج في العربة
        } else {
            cart.push({ id: productId, quantity: 1, image: product.image, name: product.name, price: product.price, 
             }); // إضافة المنتج إلى العربة بكمية 1
        }

        localStorage.setItem('cart', JSON.stringify(cart)); // حفظ العربة في التخزين المحلي
        updateCartCount(); // تحديث عدد العناصر في العربة
        alert('Product added to cart'); // تنبيه بإضافة المنتج إلى العربة
    }

    updateCartCount(); // تحديث عدد العناصر في العربة
});
