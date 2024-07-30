import { getReviews, saveReviews } from './utils.js';

// عند تحميل الوثيقة بالكامل يتم تنفيذ الكود التالي
document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('reviewForm'); // الحصول على نموذج المراجعة
    const reviewList = document.getElementById('reviewList'); // الحصول على قائمة المراجعات
    const productId = getProductIdFromURL(); // الحصول على معرف المنتج من عنوان URL

    if (productId) {
        renderReviews(productId); // عرض المراجعات للمنتج
    }

    reviewForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const reviewText = document.getElementById('reviewText').value; // الحصول على نص المراجعة من حقل الإدخال
        const reviewRating = document.getElementById('reviewRating').value; // الحصول على تقييم المراجعة من حقل الإدخال
        const reviews = getReviews(productId); // الحصول على المراجعات الحالية للمنتج
        const newReview = {
            id: reviews.length ? Math.max(...reviews.map(review => review.id)) + 1 : 1, // تعيين معرف جديد للمراجعة
            text: reviewText,
            rating: parseInt(reviewRating),
            date: new Date().toISOString()
        };
        reviews.push(newReview); // إضافة المراجعة الجديدة إلى القائمة
        saveReviews(productId, reviews); // حفظ المراجعات في التخزين المحلي
        renderReviews(productId); // إعادة عرض المراجعات
        reviewForm.reset(); // إعادة تعيين النموذج
    });

    function renderReviews(productId) {
        const reviews = getReviews(productId); // الحصول على المراجعات للمنتج
        reviewList.innerHTML = reviews.map(review => `
            <div class="bg-white p-4 rounded-lg shadow mb-2">
                <p>${review.text}</p>
                <p>Rating: ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
                <p class="text-gray-600 text-sm">${new Date(review.date).toLocaleDateString()}</p>
            </div>
        `).join('');
    }

    function getProductIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id'); // الحصول على قيمة المعرف من عنوان URL
    }
});
