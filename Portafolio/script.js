// Variables globales
let currentSlide = 0;
const skillCards = document.querySelectorAll(".skill-card");
const totalSlides = skillCards.length;
const carouselTrack = document.getElementById("carousel-track");
const cardWidth = 220; // ancho de la tarjeta + gap

// Función para mover el carrusel
function moveCarousel(direction) {
  currentSlide += direction;

  // Controlar límites
  if (currentSlide < 0) {
    currentSlide = Math.max(0, totalSlides - 3);
  } else if (currentSlide > totalSlides - 3) {
    currentSlide = 0;
  }

  // Aplicar transformación
  const translateX = -currentSlide * cardWidth;
  carouselTrack.style.transform = `translateX(${translateX}px)`;
}

// Auto-play del carrusel
function autoPlayCarousel() {
  setInterval(() => {
    moveCarousel(1);
  }, 4000);
}

// Función para descargar CV
function descargarCV() {
  // Crear contenido CSV
  const csvContent = `
Nombre,Valor
"Nombre Completo","Diego Sebastián Ramírez"
"Teléfono","+504 96016258"
"Email","diegosebastianramirez29@gmail.com"
"GitHub","https://github.com/SRamirezn29"
"LinkedIn","https://www.linkedin.com/in/diego-sebastian-ramirez-nolasco-957866285/"
"Profesión","Desarrollador Full Stack"
"Experiencia","3+ años en desarrollo web y móvil"
"Habilidades Principales","Python, Java, Django, Android Studio, Bases de Datos, Redes"
"Educación","Ingeniería en Sistemas - Universidad José Cecilio del Valle (2025)"
"Certificaciones","Inglés A1, Bases de Datos"
"Idiomas","Español (Nativo), Inglés (Intermedio)"
"Ubicación","Honduras"
  `.trim();

  // Crear y descargar archivo
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", "CV_Diego_Ramirez.csv");
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Mostrar mensaje de confirmación
  alert("¡CV descargado exitosamente!");
}

// Smooth scroll para navegación
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Cerrar menú hamburguesa si está abierto
        const navMenu = document.querySelector(".nav-menu");
        if (navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
        }
      }
    });
  });
}

// Animaciones al hacer scroll
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observar elementos para animación
  const animatedElements = document.querySelectorAll(
    ".project-card, .skill-card, .education-item, .footer-section"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// Efecto parallax suave en el header
function initParallaxEffect() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const header = document.querySelector(".header");

    if (scrolled > 100) {
      header.style.background = "linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)";
      header.style.backdropFilter = "blur(10px)";
    } else {
      header.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      header.style.backdropFilter = "none";
    }
  });
}

// Función para manejar el responsive del carrusel
function handleResponsiveCarousel() {
  if (window.innerWidth <= 768) {
    // En móvil, permitir scroll horizontal
    carouselTrack.style.transform = "translateX(0)";
    currentSlide = 0;
  }
}

// Menú hamburguesa
function initHamburgerMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    
    // Animación del botón hamburguesa
    hamburger.classList.toggle("active");
  });
}

// Scroll to top button
function initScrollToTop() {
  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = "↑";
  scrollBtn.className = "scroll-to-top";
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  document.body.appendChild(scrollBtn);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollBtn.style.opacity = "1";
      scrollBtn.style.visibility = "visible";
    } else {
      scrollBtn.style.opacity = "0";
      scrollBtn.style.visibility = "hidden";
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Función para mostrar mensaje de desarrollo
function initDevelopmentMessage() {
  const btnMoreProjects = document.getElementById('btn-more-projects');
  const devMessage = document.getElementById('dev-message');
  const overlay = document.getElementById('overlay');
  const closeMessage = document.getElementById('close-message');

  if (btnMoreProjects && devMessage && overlay && closeMessage) {
    btnMoreProjects.addEventListener('click', function() {
      devMessage.style.display = 'block';
      overlay.style.display = 'block';
    });
    
    closeMessage.addEventListener('click', function() {
      devMessage.style.display = 'none';
      overlay.style.display = 'none';
    });
    
    overlay.addEventListener('click', function() {
      devMessage.style.display = 'none';
      this.style.display = 'none';
    });
  }
}

// Función para manejar el formulario de contacto
// Función para manejar el formulario de contacto
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Mostrar mensaje de carga
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Obtener los valores del formulario
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validar el formulario
            const errors = validateForm({name, email, message});
            if (errors.length > 0) {
                alert("Por favor, completa todos los campos correctamente:\n" + errors.join("\n"));
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                return;
            }
            
            // TUS IDs DE EMAILJS - YA COMPLETOS
            const SERVICE_ID = "service_ttf7pb";
            const TEMPLATE_ID = "template_8bwplss";
            
            // Enviar con EmailJS
            emailjs.send(SERVICE_ID, TEMPLATE_ID, {
                from_name: name,
                from_email: email,
                message: message,
                to_email: "diegosebastianramirez29@gmail.com",
                reply_to: email,
                date: new Date().toLocaleDateString('es-HN')
            })
            .then(function(response) {
                alert(`¡Gracias ${name}! Tu mensaje ha sido enviado. Te responderé pronto.`);
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, function(error) {
                console.error("Error EmailJS:", error);
                alert("Oops... Hubo un error al enviar el mensaje. Por favor, intenta nuevamente o contáctame directamente a diegosebastianramirez29@gmail.com");
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar funcionalidades
  initSmoothScroll();
  initScrollAnimations();
  initParallaxEffect();
  initHamburgerMenu();
  initScrollToTop();
  initDevelopmentMessage();
  initContactForm();

  // Iniciar auto-play del carrusel solo en desktop
  if (window.innerWidth > 768) {
    autoPlayCarousel();
  }

  // Manejar resize de ventana
  window.addEventListener("resize", handleResponsiveCarousel);

  // Agregar efecto hover a las tarjetas de proyecto
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
});

// Función para validar formularios
function validateForm(formData) {
  const errors = [];

  if (!formData.name || formData.name.trim().length < 2) {
    errors.push("El nombre debe tener al menos 2 caracteres");
  }

  if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.push("El email no es válido");
  }

  return errors;
}

// Función para lazy loading de imágenes
function initLazyLoading() {
  const images = document.querySelectorAll('img[src*="placeholder"]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = "0";
        img.style.transition = "opacity 0.3s ease";

        setTimeout(() => {
          img.style.opacity = "1";
        }, 100);

        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Inicializar lazy loading
document.addEventListener("DOMContentLoaded", initLazyLoading);