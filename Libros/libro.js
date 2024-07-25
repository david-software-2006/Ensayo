 // Define la ruta base de la carpeta que contiene los archivos PDF
 let url = '/Recursos/Pdfs/';
 
 // Categorías y libros iniciales
 const conCategoría = [
     // CUENTO
     ['1', 'Entre cuento y cuento', 'CUENTO', 'URL-Spreaker', '/Recursos/Pdfs/lectura.pdf', 'URL-video', '/Recursos/imagenes/libro9.webp'],
     ['3', 'Cuentos maravillosos', 'CUENTO', 'URL-Spreaker', '/Recursos/Pdfs/Cuentos-Maravillosos-4ta-Edicion.pdf', 'URL-video', '/Recursos/imagenes/libro3.webp'],
     ['4', 'Cuentos para contar', 'CUENTO', 'URL-Spreaker', '/Recursos/Pdfs/cuentos-para-contar.pdf', 'URL-video', '/Recursos/imagenes/libro10.webp'],
 
     //NIÑOS
     ['5', 'A que te cojo ratón', 'NIÑOS', 'URL-Spreaker', '/Recursos/Pdfs/A-QUE-TE-COJO-RATON.pdf', 'URL-video', '/Recursos/imagenes/libro16.webp'],
     ['6', 'Cuentos y pasatiempos', 'NIÑOS', 'https://open.spotify.com/embed/episode/2kxA7GaDj9eRjZEY2L817g?utm_source=generator', '/Recursos/Pdfs/Cuentos-y-pasatiempos.pdf', 'URL-video', '/Recursos/imagenes/libro25.webp'],
     ['7', 'Cuentos y maravillosos', 'NIÑOS', 'URL-Spreaker', '/Recursos/Pdfs/Cuentos-Maravillosos-4ta-Edicion.pdf', 'URL-video', '/Recursos/imagenes/libro3.webp'],
 
     //
 ];
 
 // Array de nuevos libros a agregar
 const nuevosLibros = [
     // ['', 'Nuevo Libro 1', 'Historia', 'URL-Spreaker-Ejemplo', '/Pdfs/nuevo-libro-1.pdf', 'URL-video-ejemplo', '/Recursos/imagenes/nuevo-libro-1.webp'],
     // ['', 'Nuevo Libro 2', 'Juegos', 'URL-Spreaker-Ejemplo', '/Pdfs/nuevo-libro-2.pdf', 'URL-video-ejemplo', '/Recursos/imagenes/nuevo-libro-2.webp']
 ];

 
// Almacenar en localStorage
localStorage.setItem('conCategoría', JSON.stringify(conCategoría));

// Función para abrir un PDF en una nueva ventana
function openPDF(pdfPath, title) {
    window.location.href = `/VerPdf/visor.html?pdf=${encodeURIComponent(pdfPath)}&title=${encodeURIComponent(title)}`;
}
 
