// Configuración - Cambiar a true para mostrar mapas
const MOSTRAR_MAPAS = false;

// Configuración de iconos para Leaflet (solo si MOSTRAR_MAPAS es true)
if (MOSTRAR_MAPAS) {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
  });
}

const pinInput = document.getElementById("pin");
const log = document.getElementById("log");

//LG: configuracion base de la API
//const { API_BASE_URL, API } = getApiConfig();


const registrar = (tipo) => {

  const pin = pinInput.value.trim();
  if (!pin) {
    showAlert("Por favor, ingresar su PIN");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const fechaHora = new Date().toLocaleString();
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const mapId = `map-${Date.now()}`; // ID unico
      let empleado = 'Demo';

      const html = `
        <div class="registro border-top pt-3">
          <p class="mb-1"><strong>${tipo} registrada</strong></p>
          <ul class="list-unstyled small mb-2">
            <li><b>Usuario:</b> ${empleado}</li>   
            <li><b>Fecha:</b> ${fechaHora}</li>
            <li><b>Ubicación:</b> ${lat.toFixed(6)}, ${lon.toFixed(6)}</li>
          </ul>
          <div id="${mapId}" class="map"></div>
        </div>
      `;

      const temp = document.createElement("div");
      temp.innerHTML = html;
      log.prepend(temp);

      requestAnimationFrame(() => {
        const map = L.map(mapId).setView([lat, lon], 17);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        L.marker([lat, lon]).addTo(map);
      });
    },
    (error) => {
      showAlert("Error al obtener la ubicación: " + error.message);
    },
    {
      enableHighAccuracy: true
    }
  );
};


function generarFingerprint() {
  return btoa([
    navigator.userAgent,
    screen.width,
    screen.height,
    screen.colorDepth
  ].join('|'));
}

//LG: guardar o reutilizar fingerprint
function obtenerFingerprint() {
  let fingerprint = localStorage.getItem("fingerprint");
  if (!fingerprint) {
    fingerprint = generarFingerprint();
    localStorage.setItem("fingerprint", fingerprint);
  }
  return fingerprint;
}

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


  const btnEntrada = document.getElementById("btnEntrada");
  const btnSalida = document.getElementById("btnSalida");

  //LG: metodos que se disparan desde los botones de la fichada inicial
  btnEntrada.addEventListener("click", () => registrar("Entrada"));
  btnSalida.addEventListener("click", () => registrar("Salida"));

  //logica tamaño de pantalla 
  logicaTamanioPantallaMenu();

  //cargarFichajesDelDia(); // Mostrar todos

});






async function mostrarFichaje() {
  const pin = document.getElementById('pin').value;


  document.getElementById('registroContainer').classList.add('d-none');
  document.getElementById('tablaFichajesContainer').classList.remove('d-none');


    cargarTablaFichajes(fichajes);
  
}


function cargarTablaFichajes(fichajes) {
  const tbody = document.querySelector('#tablaFichajes tbody');
  tbody.innerHTML = ''; // Limpiar la tabla

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









