document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. CAMBIO DE TEMA (DARK / LIGHT MODE)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  const themeIcon = themeToggleBtn.querySelector('i');

  // Cargar tema guardado
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-sun';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
    }
  }

  /* ==========================================================================
     2. MENÚ RESPONSIVO MOBILE
     ========================================================================== */
  const menuToggleBtn = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  menuToggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Cerrar menú al pulsar un enlace
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
  });

  /* ==========================================================================
     3. EFECTO MECANOGRÁFICO (TYPING ANIMATION)
     ========================================================================== */
  const typingText = document.getElementById('typing-text');
  const roles = ['Desarrollador Web', 'Diseñador Frontend', 'Creador de Contenido'];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
      speed = 2000; // Pausa al completar palabra
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 500;
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();

  /* ==========================================================================
     4. FILTRADO DE PROYECTOS
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Activar botón seleccionado
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     5. ANIMACIÓN DE BARRAS DE HABILIDADES
     ========================================================================== */
  const skillsSection = document.getElementById('skills');
  const progressBars = document.querySelectorAll('.progress');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressBars.forEach(bar => {
          const level = bar.getAttribute('data-level');
          bar.style.width = level;
        });
      }
    });
  }, { threshold: 0.3 });

  if (skillsSection) {
    observer.observe(skillsSection);
  }

  /* ==========================================================================
     6. MODAL DE PROYECTOS
     ========================================================================== */
  const modal = document.getElementById('project-modal');
  const closeModalBtn = document.querySelector('.close-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');

  document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const title = e.target.getAttribute('data-title');
      const desc = e.target.getAttribute('data-desc');
      
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modal.style.display = 'flex';
    });
  });

  closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  /* ==========================================================================
     7. FORMULARIO DE CONTACTO Y NOTIFICACIONES
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
    contactForm.reset();
  });

  function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 4000);
  }

  /* ==========================================================================
     8. AÑO AUTOMÁTICO EN EL FOOTER
     ========================================================================== */
  document.getElementById('year').textContent = new Date().getFullYear();
});