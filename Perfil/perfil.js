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

function deleteBook(title) {
  // Crear el contenedor del modal
  const modal = document.createElement('div');
  modal.classList.add('modal');

  // Crear el contenido del modal
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  // Crear el botón de cerrar
  const closeButton = document.createElement('span');
  closeButton.classList.add('close-button');
  closeButton.innerHTML = '&times;';
  closeButton.onclick = function() {
      document.body.removeChild(modal);
  };

  // Crear el mensaje del modal
  const modalMessage = document.createElement('p');
  modalMessage.textContent = `¿Estás seguro de eliminar "${title}" de tus favoritos?`;

  // Crear el botón de confirmar eliminación
  const confirmDeleteButton = document.createElement('button');
  confirmDeleteButton.classList.add('confirm-delete-button');
  confirmDeleteButton.textContent = 'Eliminar';

  // Crear el icono de papelera para el botón de confirmar eliminación
  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('bx', 'bxs-trash'); // Asegúrate de que 'bxs-trash' sea el nombre correcto para el icono de papelera en Boxicons

  // Agregar el icono al final del texto del botón de confirmar eliminación
  confirmDeleteButton.appendChild(deleteIcon);

  confirmDeleteButton.onclick = function() {
      let profileBooks = JSON.parse(localStorage.getItem('profileBooks')) || [];
      const index = profileBooks.findIndex(book => book.title === title);
      if (index !== -1) {
          profileBooks.splice(index, 1);
          localStorage.setItem('profileBooks', JSON.stringify(profileBooks));
          showFavoriteBooks(); // Actualiza la vista después de eliminar el libro
      }
      document.body.removeChild(modal);
  };

  // Crear el botón de cancelar eliminación
  const cancelDeleteButton = document.createElement('button');
  cancelDeleteButton.classList.add('cancel-delete-button');
  cancelDeleteButton.textContent = 'Cancelar';
  cancelDeleteButton.onclick = function() {
      document.body.removeChild(modal);
  };

  // Agregar elementos al contenido del modal
  modalContent.appendChild(closeButton);
  modalContent.appendChild(modalMessage);
  modalContent.appendChild(confirmDeleteButton);
  modalContent.appendChild(cancelDeleteButton);

  // Agregar el contenido al contenedor del modal
  modal.appendChild(modalContent);

  // Agregar el modal al body
  document.body.appendChild(modal);

  // Mostrar el modal
  modal.style.display = 'flex';

  // Cerrar el modal al hacer clic fuera del contenido
  window.onclick = function(event) {
      if (event.target === modal) {
          document.body.removeChild(modal);
      }
  };
}





// Llamar a showFavoriteBooks cuando la página se cargue por completo
document.addEventListener('DOMContentLoaded', showFavoriteBooks);

// Función para abrir un PDF en una nueva ventana
function openPDF(pdfPath, title) {
  window.location.href = `/VerPdf/visor.html?pdf=${encodeURIComponent(pdfPath)}&title=${encodeURIComponent(title)}`;
}
