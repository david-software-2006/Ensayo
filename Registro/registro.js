function saveFormData(event) {
    event.preventDefault(); // Previene el envío del formulario

    // Obtiene los valores de los campos del formulario de registro
    const formData = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    // Obtiene los registros existentes o crea un nuevo array
    let registros = JSON.parse(localStorage.getItem('registros')) || [];

    // Añade el nuevo registro
    registros.push(formData);

    // Guarda los datos del perfil en localStorage
    localStorage.setItem('profileData', JSON.stringify(formData));

    // Guarda los registros actualizados en localStorage
    localStorage.setItem('registros', JSON.stringify(registros));

    // Muestra un mensaje de confirmación
    alert('Datos guardados correctamente');

    // Limpia el formulario después de guardar
    event.target.reset();

    // Redirige a la página principal después de guardar los datos
    window.location.href = '/principal.html'; // Cambia esto a la URL de tu página principal
}
