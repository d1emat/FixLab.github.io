const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const yearElement = document.getElementById("year");
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");
const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");
const loginButton = document.querySelector(".btn-login");
const contactForm = document.getElementById("contactForm");
const reservationForm = document.getElementById("reservationForm");
const formMessage = document.getElementById("formMessage");
const reservationMessage = document.getElementById("reservationMessage");
const serviceToggles = document.querySelectorAll(".service-toggle");
const storeSearch = document.getElementById("storeSearch");
const storePriceMax = document.getElementById("storePriceMax");
const storePriceValue = document.getElementById("storePriceValue");
const storeEmptyState = document.getElementById("storeEmptyState");
const storeTypeFilters = document.querySelectorAll(".store-filter-type");
const storeBrandFilters = document.querySelectorAll(".store-filter-brand");
const storeItems = document.querySelectorAll(".store-item");
const productDetail = document.getElementById("productDetail");
const productNotFound = document.getElementById("productNotFound");
const productName = document.getElementById("productName");
const productDescription = document.getElementById("productDescription");
const productPrice = document.getElementById("productPrice");
const productSpecs = document.getElementById("productSpecs");
const productMainImage = document.getElementById("productMainImage");
const productThumbs = document.getElementById("productThumbs");
const productQty = document.getElementById("productQty");
const productTotal = document.getElementById("productTotal");
const productReserveLink = document.getElementById("productReserveLink");
const productReservationForm = document.getElementById("productReservationForm");
const productReservationMessage = document.getElementById("productReservationMessage");
const productReservationSummary = document.getElementById("productReservationSummary");
const productReservationQty = document.getElementById("productReservationQty");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const SESSION_KEY = "fixlabSessionUser";
const USERS_KEY = "fixlabUsers";
const EMAILJS_PUBLIC_KEY = "OqZOnvQHedOZwpT5m";
const EMAILJS_SERVICE_ID = "service_hzb1vrj";
const EMAILJS_TEMPLATE_ID = "template_wxzr0ri";
const FIXLAB_TARGET_EMAIL = "FixLabCyL@gmail.com";
const WEB3FORMS_ACCESS_KEY = "030271c2-e0d6-4f8c-97e1-6b3d78ffc154";
const WEB3FORMS_API_URL = "https://api.web3forms.com/submit";
const RESERVATION_TICKETS_KEY = "fixlabReservationTickets";
const WHATSAPP_DEFAULT_URL =
  "https://wa.me/34600000000?text=Hola%20FixLab%2C%20quiero%20informaci%C3%B3n%20sobre%20una%20reparaci%C3%B3n.";

const generateOrderNumber = () => {
  const timestampChunk = Date.now().toString(36).slice(-4).toUpperCase();
  const randomChunk = Math.floor(100000 + Math.random() * 900000).toString();
  return `FL-${timestampChunk}-${randomChunk}`;
};

const normalizePhoneValue = (value) => value.replace(/\D/g, "");

