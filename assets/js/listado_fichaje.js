//logica del menu lateral
const sidebar = document.querySelector(".sidebar");
const sidebarClose = document.querySelector("#sidebar-close");
const menu = document.querySelector(".menu-content");
const menuItems = document.querySelectorAll(".submenu-item");
const subMenuTitles = document.querySelectorAll(".submenu .menu-title");

sidebarClose.addEventListener("click", () => sidebar.classList.toggle("close"));

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    menu.classList.add("submenu-active");
    item.classList.add("show-submenu");
    menuItems.forEach((item2, index2) => {
      if (index !== index2) {
        item2.classList.remove("show-submenu");
      }
    });
  });
});

subMenuTitles.forEach((title) => {
  title.addEventListener("click", () => {
    menu.classList.remove("submenu-active");
  });
});


function logicaTamanioPantallaMenu() {

  const sidebar = document.querySelector('.sidebar');
  const screenIsMobile = window.innerWidth <= 768;

  if (screenIsMobile) {
    sidebar.classList.add('close');
  } else {
    sidebar.classList.remove('close');
  }

  const menuLinks = document.querySelectorAll('.menu-items a');  

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.add('close');
      }
    });
  });


}



document.addEventListener("DOMContentLoaded", () => {

  const userMenu = document.getElementById('user-menu-trigger');
  const dropdown = document.getElementById('user-dropdown');
  const menuContainer = document.querySelector('.user-menu-container');

  // Mostrar/ocultar al hacer clic
  userMenu.addEventListener('click', function (e) {
    e.stopPropagation();
    menuContainer.classList.toggle('active');
  });

  // Cerrar al hacer clic fuera
  document.addEventListener('click', function (e) {
    if (!menuContainer.contains(e.target)) {
      menuContainer.classList.remove('active');
    }
  });

  // Evitar que se cierre al hacer clic en el menú
  dropdown.addEventListener('click', function (e) {
    e.stopPropagation();
  });


  // Mostrar nombre de usuario en navbar superior
  const usuarioNombre = localStorage.getItem("usuarioNombre");
  //const nombreElement = document.getElementById("usuarioNombre");
  const nombreCardElement = document.getElementById("navbar-usuario-nombre");

  if (usuarioNombre) {
    nombreCardElement.textContent = usuarioNombre;
  }


  //logica tamaño de pantalla 
  logicaTamanioPantallaMenu();
  mostrarFichaje();

});

async function mostrarFichaje() {

    cargarTablaFichajes();
  
}


function cargarTablaFichajes() {
  const tbody = document.querySelector('#tablaFichajes2 tbody');
  tbody.innerHTML = ''; // Limpiar la tabla

  // Datos hardcodeados
  const fichajes = [
    {
      fecha: '2025-04-30',
      hora: '08:45',
      tipo: 'Entrada',
      usuario: 'Demo'
    },
    {
      fecha: '2025-04-30',
      hora: '17:50',
      tipo: 'Salida',
      usuario: 'Demo'
    },
    {
      fecha: '2025-05-01',
      hora: '08:55',
      tipo: 'Entrada',
      usuario: 'Demo'
    },
    {
      fecha: '2025-05-01',
      hora: '18:01',
      tipo: 'Salida',
      usuario: 'Demo'
    }
  ];

  fichajes.forEach(fichaje => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${fichaje.fecha}</td>
      <td>${fichaje.hora}</td>
      <td>${fichaje.tipo}</td>
      <td>${fichaje.usuario}</td>
    `;

    tbody.appendChild(tr);
  });
}


function Fichaje() {
  window.location.href = 'menu.html';
}

function logout() {

  // Limpiar almacenamiento
  localStorage.removeItem("usuarioNombre");

  window.location.href = 'index.html';
}