// Función para descargar un PDF
function downloadPDF(pdfPath) {
    let a = document.createElement('a');
    a.href = pdfPath;
    a.download = pdfPath.split('/').pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Función para mostrar la alerta
function showAlert(message) {
    // Crear el contenedor de la alerta
    const alertContainer = document.createElement('div');
    alertContainer.classList.add('alert-container');

    // Crear el icono de la alerta
    const alertIcon = document.createElement('i');
    alertIcon.classList.add('bx', 'bx-check-circle', 'alert-icon'); // Icono de éxito
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

    // Ocultar y eliminar la alerta después de 3 segundos
    setTimeout(function() {
        alertContainer.classList.remove('show');
        setTimeout(function() {
            if (document.body.contains(alertContainer)) {
                document.body.removeChild(alertContainer);
            }
        }, 500);
    }, 4000);
}

 
// Función para guardar un libro en Guardados
function saveBook(title, imagePath, pdfPath) {
    let savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
    if (savedBooks.some(book => book.title === title)) {
        showAlert('Este libro ya está guardado en Guardados.');
        return;
    }
    savedBooks.push({ title, image: imagePath, pdf: pdfPath });
    localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
    showAlert(`¡Libro "${title}" guardado exitosamente en Guardados!`);
    updateBookIcons(); // Actualizar los íconos después de guardar
}

// Función para agregar un libro a Perfil
function addToProfile(title, imagePath, pdfPath) {
    let profileBooks = JSON.parse(localStorage.getItem('profileBooks')) || [];
    if (profileBooks.some(book => book.title === title)) {
        showAlert('Este libro ya está guardado en Perfil.');
        return;
    }
    profileBooks.push({ title, image: imagePath, pdf: pdfPath });
    localStorage.setItem('profileBooks', JSON.stringify(profileBooks));
    showAlert(`¡Libro "${title}" agregado exitosamente en Favoritos!`);
    updateBookIcons(); // Actualizar los íconos después de agregar
}

 
function addBook(id, title, category, spreakerURL, pdfURL, videoURL, imageURL) {
    let categoryContainer = document.querySelector(`#${category.toLowerCase()}-books`);
    if (!categoryContainer) {
        categoryContainer = document.createElement('div');
        categoryContainer.id = `${category.toLowerCase()}-books`;
        categoryContainer.classList.add('swiper-container');
        
        let swiperWrapper = document.createElement('div');
        swiperWrapper.classList.add('swiper-wrapper');
        categoryContainer.appendChild(swiperWrapper);
        
        let heading = document.createElement('div');
        heading.classList.add('heading');
        let categoryTitle = document.createElement('h2');
        categoryTitle.classList.add('category-title');
        categoryTitle.textContent = category;
        
        heading.appendChild(categoryTitle);
        document.getElementById('listalibros').appendChild(heading);
        document.getElementById('listalibros').appendChild(categoryContainer);
    }
    
    let slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    
    let divProductCard = document.createElement('div');
    divProductCard.classList.add('product-card');
    
    let divBook = document.createElement('div');
    divBook.classList.add('book');
    
    let pName = document.createElement('p');
    pName.classList.add('product-name');
    pName.textContent = title;
    divBook.appendChild(pName);

    let img = document.createElement('img');
    img.src = imageURL;
    img.alt = 'Imagen del libro';
    img.classList.add('product-image');
    divBook.appendChild(img);

    let divIconos = document.createElement('div');
    divIconos.classList.add('iconos');

    let iHeart = document.createElement('i');
    iHeart.classList.add('bx', 'bxs-heart');
    iHeart.setAttribute('onclick', `saveBook('${title}', '${imageURL}', '${pdfURL}')`);
    divIconos.appendChild(iHeart);

    let iStar = document.createElement('i');
    iStar.classList.add('bx', 'bxs-star');
    iStar.setAttribute('onclick', `addToProfile('${title}', '${imageURL}', '${pdfURL}')`);
    divIconos.appendChild(iStar);

    divBook.appendChild(divIconos);

    let btnLeer = document.createElement('button');
    btnLeer.classList.add('boton');
    btnLeer.setAttribute('onclick', `openPDF('${pdfURL}', '${title}')`);
    btnLeer.innerHTML = `Leer <i class='bx bx-book-reader'></i>`;
    divBook.appendChild(btnLeer);

    let btnDescargar = document.createElement('button');
    btnDescargar.classList.add('boton');
    btnDescargar.setAttribute('onclick', `downloadPDF('${pdfURL}')`);
    btnDescargar.innerHTML = `Descargar <i class='bx bx-download'></i>`;
    divBook.appendChild(btnDescargar);

    divProductCard.appendChild(divBook);
    slide.appendChild(divProductCard);
    categoryContainer.querySelector('.swiper-wrapper').appendChild(slide);
}


// Función para actualizar los íconos según el estado de los libros
function updateBookIcons() {
    const savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
    const profileBooks = JSON.parse(localStorage.getItem('profileBooks')) || [];

    document.querySelectorAll('.book').forEach(book => {
        const title = book.querySelector('.product-name').textContent;
        const iHeart = book.querySelector('.bxs-heart');
        const iStar = book.querySelector('.bxs-star');

        if (savedBooks.some(savedBook => savedBook.title === title)) {
            iHeart.classList.add('bx-heart-fill');
        } else {
            iHeart.classList.remove('bx-heart-fill');
        }

        if (profileBooks.some(profileBook => profileBook.title === title)) {
            iStar.classList.add('bx-star-fill');
        } else {
            iStar.classList.remove('bx-star-fill');
        }
    });
}

// Evento load combinado
window.addEventListener('load', function() {
    console.log('Página cargada, agregando libros...');
    conCategoría.forEach(libro => addBook(...libro));
    nuevosLibros.forEach(libro => addBook(...libro));
    updateBookIcons();

    // Inicializa Swiper con breakpoints para ajustar el número de libros visibles
document.querySelectorAll('.swiper-container').forEach(container => {
    new Swiper(container, {
        slidesPerView: 'auto',
        spaceBetween: 10, // Espacio entre los slides

        // Configuración de breakpoints
        breakpoints: {
            768: { // Para pantallas de 768px o más
                slidesPerView: 3,
            },
            480: { // Para pantallas de 480px o más (móviles)
                slidesPerView: 2,
            },
            320: { // Para pantallas menores a 480px
                slidesPerView: 2,
            }
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});


    
    console.log('Libros agregados e inicialización de Swiper completa');
});

// Función para filtrar y reordenar libros según la búsqueda dentro de cada categoría
function searchBooks() {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value.toLowerCase();
    
    // Obtener todos los contenedores de categorías
    const swiperContainers = document.querySelectorAll('.swiper-container');
    
    swiperContainers.forEach(container => {
        let swiperWrapper = container.querySelector('.swiper-wrapper');
        let matchedSlides = [];
        let unmatchedSlides = [];

        // Separar los slides coincidentes y no coincidentes
        swiperWrapper.querySelectorAll('.swiper-slide').forEach(slide => {
            let book = slide.querySelector('.book');
            const title = book.querySelector('.product-name').textContent.toLowerCase();
            if (title.includes(searchText)) {
                matchedSlides.push(slide);
            } else {
                unmatchedSlides.push(slide);
            }
        });

        // Ocultar slides no coincidentes
        unmatchedSlides.forEach(slide => {
            slide.style.display = 'none';
        });

        // Mostrar slides coincidentes y moverlos al inicio
        matchedSlides.forEach(slide => {
            slide.style.display = ''; // Asegurarse de que el libro sea visible
            swiperWrapper.insertBefore(slide, swiperWrapper.firstChild); // Mover al inicio del contenedor
        });
    });
}

// Función para redirigir a la página correspondiente si se presiona Enter
function handleEnterKey() {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value.toLowerCase();

    if (searchText === 'índice') {
        window.location.href = '/Indice/indice.html';
    } else if (searchText === 'perfil') {
        window.location.href = '/Perfil/perfil.html';
    } else if (searchText === 'principal') {
        window.location.href = '/principal.html';
    } else if (searchText === 'guardados') {
        window.location.href = '/Guardados/guardados.html';
    } else if (searchText === 'libros') {
        window.location.href = '/Libros/libro.html';
    }
}

// Agregar el evento para el campo de búsqueda en tiempo real
document.getElementById('search-input').addEventListener('input', function() {
    searchBooks();
});

// Agregar el evento de clic para el ícono de búsqueda
document.querySelector('.bx-search').addEventListener('click', function() {
    searchBooks();
});

// Agregar el evento de tecla para el campo de búsqueda
document.getElementById('search-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        handleEnterKey(); // Redirige según el texto de búsqueda
    }
});

// Función para actualizar la imagen de perfil en la página principal
function updateProfilePic() {
    const profilePicElement = document.querySelector('.user-img');
    const profileData = JSON.parse(localStorage.getItem('profileData'));

    if (profileData && profileData.profilePic) {
        profilePicElement.src = profileData.profilePic;
    }
}

// Llama a la función cuando la página se cargue
document.addEventListener('DOMContentLoaded', updateProfilePic);