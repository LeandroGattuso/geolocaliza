function showAlert(message, type = "danger", timeout = 2000, customContainerId = null) {
  let container = null;

  // 1. Si se especifica un contenedor personalizado (override), usarlo
  if (customContainerId) {
    container = document.getElementById(customContainerId);
  }

  // 2. Si está visible el modal de registro de usuario, usamos su contenedor
  if (!container) {
    const modal = document.getElementById("registroUsuarioModal");
    const modalVisible = modal && modal.classList.contains("show");
    if (modalVisible) {
      container = document.getElementById("registroUsuarioAlert");
    }
  }

  // 3. Si está el login visible, usamos su contenedor (solo si existe en el DOM actual)
  if (!container) {
    const loginContainer = document.getElementById("loginContainer");
    if (loginContainer && !loginContainer.classList.contains("d-none")) {
      container = document.getElementById("loginAlertContainer");
    }
  }

  // 4. Si nada anterior aplica, usamos el contenedor general de registro (si existe)
  if (!container) {
    container = document.getElementById("registroAlertContainer");
  }

  // Si no se encontró ningún contenedor válido, mostrar error en consola
  if (!container) {
    console.error("No se encontró contenedor de alertas visible para:", message);
    return;
  }

  // Limpiar alertas anteriores y mostrar la nueva
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

  // Cerrar automáticamente después del timeout
  if (timeout > 0) {
    setTimeout(() => {
      const alertEl = document.getElementById(alertId);
      if (alertEl) {
        const bsAlert = bootstrap.Alert.getOrCreateInstance(alertEl);
        bsAlert.close();
      }
    }, timeout);
  }
}