const getStoredReservationTickets = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(RESERVATION_TICKETS_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveStoredReservationTickets = (tickets) => {
  localStorage.setItem(RESERVATION_TICKETS_KEY, JSON.stringify(tickets));
};

const PRODUCT_CATALOG = {
  "iphone-12": {
    name: "iPhone 12 reacondicionado",
    price: 299,
    description: "iPhone revisado en 30 puntos, bateria optimizada y desbloqueado.",
    specs: "128GB · Pantalla OLED · Face ID · Garantia 12 meses",
    images: ["https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12.jpg"]
  },
  "iphone-14-pro": {
    name: "iPhone 14 Pro reacondicionado",
    price: 449,
    description: "Version premium reacondicionada con camaras y rendimiento de alta gama.",
    specs: "128GB · ProMotion 120Hz · Triple camara · Garantia 12 meses",
    images: ["https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro.jpg"]
  },
  "iphone-15": {
    name: "iPhone 15 reacondicionado",
    price: 579,
    description: "Modelo reciente con USB-C, excelente autonomia y estado impecable.",
    specs: "128GB · USB-C · Camara 48MP · Garantia 12 meses",
    images: ["https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15.jpg"]
  },
  "samsung-s23": {
    name: "Samsung Galaxy S23 reacondicionado",
    price: 289,
    description: "Movil equilibrado con pantalla AMOLED y gran rendimiento.",
    specs: "128GB · AMOLED 120Hz · Carga rapida · Garantia 12 meses",
    images: ["https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s23-5g.jpg"]
  },
  "samsung-s24-ultra": {
    name: "Samsung Galaxy S24 Ultra reacondicionado",
    price: 329,
    description: "Modelo premium reacondicionado y testeado por nuestros tecnicos.",
    specs: "256GB · AMOLED 120Hz · Triple camara · Garantia 12 meses",
    images: ["Imagenes%20tienda/Foto_s24.png"]
  },
  "xiaomi-13t": {
    name: "Xiaomi 13T reacondicionado",
    price: 269,
    description: "Gran potencia para juegos y fotografia con precio ajustado.",
    specs: "256GB · Pantalla 144Hz · Carga 67W · Garantia 12 meses",
    images: ["https://fdn2.gsmarena.com/vv/bigpic/xiaomi-13t.jpg"]
  },
  "xiaomi-redmi-note": {
    name: "Xiaomi Redmi Note reacondicionado",
    price: 219,
    description: "Opcion muy completa para uso diario y multimedia.",
    specs: "128GB · Bateria larga duracion · Dual SIM · Garantia 12 meses",
    images: ["https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-note-13-pro-plus.jpg"]
  },
  "fundas-antigolpes": {
    name: "Fundas antigolpes",
    price: 14.9,
    description: "Fundas resistentes para iPhone, Samsung y Xiaomi.",
    specs: "Material TPU + policarbonato · Varios colores",
    images: ["Imagenes%20tienda/Foto_funda_1.jpg", "Imagenes%20tienda/Foto_funda_2.jpg"]
  },
  "protector-templado": {
    name: "Protector de pantalla templado",
    price: 12,
    description: "Cristal templado 9H con colocacion profesional en tienda.",
    specs: "Cobertura completa · Resistente a golpes y arañazos",
    images: ["Imagenes%20tienda/foto_protector_pantalla_1.jpg", "Imagenes%20tienda/Foto_protector_pantalla_2.jpg"]
  },
  "cargador-20w": {
    name: "Cargador rapido 20W",
    price: 18.9,
    description: "Cargador compacto de carga rapida con proteccion de voltaje.",
    specs: "USB-C · Carga rapida · Cable incluido",
    images: ["https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80"]
  },
  "auriculares-tws": {
    name: "Auriculares Bluetooth TWS",
    price: 24.9,
    description: "Auriculares inalambricos con estuche de carga y microfono HD.",
    specs: "Bluetooth 5.3 · Cancelacion pasiva · Hasta 20h de autonomia",
    images: ["https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80"]
  },
  "powerbank-10000": {
    name: "Power bank 10000mAh",
    price: 19.9,
    description: "Bateria externa ideal para viajes y jornada completa.",
    specs: "10000mAh · 2 puertos de salida · Carga segura",
    images: ["Imagenes%20tienda/Foto_powerbank.jpg"]
  },
  "soporte-coche-magnetico": {
    name: "Soporte coche magnetico",
    price: 11.9,
    description: "Soporte estable para rejilla del coche con giro 360 grados.",
    specs: "Iman reforzado · Instalacion rapida · Compatible universal",
    images: ["Imagenes%20tienda/soporte_coche.jpg"]
  }
};

window.requestAnimationFrame(() => {
  document.body.classList.add("page-ready");
});

const ensureWhatsAppButtonVisible = () => {
  let whatsappButton = document.querySelector(".whatsapp-float");
  if (!whatsappButton) {
    whatsappButton = document.createElement("a");
    whatsappButton.className = "whatsapp-float";
    whatsappButton.href = WHATSAPP_DEFAULT_URL;
    whatsappButton.target = "_blank";
    whatsappButton.rel = "noopener noreferrer";
    whatsappButton.setAttribute("aria-label", "Contactar por WhatsApp");
    whatsappButton.textContent = "WhatsApp";
    document.body.appendChild(whatsappButton);
  }

  whatsappButton.hidden = false;
  whatsappButton.style.position = "fixed";
  whatsappButton.style.right = "18px";
  whatsappButton.style.bottom = "18px";
  whatsappButton.style.left = "auto";
  whatsappButton.style.top = "auto";
  whatsappButton.style.zIndex = "10001";
  whatsappButton.style.display = "inline-flex";
  whatsappButton.style.visibility = "visible";
  whatsappButton.style.opacity = "1";

  document.body.appendChild(whatsappButton);
};

ensureWhatsAppButtonVisible();
const currentSessionUser = localStorage.getItem(SESSION_KEY);

const getCurrentPageFileName = () => (window.location.pathname.split("/").pop() || "").toLowerCase();

const getSafeInternalPath = (rawPath) => {
  if (!rawPath) {
    return "";
  }
  try {
    const candidate = new URL(rawPath, window.location.origin);
    if (candidate.origin !== window.location.origin) {
      return "";
    }
    return `${candidate.pathname}${candidate.search}${candidate.hash}`;
  } catch {
    return "";
  }
};

const DETAIL_PAGE_PATTERN = /^(servicio-[^/]+|tienda-(?!s\.html)[^/]+)\.html$/i;

const attachReturnOriginToDetailLinks = () => {
  const detailLinks = document.querySelectorAll('a[href$=".html"]');
  if (detailLinks.length === 0) {
    return;
  }

  detailLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) {
      return;
    }
    if (href.startsWith("http") || href.startsWith("#")) {
      return;
    }

    let targetUrl;
    try {
      targetUrl = new URL(href, window.location.href);
    } catch {
      return;
    }

    const fileName = (targetUrl.pathname.split("/").pop() || "").toLowerCase();
    if (!DETAIL_PAGE_PATTERN.test(fileName)) {
      return;
    }

    const parentSection = link.closest("section[id]");
    const sectionHash = parentSection ? `#${parentSection.id}` : "";
    const originPath = `${window.location.pathname}${window.location.search}${sectionHash || window.location.hash}`;
    targetUrl.searchParams.set("from", originPath);
    link.setAttribute("href", `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`);
  });
};

