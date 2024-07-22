document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM completamente cargado y analizado");

  const searchInput = document.getElementById("search-input");

  if (searchInput) {
    searchInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        console.log("Enter presionado");
        searchBooks();
      }
    });
  } else {
    console.error('El elemento con id "search-input" no se encontró en el DOM');
  }

  // Función para filtrar libros
  function filterBooks(searchText) {
    const books = document.querySelectorAll(".product-card");
    let found = false;

    books.forEach((book) => {
      const title = book
        .querySelector(".product-name")
        .textContent.toLowerCase();
      if (title.includes(searchText)) {
        book.style.display = "";
        found = true;
      } else {
        book.style.display = "none";
      }
    });

    return found;
  }

  // Función para redirigir a otras páginas
  function redirectToPage(searchText) {
    if (searchText === "índice") {
      window.location.href = "/Indice/indice.html";
    } else if (searchText === "perfil") {
      window.location.href = "/Perfil/perfil.html";
    } else if (searchText === "principal") {
      window.location.href = "/principal.html";
    } else if (searchText === "guardados") {
      window.location.href = "/Guardados/guardados.html";
    } else if (searchText === "libros") {
      window.location.href = "/Libros/libro.html";
    }
  }

  // Función principal de búsqueda
  function searchBooks() {
    const searchInput = document.getElementById("search-input");
    const searchText = searchInput.value.toLowerCase();

    console.log(`Texto de búsqueda: ${searchText}`);

    const isPageSearch = [
      "índice",
      "perfil",
      "principal",
      "guardados",
      "libros",
    ].includes(searchText);

    if (isPageSearch) {
      console.log(`Redirigiendo a la página: ${searchText}`);
      redirectToPage(searchText);
    } else {
      const found = filterBooks(searchText);

      if (!found) {
        console.log("No se encontraron resultados.");
      }
    }
  }

  // Agregar el evento de clic para el ícono de búsqueda
  document.querySelector(".bx-search").addEventListener("click", function () {
    searchBooks();
  });

  // Función para actualizar la imagen de perfil en la página principal
  function updateProfilePic() {
    const profilePicElement = document.querySelector(".user-img"); // Selecciona el elemento de la imagen de perfil
    const profileData = JSON.parse(localStorage.getItem("profileData")); // Lee los datos del perfil desde localStorage

    if (profileData && profileData.profilePic) {
      profilePicElement.src = profileData.profilePic; // Actualiza la imagen de perfil
    }
  }

  // Llama a la función cuando la página se cargue
  updateProfilePic();
});
// const header = document.querySelector('header');

// window.addEventListener('scroll', () => {
//     header.classList.toggle('sticky', this.window.scrollY > 80);

// });

// // Open Menu

// let menu = document.querySelector('#menu-icon');
// let navlist = document.querySelector('.navlist');

// menu.onclick = () => {
//     menu.classList.toggle('bx-x');
//     navlist.classList.toggle('open');
// }

// //Solución

// window.onscroll = () => {
//     menu.classList.remove('bx-x');
//     navlist.classList.remove('open');
// }

// //ScrollReveat

// const sr = ScrollReveal({
//     origin: 'top',
//     distance: '1000px',
//     duration: 2500,
//     reset: false
// });

// sr.reveal('.home-text',{delay:500});
// sr.reveal('.home-img',{delay:600});
// sr.reveal('.container',{delay:400});

// sr.reveal('.about-img',{});
// sr.reveal('.about-text',{delay:300});

// sr.reveal('.middle-text',{});
// sr.reveal('.row-btn,.shop-content',{delay:300});

// sr.reveal('.review,.footer',{delay:300});
