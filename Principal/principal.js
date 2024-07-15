 // Filtrar libros en función del texto ingresado en la búsqueda
 document.getElementById('search-input').addEventListener('input', function() {
    const searchQuery = this.value.trim().toLowerCase(); // Obtener el texto de búsqueda y convertirlo a minúsculas
    const books = document.querySelectorAll('.product-card'); // Seleccionar todas las tarjetas de libros

    books.forEach(function(card) {
        const title = card.querySelector('.product-name').textContent.toLowerCase(); // Obtener el título del libro y convertirlo a minúsculas
        const isVisible = title.includes(searchQuery); // Verificar si el título incluye el texto de búsqueda

        card.style.display = isVisible ? 'block' : 'none'; // Mostrar la tarjeta si coincide con la búsqueda, ocultarla si no
    });
});

// En principal.html
document.getElementById('search-input').addEventListener('input', function() {
    const searchQuery = this.value;
    filterBooks(searchQuery);
});

// const header = document.querySelector('header');

// window.addEventListener('scroll', () => {
//     header.classList.toggle('sticky', this.window.scrollY > 80);

    
// });

// // Open Menu 

// let menu = document.querySelector('#menu-icon');
// let navlist = document.querySelector('.navlist');

// menu.onclick = () => {
//     menu.classList.toggle('bx-x');
//     navlist.classList.toggle('open');
// }

// //Solución 

// window.onscroll = () => {
//     menu.classList.remove('bx-x');
//     navlist.classList.remove('open');
// }

// //ScrollReveat

// const sr = ScrollReveal({
//     origin: 'top',
//     distance: '1000px',
//     duration: 2500,
//     reset: false
// });

// sr.reveal('.home-text',{delay:500});
// sr.reveal('.home-img',{delay:600});
// sr.reveal('.container',{delay:400});

// sr.reveal('.about-img',{});
// sr.reveal('.about-text',{delay:300});

// sr.reveal('.middle-text',{});
// sr.reveal('.row-btn,.shop-content',{delay:300});

// sr.reveal('.review,.footer',{delay:300});
