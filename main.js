/* ===========================
   PORTFON PORTFOLIO — SCRIPT
=========================== */

// --- Navbar scroll effect ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// --- Mobile hamburger menu ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Close on nav link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// --- Scroll reveal / fade-up animation ---
const fadeUpEls = document.querySelectorAll(
  '.hero-content, .hero-stats, .about-grid, .project-card, .service-card, .testi-card, .cta-heading, .footer-nav-card, .section-label, .section-heading'
);

fadeUpEls.forEach(el => {
  el.classList.add('fade-up');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings
      const siblings = Array.from(entry.target.parentElement.children);
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeUpEls.forEach(el => observer.observe(el));

// --- Floating tags parallax on mouse move ---
const tag1 = document.querySelector('.tag-1');
const tag2 = document.querySelector('.tag-2');

document.addEventListener('mousemove', (e) => {
  const { innerWidth, innerHeight } = window;
  const x = (e.clientX / innerWidth - 0.5);
  const y = (e.clientY / innerHeight - 0.5);

  if (tag1) {
    tag1.style.transform = `rotate(-8deg) translate(${x * 18}px, ${y * 14}px)`;
  }
  if (tag2) {
    tag2.style.transform = `rotate(4deg) translate(${x * -14}px, ${y * 12}px)`;
  }
});

// --- Number counter animation for stats ---
function animateCounter(el, target, duration = 1500) {
  const start = 0;
  const step = (timestamp) => {
    if (!el._startTime) el._startTime = timestamp;
    const progress = Math.min((timestamp - el._startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + '+';
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statNumbers = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent.replace('+', '');
      const target = parseInt(text, 10);
      if (!isNaN(target)) animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

// --- Active nav link on scroll ---
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navAnchors.forEach(a => {
    a.style.opacity = '0.7';
    if (a.getAttribute('href') === '#' + current) {
      a.style.opacity = '1';
      a.style.fontWeight = '700';
    } else {
      a.style.fontWeight = '500';
    }
  });
});

// --- Project card hover cursor bubble ---
document.querySelectorAll('.project-img-wrap').forEach(wrap => {
  const cursor = wrap.querySelector('.project-cursor');
  wrap.addEventListener('mousemove', (e) => {
    const rect = wrap.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
    cursor.style.transform = 'translate(-50%, -50%)';
  });
});

// --- Smooth scroll for CTA buttons ---
document.querySelectorAll('button.btn-cta, button.btn-primary, button.btn-white').forEach(btn => {
  btn.addEventListener('click', () => {
    const contact = document.querySelector('.footer-cta');
    if (contact) contact.scrollIntoView({ behavior: 'smooth' });
  });
});

// --- Service card tool bubbles spin on hover ---
document.querySelectorAll('.tool-bubble').forEach(bubble => {
  bubble.addEventListener('mouseenter', () => {
    bubble.style.transition = 'transform 0.3s ease';
    bubble.style.transform = 'scale(1.15) rotate(15deg)';
  });
  bubble.addEventListener('mouseleave', () => {
    bubble.style.transform = 'scale(1) rotate(0deg)';
  });
});

// --- Slider auto-scroll duplicate for infinite loop ---
document.querySelectorAll('.slider-track').forEach(track => {
  const imgs = track.innerHTML;
  track.innerHTML = imgs + imgs; // duplicate for seamless loop
});

// --- Footer nav cards click ---
document.querySelectorAll('.footer-nav-card').forEach((card, i) => {
  card.addEventListener('click', () => {
    const targets = ['#home', '#services', '#about', '#portfolio'];
    const target = document.querySelector(targets[i]);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

console.log('✦ Portfon Portfolio loaded successfully');

// --- Skill bar animation on scroll ---
const skillFills = document.querySelectorAll('.skill-bar-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const targetWidth = fill.style.width;
      fill.style.width = '0';
      setTimeout(() => { fill.style.width = targetWidth; }, 100);
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(f => skillObserver.observe(f));
