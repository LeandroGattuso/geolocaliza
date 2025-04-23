function registrarEvento(tipo) {
  const pin = document.getElementById('pin').value;
  const log = document.getElementById('log');

  if (!pin) {
    alert("Por favor ingresa tu PIN.");
    return;
  }

  if (!navigator.geolocation) {
    log.innerHTML = "La geolocalización no es soportada por este navegador.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const fechaHora = new Date().toLocaleString();
      const lat = position.coords.latitude.toFixed(6);
      const lon = position.coords.longitude.toFixed(6);
      const acc = position.coords.accuracy.toFixed(2); // Precisión en metros
      const mapId = `map-${Date.now()}`; // ID único para cada mapa
  
      const html = `
        <div class="registro">
          <p><strong>${tipo}</strong> registrada</p>
          <ul>
            <li><b>PIN:</b> ${pin}</li>
            <li><b>Fecha y Hora:</b> ${fechaHora}</li>
            <li><b>Ubicación:</b> ${lat}, ${lon}</li>
            <li><b>Precisión:</b> ±${acc} metros</li>
          </ul>
          <div id="${mapId}" class="map"></div>
          <hr>
        </div>
      `;
  
      const temp = document.createElement("div");
      temp.innerHTML = html;
      log.prepend(temp); // Muestra la última marca primero
  
      requestAnimationFrame(() => {
        const map = L.map(mapId).setView([lat, lon], 16);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        L.marker([lat, lon]).addTo(map);
      });
    },
    (error) => {
      log.innerHTML = "Error al obtener la ubicación: " + error.message;
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
  
}

function marcarEntrada() {
  registrarEvento("Entrada");
}

function marcarSalida() {
  registrarEvento("Salida");
}

