// JavaScript para animaciones y efectos visuales

document.addEventListener('DOMContentLoaded', function() {
  
  // Animación de entrada suave para las secciones
  const sections = document.querySelectorAll('.profile-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          entry.target.style.transition = 'all 0.6s ease-out';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 100);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    observer.observe(section);
  });

  // Efecto parallax suave en la imagen hero
  const heroImage = document.querySelector('.hero-image');
  if (heroImage) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.5;
      heroImage.style.transform = `translate3d(0, ${rate}px, 0)`;
    });
  }

  // Click en galería para expandir (simulado)
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      // Efecto visual de click
      this.style.transform = 'scale(1.1)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 300);
    });
  });

  // Hover effect en artists
  const artistCards = document.querySelectorAll('.artist-card');
  artistCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.querySelector('.artist-image').style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.querySelector('.artist-image').style.transform = 'scale(1)';
    });
  });

  // Smooth scroll para navegación
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
