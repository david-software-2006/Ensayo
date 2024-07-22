document.addEventListener('DOMContentLoaded', () => {
    const savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
    const booksContainer = document.getElementById('saved-books');

    if (savedBooks.length === 0) {
        booksContainer.innerHTML = '<p>No has guardado ningún libro.</p>';
    } else {
        savedBooks.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('product-card');

            bookElement.innerHTML = `
                <div class="book">
                    <p class="product-name">${book.title}</p>
                    <img src="${book.image}" alt="${book.title}" class="product-image"><br>
                    <button class="boton" type="button" onclick="openPDF('${book.pdf}')"> Leer <i class='bx bx-book-reader'></i></button>
                    <progress></progress>
                    <i class='bx bx-trash' onclick="removeBook('${book.title}')"></i>
                </div>
            `;

            booksContainer.appendChild(bookElement);
        });
    }
});

// Función para abrir un PDF en una nueva ventana
function openPDF(pdfPath, title) {
    window.location.href = `/VerPdf/visor.html?pdf=${encodeURIComponent(pdfPath)}&title=${encodeURIComponent(title)}`;
}

function removeBook(title) {
    let savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
    savedBooks = savedBooks.filter(book => book.title !== title);
    localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
    
    // Eliminar el elemento del DOM
    const booksContainer = document.getElementById('saved-books');
    const bookElements = booksContainer.getElementsByClassName('product-card');
    
    // Buscar y eliminar el elemento correspondiente al libro eliminado
    for (let i = 0; i < bookElements.length; i++) {
        const bookName = bookElements[i].querySelector('.product-name').textContent;
        if (bookName === title) {
            booksContainer.removeChild(bookElements[i]);
            break; // Terminar el bucle una vez encontrado y eliminado el libro
        }
    }
}

// Función para eliminar un libro de la lista de guardados
function removeBook(title) {
    // Mostrar cuadro de diálogo de confirmación
    if (confirm(`¿Estás seguro de eliminar "${title}" de tus libros guardados?`)) {
        // Proceder con la eliminación
        let savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
        savedBooks = savedBooks.filter(book => book.title !== title);
        localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
        
        // Eliminar el elemento del DOM
        const booksContainer = document.getElementById('saved-books');
        const bookElements = booksContainer.getElementsByClassName('product-card');
        
        // Buscar y eliminar el elemento correspondiente al libro eliminado
        for (let i = 0; i < bookElements.length; i++) {
            const bookName = bookElements[i].querySelector('.product-name').textContent;
            if (bookName === title) {
                booksContainer.removeChild(bookElements[i]);
                break; // Terminar el bucle una vez encontrado y eliminado el libro
            }
        }
    } else {
        // Si el usuario cancela la eliminación
        return;
    }
}


// Filtrar libros en función del texto ingresado en la búsqueda
document.getElementById('search-input').addEventListener('input', function() {
    const searchQuery = this.value.toLowerCase();
    document.querySelectorAll('.product-card').forEach(function(card) {
        const title = card.querySelector('.product-name').textContent.toLowerCase();
        card.style.display = title.includes(searchQuery) ? 'inline-block' : 'none';
    });
});

// Función para filtrar y redirigir
function searchBooks() {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value.toLowerCase();
    const books = document.querySelectorAll('.product-card');
    let found = false;

    books.forEach(book => {
        const title = book.querySelector('.product-name').textContent.toLowerCase();
        if (title.includes(searchText)) {
            book.style.display = '';
            found = true;
        } else {
            book.style.display = 'none';
        }
    });

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
    } else if (!found) {
        // Aquí puedes definir qué hacer si no se encuentra el libro o página
        console.log('No se encontraron resultados.');
    }
}

// Agregar el evento para el campo de búsqueda
document.getElementById('search-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        searchBooks();
    }
});

// Agregar el evento de clic para el ícono de búsqueda
document.querySelector('.bx-search').addEventListener('click', function() {
    searchBooks();
});

   // Función para actualizar la imagen de perfil en la página principal
   function updateProfilePic() {
    const profilePicElement = document.querySelector('.user-img'); // Selecciona el elemento de la imagen de perfil
    const profileData = JSON.parse(localStorage.getItem('profileData')); // Lee los datos del perfil desde localStorage

    if (profileData && profileData.profilePic) {
        profilePicElement.src = profileData.profilePic; // Actualiza la imagen de perfil
    }
}

// Llama a la función cuando la página se cargue
document.addEventListener('DOMContentLoaded', updateProfilePic);