const setupSmartBackLinks = () => {
  const params = new URLSearchParams(window.location.search);
  const from = params.get("from");
  if (!from) {
    return;
  }

  const backLinks = document.querySelectorAll('a[href="servicios.html"], a[href="tiendas.html"]');
  if (backLinks.length === 0) {
    return;
  }

  let safeBackUrl;
  try {
    safeBackUrl = new URL(from, window.location.origin);
  } catch {
    return;
  }

  if (safeBackUrl.origin !== window.location.origin) {
    return;
  }

  const relativeBackUrl = `${safeBackUrl.pathname}${safeBackUrl.search}${safeBackUrl.hash}`;
  backLinks.forEach((link) => {
    if (link.textContent && link.textContent.toLowerCase().includes("volver")) {
      link.setAttribute("href", relativeBackUrl);
    }
  });
};

attachReturnOriginToDetailLinks();
setupSmartBackLinks();

if (getCurrentPageFileName() === "seguimiento.html" && !currentSessionUser) {
  window.location.href = "login.html?redirect=seguimiento.html";
}

const brandTitle = document.querySelector(".brand span");
if (brandTitle && brandTitle.textContent) {
  brandTitle.setAttribute("data-glitch", "");
  brandTitle.setAttribute("data-text", brandTitle.textContent.trim());
}

const heroTitle = document.querySelector(".hero h1");
if (heroTitle && heroTitle.textContent) {
  heroTitle.setAttribute("data-glitch", "");
  heroTitle.setAttribute("data-text", heroTitle.textContent.trim());
}

