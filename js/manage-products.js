import { getProducts, saveProducts, updateCartCount} from './utils.js'; // استيراد دوال المساعدة من ملف utils.js

// عند تحميل الوثيقة بالكامل يتم تنفيذ الكود التالي
document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm'); // الحصول على نموذج المنتج
    const productList = document.getElementById('productList'); // الحصول على قائمة المنتجات

    productForm.addEventListener('submit', addOrUpdateProduct); // إضافة مستمع الحدث للنموذج
    productList.addEventListener('click', handleProductListClick); // إضافة مستمع الحدث للقائمة

    renderProductList(); // عرض قائمة المنتجات

    function addOrUpdateProduct(event) {
        event.preventDefault(); // منع إعادة تحميل الصفحة عند إرسال النموذج
        const id = document.getElementById('productId').value; // الحصول على معرف المنتج
        const name = document.getElementById('productName').value; // الحصول على اسم المنتج
        const price = parseFloat(document.getElementById('productPrice').value); // الحصول على سعر المنتج
        const description = document.getElementById('productDescription').value; // الحصول على وصف المنتج
        const availableQuantity = parseInt(document.getElementById('productQuantity').value); // الحصول على كمية المنتج المتاحة
        const image = document.getElementById('productImage').value; // الحصول على صورة المنتج

        const products = getProducts(); // الحصول على قائمة المنتجات

        if (id) {
            const productIndex = products.findIndex(product => product.id === parseInt(id)); // العثور على فهرس المنتج باستخدام المعرف
            if (productIndex !== -1) {
                products[productIndex] = { id: parseInt(id), name, price, description, availableQuantity, image }; // تحديث بيانات المنتج
            }
        } else {
            const newProduct = {
                id: products.length ? Math.max(...products.map(product => product.id)) + 1 : 1, // إنشاء معرف جديد للمنتج
                name,
                price,
                description,
                availableQuantity,
                image
            };
            products.push(newProduct); // إضافة المنتج الجديد إلى القائمة
        }

        saveProducts(products); // حفظ قائمة المنتجات
        renderProductList(); // إعادة عرض قائمة المنتجات
        productForm.reset(); // إعادة تعيين النموذج
    }

    function handleProductListClick(event) {
        const target = event.target;
        const productId = parseInt(target.dataset.id); // الحصول على معرف المنتج من البيانات

        if (target.classList.contains('edit-product')) {
            const product = getProducts().find(product => product.id === productId); // العثور على المنتج باستخدام المعرف
            if (product) {
                document.getElementById('productId').value = product.id;
                document.getElementById('productName').value = product.name;
                document.getElementById('productPrice').value = product.price;
                document.getElementById('productDescription').value = product.description;
                document.getElementById('productQuantity').value = product.availableQuantity;
                document.getElementById('productImage').value = product.image;
            }
        } else if (target.classList.contains('delete-product')) {
            const products = getProducts().filter(product => product.id !== productId); // إزالة المنتج من القائمة
            saveProducts(products); // حفظ قائمة المنتجات
            renderProductList(); // إعادة عرض قائمة المنتجات
        }
    }

    function renderProductList() {
        const products = getProducts(); // الحصول على قائمة المنتجات
        productList.innerHTML = products.map(product => `
            <div class="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-2">
                <div>
                    <h3 class="text-lg font-semibold">${product.name}</h3>
                    <p>$${product.price}</p>
                    <p>Available: ${product.availableQuantity}</p>
                </div>
                <div>
                    <button class="edit-product px-4 py-2 bg-blue-500 text-white rounded" data-id="${product.id}">Edit</button>
                    <button class="delete-product px-4 py-2 bg-red-500 text-white rounded" data-id="${product.id}">Delete</button>
                </div>
            </div>
        `).join(''); // عرض قائمة المنتجات في HTML
    }
    updateCartCount()

});
