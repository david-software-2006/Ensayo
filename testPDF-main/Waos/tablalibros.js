const url = '/Recursos/PDFs/'; // Ruta de la carpeta que contiene los archivos PDF.
const conCategoría = [
  ['1', 'CON LOS PELOS DE PUNTA', 'Historia', 'https://open.spotify.com/embed/show/4pgUCRcRIQNKwPJBLMWxjP?utm_source=generator', '/Recursos/Pdfs/CON-LOS-PELOS-DE-PUNTA.pdf', '', 'https://secretosparacontar.org/wp-content/uploads/2023/12/Portada-Con-los-pelos-de-punta.webp'],
  ['2', 'ERASE UNA VEZ EN COLOMBIA', 'Juegos', '', '/Recursos/Pdfs/ERASE-UNA-VEZ-EN-COLOMBIA.pdf', '', 'https://secretosparacontar.org/wp-content/uploads/2024/01/Portada-Erase-una-vez-en-colombia.webp'],
  ['3', 'TODO LO CONTRARIO', 'Adultos', 'https://open.spotify.com/embed/episode/1Esnox0odDsbJgEXLcsE2Z?utm_source=generator', '/Recursos/Pdfs/TODO-LO-CONTRARIO.pdf', '', 'https://secretosparacontar.org/wp-content/uploads/2024/01/PORTADA-CONTRARIOS.webp'],
  ['4', 'Cuentos para desenredar enredos', 'Adultos', 'https://open.spotify.com/embed/episode/53hWzLBrhZujbAJIuq8KIp?utm_source=generator', '/Recursos/Pdfs/cuentos-para-desenredar-enredos.pdf', '', 'https://secretosparacontar.org/wp-content/uploads/2024/01/PORTADA-ENREDOS.webp'],
  ['5', 'Entre cuento y cuento', 'Niños', '', '/Recursos/Pdfs/ENTRE-CUENTO-Y-CUENTO.pdf', '', 'https://secretosparacontar.org/wp-content/uploads/2024/01/Portada-Entre-cuento-y-cuento.webp'],
  ['6', 'salud para contar', 'Adultos', '', '/Recursos/PDFs/SALUD-PARA-CONTAR-2024.pdf', '', 'https://secretosparacontar.org/wp-content/uploads/2024/01/portada-Salud-para-contar.webp']
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