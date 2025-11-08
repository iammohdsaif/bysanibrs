(function(){
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
    });
  });

  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('primaryNav');
  if (toggle && menu){
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('show');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced && 'IntersectionObserver' in window){
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.12});
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }

  function toast(msg){
    const t = document.createElement('div');
    t.textContent = msg;
    t.setAttribute('role','status');
    Object.assign(t.style, {
      position:'fixed',bottom:'20px',left:'50%',transform:'translateX(-50%)',
      background:'var(--brand)',color:'#fff',padding:'10px 14px',borderRadius:'999px',
      boxShadow:'0 10px 25px rgba(0,0,0,.2)',zIndex:1000,opacity:'0',transition:'opacity .15s ease'
    });
    document.body.appendChild(t);
    requestAnimationFrame(()=>{t.style.opacity='1'});
    setTimeout(()=>{t.style.opacity='0'; setTimeout(()=>t.remove(),150)}, 2000);
  }

  const enq = document.getElementById('enq');
  if (enq){
    enq.addEventListener('submit', (e) => {
      e.preventDefault();
      toast("Thanks! We'll get back within 1 business day.");
      enq.reset();
    });
  }
  const sub = document.getElementById('subForm');
  if (sub){
    sub.addEventListener('submit', (e) => {
      e.preventDefault();
      toast('Subscribed. Welcome to BRS updates!');
      sub.reset();
    });
  }
})();