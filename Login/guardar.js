/*
function saveData() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        alert('Inicio De Sesion Exitoso !');
    } else {
        alert('Por favor, complete todos los campos');
    }
}
*/

// Función para el login
function login(event) {
    event.preventDefault();
    const isDesktop = event.target.id === 'loginForm';
    const emailId = isDesktop ? 'email' : 'emailMobile';
    const passwordId = isDesktop ? 'password' : 'passwordMobile';

    const email = document.getElementById(emailId).value;
    const password = document.getElementById(passwordId).value;

    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    const usuario = registros.find(u => u.email === email && u.password === password);

    if (usuario) {
        alert('Inicio de sesión exitoso');
        window.location.href = '/principal.html'; // Redirige a la página de libros
    } else {
        alert('Email o contraseña incorrectos');
    }
}

// Evento para cargar los listeners cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Para la página de login
    const loginForm = document.getElementById('loginForm');
    const loginFormMobile = document.getElementById('loginFormMobile');
    if (loginForm) loginForm.addEventListener('submit', login);
    if (loginFormMobile) loginFormMobile.addEventListener('submit', login);
});