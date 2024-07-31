document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita el envío por defecto del formulario
        
        const email = document.getElementById('email').value;
        
        // Validar que el campo no esté vacío
        if (!email) {
            alert('Por favor ingrese su correo electrónico.');
            return;
        }

        // Simular el envío del correo electrónico
        setTimeout(() => {
            alert('Se ha enviado un enlace de restablecimiento a su correo electrónico.');
            form.reset(); // Limpia el formulario
        }, 1000); // Simula un retraso de 1 segundo para la simulación
    });
});
