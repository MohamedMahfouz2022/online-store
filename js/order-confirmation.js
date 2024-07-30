import { updateCartCount } from './utils.js';

// عند تحميل الوثيقة بالكامل يتم تنفيذ الكود التالي
document.addEventListener('DOMContentLoaded', () => {
    const orderDetails = document.getElementById('orderDetails'); // الحصول على حاوية تفاصيل الطلب
    const order = JSON.parse(localStorage.getItem('order')); // الحصول على تفاصيل الطلب من التخزين المحلي

    if (order) {
        displayOrderDetails(order); // عرض تفاصيل الطلب
    } else {
        alert('No order found'); // تنبيه في حالة عدم وجود طلب
        window.location.href = 'index.html'; // إعادة توجيه المستخدم إلى الصفحة الرئيسية
    }

    function displayOrderDetails(order) {
        orderDetails.innerHTML = `
            <h2 class="text-xl font-semibold text-gray-800">Thank you for your order, ${order.fullName}!</h2>
            <p class="mt-4 text-gray-600">Your order has been placed successfully.</p>
            <h3 class="mt-6 text-lg font-semibold text-gray-800">Shipping Information</h3>
            <p class="mt-2 text-gray-600">${order.address}, ${order.city}, ${order.state}, ${order.zipCode}</p>
            <h3 class="mt-6 text-lg font-semibold text-gray-800">Order Items</h3>
            <ul class="mt-2 text-gray-600">
                ${order.items.map(item => `
                    <li>${item.name} - Quantity: ${item.quantity}</li>
                `).join('')}
            </ul>
        `;
    }

    updateCartCount(); // تحديث عدد العناصر في العربة
});