const heroPhoneImage = document.getElementById("heroPhoneImage");
if (heroPhoneImage && !reducedMotionQuery.matches) {
  const heroPhoneSequence = [
    {
      src: "Imagenes%20tienda/Foto_s24.png",
      alt: "Samsung Galaxy S24 Ultra reacondicionado en FixLab"
    },
    {
      src: "samsung_galaxy_s26_ultra_5g_morado_Frontback.webp",
      alt: "Samsung Galaxy S26 Ultra en color morado en FixLab"
    },
    {
      src: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-13t.jpg",
      alt: "Xiaomi 13T reacondicionado en FixLab"
    },
    {
      src: "Imagenes%20tienda/iPhone-14-pro.jpg",
      alt: "iPhone 14 Pro en exposición de FixLab"
    },
    {
      src: "Imagenes%20tienda/Nothing_Phone-3.png",
      alt: "Nothing Phone 3 en exposición de FixLab"
    }
  ];

  let heroPhoneIndex = 0;
  const triggerHeroPhoneSwitch = () => {
    heroPhoneImage.classList.add("is-switching");

    window.setTimeout(() => {
      heroPhoneIndex = (heroPhoneIndex + 1) % heroPhoneSequence.length;
      const nextPhone = heroPhoneSequence[heroPhoneIndex];
      heroPhoneImage.src = nextPhone.src;
      heroPhoneImage.alt = nextPhone.alt;
    }, 160);

    window.setTimeout(() => {
      heroPhoneImage.classList.remove("is-switching");
    }, 380);

    const nextDelay = 4200 + Math.floor(Math.random() * 2800);
    window.setTimeout(triggerHeroPhoneSwitch, nextDelay);
  };

  window.setTimeout(triggerHeroPhoneSwitch, 3400);
}

if (!reducedMotionQuery.matches) {
  const floatingItems = document.querySelectorAll(".card, .shop-card, .stat-card");
  floatingItems.forEach((item, index) => {
    item.classList.add("motion-float");
    item.style.animationDelay = `${(index % 6) * 0.18}s`;
  });

  const heroVisual = document.querySelector(".hero-visual");
  if (heroVisual) {
    document.addEventListener("mousemove", (event) => {
      const { innerWidth, innerHeight } = window;
      const offsetX = (event.clientX / innerWidth - 0.5) * 7;
      const offsetY = (event.clientY / innerHeight - 0.5) * 7;
      heroVisual.style.transform = `perspective(900px) rotateY(${offsetX}deg) rotateX(${-offsetY}deg)`;
    });

    document.addEventListener("mouseleave", () => {
      heroVisual.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
    });
  }
}

if (!reducedMotionQuery.matches && window.matchMedia("(pointer: fine)").matches && window.innerWidth > 980) {
  const cursorDot = document.createElement("div");
  cursorDot.className = "cyber-cursor";
  document.documentElement.appendChild(cursorDot);
  document.documentElement.classList.add("custom-cursor-active");
  document.body.classList.add("custom-cursor-active");

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  const followStrength = 0.42;
  const snapDistance = 0.35;

  document.addEventListener("mousemove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
  });

  const followCursor = () => {
    currentX += (targetX - currentX) * followStrength;
    currentY += (targetY - currentY) * followStrength;
    if (Math.abs(targetX - currentX) < snapDistance) {
      currentX = targetX;
    }
    if (Math.abs(targetY - currentY) < snapDistance) {
      currentY = targetY;
    }
    cursorDot.style.transform = `translate(${currentX - 5}px, ${currentY - 5}px)`;
    window.requestAnimationFrame(followCursor);
  };
  window.requestAnimationFrame(followCursor);
}

if (window.emailjs) {
  window.emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
  });
}

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

