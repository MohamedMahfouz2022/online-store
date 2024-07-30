import { validateEmail, updateCartCount } from './utils.js';

// عند تحميل الوثيقة بالكامل يتم تنفيذ الكود التالي
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('#loginButton'); // الحصول على زر تسجيل الدخول
    const registerButton = document.querySelector('#registerButton'); // الحصول على زر التسجيل
    const logoutButton = document.querySelector('#logoutButton'); // الحصول على زر تسجيل الخروج

    if (loginButton) {
        loginButton.addEventListener('click', loginUser); // عند النقر على زر تسجيل الدخول يتم استدعاء دالة loginUser
    }

    if (registerButton) {
        registerButton.addEventListener('click', registerUser); // عند النقر على زر التسجيل يتم استدعاء دالة registerUser
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', logoutUser); // عند النقر على زر تسجيل الخروج يتم استدعاء دالة logoutUser
    }

    checkUserSession(); // التحقق من وجود جلسة مستخدم حالية

    function loginUser() {
        const email = document.querySelector('#loginEmail').value; // الحصول على قيمة البريد الإلكتروني من حقل الإدخال
        const password = document.querySelector('#loginPassword').value; // الحصول على كلمة المرور من حقل الإدخال

        if (!validateEmail(email)) {
            alert('Invalid email format'); // التحقق من صحة البريد الإلكتروني
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || []; // الحصول على قائمة المستخدمين من التخزين المحلي
        const user = users.find(user => user.email === email && user.password === password); // التحقق من وجود المستخدم

        if (user) {
            localStorage.setItem('session', JSON.stringify(user)); // حفظ جلسة المستخدم في التخزين المحلي
            window.location.href = 'index.html'; // إعادة توجيه المستخدم إلى الصفحة الرئيسية
        } else {
            alert('Invalid email or password'); // تنبيه في حالة وجود خطأ في البريد الإلكتروني أو كلمة المرور
        }
    }

    function registerUser() {
        const name = document.querySelector('#registerName').value; // الحصول على الاسم من حقل الإدخال
        const email = document.querySelector('#registerEmail').value; // الحصول على البريد الإلكتروني من حقل الإدخال
        const password = document.querySelector('#registerPassword').value; // الحصول على كلمة المرور من حقل الإدخال
        const confirmPassword = document.querySelector('#confirmPassword').value; // الحصول على تأكيد كلمة المرور من حقل الإدخال

        if (!name || !email || !password || !confirmPassword) {
            alert('All fields are required'); // التحقق من ملء جميع الحقول
            return;
        }

        if (!validateEmail(email)) {
            alert('Invalid email format'); // التحقق من صحة البريد الإلكتروني
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match'); // التحقق من تطابق كلمة المرور وتأكيدها
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || []; // الحصول على قائمة المستخدمين من التخزين المحلي
        const userExists = users.some(user => user.email === email); // التحقق من وجود المستخدم

        if (userExists) {
            alert('User already exists'); // تنبيه في حالة وجود المستخدم بالفعل
        } else {
            const newUser = { name, email, password }; // إنشاء مستخدم جديد
            users.push(newUser); // إضافة المستخدم الجديد إلى القائمة
            localStorage.setItem('users', JSON.stringify(users)); // حفظ قائمة المستخدمين في التخزين المحلي
            alert('Registration successful'); // تنبيه بنجاح التسجيل
            window.location.href = 'login.html'; // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
        }
    }

    function checkUserSession() {
        const session = JSON.parse(localStorage.getItem('session')); // الحصول على جلسة المستخدم من التخزين المحلي
        if (session) {
            document.querySelector('#userGreeting').textContent = `Hello, ${session.name}`; // عرض رسالة ترحيبية للمستخدم
            document.querySelector('#logoutButton').classList.remove('hidden'); // إظهار زر تسجيل الخروج
            updateCartCount(); // تحديث عدد العناصر في العربة
        }
    }

    function logoutUser() {
        localStorage.removeItem('session'); // إزالة جلسة المستخدم من التخزين المحلي
        window.location.href = 'index.html'; // إعادة توجيه المستخدم إلى الصفحة الرئيسية
    }
});
