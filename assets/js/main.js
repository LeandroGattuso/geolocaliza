
const pinInput = document.getElementById("pin");
const btnEntrada = document.getElementById("btnEntrada");
const btnSalida = document.getElementById("btnSalida");
const log = document.getElementById("log");

const API = {
  VALIDAR_PIN: "http://localhost:3000/validar-pin",
  REGISTRAR: "http://localhost:3000/registrar",
  LOGIN: "http://localhost:3000/login",
};


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

      const html = `
        <div class="registro border-top pt-3">
          <p class="mb-1"><strong>${tipo} registrada</strong></p>
          <ul class="list-unstyled small mb-2">
            <li><b>PIN:</b> ${pin}</li>
            <li><b>Fecha y Hora:</b> ${fechaHora}</li>
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

const login = () => {

  const usuario = document.getElementById("usuario").value.trim();
  const pass = document.getElementById("pinLogin").value.trim(); 

  if (!usuario || !pass) {    
    showAlert("Por favor, completar usuario y contraseña");
    return;
  }

   // Validar si el usuario no es "demo" y la contraseña no es "123"
   if (usuario !== "Demo" || pass !== "123") {
    showAlert("Usuario y/o contraseña incorrecto");
    return;
  }

  //mostrarPanelRegistro("Demo");
  window.location.href = "menu.html"; // <--- Redirige

};

//LG: metodos que se disparan desde los botones de la fichada inicial
btnEntrada.addEventListener("click", () => registrar("Entrada"));
btnSalida.addEventListener("click", () => registrar("Salida"));
btnLogin.addEventListener("click", () => login());

function mostrarPanelRegistro(nombreUsuario = "") {

  document.getElementById("loginContainer").classList.add("d-none");
  document.getElementById("registroContainer").classList.remove("d-none");

  // Mostrar el nombre del usuario arriba
  const usuarioNombreDiv = document.getElementById("usuarioNombre");
  if (usuarioNombreDiv) {
    usuarioNombreDiv.textContent = nombreUsuario ? `${nombreUsuario}` : "";
    //usuarioNombreDiv.textContent = nombreUsuario ? `Usuario: ${nombreUsuario}` : "";
  }
}




function generarFingerprint() {
  return btoa([
    navigator.userAgent,
    screen.width,
    screen.height,
    screen.colorDepth
  ].join('|'));
}

// Guardar o reutilizar fingerprint
function obtenerFingerprint() {
  let fingerprint = localStorage.getItem("fingerprint");
  if (!fingerprint) {
    fingerprint = generarFingerprint();
    localStorage.setItem("fingerprint", fingerprint);
  }
  return fingerprint;
}


//LG: logica alert
const alertContainer = document.getElementById("alertContainer");

function showAlert(message, type = "danger", timeout = 2000) {

  //LG: determinar qué contenedor está visible
  let container = null;

  // 1. Si está visible el modal de registro de usuario, usamos su contenedor
  const modal = document.getElementById("registroUsuarioModal");
  const modalVisible = modal && modal.classList.contains("show"); // Bootstrap le pone "show" cuando está abierto

  if (modalVisible) {
    container = document.getElementById("registroUsuarioAlert");
  }

  // 2. Si está el login visible, usamos su contenedor
  else if (!document.getElementById("loginContainer").classList.contains("d-none")) {
    container = document.getElementById("loginAlertContainer");
  }

  // 3. Si nada anterior aplica, usamos el contenedor general de registro
  else {
    container = document.getElementById("registroAlertContainer");
  }

  if (!container) {
    console.error("No se encontró contenedor de alertas visible");
    return;
  }

  console.log('Mostrando alerta con el mensaje:', message);
  container.innerHTML = "";

  const alertId = `alert-${Date.now()}`;
  const alert = document.createElement("div");
  alert.className = `alert alert-${type} alert-dismissible fade show`;
  alert.role = "alert";
  alert.id = alertId;
  alert.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
  container.appendChild(alert);

  setTimeout(() => {
    const alertEl = bootstrap.Alert.getOrCreateInstance(document.getElementById(alertId));
    alertEl.close();
  }, timeout);
}

document.getElementById('olvidePassword')?.addEventListener('click', function(e) {
  e.preventDefault();
  // Aquí puedes implementar la lógica para recuperar contraseña
  showAlert("Por favor contacte al administrador para recuperar su contraseña", "info", 3000, "loginAlertContainer");
});

//************************* DOM *************************

document.addEventListener("DOMContentLoaded", () => {

  const formRegistroUsuario = document.getElementById("formRegistroUsuario");
  const alertContainer = document.getElementById("registroUsuarioAlert");

  formRegistroUsuario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuario = document.getElementById("nuevoUsuario").value.trim();
    const pass = document.getElementById("nuevaPass").value.trim();
    const confirmarPass = document.getElementById("confirmarPass").value.trim();
    const pin = document.getElementById("nuevoPin").value.trim();

    if (!usuario || !pass || !confirmarPass || !pin) {
      showAlert("Por favor, completá todos los campos.", "danger");
      return;
    }

    if (pass !== confirmarPass) {
      showAlert("Las contraseñas no coinciden.", "danger");
      return;
    }

    try {

      if (1==1) {
        showAlert("Usuario registrado correctamente.", "success");

        setTimeout(() => {
          const modalElement = document.getElementById("registroUsuarioModal");
          let modalInstance = bootstrap.Modal.getInstance(modalElement);
          if (!modalInstance) {
            modalInstance = new bootstrap.Modal(modalElement);
          }
          modalInstance.hide();

          const inputUsuarioLogin = document.getElementById("usuario");
          if (inputUsuarioLogin) inputUsuarioLogin.value = usuario;

          formRegistroUsuario.reset();
        }, 2000);
      } else {
        showAlert(data?.error || "Error al registrar usuario.", "danger");
      }
    } catch (error) {
      showAlert("Error de conexión con el servidor.", "danger");
    }
  });



});








