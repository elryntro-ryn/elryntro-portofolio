// =============================================
//  ELRYNTRO Portfolio — script.js
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------
  // 1. NAV: Highlight active link on scroll
  // ------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
  });

  // ------------------------------------------
  // 2. FADE-IN on scroll (IntersectionObserver)
  // ------------------------------------------
  const fadeEls = document.querySelectorAll('.fade-in');
  const fadeObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => fadeObs.observe(el));

  // ------------------------------------------
  // 3. SKILL BARS: animate width when in view
  // ------------------------------------------
  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-fill').forEach(bar => {
          const targetWidth = bar.dataset.width || bar.style.width;
          bar.style.width = '0%';
          setTimeout(() => { bar.style.width = targetWidth; }, 100);
        });
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-category').forEach(el => skillObs.observe(el));

  // ------------------------------------------
  // 4. PARTICLES in hero section
  // ------------------------------------------
  const hero = document.querySelector('#home');

  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left            = Math.random() * 100 + '%';
    p.style.top             = Math.random() * 100 + '%';
    p.style.animationDuration = (3 + Math.random() * 5) + 's';
    p.style.animationDelay  = (Math.random() * 5) + 's';
    const size              = (2 + Math.random() * 3) + 'px';
    p.style.width           = size;
    p.style.height          = size;
    if (Math.random() > 0.5) p.style.background = 'var(--accent3)';
    hero.appendChild(p);
  }

});

const modal = document.getElementById("certModal");
const fullImg = document.getElementById("fullImg");
const closeBtn = document.querySelector(".close-modal");

function openModal(imgSrc) {
  modal.style.display = "flex";
  fullImg.src = imgSrc;
}

closeBtn.onclick = () => { modal.style.display = "none"; };
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

const certImg = document.getElementById("fullImg");

// Fungsi untuk toggle zoom
certImg.addEventListener('click', () => {
  certImg.classList.toggle('zoomed');
});

// Penting: Reset zoom saat modal ditutup
function closeModal() {
  modal.style.display = "none";
  certImg.classList.remove('zoomed'); // Menghapus class zoomed
}

// Update event listener penutup modal Anda
closeBtn.onclick = closeModal;
window.onclick = (e) => { 
  if (e.target == modal) closeModal(); 
};

let scale = 1;
let isDragging = false;
let startX, startY, scrollLeft, scrollTop;

const img = document.getElementById("fullImg");
const wrapper = document.querySelector(".modal-wrapper");

// 1. Zoom dengan Scroll Mouse
wrapper.addEventListener("wheel", (e) => {
  e.preventDefault();
  const delta = e.deltaY > 0 ? -0.1 : 0.1;
  scale = Math.min(Math.max(1, scale + delta), 4); // Batas zoom 1x - 4x
  img.style.transform = `scale(${scale})`;
});

// 2. Drag/Geser dengan Klik Kiri
wrapper.addEventListener("mousedown", (e) => {
  isDragging = true;
  wrapper.style.cursor = "grabbing";
  startX = e.pageX - wrapper.offsetLeft;
  startY = e.pageY - wrapper.offsetTop;
  scrollLeft = wrapper.scrollLeft;
  scrollTop = wrapper.scrollTop;
});

wrapper.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - wrapper.offsetLeft;
  const y = e.pageY - wrapper.offsetTop;
  const walkX = (x - startX) * 2;
  const walkY = (y - startY) * 2;
  wrapper.scrollLeft = scrollLeft - walkX;
  wrapper.scrollTop = scrollTop - walkY;
});

// Event untuk berhenti drag
wrapper.addEventListener("mouseup", () => { 
  isDragging = false; 
  wrapper.style.cursor = "grab"; 
});
wrapper.addEventListener("mouseleave", () => { isDragging = false; });

function closeModal() {
  modal.style.display = "none";
  scale = 1;
  img.style.transform = `scale(1)`;
}