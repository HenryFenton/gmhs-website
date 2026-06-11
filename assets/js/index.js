
// NEW PAGE JS CODE  ------------------------------------------------->
  /* ══ SIDE PANEL ══ */
      function openPanel()  { document.getElementById('sidePanel').classList.add('open'); document.getElementById('panelOverlay').classList.add('open'); document.body.style.overflow='hidden'; }
      function closePanel() { document.getElementById('sidePanel').classList.remove('open'); document.getElementById('panelOverlay').classList.remove('open'); document.body.style.overflow=''; }
 
      /* ══ RADIAL FAB ══ */
      function toggleFab() { document.getElementById('fabWrap').classList.toggle('open'); document.getElementById('fabMain').classList.toggle('open'); }
      function closeFab()  { document.getElementById('fabWrap').classList.remove('open');  document.getElementById('fabMain').classList.remove('open'); }
      document.addEventListener('keydown', e => { if(e.key==='Escape'){ closePanel(); closeFab(); } });
 
      /* ══ HERO SLIDER ══ */
const slides = Array.from(document.querySelectorAll('.hero_slide'));
const dotCon = document.getElementById('dotContainer');
const hcText = document.getElementById('hcText');
const hcLabel = document.getElementById('hcLabel');
let current = 0, timer;

/* Always set background images from data-bg — works on ALL pages */
slides.forEach(s => {
  if (s.dataset.bg) {
    s.style.backgroundImage    = `url(${s.dataset.bg})`;
    s.style.backgroundSize     = 'cover';
    s.style.backgroundPosition = 'center';
  }
});

/* Only run the slider/dots logic if the homepage elements exist */
if (dotCon && slides.length > 1) {

  slides.forEach((s, i) => {
    const d = document.createElement('button');
    d.className = 'hero_dot' + (i === 0 ? ' active' : '');
    d.onclick = () => showSlide(i);
    dotCon.appendChild(d);
  });

  function showSlide(n) {
    slides[current].classList.remove('active');
    dotCon.children[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dotCon.children[current].classList.add('active');
    if (hcText)  { hcText.textContent  = slides[current].dataset.text  || ''; }
    if (hcLabel) { hcLabel.textContent = slides[current].dataset.label || ''; }
    if (hcText)  { hcText.style.animation  = 'none'; }
    if (hcLabel) { hcLabel.style.animation = 'none'; }
    requestAnimationFrame(() => {
      if (hcText)  hcText.style.animation  = '';
      if (hcLabel) hcLabel.style.animation = '';
    });
    clearInterval(timer);
    timer = setInterval(() => showSlide(current + 1), 5000);
  }

  /* Make showSlide available globally for dot onclick */
  window.showSlide = showSlide;
  timer = setInterval(() => showSlide(current + 1), 5000);

} else if (slides.length === 1) {
  /* Small delay so the fade-in is visible and feels smooth */
  setTimeout(() => {
    slides[0].classList.add('active');
  }, 80);
} else if (slides.length === 1) {
  const img = new Image();
  img.src = slides[0].dataset.bg;
  img.onload = () => {
    slides[0].classList.add('active');
    slides[0].closest('.hero_container').classList.add('loaded');
  };
}
 
      /* Set background images */
      slides.forEach(s => { s.style.backgroundImage = `url(${s.dataset.bg})`; s.style.backgroundSize='cover'; s.style.backgroundPosition='center'; });
 
      /* Build dots */
      slides.forEach((s,i) => {
        const d = document.createElement('button');
        d.className = 'hero_dot' + (i===0?' active':'');
        d.onclick = () => showSlide(i);
        dotCon.appendChild(d);
      });
 
      function showSlide(n) {
        slides[current].classList.remove('active');
        dotCon.children[current].classList.remove('active');
        current = (n + slides.length) % slides.length;
        slides[current].classList.add('active');
        dotCon.children[current].classList.add('active');
        hcText.textContent  = slides[current].dataset.text  || '';
        hcLabel.textContent = slides[current].dataset.label || '';
        /* re-trigger animation */
        hcText.style.animation = 'none'; hcLabel.style.animation = 'none';
        requestAnimationFrame(() => { hcText.style.animation=''; hcLabel.style.animation=''; });
        clearInterval(timer); timer = setInterval(() => showSlide(current+1), 5000);
      }
      timer = setInterval(() => showSlide(current+1), 5000);
 
      /* ══ SCROLL REVEAL ══ */
      const rObs = new IntersectionObserver(entries => {
        entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); rObs.unobserve(e.target); } });
      }, { threshold: 0.1 });
      document.querySelectorAll('.reveal').forEach(el => rObs.observe(el));
    

const noticesURL =
  "https://script.google.com/macros/s/AKfycbzr9Y28qo6miep01sgvYHdo2hAxxv7rIR1MWIwKjQyS5w1s_Y3BRLof6Oc6OHOMcNxJ/exec";

fetch(noticesURL)
  .then(response => response.json())
  .then(notices => {
    document.getElementById("events_track").innerHTML =
      `<span>${notices.join(" &nbsp; • &nbsp; ")}</span>`;
  })
  .catch(error => {
    console.error(error);

    document.getElementById("events_track").innerHTML =
      "<p>Unable to load notices.</p>";
  });