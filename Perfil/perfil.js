// Función para abrir el overlay de editar perfil
function openEditProfile() {
  document.getElementById("edit-profile-overlay").style.display = "block";
}

// Función para cerrar el overlay de editar perfil
function closeEditProfile() {
  document.getElementById("edit-profile-overlay").style.display = "none";
}

// Función para enviar el formulario de editar perfil
document.getElementById("edit-profile-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  // Actualiza los campos del perfil con los nuevos datos
  formData.forEach((value, key) => {
      if (key !== 'profile-pic') {
          document.getElementById(key).innerText = value;
      }
  });

  // Guarda los datos actualizados en localStorage
  const updatedProfileData = {
      nombre: document.getElementById('edit-name').value,
      apellido: document.getElementById('edit-lastname').value,
      email: document.getElementById('edit-email').value,
      bio: document.getElementById('edit-bio').value,
      profilePic: document.getElementById('profile-pic').src
  };
  localStorage.setItem('profileData', JSON.stringify(updatedProfileData));

  // Actualiza el registro correspondiente en localStorage
  updateRegistros(updatedProfileData);

  closeEditProfile();
});

// Función para poblar los campos del perfil con los datos iniciales
function populateProfileFields() {
  const profileData = JSON.parse(localStorage.getItem('profileData'));

  if (profileData) {
      document.getElementById('name').innerText = profileData.nombre || 'No completado';
      document.getElementById('lastname').innerText = profileData.apellido || 'No completado';
      document.getElementById('email').innerText = profileData.email || 'No completado';
      document.getElementById('bio').innerText = profileData.bio || '';

      // Rellena los campos de edición con los datos existentes
      document.getElementById('edit-name').value = profileData.nombre || '';
      document.getElementById('edit-lastname').value = profileData.apellido || '';
      document.getElementById('edit-email').value = profileData.email || '';
      document.getElementById('edit-bio').value = profileData.bio || '';

      // Rellena la imagen de perfil con la URL guardada
      document.getElementById('profile-pic').src = profileData.profilePic || 'placeholder-user.jpg';
  }
}

// Función para actualizar el registro en localStorage
function updateRegistros(updatedProfileData) {
  let registros = JSON.parse(localStorage.getItem('registros')) || [];

  // Actualiza el registro correspondiente
  registros = registros.map(record => 
      record.email === updatedProfileData.email ? updatedProfileData : record
  );

  // Guarda los datos actualizados en localStorage
  localStorage.setItem('registros', JSON.stringify(registros));
}

// Llama a populateProfileFields cuando la página se cargue
document.addEventListener("DOMContentLoaded", function() {
  populateProfileFields();
});

// Función para cambiar la imagen de perfil
document.getElementById("profile-pic-input").addEventListener("change", function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
      document.getElementById("profile-pic").src = e.target.result;

      // Actualiza la imagen en el localStorage
      const profileData = JSON.parse(localStorage.getItem('profileData')) || {};
      profileData.profilePic = e.target.result;
      localStorage.setItem('profileData', JSON.stringify(profileData));
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
  // Show confirmation dialog
  if (confirm(`¿Estás seguro de eliminar "${title}" de tus favoritos?`)) {
    // Proceed with deletion
    let profileBooks = JSON.parse(localStorage.getItem('profileBooks')) || [];

    // Find index of the book with the given title
    const index = profileBooks.findIndex(book => book.title === title);

    if (index !== -1) {
      // Remove the book from the array
      profileBooks.splice(index, 1);

      // Update localStorage
      localStorage.setItem('profileBooks', JSON.stringify(profileBooks));

      // Update the UI to reflect the deletion
      showFavoriteBooks();
    }
  } else {
    // If user cancels deletion
    return;
  }
}


// Llamar a showFavoriteBooks cuando la página se cargue por completo
document.addEventListener('DOMContentLoaded', showFavoriteBooks);

// Función para abrir un PDF en una nueva ventana
function openPDF(pdfPath, title) {
  window.location.href = `/VerPdf/visor.html?pdf=${encodeURIComponent(pdfPath)}&title=${encodeURIComponent(title)}`;
}
