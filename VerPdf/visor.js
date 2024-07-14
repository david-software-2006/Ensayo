document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const pdfPath = urlParams.get('pdf');
    const pdfViewer = document.querySelector('.pdf-viewer');
    const progressBar = document.querySelector('.progress-bar');

    let pdfDoc = null;
    let totalPages = 0;
    let currentPage = 1;

    // Cargar documento PDF
    pdfjsLib.getDocument(pdfPath).promise.then(function (pdfDocument) {
        pdfDoc = pdfDocument;
        totalPages = pdfDoc.numPages;

        // Renderizar todas las páginas
        renderAllPages();
    }).catch(function (error) {
        console.error('Error al cargar el PDF:', error);
    });

    function renderAllPages() {
        const promises = [];
        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            promises.push(renderPage(pageNum));
        }
        Promise.all(promises)
            .then(() => {
                updateProgressOnScroll();
            })
            .catch(error => {
                console.error('Error al renderizar páginas:', error);
            });
    }

    function renderPage(num) {
        return pdfDoc.getPage(num).then(function (page) {
            const viewport = page.getViewport({ scale: 1.2 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };

            return page.render(renderContext).promise.then(() => {
                pdfViewer.appendChild(canvas);
            });
        }).catch(function (error) {
            console.error('Error al renderizar la página', error);
        });
    }

    function updateProgressOnScroll() {
        pdfViewer.addEventListener('scroll', () => {
            const scrolled = pdfViewer.scrollTop + pdfViewer.clientHeight;
            const totalHeight = pdfViewer.scrollHeight;
            const progress = Math.min((scrolled / totalHeight) * 100, 100);
            progressBar.style.width = `${progress}%`;
            progressBar.textContent = `${Math.round(progress)}% leído`;
            localStorage.setItem('pdfReadProgress', progress); // Cambio a localStorage
        });

        // Restaurar el progreso de lectura almacenado
        const progress = localStorage.getItem('pdfReadProgress'); // Cambio a localStorage
        if (progress) {
            const scrolled = (progress / 100) * pdfViewer.scrollHeight;
            pdfViewer.scrollTop = scrolled - pdfViewer.clientHeight;
            progressBar.style.width = `${progress}%`;
            progressBar.textContent = `${Math.round(progress)}% leído`;
        }
    }

    // Mostrar u ocultar menú izquierdo al hacer clic en el botón correspondiente
    const leftMenuButton = document.getElementById('left-menu-button');
    const leftMenu = document.getElementById('left-menu');
    const closeLeftMenuButton = document.getElementById('close-left-menu');

    leftMenuButton.addEventListener('click', function () {
        leftMenu.classList.toggle('active');
    });

    closeLeftMenuButton.addEventListener('click', function () {
        leftMenu.classList.remove('active');
    });

    const downloadButton = document.getElementById('download-btn');
    downloadButton.addEventListener('click', function () {
        const link = document.createElement('a');
        link.href = pdfPath;
        link.download = pdfPath.split('/').pop(); // Nombre del archivo PDF descargado
        link.click();
    });
});