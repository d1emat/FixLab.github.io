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
const SESSION_KEY = "fixlabSessionUser";
const USERS_KEY = "fixlabUsers";
const EMAILJS_PUBLIC_KEY = "OqZOnvQHedOZwpT5m";
const EMAILJS_SERVICE_ID = "service_hzb1vrj";
const EMAILJS_TEMPLATE_ID = "template_wxzr0ri";
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
      window.location.href = "index.html";
    }, 600);
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