if (loginButton) {
  if (currentSessionUser) {
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

if (navLinks && currentSessionUser && !navLinks.querySelector('a[href="seguimiento.html"]')) {
  const trackingItem = document.createElement("li");
  const trackingLink = document.createElement("a");
  trackingLink.href = "seguimiento.html";
  trackingLink.textContent = "Seguimiento";
  if (getCurrentPageFileName() === "seguimiento.html") {
    trackingLink.classList.add("active");
  }
  trackingItem.appendChild(trackingLink);

  const contactItem = navLinks.querySelector('a[href="contacto.html"]')?.closest("li");
  if (contactItem) {
    navLinks.insertBefore(trackingItem, contactItem);
  } else {
    navLinks.appendChild(trackingItem);
  }
}

if (navLinks && !navLinks.querySelector('a[href="reserva.html"]')) {
  const reserveItem = document.createElement("li");
  const reserveLink = document.createElement("a");
  reserveLink.href = "reserva.html";
  reserveLink.textContent = "Reserva";
  if (getCurrentPageFileName() === "reserva.html") {
    reserveLink.classList.add("active");
  }
  reserveItem.appendChild(reserveLink);

  const contactItem = navLinks.querySelector('a[href="contacto.html"]')?.closest("li");
  if (contactItem) {
    navLinks.insertBefore(reserveItem, contactItem);
  } else {
    navLinks.appendChild(reserveItem);
  }
}

if (navLinks && !navLinks.querySelector(".nav-auth-item")) {
  const authItem = document.createElement("li");
  authItem.className = "nav-auth-item";
  const authLink = document.createElement("a");
  authLink.href = currentSessionUser ? "#" : "login.html";
  authLink.textContent = currentSessionUser ? "Cerrar sesión" : "Iniciar sesión";

  if (currentSessionUser) {
    authLink.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.removeItem(SESSION_KEY);
      window.location.href = "index.html";
    });
  }

  authItem.appendChild(authLink);
  navLinks.appendChild(authItem);
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

    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const userExists = users.some((user) => user.email === email && user.password === password);
    if (!userExists) {
      loginMessage.textContent = "Cuenta no encontrada o contraseña incorrecta. Regístrate primero.";
      loginMessage.style.color = "#b1416f";
      return;
    }

    localStorage.setItem(SESSION_KEY, email);
    loginMessage.textContent = "Inicio de sesión correcto. Redirigiendo...";
    loginMessage.style.color = "#3d63db";
    window.setTimeout(() => {
      const redirectFromQuery = new URLSearchParams(window.location.search).get("redirect");
      const safeRedirect = getSafeInternalPath(redirectFromQuery);
      window.location.href = safeRedirect || "index.html";
    }, 600);
  });
}

const trackingForm = document.getElementById("trackingForm");
const trackingMessage = document.getElementById("trackingMessage");
const trackingResult = document.getElementById("trackingResult");
const trackingEmail = document.getElementById("trackingEmail");
const TRACKING_STATES = [
  "Solicitud recibida",
  "Diagnóstico en curso",
  "Esperando repuesto",
  "Reparación en proceso",
  "Pruebas finales",
  "Lista para recoger"
];

if (trackingEmail && currentSessionUser) {
  trackingEmail.textContent = currentSessionUser;
}

