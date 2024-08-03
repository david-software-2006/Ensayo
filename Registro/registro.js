// Función para mostrar alertas
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

// Función para guardar los datos del formulario
function saveFormData(event) {
    event.preventDefault(); // Previene el envío del formulario

    console.log('Función saveFormData llamada'); // Verifica que la función se llama

    // Determina si el formulario es para móvil o escritorio
    const isMobile = event.target.id === 'registerFormMobile';
    
    // Obtiene los valores de los campos del formulario de registro
    const formData = {
        nombre: isMobile ? document.getElementById('nombreMobile').value : document.getElementById('nombre').value,
        apellido: isMobile ? document.getElementById('apellidoMobile').value : document.getElementById('apellido').value,
        tipo_documento: isMobile ? document.getElementById('tipo_documentoMobile').value : document.getElementById('tipo_documento').value,
        n_documento: isMobile ? document.getElementById('n_documentoMobile').value : document.getElementById('n_documento').value,
        email: isMobile ? document.getElementById('emailMobile').value : document.getElementById('email').value,
        password: isMobile ? document.getElementById('passwordMobile').value : document.getElementById('password').value,
        confirm_password: isMobile ? document.getElementById('confirm_passwordMobile').value : document.getElementById('confirm_password').value
    };

    console.log('Datos del formulario:', formData); // Verifica los datos del formulario

    // Verifica si la barra de fortaleza de la contraseña está en rojo (débil)
    const strengthIndicator = isMobile ? document.getElementById('password-strength-mobile') : document.getElementById('password-strength');
    if (strengthIndicator.classList.contains('weak')) {
        console.log('La contraseña es demasiado débil'); // Verifica el mensaje de error
        showAlert('La contraseña es demasiado débil', 'error'); // Utiliza showAlert para mostrar mensajes
        return;
    }

    // Verifica si la contraseña tiene al menos 6 caracteres
    if (formData.password.length < 6) {
        console.log('La contraseña debe tener al menos 6 caracteres'); // Verifica el mensaje de error
        showAlert('La contraseña debe tener al menos 6 caracteres', 'error'); // Utiliza showAlert para mostrar mensajes
        return;
    }

    // Verifica si las contraseñas coinciden
    if (formData.password !== formData.confirm_password) {
        console.log('Las contraseñas no coinciden'); // Verifica el mensaje de error
        showAlert('Las contraseñas no coinciden', 'error'); // Utiliza showAlert para mostrar mensajes
        return;
    }

    // Obtiene los registros existentes o crea un nuevo array
    let registros = JSON.parse(localStorage.getItem('registros')) || [];

    // Verifica si el email ya existe
    const existingUserIndex = registros.findIndex(user => user.email === formData.email);

    if (existingUserIndex !== -1) {
        // Si el usuario ya existe, actualiza el registro
        registros[existingUserIndex] = formData;
    } else {
        // Si el usuario no existe, añade el nuevo registro
        registros.push(formData);
    }

    // Guarda los registros actualizados en localStorage
    localStorage.setItem('registros', JSON.stringify(registros));
    
    // Guarda los datos del perfil en localStorage (opcional, puedes elegir no hacerlo)
    localStorage.setItem('profileData', JSON.stringify(formData));

    // Muestra un mensaje de confirmación
    console.log('Datos guardados correctamente'); // Verifica el mensaje de éxito
    showAlert('¡Registro exitoso!', 'success');

    // Limpia el formulario después de guardar
    event.target.reset();

    console.log('Datos en localStorage:', localStorage.getItem('registros')); // Verifica los datos en localStorage

    // Retrasa la redirección para mostrar la alerta
    setTimeout(function() {
        console.log('Redirigiendo a /principal.html');
        window.location.href = '/principal.html';
    }, 1500); // Espera 1.5 segundos antes de redirigir
}

// Asocia la función saveFormData a los formularios
document.getElementById('registerForm').addEventListener('submit', saveFormData);
document.getElementById('registerFormMobile').addEventListener('submit', saveFormData);


// Función para mostrar u ocultar la contraseña
function togglePasswordVisibility(passwordFieldId, eyeIcon) {
    const passwordField = document.getElementById(passwordFieldId);
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        eyeIcon.classList.remove('bx-show');
        eyeIcon.classList.add('bx-hide');
    } else {
        passwordField.type = 'password';
        eyeIcon.classList.remove('bx-hide');
        eyeIcon.classList.add('bx-show');
    }
}


function checkPasswordStrength() {
    const passwordDesktop = document.getElementById('password').value;
    const passwordMobile = document.getElementById('passwordMobile').value;
    const strengthIndicatorDesktop = document.getElementById('password-strength');
    const strengthIndicatorMobile = document.getElementById('password-strength-mobile');

    function evaluateStrength(password) {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasDigits = /[0-9]/.test(password);
        const hasSpecialChars = /[!@#$%^&*()_+{}\[\]:;"'<>,.?~`]/.test(password);
        
        let strength = '';

        if (password.length >= 20 || (hasSpecialChars && password.length >= 10)) {
            strength = 'strong';
        } else if (password.length >= 10 || hasSpecialChars) {
            strength = 'medium';
        } else if (password.length > 0) {
            strength = 'weak';
        }

        return strength;
    }

    function setStrengthIndicator(element, strength) {
        element.classList.remove('weak', 'medium', 'strong'); // Elimina cualquier clase anterior
        if (strength === 'weak' || strength === 'medium' || strength === 'strong') {
            element.classList.add(strength); // Añade la clase correspondiente
            element.style.display = 'block'; // Muestra la barra de fortaleza
        } else {
            element.style.display = 'none'; // Oculta la barra si el campo está vacío
        }
    }

    const strengthDesktop = evaluateStrength(passwordDesktop);
    const strengthMobile = evaluateStrength(passwordMobile);

    setStrengthIndicator(strengthIndicatorDesktop, strengthDesktop);
    setStrengthIndicator(strengthIndicatorMobile, strengthMobile);
}

// Llama a checkPasswordStrength en el evento input para actualizar en tiempo real
document.getElementById('password').addEventListener('input', checkPasswordStrength);
document.getElementById('passwordMobile').addEventListener('input', checkPasswordStrength);


function togglePasswordVisibility(passwordFieldId, eyeIcon) {
    const passwordField = document.getElementById(passwordFieldId);
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        eyeIcon.classList.remove('bx-show');
        eyeIcon.classList.add('bx-hide');
    } else {
        passwordField.type = 'password';
        eyeIcon.classList.remove('bx-hide');
        eyeIcon.classList.add('bx-show');
    }
}
