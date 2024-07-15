document.addEventListener("DOMContentLoaded", function() {
    const pdfViewer = document.querySelector('.pdf-viewer');
    const progressBar = document.querySelector('.progress-bar');
    const audioIframe = document.getElementById('audio-iframe');

    let pdfDoc = null;
    let totalPages = 0;
    let pdfUrl = null; // Variable para almacenar la URL del PDF actual

    // Obtener la URL del PDF desde la consulta en la URL
    const urlParams = new URLSearchParams(window.location.search);
    pdfUrl = urlParams.get('pdf');

    // Cargar documento PDF
    pdfjsLib.getDocument(pdfUrl).promise.then(function (pdfDocument) {
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

    // Obtener el audio correspondiente al PDF
    const audioUrl = getAudioUrl(pdfUrl);
    if (audioUrl) {
        audioIframe.src = audioUrl; 
    }

    function getAudioUrl(pdfUrl) {
        switch (pdfUrl) {
            case '/Recursos/Pdfs/Cuentos-y-pasatiempos.pdf':
                return 'https:widget.spreaker.com/player?show_id=4421091&theme=light&playlist=show&playlist-continuous=true&chapters-image=true ';
            case '/Ejemplo/Pdfs/ERASE-UNA-VEZ-EN-COLOMBIA.pdf':
                return 'https://widget.spreaker.com/player?episode_id=60214766&theme=dark&chapters-image=true';
            case '/Ejemplo/Pdfs/TODO-LO-CONTRARIO.pdf':
                return 'https://widget.spreaker.com/player?episode_id=60214767&theme=dark&chapters-image=true';
            case '/Ejemplo/Pdfs/lectura.pdf':
                return 'https://widget.spreaker.com/player?episode_id=60214768&theme=dark&chapters-image=true';
            default:
                return null;
        }
    }

    function updateProgressOnScroll() {
        pdfViewer.addEventListener('scroll', () => {
            const scrolled = pdfViewer.scrollTop + pdfViewer.clientHeight;
            const totalHeight = pdfViewer.scrollHeight;
            const progress = Math.min((scrolled / totalHeight) * 100, 100);

            progressBar.style.width = `${progress}%`;
            progressBar.textContent = `${Math.round(progress)}% leído`;

            localStorage.setItem('pdfReadProgress', progress);
        });

        const progress = localStorage.getItem('pdfReadProgress');
        if (progress) {
            const scrolled = (progress / 100) * pdfViewer.scrollHeight;
            pdfViewer.scrollTop = scrolled - pdfViewer.clientHeight;
            progressBar.style.width = `${progress}%`;
            progressBar.textContent = `${Math.round(progress)}% leído`;
        }
    }

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
    downloadButton.addEventListener('click', function (event) {
        event.preventDefault();
        const link = document.createElement('a');
        link.href = pdfUrl; // Usa la url del PDF actual
        link.download = pdfUrl.split('/').pop(); // Obtiene el nombre del archivo de la URL
        link.click();
    });
});
