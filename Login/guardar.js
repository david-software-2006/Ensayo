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

function showAlert(message, type = 'success') {
    console.log('showAlert called'); // Verifica si la función se llama

    // Crear el contenedor de la alerta
    const alertContainer = document.createElement('div');
    alertContainer.classList.add('alert-container');
    alertContainer.classList.add(type === 'success' ? 'alert-success' : 'alert-error');

    // Crear el icono de la alerta
    const alertIcon = document.createElement('i');
    alertIcon.classList.add('bx', type === 'success' ? 'bx-check-circle' : 'bx-x-circle', 'alert-icon');
    alertContainer.appendChild(alertIcon);

    // Crear el mensaje de la alerta
    const alertMessage = document.createElement('div');
    alertMessage.classList.add('alert-message');
    alertMessage.textContent = message;
    alertContainer.appendChild(alertMessage);

    // Crear el botón de cerrar
    const alertClose = document.createElement('button');
    alertClose.classList.add('alert-close');
    alertClose.innerHTML = '&times;';
    alertClose.onclick = function() {
        document.body.removeChild(alertContainer);
    };
    alertContainer.appendChild(alertClose);

    // Agregar la alerta al body
    document.body.appendChild(alertContainer);

    // Mostrar la alerta con animación
    setTimeout(function() {
        alertContainer.classList.add('show');
    }, 10);

    // Ocultar y eliminar la alerta después de 4 segundos
    setTimeout(function() {
        alertContainer.classList.remove('show');
        setTimeout(function() {
            if (document.body.contains(alertContainer)) {
                document.body.removeChild(alertContainer);
            }
        }, 500);
    }, 4000);
}



// Función para manejar el inicio de sesión
function login(event) {
    event.preventDefault();
    const isDesktop = event.target.id === 'loginForm';
    const emailId = isDesktop ? 'email' : 'emailMobile';
    const passwordId = isDesktop ? 'password' : 'passwordMobile';

    const email = document.getElementById(emailId).value;
    const password = document.getElementById(passwordId).value;

    if (email && password) {
        // Obtiene los registros desde localStorage
        const registros = JSON.parse(localStorage.getItem('registros')) || [];

        // Busca el usuario
        const usuario = registros.find(u => u.email === email && u.password === password);

        if (usuario) {
            showAlert('¡Inicio de sesión exitoso!', 'success');
            setTimeout(() => {
                window.location.href = '/principal.html'; // Redirige a la página de libros
            }, 1000); // Espera 1 segundo para que la alerta sea visible
        } else {
            showAlert('Email o contraseña incorrectos', 'error');
        }
    } else {
        showAlert('Por favor, complete todos los campos', 'error');
    }
}


 // Function to toggle password visibility
 function togglePasswordVisibility(passwordId, icon) {
    const passwordInput = document.getElementById(passwordId);
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    icon.classList.toggle('bx-show', !isPassword);
    icon.classList.toggle('bx-hide', isPassword);
}