if (trackingForm && trackingMessage && trackingResult) {
  const storedTickets = getStoredReservationTickets();
  if (storedTickets.length > 0) {
    const latestTicket = currentSessionUser
      ? storedTickets.find((ticket) => ticket.email === currentSessionUser) || storedTickets[0]
      : storedTickets[0];
    const codeInput = trackingForm.querySelector("#trackingCode");
    if (codeInput instanceof HTMLInputElement && latestTicket && latestTicket.orderNumber) {
      codeInput.value = latestTicket.orderNumber;
    }
  }

  trackingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(trackingForm);
    const code = (formData.get("trackingCode") || "").toString().trim().toUpperCase();
    const phone = (formData.get("trackingPhone") || "").toString().trim();
    const normalizedPhone = normalizePhoneValue(phone);

    if (code.length < 4 || normalizedPhone.length === 0) {
      trackingMessage.textContent = "Introduce un código válido y un teléfono correcto.";
      trackingMessage.style.color = "#b1416f";
      trackingResult.hidden = true;
      return;
    }

    const ticket = getStoredReservationTickets().find((item) => {
      const sameCode = (item.orderNumber || "").toUpperCase() === code;
      const samePhone = normalizePhoneValue(item.phone || "") === normalizedPhone;
      return sameCode && samePhone;
    });

    if (!ticket) {
      trackingMessage.textContent = "No encontramos una reserva con ese código y teléfono.";
      trackingMessage.style.color = "#b1416f";
      trackingResult.hidden = true;
      return;
    }

    const checksum = code.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const state = TRACKING_STATES[checksum % TRACKING_STATES.length];
    const estimatedDays = 1 + ((checksum + normalizedPhone.length) % 4);

    trackingResult.hidden = false;
    trackingResult.innerHTML = `
      <h3>Estado actual</h3>
      <p><strong>Código:</strong> ${code}</p>
      <p><strong>Servicio:</strong> ${ticket.service || "No disponible"}</p>
      <p><strong>Tienda:</strong> ${ticket.store || "No disponible"}</p>
      <p><strong>Estado:</strong> ${state}</p>
      <p><strong>Estimación:</strong> ${estimatedDays} día(s) para finalizar.</p>
    `;
    trackingMessage.textContent = "Seguimiento actualizado.";
    trackingMessage.style.color = "#3d63db";
  });
}

