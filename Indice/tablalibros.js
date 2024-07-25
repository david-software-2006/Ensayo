const url = '/Recursos/PDFs/'; // Ruta de la carpeta que contiene los archivos PDF.
const conCategoría = [
  ['1', 'LECTURAS PARA TODOS LOS DIAS', 'Adultos', '', '/Recursos/PDFs/SALUD-PARA-CONTAR-2024.pdf', '', '/Recursos/imagenes/libro.webp'],
  ['2', 'LA CASA Y EL CAMPO', 'Historia', '', '/Recursos/PDFs/CON-LOS-PELOS-DE-PUNTA.pdf', '', '/Recursos/imagenes/libro1.webp'],
  ['3', 'HISTORIAS Y LUGARES', 'Juegos', '', '/Recursos/PDFs/ERASE-UNA-VEZ-EN-COLOMBIA.pdf', '', '/Recursos/imagenes/libro2.webp'],
  ['4', 'CUENTOS MARAVILLOSOS', 'Adultos', '', '/Recursos/PDFs/TODO-LO-CONTRARIO.pdf', '', '/Recursos/imagenes/libro3.webp'],
  ['5', 'LOS VAIJES DEL VIEJO JACOBO', 'Adultos', '', '/Recursos/PDFs/cuentos-para-desenredar-enredos.pdf', '', '/Recursos/imagenes/libro4.webp'],
  ['6', 'MÁS CLARO NO CANTA UN GALLO', 'Niños', '', '/Recursos/PDFs/ENTRE-CUENTO-Y-CUENTO.pdf', '', '/Recursos/imagenes/libro5.webp'],
  ['7', 'LA TIERRA, EL CIELO Y MÁS ALLÁ', 'Adultos', '', '/Recursos/PDFs/SALUD-PARA-CONTAR-2024.pdf', '', '/Recursos/imagenes/libro6.webp'],
  ['8', 'CUENTOS PARA DESENREDAR ENREDOS', 'Adultos', '', '/Recursos/PDFs/SALUD-PARA-CONTAR-2024.pdf', '', '/Recursos/imagenes/libro7.webp'],
  ['9', 'TODO LO CONTRARIO', 'Adultos', '', '/Recursos/PDFs/SALUD-PARA-CONTAR-2024.pdf', '', '/Recursos/imagenes/libro8.webp'],
  ['10', 'ENTRE CUENTO Y CUENTO', 'Adultos', '', '/Recursos/PDFs/SALUD-PARA-CONTAR-2024.pdf', '', '/Recursos/imagenes/libro9.webp'],
  ['11', 'CUENTOS PARA CONTAR', 'Adultos', '', '/Recursos/PDFs/SALUD-PARA-CONTAR-2024.pdf', '', '/Recursos/imagenes/libro10.webp'],
  ['12', 'ÉRASE UNA VEZ EN COLOMBIA', 'Adultos', '', '/Recursos/PDFs/SALUD-PARA-CONTAR-2024.pdf', '', '/Recursos/imagenes/libro11.webp'],
  ['13', 'SALUD PARA CONTAR', 'Adultos', '', '/Recursos/PDFs/SALUD-PARA-CONTAR-2024.pdf', '', '/Recursos/imagenes/libro12.webp'],
  ['14', 'CON LOS PELOS DE PUNTA', 'Adultos', '', '/Recursos/PDFs/SALUD-PARA-CONTAR-2024.pdf', '', '/Recursos/imagenes/libro13.webp'],
  ['15', 'LOS SECRETOS DE LO ANIMALES', 'Adultos', '', '/Recursos/PDFs/SALUD-PARA-CONTAR-2024.pdf', '', '/Recursos/imagenes/libro14.webp'],
  ['16', 'DEL CAMPO A LA MESA', 'Adultos', '', '/Recursos/PDFs/SALUD-PARA-CONTAR-2024.pdf', '', '/Recursos/imagenes/libro15.webp'],
  ['17', 'A QUE TE COJO RATÓN', 'Adultos', '', '/Recursos/PDFs/SALUD-PARA-CONTAR-2024.pdf', '', '/Recursos/imagenes/libro16.webp'],
  ['18', 'LOS SECRETOS DE LAS PLANTAS', 'Adultos', '', '/Recursos/PDFs/SALUD-PARA-CONTAR-2024.pdf', '', '/Recursos/imagenes/libro17.webp'],
  ['19', 'LA FINCA VIVA', 'Adultos', '', '/Recursos/PDFs/SALUD-PARA-CONTAR-2024.pdf', '', '/Recursos/imagenes/libro18.webp'],
  ['20', 'TAN DISTINTOS Y PARIENTES', 'Adultos', '', '/Recursos/PDFs/SALUD-PARA-CONTAR-2024.pdf', '', '/Recursos/imagenes/libro19.webp'],
  ['21', 'TIEMPO DE HACER', 'Adultos', '', '/Recursos/PDFs/SALUD-PARA-CONTAR-2024.pdf', '', '/Recursos/imagenes/libro20.webp'],
  ['22', 'LOS PRIMEROS AÑOS', 'Adultos', '', '/Recursos/PDFs/SALUD-PARA-CONTAR-2024.pdf', '', '/Recursos/imagenes/libro21.webp'],
  ['23', 'LECTURAS FANTÁSTICAS', 'Adultos', '', '/Recursos/PDFs/SALUD-PARA-CONTAR-2024.pdf', '', '/Recursos/imagenes/libro22.webp'],
  ['24', 'CALOR DE HOGAR', 'Adultos', '', '/Recursos/PDFs/SALUD-PARA-CONTAR-2024.pdf', '', '/Recursos/imagenes/libro23.webp'],
  ['25', 'PLANETA VIVO', 'Adultos', '', '/Recursos/PDFs/SALUD-PARA-CONTAR-2024.pdf', '', '/Recursos/imagenes/libro24.webp'],
  ['26', 'CUENTOS Y PASATIEMPOS', 'Adultos', '', '/Recursos/PDFs/SALUD-PARA-CONTAR-2024.pdf', '', '/Recursos/imagenes/libro25.webp'],
  ['27', 'EL HOMBRE Y SU CULTURA', 'Adultos', '', '/Recursos/PDFs/SALUD-PARA-CONTAR-2024.pdf', '', '/Recursos/imagenes/libro26.webp']
];

