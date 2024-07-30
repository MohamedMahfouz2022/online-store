import { getProducts, saveProducts } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productList = document.getElementById('productList');

    productForm.addEventListener('submit', addOrUpdateProduct);
    productList.addEventListener('click', handleProductListClick);

    renderProductList();

    function addOrUpdateProduct(event) {
        event.preventDefault();
        const id = document.getElementById('productId').value;
        const name = document.getElementById('productName').value;
        const price = parseFloat(document.getElementById('productPrice').value);
        const description = document.getElementById('productDescription').value;
        const availableQuantity = parseInt(document.getElementById('productQuantity').value);
        const image = document.getElementById('productImage').value;

        const products = getProducts();

        if (id) {
            const productIndex = products.findIndex(product => product.id === parseInt(id));
            if (productIndex !== -1) {
                products[productIndex] = { id: parseInt(id), name, price, description, availableQuantity, image };
            }
        } else {
            const newProduct = {
                id: products.length ? Math.max(...products.map(product => product.id)) + 1 : 1,
                name,
                price,
                description,
                availableQuantity,
                image
            };
            products.push(newProduct);
        }

        saveProducts(products);
        renderProductList();
        productForm.reset();
    }

    function handleProductListClick(event) {
        const target = event.target;
        const productId = parseInt(target.dataset.id);

        if (target.classList.contains('edit-product')) {
            const product = getProducts().find(product => product.id === productId);
            if (product) {
                document.getElementById('productId').value = product.id;
                document.getElementById('productName').value = product.name;
                document.getElementById('productPrice').value = product.price;
                document.getElementById('productDescription').value = product.description;
                document.getElementById('productQuantity').value = product.availableQuantity;
                document.getElementById('productImage').value = product.image;
            }
        } else if (target.classList.contains('delete-product')) {
            const products = getProducts().filter(product => product.id !== productId);
            saveProducts(products);
            renderProductList();
        }
    }

    function renderProductList() {
        const products = getProducts();
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
        `).join('');
    }
});

