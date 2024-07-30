import { getProductById, updateCartCount } from './utils.js'; // استيراد دوال المساعدة من ملف utils.js

// عند تحميل الوثيقة بالكامل يتم تنفيذ الكود التالي
document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // الحصول على عناصر العربة من التخزين المحلي
    const cartItemsContainer = document.getElementById('cartItems'); // الحصول على حاوية عناصر العربة
    const checkoutButton = document.getElementById('checkoutButton'); // الحصول على زر إتمام الشراء

    renderCartItems(); // عرض عناصر العربة
    updateCartCount(); // تحديث عدد العناصر في العربة

    function renderCartItems() {
        cartItemsContainer.innerHTML = ''; // إفراغ حاوية العناصر

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-gray-600">Your cart is empty.</p>'; // عرض رسالة في حالة عدم وجود عناصر في العربة
            return;
        }

        cart.forEach(item => {
            const product = getProductById(item.id); // الحصول على تفاصيل المنتج باستخدام المعرف
            const cartItem = document.createElement('div'); // إنشاء عنصر جديد لعربة التسوق
            cartItem.classList.add('flex', 'justify-between', 'items-center', 'bg-white', 'p-6', 'rounded-lg', 'shadow-lg', 'mb-4'); // إضافة الفئات العنصرية
            cartItem.innerHTML = `
                <div class="flex items-center">
                    <img src="${product.image}" alt="${product.name}" class="w-20 h-20 object-cover">
                    <div class="ml-4">
                        <h3 class="text-lg font-semibold text-gray-800">${product.name}</h3>
                        <p class="text-gray-600">$${product.price}</p>
                        <p class="text-gray-600">Available: ${product.availableQuantity}</p>
                    </div>
                </div>
                <div class="flex items-center">
                    <input type="number" value="${item.quantity}" min="1" max="${product.availableQuantity}" class="px-4 py-2 border rounded w-16 update-quantity" data-id="${item.id}">
                    <button class="ml-4 px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg remove-item" data-id="${item.id}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem); // إضافة عنصر العربة إلى الحاوية
        });

        // إضافة مستمعي الحدث لتحديث الكمية
        document.querySelectorAll('.update-quantity').forEach(input => {
            input.addEventListener('change', event => {
                const productId = event.target.dataset.id; // الحصول على معرف المنتج
                const newQuantity = parseInt(event.target.value); // الحصول على الكمية الجديدة
                updateCartQuantity(productId, newQuantity); // تحديث كمية العنصر في العربة
            });
        });
        // إضافة مستمعي الحدث لإزالة العناصر من العربة
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', event => {
                const productId = event.target.dataset.id; // الحصول على معرف المنتج
                removeFromCart(productId); // إزالة العنصر من العربة
            });
        });
    }

    function updateCartQuantity(productId, newQuantity) {
        const item = cart.find(item => item.id === productId); // العثور على العنصر في العربة باستخدام المعرف
        if (item) {
            item.quantity = newQuantity; // تحديث كمية العنصر
            console.log("item.quantity brfor if cond ",item.quantity)
            if (item.quantity <= 0) {
                cart.splice(cart.indexOf(item), 1); // إزالة العنصر في حالة كانت الكمية صفر
            }
            localStorage.setItem('cart', JSON.stringify(cart)); // حفظ العربة في التخزين المحلي
            renderCartItems(); // إعادة عرض عناصر العربة
            updateCartCount(); // تحديث عدد العناصر في العربة
        }
    }

    function removeFromCart(productId) {
        const itemIndex = cart.findIndex(item => item.id === productId); // العثور على فهرس العنصر في العربة باستخدام المعرف
        console.log("itemIndex",itemIndex)
        if (itemIndex === -1) {
            cart.splice(itemIndex, 1); // إزالة العنصر من العربة
            localStorage.setItem('cart', JSON.stringify(cart)); // حفظ العربة في التخزين المحلي
            renderCartItems(); // إعادة عرض عناصر العربة
            updateCartCount(); // تحديث عدد العناصر في العربة
        }
    }

    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty.'); // تنبيه في حالة عدم وجود عناصر في العربة
        } else {
            window.location.href = 'checkout.html'; // إعادة توجيه المستخدم إلى صفحة إتمام الشراء
        }
    });
});
