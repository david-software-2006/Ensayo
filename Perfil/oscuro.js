document.addEventListener('DOMContentLoaded', (event) => {
    let toggle = document.getElementById('toggle');
    let label_toggle = document.getElementById('label_toggle');
  
    // Comprobar la preferencia guardada en localStorage
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark');
        toggle.checked = true;
        label_toggle.innerHTML = '<i class="fa-solid fa-toggle-on"></i>';
    }
  
    toggle.addEventListener('change', (event) => {
        let checked = event.target.checked;
        document.body.classList.toggle('dark');
  
        if (checked) {
            label_toggle.innerHTML = '<i class="fa-solid fa-toggle-on"></i>';
            localStorage.setItem('darkMode', 'true');
        } else {
            label_toggle.innerHTML = '<i class="fa-solid fa-toggle-off"></i>';
            localStorage.setItem('darkMode', 'false');
        }
    });
  });