if (registerForm && registerMessage) {
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(registerForm);
    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim().toLowerCase();
    const password = (formData.get("password") || "").toString().trim();

    if (!name || !email || password.length < 6) {
      registerMessage.textContent = "Completa todos los campos y usa una contraseña de al menos 6 caracteres.";
      registerMessage.style.color = "#b1416f";
      return;
    }

    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const alreadyExists = users.some((user) => user.email === email);
    if (alreadyExists) {
      registerMessage.textContent = "Ya existe una cuenta con ese email.";
      registerMessage.style.color = "#b1416f";
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    registerMessage.textContent = "Cuenta creada correctamente. Ahora puedes iniciar sesión.";
    registerMessage.style.color = "#3d63db";
    window.setTimeout(() => {
      window.location.href = "login.html";
    }, 700);
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
        to_email: FIXLAB_TARGET_EMAIL,
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

if (reservationForm && reservationMessage) {
  reservationForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(reservationForm);
    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const phone = (formData.get("phone") || "").toString().trim();
    const deviceBrand = (formData.get("deviceBrand") || "").toString().trim();
    const service = (formData.get("service") || "").toString().trim();
    const urgency = (formData.get("urgency") || "").toString().trim();
    const preferredStore = (formData.get("preferredStore") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();
    const orderNumber = generateOrderNumber();
    const serviceSummary = `${service} · ${deviceBrand} · ${urgency} · ${preferredStore}`;
    const cause = message || "Sin descripcion adicional.";

    if (!name || !email || !phone || !deviceBrand || !service || !urgency || !preferredStore || !message) {
      reservationMessage.textContent = "Completa todos los campos de la reserva.";
      reservationMessage.style.color = "#b1416f";
      return;
    }

    reservationMessage.textContent = "Enviando reserva...";
    reservationMessage.style.color = "#3d63db";

    try {
      if (!WEB3FORMS_ACCESS_KEY) {
        reservationMessage.textContent = "Falta configurar WEB3FORMS_ACCESS_KEY en script.js.";
        reservationMessage.style.color = "#b1416f";
        return;
      }

      const formPayload = new FormData();
      formPayload.append("access_key", WEB3FORMS_ACCESS_KEY);
      formPayload.append("subject", `Nueva reserva ${orderNumber} - ${service}`);
      formPayload.append("from_name", "FixLab Web");
      formPayload.append("name", name);
      formPayload.append("email", email);
      formPayload.append("phone", phone);
      formPayload.append("service", serviceSummary);
      formPayload.append("cause", cause);
      formPayload.append("order_number", orderNumber);
      formPayload.append("message", `Nueva reserva recibida.\nPedido: ${orderNumber}\nCliente: ${name}\nEmail: ${email}\nTelefono: ${phone}\nServicio: ${serviceSummary}\nCausa: ${cause}`);
      formPayload.append("botcheck", "");
      formPayload.append("replyto", email);
      formPayload.append(
        "autoresponse",
        `Hola ${name}, hemos recibido tu solicitud. Tu ticket ${orderNumber} esta siendo procesado. Te contactaremos pronto.`
      );
      const response = await fetch(WEB3FORMS_API_URL, {
        method: "POST",
        body: formPayload
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error((result && result.message) || "No se pudo enviar el formulario.");
      }

      reservationMessage.textContent = `Reserva enviada correctamente. Tu numero de reserva es ${orderNumber}.`;
      reservationMessage.style.color = "#3d63db";
      const reservationTickets = getStoredReservationTickets();
      const nextTickets = [
        {
          orderNumber,
          phone,
          email,
          service: serviceSummary,
          store: preferredStore,
          createdAt: new Date().toISOString()
        },
        ...reservationTickets.filter((ticket) => (ticket.orderNumber || "").toUpperCase() !== orderNumber)
      ].slice(0, 30);
      saveStoredReservationTickets(nextTickets);
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

if (serviceToggles.length > 0) {
  serviceToggles.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");
      if (!targetId) {
        return;
      }
      const extraInfo = document.getElementById(targetId);
      if (!extraInfo) {
        return;
      }
      const isHidden = extraInfo.hasAttribute("hidden");
      if (isHidden) {
        extraInfo.removeAttribute("hidden");
        button.textContent = "Ocultar información";
      } else {
        extraInfo.setAttribute("hidden", "");
        button.textContent = "Ver más información";
      }
    });
  });
}

if (storeItems.length > 0 && storeSearch && storePriceMax && storePriceValue) {
  const applyStoreFilters = () => {
    const query = storeSearch.value.trim().toLowerCase();
    const maxPrice = Number(storePriceMax.value);
    const activeTypes = new Set(
      Array.from(storeTypeFilters)
        .filter((input) => input.checked)
        .map((input) => input.value)
    );
    const activeBrands = new Set(
      Array.from(storeBrandFilters)
        .filter((input) => input.checked)
        .map((input) => input.value)
    );

    let visibleCount = 0;
    storeItems.forEach((item) => {
      const text = item.textContent ? item.textContent.toLowerCase() : "";
      const type = item.getAttribute("data-type") || "";
      const brand = item.getAttribute("data-brand") || "";
      const price = Number(item.getAttribute("data-price") || "0");

      const matchesQuery = query.length === 0 || text.includes(query);
      const matchesType = activeTypes.size === 0 || activeTypes.has(type);
      const matchesBrand = activeBrands.size === 0 || activeBrands.has(brand);
      const matchesPrice = Number.isFinite(price) ? price <= maxPrice : true;
      const isVisible = matchesQuery && matchesType && matchesBrand && matchesPrice;

      item.style.display = isVisible ? "" : "none";
      if (isVisible) {
        visibleCount += 1;
      }
    });

    storePriceValue.textContent = String(maxPrice);
    if (storeEmptyState) {
      storeEmptyState.hidden = visibleCount !== 0;
    }
  };

  storeSearch.addEventListener("input", applyStoreFilters);
  storePriceMax.addEventListener("input", applyStoreFilters);
  storeTypeFilters.forEach((input) => input.addEventListener("change", applyStoreFilters));
  storeBrandFilters.forEach((input) => input.addEventListener("change", applyStoreFilters));
  applyStoreFilters();

  storeItems.forEach((item) => {
    const href = item.getAttribute("data-href");
    if (!href) {
      return;
    }
    item.addEventListener("click", () => {
      window.location.href = href;
    });
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        window.location.href = href;
      }
    });
  });
}