const table = document.getElementById("book-table");

const generateTable = () => {
  const thead = `
    <thead class="table-header">
      <tr>
        <th>Libro</th>
        <th>Nombre</th>
        <th>Leer</th>
        <th>Audiolibro</th>
        <th>Descargar</th>
        <th>Videos</th>
      </tr>
    </thead>
  `;
  
  let tbody = '<tbody>';
  conCategoría.forEach(fila => {
    const [id, nombre, categoria, spreakerUrl, pdf, videoUrl, imgUrl] = fila;
    tbody += `
      <tr>
        <td><img src="${imgUrl}" alt="Libro" class="book-img"></td>
        <td>${nombre}</td>
        <td>
          <button onclick="openPDF('${pdf}', '${nombre}')" class="btn btn-read">Leer
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M20 6 9 17l-5-5"></path></svg>
          </button>
        </td>
        <td>
          ${spreakerUrl ? 
            `<a href="${spreakerUrl}" target="_blank" class="btn btn-listen">Escuchar
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M20 6 9 17l-5-5"></path></svg>
            </a>` : 
            `<button class="btn btn-disabled">Escuchar X</button>`
          }
        </td>
        <td>
          ${pdf ? 
            `<a href="${url + pdf}" download="${url + pdf}" class="btn btn-read">Descargar
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M20 6 9 17l-5-5"></path></svg>
            </a>` : 
            `<button class="btn btn-disabled">Descargar X</button>`
          }
        </td>
        <td>
          ${videoUrl ? 
            `<a href="${videoUrl}" target="_blank" class="btn btn-read">Videos
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M20 6 9 17l-5-5"></path></svg>
            </a>` : 
            `<button class="btn btn-disabled">Video X</button>`
          }
        </td>
      </tr>
    `;
  });
  
  
  tbody += '</tbody>';
  
  table.innerHTML = thead + tbody;
};

// Función para abrir un PDF en una nueva ventana
function openPDF(pdfPath, title) {
  window.location.href = `/VerPdf/visor.html?pdf=${encodeURIComponent(pdfPath)}&title=${encodeURIComponent(title)}`;
}

generateTable();

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



