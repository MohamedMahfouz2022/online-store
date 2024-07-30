import { updateCartCount } from './utils.js';

// عند تحميل الوثيقة بالكامل يتم تنفيذ الكود التالي
document.addEventListener('DOMContentLoaded', () => {
    const placeOrderButton = document.getElementById('placeOrderButton'); // الحصول على زر إتمام الطلب

    placeOrderButton.addEventListener('click', () => {
        const fullName = document.getElementById('fullName').value; // الحصول على الاسم الكامل من حقل الإدخال
        const address = document.getElementById('address').value; // الحصول على العنوان من حقل الإدخال
        const city = document.getElementById('city').value; // الحصول على المدينة من حقل الإدخال
        const state = document.getElementById('state').value; // الحصول على الولاية من حقل الإدخال
        const zipCode = document.getElementById('zipCode').value; // الحصول على الرمز البريدي من حقل الإدخال
        const cardNumber = document.getElementById('cardNumber').value; // الحصول على رقم البطاقة من حقل الإدخال
        const expirationDate = document.getElementById('expirationDate').value; // الحصول على تاريخ انتهاء البطاقة من حقل الإدخال
        const cvv = document.getElementById('cvv').value; // الحصول على رمز CVV من حقل الإدخال

        if (!fullName || !address || !city || !state || !zipCode || !cardNumber || !expirationDate || !cvv) {
            alert('Please fill out all fields'); // التحقق من ملء جميع الحقول
            return;
        }

        const order = {
            fullName,
            address,
            city,
            state,
            zipCode,
            cardNumber,
            expirationDate,
            cvv,
            items: JSON.parse(localStorage.getItem('cart')) || [] // الحصول على عناصر العربة من التخزين المحلي
        };

        localStorage.setItem('order', JSON.stringify(order)); // حفظ الطلب في التخزين المحلي
        localStorage.removeItem('cart'); // إزالة العربة من التخزين المحلي
        alert('Order placed successfully'); // تنبيه بنجاح الطلب
        window.location.href = 'order-confirmation.html'; // إعادة توجيه المستخدم إلى صفحة تأكيد الطلب
    });

    updateCartCount(); // تحديث عدد العناصر في العربة
});
