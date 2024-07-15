// Function to open edit profile overlay
function openEditProfile() {
  document.getElementById("edit-profile-overlay").style.display = "block";
}

// Function to close edit profile overlay
function closeEditProfile() {
  document.getElementById("edit-profile-overlay").style.display = "none";
}

// Function to edit profile field
function editField(fieldName) {
  const value = document.getElementById(fieldName).innerText;
  document.getElementById("edit-" + fieldName).value = value;
  openEditProfile();
}

// Function to submit edited profile
document
  .getElementById("edit-profile-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.forEach((value, key) => {
      document.getElementById(key).innerText = value;
    });
    closeEditProfile();
  });

// Function to populate profile fields with initial data
function populateProfileFields() {
  const fields = ["name", "username", "email", "edit-bio"]; // Add other field IDs here
  fields.forEach((field) => {
    const value = document.getElementById(field).innerText;
    document.getElementById("edit-" + field).value = value;
  });
}

// Call populateProfileFields when the page loads
document.addEventListener("DOMContentLoaded", function () {
  populateProfileFields();
});

// Function to change profile picture
document
  .getElementById("profile-pic-input")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("profile-pic").src = e.target.result;
    };
    reader.readAsDataURL(file);
});


// Función para mostrar los libros favoritos en la página de perfil
function showFavoriteBooks() {
  const favoriteBooksContainer = document.getElementById('favorite-books-container');
  let savedBooks = JSON.parse(localStorage.getItem('profileBooks')) || [];

  // Limpiar el contenedor antes de agregar libros
  favoriteBooksContainer.innerHTML = '';

  // Iterar sobre los libros guardados y crear elementos HTML para cada uno
  savedBooks.forEach(book => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');

      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book');

      const productName = document.createElement('p');
      productName.classList.add('product-name');
      productName.textContent = book.title;

      const productImage = document.createElement('img');
      productImage.classList.add('product-image');
      productImage.src = book.image;
      productImage.alt = 'Product Image';

      const openPDFButton = document.createElement('button');
      openPDFButton.classList.add('boton');
      openPDFButton.textContent = 'Leer';
      openPDFButton.addEventListener('click', function() {
          openPDF(book.pdf, book.title);
      });

      const pdfIcon = document.createElement('i');
      pdfIcon.classList.add('bx', 'bx-book-reader');
      openPDFButton.appendChild(pdfIcon);

      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = '<i class="bx bx-trash"></i>';
      deleteButton.classList.add('delete-button');
      deleteButton.addEventListener('click', function() {
          deleteBook(book.title);
      });

      bookDiv.appendChild(productName);
      bookDiv.appendChild(productImage);
      bookDiv.appendChild(openPDFButton);
      bookDiv.appendChild(deleteButton);
      productCard.appendChild(bookDiv);
      favoriteBooksContainer.appendChild(productCard);
  });
}





// Función para eliminar un libro del perfil de favoritos
function deleteBook(title) {
  let profileBooks = JSON.parse(localStorage.getItem('profileBooks')) || [];

  // Filtrar el libro a eliminar por su título
  profileBooks = profileBooks.filter(book => book.title !== title);

  // Guardar la lista actualizada en el localStorage
  localStorage.setItem('profileBooks', JSON.stringify(profileBooks));

  // Mostrar nuevamente los libros actualizados en el perfil
  showFavoriteBooks();
}

// Llamar a showFavoriteBooks cuando la página se cargue por completo
document.addEventListener('DOMContentLoaded', showFavoriteBooks);

// Función para abrir un PDF en una nueva ventana
function openPDF(pdfPath, title) {
  window.location.href = `/VerPdf/visor.html?pdf=${encodeURIComponent(pdfPath)}&title=${encodeURIComponent(title)}`;
}






<<<<<<< HEAD
=======

>>>>>>> 61609b4349894886708ec4f74835274ade301bf8
