/* ---------- helper open link ---------- */
function openLink(url){
  if(!url) return;
  window.open(url, '_blank');
}

/* ---------- copy email helper ---------- */
function copyEmail(txt){
  navigator.clipboard?.writeText(txt).then(() => {
    toast('Alamat email disalin ke clipboard');
  }).catch(() => {
    alert('Salin manual: ' + txt);
  });
}

/* ---------- clock & datetime ---------- */
function updateDateTime(){
  const now = new Date();
  const dateStr = now.toLocaleDateString('id-ID', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
  const timeStr = now.toLocaleTimeString('id-ID');
  const elem = document.getElementById('datetime');
  const sm = document.getElementById('clock-small');

  if(elem) elem.textContent = `${dateStr} • ${timeStr}`;
  if(sm) sm.textContent = timeStr;
}

setInterval(updateDateTime, 1000);
updateDateTime();

/* ---------- simple toast notification ---------- */
function toast(msg){
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);

  setTimeout(() => t.classList.add('show'), 20);
  setTimeout(() => t.classList.remove('show'), 2800);
  setTimeout(() => t.remove(), 3200);
}

/* ===== Futuristic Abstract Canvas Animation ===== */
(() => {
  const canvas = document.getElementById("bg-canvas");
  if(!canvas) return;
  
  const ctx = canvas.getContext("2d");
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 120;

  function rand(min,max){ return Math.random()*(max-min)+min }
  
  function createParticles(){
    particles.length = 0;
    for(let i = 0; i < particleCount; i++){
      particles.push({
        x: rand(0,w),
        y: rand(0,h),
        vx: rand(-0.5,0.5),
        vy: rand(-0.5,0.5),
        r: rand(1,3),
        alpha: rand(0.2,0.6)
      });
    }
  }

  createParticles();

  function animate(){
    ctx.clearRect(0,0,w,h);
  
    for(let p of particles){
      p.x += p.vx;
      p.y += p.vy;
      if(p.x < 0 || p.x > w) p.vx *= -1;
      if(p.y < 0 || p.y > h) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = `rgba(37,99,235,${p.alpha})`;
      ctx.fill();
    }

    // garis penghubung
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const a = particles[i], b = particles[j];
        const dx = a.x-b.x, dy=a.y-b.y;
        const dist = Math.sqrt(dx*dx+dy*dy);
        if(dist < 140){
          ctx.beginPath();
          ctx.strokeStyle = `rgba(124,58,237,${(140-dist)/300})`;
          ctx.lineWidth = 1;
          ctx.moveTo(a.x,a.y);
          ctx.lineTo(b.x,b.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    createParticles();
  });

  animate();
})();

/* ===== DARK / LIGHT MODE TOGGLE ===== */
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-mode");
    themeToggle.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "☀️";
  } else {
    document.body.classList.remove("light-mode");
    themeToggle.textContent = "🌙";
  }
}

/* ===== ALARM FULLSCREEN ISTIRAHAT ===== */
function checkLunchAlarm() {
  const now = new Date();
  const timeTarget = "12:00";
  const currentTime = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;

  if (currentTime === timeTarget) {
    const overlay = document.getElementById("alarmOverlay");
    if(overlay) overlay.style.display = "flex";
  }
}

const closeBtn = document.getElementById("closeAlarm");
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    const overlay = document.getElementById("alarmOverlay");
    if(overlay) overlay.style.display = "none";
  });
}

setInterval(checkLunchAlarm, 10000);
checkLunchAlarm();

function logout(){
  localStorage.removeItem("sessionLogin");
  window.location.href = "login.html";
}

