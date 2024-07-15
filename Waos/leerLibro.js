

const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('id');
let pdfLibro = '/PDFs/';
const conCategoría = JSON.parse(localStorage.getItem('conCategoría'));

window.addEventListener('load', () => {
    getBook(bookId);
    mostrarPDF(pdfLibro);
});

function getBook(id){
    conCategoría.find((fila) => {
        console.log('fila[0]',fila[0]);
        if(fila[0] == id){
            pdfLibro += fila[4];
            console.log('pdfLibro',pdfLibro);
        }
    });
}

function mostrarPDF(url){

    // Asignar a la variable pdfjsLib
    const pdfjsLib = window['pdfjs-dist/build/pdf'];

    // Asignar a la variable de trabajador
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

    // Cargar el PDF
    pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
        const pdfViewer = document.getElementById('pdf-viewer');
        let pdfDoc = pdfDoc_;
        let pageNum = 1;

        // Función para renderizar una página
        function renderPage(num) {
            pdfDoc.getPage(num).then(function(page) {
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Renderizar la página en el canvas
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                page.render(renderContext);

                pdfViewer.appendChild(canvas);
            });
        }

        // Renderizar todas las páginas
        for(let num = 1; num <= pdfDoc.numPages; num++) {
            renderPage(num);
        }
    });
}

function mostrarPDF(url){

    // Asignar a la variable pdfjsLib
    const pdfjsLib = window['pdfjs-dist/build/pdf'];

    // Asignar a la variable de trabajador
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

    // Cargar el PDF
    pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
        const pdfViewer = document.getElementById('pdf-viewer');
        let pdfDoc = pdfDoc_;
        let pageNum = 1;

        // Función para renderizar una página
        function renderPage(num) {
            pdfDoc.getPage(num).then(function(page) {
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Renderizar la página en el canvas
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                page.render(renderContext);

                pdfViewer.appendChild(canvas);
            });
        }

        // Renderizar todas las páginas
        for(let num = 1; num <= pdfDoc.numPages; num++) {
            renderPage(num);
        }
    });
}