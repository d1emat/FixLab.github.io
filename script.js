const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const yearElement = document.getElementById("year");
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");
const loginButton = document.querySelector(".btn-login");
const contactForm = document.getElementById("contactForm");
const reservationForm = document.getElementById("reservationForm");
const formMessage = document.getElementById("formMessage");
const reservationMessage = document.getElementById("reservationMessage");
const SESSION_KEY = "fixlabSessionUser";
const EMAILJS_PUBLIC_KEY = "OqZOnvQHedOZwpT5m";
const EMAILJS_SERVICE_ID = "service_hzb1vrj";
const EMAILJS_TEMPLATE_ID = "template_wxzr0ri";

window.requestAnimationFrame(() => {
  document.body.classList.add("page-ready");
});

if (window.emailjs) {
  window.emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
  });
}

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

if (loginButton) {
  const currentUser = localStorage.getItem(SESSION_KEY);
  if (currentUser) {
    loginButton.textContent = "Cerrar sesión";
    loginButton.setAttribute("href", "#");
    loginButton.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.removeItem(SESSION_KEY);
      window.location.href = "index.html";
    });
  } else {
    loginButton.textContent = "Iniciar sesión";
    loginButton.setAttribute("href", "login.html");
  }
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }
    if (!navLinks.contains(target) && !menuToggle.contains(target)) {
      navLinks.classList.remove("show");
    }
  });
}

if (loginForm && loginMessage) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const email = (formData.get("email") || "").toString().trim().toLowerCase();
    const password = (formData.get("password") || "").toString().trim();

    if (!email || !password) {
      loginMessage.textContent = "Introduce tu email y contraseña.";
      loginMessage.style.color = "#b1416f";
      return;
    }

    localStorage.setItem(SESSION_KEY, email);
    loginMessage.textContent = "Inicio de sesión correcto. Redirigiendo...";
    loginMessage.style.color = "#3d63db";
    window.setTimeout(() => {
      window.location.href = "index.html";
    }, 600);
  });
}

if (contactForm && formMessage && window.emailjs) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const phone = (formData.get("phone") || "").toString().trim();
    const service = (formData.get("service") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();

    if (!name || !email || !phone || !service || !message) {
      formMessage.textContent = "Completa todos los campos antes de enviar.";
      formMessage.style.color = "#b1416f";
      return;
    }

    formMessage.textContent = "Enviando mensaje...";
    formMessage.style.color = "#3d63db";

    try {
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: name,
        from_email: email,
        phone,
        service,
        message,
        form_type: "Contacto"
      });
      formMessage.textContent = "Mensaje enviado correctamente. Te responderemos pronto.";
      formMessage.style.color = "#3d63db";
      contactForm.reset();
    } catch (error) {
      const reason =
        (error && typeof error === "object" && "text" in error && error.text) ||
        (error && typeof error === "object" && "message" in error && error.message) ||
        "Error desconocido";
      formMessage.textContent = `No se pudo enviar el mensaje: ${reason}`;
      formMessage.style.color = "#b1416f";
    }
  });
}

if (reservationForm && reservationMessage && window.emailjs) {
  reservationForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(reservationForm);
    const name = (formData.get("name") || "").toString().trim();
    const phone = (formData.get("phone") || "").toString().trim();
    const service = (formData.get("service") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();

    if (!name || !phone || !service) {
      reservationMessage.textContent = "Completa nombre, teléfono y servicio.";
      reservationMessage.style.color = "#b1416f";
      return;
    }

    reservationMessage.textContent = "Enviando reserva...";
    reservationMessage.style.color = "#3d63db";

    try {
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: name,
        from_email: "reserva@fixlab.local",
        phone,
        service,
        message: message || "Sin detalles adicionales.",
        form_type: "Reserva"
      });
      reservationMessage.textContent = "Reserva enviada correctamente. Te contactaremos pronto.";
      reservationMessage.style.color = "#3d63db";
      reservationForm.reset();
    } catch (error) {
      const reason =
        (error && typeof error === "object" && "text" in error && error.text) ||
        (error && typeof error === "object" && "message" in error && error.message) ||
        "Error desconocido";
      reservationMessage.textContent = `No se pudo enviar la reserva: ${reason}`;
      reservationMessage.style.color = "#b1416f";
    }
  });
}

if (contactForm && formMessage && !window.emailjs) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.textContent = "EmailJS no está cargado. Revisa internet o bloqueo del navegador.";
    formMessage.style.color = "#b1416f";
  });
}

if (reservationForm && reservationMessage && !window.emailjs) {
  reservationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    reservationMessage.textContent = "EmailJS no está cargado. Revisa internet o bloqueo del navegador.";
    reservationMessage.style.color = "#b1416f";
  });
}

const revealItems = document.querySelectorAll(".reveal");
if (revealItems.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

document.querySelectorAll("a[href]").forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href) {
      return;
    }
    const isExternal = link.target === "_blank" || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
    const isAnchor = href.startsWith("#");
    const isDownload = link.hasAttribute("download");
    if (isExternal || isAnchor || isDownload || event.defaultPrevented) {
      return;
    }

    event.preventDefault();
    document.body.classList.add("page-leaving");
    window.setTimeout(() => {
      window.location.href = href;
    }, 140);
  });
});
