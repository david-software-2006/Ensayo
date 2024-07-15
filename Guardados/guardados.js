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

// Filtrar libros en función del texto ingresado en la búsqueda
document.getElementById('search-input').addEventListener('input', function() {
    const searchQuery = this.value.toLowerCase();
    document.querySelectorAll('.product-card').forEach(function(card) {
        const title = card.querySelector('.product-name').textContent.toLowerCase();
        card.style.display = title.includes(searchQuery) ? 'inline-block' : 'none';
    });
});