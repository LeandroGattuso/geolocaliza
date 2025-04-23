
const pinInput = document.getElementById("pin");
const btnEntrada = document.getElementById("btnEntrada");
const btnSalida = document.getElementById("btnSalida");
const log = document.getElementById("log");

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

btnEntrada.addEventListener("click", () => registrar("Entrada"));
btnSalida.addEventListener("click", () => registrar("Salida"));

//LG: logica alert
const alertContainer = document.getElementById("alertContainer");

function showAlert(message, type = "danger", timeout = 2000) {

  //LG: Eliminar cualquier alerta existente
  alertContainer.innerHTML = "";

  const alertId = `alert-${Date.now()}`;
  const alert = document.createElement("div");
  alert.className = `alert alert-${type} alert-dismissible fade show`;
  alert.role = "alert";
  alert.id = alertId;
  alert.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
  alertContainer.appendChild(alert);

  // Cierre automático
  setTimeout(() => {
    const alertEl = bootstrap.Alert.getOrCreateInstance(document.getElementById(alertId));
    alertEl.close();
  }, timeout);
}



