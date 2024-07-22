document.addEventListener("DOMContentLoaded", function() {
    const pdfViewer = document.querySelector('.pdf-viewer');
    const progressBar = document.querySelector('.progress-bar');
    const audioIframe = document.getElementById('audio-iframe');
 
    let pdfDoc = null;
    let totalPages = 0;
    let pdfUrl = null;
 
    // Obtener la URL del PDF desde los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    pdfUrl = urlParams.get('pdf');
 
    // Cargar el PDF usando pdf.js
    pdfjsLib.getDocument(pdfUrl).promise.then(function (pdfDocument) {
        pdfDoc = pdfDocument;
        totalPages = pdfDoc.numPages;
 
        // Obtener la página actual desde localStorage o iniciar desde la primera página
        const currentPage = parseInt(localStorage.getItem(`page-${pdfUrl}`)) || 1;
        renderAllPages(currentPage);
    }).catch(function (error) {
        console.error('Error al cargar el PDF:', error);
    });
 
    // Función para renderizar todas las páginas del PDF a partir de una página específica
    function renderAllPages() {
        const promises = [];
        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            promises.push(renderPage(pageNum));
        }
 
        // Esperar a que todas las páginas se rendericen y luego actualizar el progreso
        Promise.all(promises)
        .then(() => {
            updateProgressOnScroll();
        })
        .catch(error => {
            console.error('Error al renderizar páginas:', error);
        });
    }
 
    // Función para renderizar una página específica del PDF
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
 
    // Obtener la URL del audio correspondiente al PDF actual
    const audioUrl = getAudioUrl(pdfUrl);
    if (audioUrl) {
        audioIframe.src = audioUrl;
    }
 
    // Función para obtener la URL del audio basado en el PDF
    function getAudioUrl(pdfUrl) {
        switch (pdfUrl) {
            case '/Recursos/Pdfs/lectura.pdf':
                return 'https://open.spotify.com/embed/show/4pgUCRcRIQNKwPJBLMWxjP?utm_source=generator';
            case '/Ejemplo/Pdfs/TODO-LO-CONTRARIO.pdf':
                return 'https://open.spotify.com/embed/episode/1Esnox0odDsbJgEXLcsE2Z?utm_source=generator';
            case '/Ejemplo/Pdfs/la-finca-viva.pdf':
                return 'https://open.spotify.com/embed/episode/26RVsdvd8AEvvNfFYjTKpS?utm_source=generator';
            case '/Ejemplo/Pdfs/cuentos-para-desenredar-enredos.pdf':
                return 'https://open.spotify.com/embed/episode/53hWzLBrhZujbAJIuq8KIp?utm_source=generator';
            case '/Ejemplo/Pdfs/planeta-vivo.pdf':
                return 'https://open.spotify.com/embed/episode/71E5TM7AKdnKft3JOETuB8?utm_source=generator';
            case '/Ejemplo/Pdfs/el-hombre-y-su-cultura.pdf':
                return 'https://open.spotify.com/embed/episode/0r3prjruJleDxbFtPmApfj?utm_source=generator';
            case '/Ejemplo/Pdfs/cuentos-y-pasatiempos.pdf':
                return 'https://open.spotify.com/embed/episode/2kxA7GaDj9eRjZEY2L817g?utm_source=generator';
            case '/Ejemplo/Pdfs/la-casa-y-el-campo.pdf':
                return 'https://widget.spreaker.com/player?show_id=4421133&theme=light&playlist=show&playlist-continuous=true&chapters-image=true';
            case '/Ejemplo/Pdfs/historias-y-lugares.pdf':
                return 'https://widget.spreaker.com/player?show_id=4671213&theme=light&playlist=show&playlist-continuous=true&chapters-image=true';
            case '/Ejemplo/Pdfs/lecturas-para-todos-los-dias.pdf':
                return 'https://widget.spreaker.com/player?show_id=4421133&theme=light&playlist=show&playlist-continuous=true&chapters-image=true';
            case '/Ejemplo/Pdfs/en-la-casa-de-doña-nana.pdf':
                return 'https://widget.spreaker.com/player?show_id=4421242&theme=light&playlist=show&playlist-continuous=true&chapters-image=true';
            default:
                return null;
        }
    }
 
    // Función para actualizar la barra de progreso en función del desplazamiento
    function updateProgressOnScroll() {
        pdfViewer.addEventListener('scroll', () => {
            const scrolled = pdfViewer.scrollTop + pdfViewer.clientHeight;
            const totalHeight = pdfViewer.scrollHeight;
            const progress = Math.min((scrolled / totalHeight) * 100, 100);
 
            // Actualizar el ancho de la barra de progreso y el texto
            progressBar.style.width = `${progress}%`;
            progressBar.textContent = `${Math.round(progress)}% leído`;
 
            // Guardar el progreso en localStorage
            localStorage.setItem(`pdfReadProgress-${pdfUrl}`, progress);
 
            // Guardar la página actual en localStorage
            const currentPage = Math.ceil(scrolled / (totalHeight / totalPages));
            localStorage.setItem(`page-${pdfUrl}`, currentPage);
        });
 
        // Recuperar y aplicar el progreso almacenado al cargar la página
        const progress = localStorage.getItem(`pdfReadProgress-${pdfUrl}`) || 0;
        progressBar.style.width = `${progress}%`;
        progressBar.textContent = `${Math.round(progress)}% leído`;
 
        const maxScroll = pdfViewer.scrollHeight - pdfViewer.clientHeight;
        const scrolled = (progress / 100) * maxScroll;
        pdfViewer.scrollTop = scrolled;
    }
 
    // Función para descargar el PDF
    const downloadButton = document.getElementById('download-btn');
    downloadButton.addEventListener('click', function (event) {
        event.preventDefault();
        const link = document.createElement('a');
        link.href = pdfUrl; // Usa la URL del PDF actual
        link.download = pdfUrl.split('/').pop(); // Obtiene el nombre del archivo de la URL
        link.click();
    });
 
    // Funcionalidad del menú izquierdo
    const leftMenuButton = document.getElementById('left-menu-button');
    const leftMenu = document.getElementById('left-menu');
    const closeLeftMenuButton = document.getElementById('close-left-menu');
 
    leftMenuButton.addEventListener('click', function () {
        leftMenu.classList.toggle('active');
    });
 
    closeLeftMenuButton.addEventListener('click', function () {
        leftMenu.classList.remove('active');
    });
 
    // Funcionalidad adicional integrada
    function scrollToPage(pageNumber) {
        const pageOffsetTop = document.querySelector(`.page-${pageNumber}`).offsetTop;
        pdfViewer.scrollTo({ top: pageOffsetTop, behavior: 'smooth' });
    }
 
    // Llamar a la función para scroll a la página actual al inicio
    scrollToPage(parseInt(localStorage.getItem(`page-${pdfUrl}`)) || 1);
});