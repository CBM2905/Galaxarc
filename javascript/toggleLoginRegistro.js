// Toggle between login and registration
document.getElementById('showRegister').addEventListener('click', function () {
    document.getElementById('loginContainer').classList.add('hidden');
    document.getElementById('registerContainer').classList.remove('hidden');
    document.getElementById('registerContainer').classList.add('fade-in');
});

document.getElementById('showLogin').addEventListener('click', function () {
    document.getElementById('registerContainer').classList.add('hidden');
    document.getElementById('loginContainer').classList.remove('hidden');
    document.getElementById('loginContainer').classList.add('fade-in');
});