if (
  productDetail &&
  productName &&
  productDescription &&
  productPrice &&
  productSpecs &&
  productMainImage &&
  productThumbs &&
  productQty &&
  productTotal &&
  productReserveLink
) {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id") || "";
  const product = PRODUCT_CATALOG[productId];

  if (!product) {
    if (productNotFound) {
      productNotFound.hidden = false;
    }
  } else {
    productDetail.hidden = false;
    productName.textContent = product.name;
    productDescription.textContent = product.description;
    productSpecs.textContent = product.specs;
    productPrice.textContent = `Precio unitario: ${product.price.toFixed(2)} EUR`;

    const setMainImage = (src, index) => {
      productMainImage.src = src;
      productMainImage.alt = `${product.name} foto ${index + 1}`;
    };

    setMainImage(product.images[0], 0);
    productThumbs.innerHTML = "";
    product.images.forEach((src, index) => {
      const thumb = document.createElement("button");
      thumb.type = "button";
      thumb.className = "product-thumb";
      thumb.innerHTML = `<img src="${src}" alt="${product.name} miniatura ${index + 1}">`;
      thumb.addEventListener("click", () => setMainImage(src, index));
      productThumbs.appendChild(thumb);
    });

    const updateTotal = () => {
      const qty = Math.max(1, Number(productQty.value) || 1);
      productQty.value = String(qty);
      const total = qty * product.price;
      productTotal.textContent = `${total.toFixed(2)} EUR`;
      const params = new URLSearchParams({
        id: productId,
        qty: String(qty)
      });
      productReserveLink.href = `reserva-producto.html?${params.toString()}`;
    };

    productQty.addEventListener("input", updateTotal);
    updateTotal();
  }
}

if (productReservationForm && productReservationMessage && productReservationSummary && productReservationQty) {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id") || "";
  const initialQty = Math.max(1, Number(params.get("qty") || "1"));
  const product = PRODUCT_CATALOG[productId];

  if (!product) {
    productReservationSummary.textContent = "Producto no encontrado. Vuelve a tienda para seleccionar uno válido.";
  } else {
    const updateSummary = () => {
      const qty = Math.max(1, Number(productReservationQty.value) || 1);
      productReservationQty.value = String(qty);
      const total = qty * product.price;
      productReservationSummary.textContent = `${product.name} · Precio unitario ${product.price.toFixed(2)} EUR · Total ${total.toFixed(2)} EUR`;
    };

    productReservationQty.value = String(initialQty);
    updateSummary();
    productReservationQty.addEventListener("input", updateSummary);
  }

  productReservationForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!product) {
      productReservationMessage.textContent = "No se puede reservar: producto no válido.";
      productReservationMessage.style.color = "#b1416f";
      return;
    }

    const formData = new FormData(productReservationForm);
    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const phone = (formData.get("phone") || "").toString().trim();
    const qty = Math.max(1, Number(formData.get("qty") || "1"));
    const message = (formData.get("message") || "").toString().trim();
    const total = qty * product.price;

    if (!name || !email || !phone) {
      productReservationMessage.textContent = "Completa nombre, email y teléfono.";
      productReservationMessage.style.color = "#b1416f";
      return;
    }

    if (window.emailjs) {
      productReservationMessage.textContent = "Enviando reserva...";
      productReservationMessage.style.color = "#3d63db";
      try {
        await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          from_name: name,
          from_email: email,
          to_email: FIXLAB_TARGET_EMAIL,
          phone,
          service: `Reserva de producto: ${product.name}`,
          message: `Cantidad: ${qty}. Total estimado: ${total.toFixed(2)} EUR. ${message || ""}`.trim(),
          form_type: "Reserva producto"
        });
        productReservationMessage.textContent = "Reserva enviada correctamente. Te contactaremos para confirmar.";
        productReservationMessage.style.color = "#3d63db";
        productReservationForm.reset();
      } catch (error) {
        productReservationMessage.textContent = "No se pudo enviar la reserva. Inténtalo de nuevo.";
        productReservationMessage.style.color = "#b1416f";
      }
    } else {
      productReservationMessage.textContent = "EmailJS no está cargado. Revisa internet o bloqueo del navegador.";
      productReservationMessage.style.color = "#b1416f";
    }
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
    }, 85);
  });
});
