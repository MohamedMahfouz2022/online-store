document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('#loginButton');
    const registerButton = document.querySelector('#registerButton');
    const logoutButton = document.querySelector('#logoutButton');

    if (loginButton) {
        loginButton.addEventListener('click', loginUser);
    }

    if (registerButton) {
        registerButton.addEventListener('click', registerUser);
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', logoutUser);
    }

    checkUserSession();

    function loginUser() {
        const email = document.querySelector('#loginEmail').value;
        const password = document.querySelector('#loginPassword').value;

        if (!validateEmail(email)) {
            alert('Invalid email format');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            localStorage.setItem('session', JSON.stringify(user));
            window.location.href = 'index.html';
        } else {
            alert('Invalid email or password');
        }
    }

    function registerUser() {
        const name = document.querySelector('#registerName').value;
        const email = document.querySelector('#registerEmail').value;
        const password = document.querySelector('#registerPassword').value;
        const confirmPassword = document.querySelector('#confirmPassword').value;

        if (!name || !email || !password || !confirmPassword) {
            alert('All fields are required');
            return;
        }

        if (!validateEmail(email)) {
            alert('Invalid email format');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === email);

        if (userExists) {
            alert('User already exists');
        } else {
            const newUser = { name, email, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registration successful');
            window.location.href = 'login.html';
        }
    }

    function checkUserSession() {
        const session = JSON.parse(localStorage.getItem('session'));
        if (session) {
            document.querySelector('#userGreeting').textContent = `Hello, ${session.name}`;
            document.querySelector('#logoutButton').classList.remove('hidden');
        }
    }

    function logoutUser() {
        localStorage.removeItem('session');
        window.location.href = 'index.html';
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
