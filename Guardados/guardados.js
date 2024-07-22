document.addEventListener('DOMContentLoaded', () => {
    const savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
    const booksContainer = document.getElementById('saved-books');
 
    if (savedBooks.length === 0) {
        booksContainer.innerHTML = '<p>No has guardado ningún libro.</p>';
    } else {
        savedBooks.forEach(book => {
            const bookElement = createBookElement(book);
            booksContainer.appendChild(bookElement);
        });
 
        // Actualizar el progreso en la barra de progreso al cargar la página
        updateProgress(savedBooks);
    }
});
 
// Función para crear el elemento HTML de un libro guardado
function createBookElement(book) {
    const progress = localStorage.getItem(`pdfReadProgress-${book.pdf}`) || 0;
 
    const bookElement = document.createElement('div');
    bookElement.classList.add('product-card');
 
    bookElement.innerHTML = `
        <div class="book">
            <p class="product-name">${book.title}</p>
            <img src="${book.image}" alt="${book.title}" class="product-image"><br>
            <button class="boton" type="button" onclick="openPDF('${book.pdf}', '${book.title}', '${book.image}')">Leer <i class='bx bx-book-reader'></i></button>
            <div class="progress-container">
                <progress class="progress-bar" value="${progress}" max="100"></progress>
            </div>
            <i class='bx bx-trash' onclick="removeBook('${book.title}')"></i>
        </div>
    `;
 
    return bookElement;
}
 
// Función para actualizar el progreso en la barra de progreso
function updateProgress(savedBooks) {
    savedBooks.forEach(book => {
        const progress = localStorage.getItem(`pdfReadProgress-${book.pdf}`) || 0;
        const bookElement = document.querySelector(`.product-card img[src="${book.image}"]`);
 
        if (bookElement) {
            const progressBar = bookElement.closest('.product-card').querySelector('.progress-bar');
            if (progressBar) {
                progressBar.value = progress;
            }
        }
    });
 
    // Actualizar el progreso del PDF actual si está abierto
    const currentBook = JSON.parse(localStorage.getItem('currentBook'));
    if (currentBook) {
        const progress = localStorage.getItem('pdfReadProgress') || 0;
        const progressBar = document.querySelector('.pdf-viewer .progress-bar');
 
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
            progressBar.textContent = `${Math.round(progress)}% leído`;
        }
    }
}
 
// Función para eliminar un libro de los guardados
function removeBook(title) {
    let savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
    savedBooks = savedBooks.filter(book => book.title !== title);
    localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
 
    const booksContainer = document.getElementById('saved-books');
    const bookElements = booksContainer.getElementsByClassName('product-card');
 
    for (let i = 0; i < bookElements.length; i++) {
        const bookName = bookElements[i].querySelector('.product-name').textContent;
        if (bookName === title) {
            booksContainer.removeChild(bookElements[i]);
            break;
        }
    }
 
    // Después de eliminar, actualizar el progreso nuevamente
    updateProgress(savedBooks);
}
 
// Función para abrir el PDF y guardar el libro actual en localStorage
function openPDF(pdfPath, title, image) {
    const currentBook = { title: title, pdf: pdfPath, image: image };
    localStorage.setItem('currentBook', JSON.stringify(currentBook));
 
    // Guardar el progreso actual del PDF en localStorage
    const progress = localStorage.getItem(`pdfReadProgress-${pdfPath}`) || 0;
    localStorage.setItem('pdfReadProgress', progress);
 
    // Redirigir al visor de PDF
    window.location.href = `/VerPdf/visor.html?pdf=${encodeURIComponent(pdfPath)}&title=${encodeURIComponent(title)}`;
}
 
 
// Función para filtrar los libros mostrados basado en la búsqueda del usuario
document.getElementById('search-input').addEventListener('input', function() {
    const searchQuery = this.value.toLowerCase();
    document.querySelectorAll('.product-card').forEach(function(card) {
        const title = card.querySelector('.product-name').textContent.toLowerCase();
        card.style.display = title.includes(searchQuery) ? 'inline-block' : 'none';
    });
});