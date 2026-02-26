// ═══ LOADING SCREEN ═══
const loaderLines = [
  { t: '› Booting security stack...', c: 'ld' },
  { t: '✓ Wazuh SIEM modules loaded', c: 'ok' },
  { t: '› Authenticating session...', c: 'ld' },
  { t: '✓ CompTIA Network+ verified', c: 'ok' },
  { t: '› Spinning up ML pipeline...', c: 'ld' },
  { t: '✓ XGBoost classifier ready', c: 'ok' },
  { t: '✓ All systems go', c: 'ok' },
];
const logEl = document.getElementById('loader-log');
const pctEl = document.getElementById('loader-pct');
document.body.style.overflow = 'hidden';

let li = 0;
const lineTimer = setInterval(() => {
  if (li >= loaderLines.length) { clearInterval(lineTimer); return; }
  const d = document.createElement('div');
  d.innerHTML = `<span class="${loaderLines[li].c}">${loaderLines[li].t}</span>`;
  logEl.appendChild(d);
  while (logEl.children.length > 5) logEl.removeChild(logEl.firstChild);
  li++;
}, 340);

let pct = 0;
const pi = setInterval(() => {
  pct = Math.min(100, pct + Math.random() * 6 + 2);
  pctEl.textContent = Math.floor(pct) + '%';
  if (pct >= 100) clearInterval(pi);
}, 75);

setTimeout(() => {
  document.getElementById('loader').classList.add('hide');
  document.body.style.overflow = '';
}, 2700);

// ═══ CROSSHAIR CURSOR ═══
const xh = document.getElementById('xh');
const xv = document.getElementById('xv');
const xring = document.getElementById('xring');
const xdot = document.getElementById('xdot');
const body = document.body;
let mx = -100, my = -100, ringX = -100, ringY = -100;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  xh.style.left  = (mx - 12) + 'px';
  xh.style.top   = my + 'px';
  xv.style.left  = mx + 'px';
  xv.style.top   = (my - 12) + 'px';
  xdot.style.left = mx + 'px';
  xdot.style.top  = my + 'px';
});

// Ring follows with slight lag
setInterval(() => {
  ringX += (mx - ringX) * 0.11;
  ringY += (my - ringY) * 0.11;
  xring.style.left = ringX + 'px';
  xring.style.top  = ringY + 'px';
}, 16);

document.querySelectorAll('a, button, input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => body.classList.add('x-hover'));
  el.addEventListener('mouseleave', () => body.classList.remove('x-hover'));
});

// ═══ MATRIX BG ═══
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');
function rsz() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
rsz(); window.addEventListener('resize', rsz);
const cols = Math.floor(window.innerWidth / 18);
const drops = Array(cols).fill(1);
const chars = '01<>{}[]#!@%&ABCDEFabcdef0123456789アイウエオカキ';
function drawMatrix() {
  ctx.fillStyle = 'rgba(5,10,15,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00ffe7'; ctx.font = '13px Share Tech Mono';
  drops.forEach((y, i) => {
    ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 18, y * 18);
    if (y * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}
setInterval(drawMatrix, 55);

// ═══ ARCH LAB CANVAS ═══
const tC = document.getElementById('threat-canvas');
const tX = tC.getContext('2d');
function rsz2() { tC.width = tC.offsetWidth; tC.height = 300; }
rsz2(); window.addEventListener('resize', rsz2);
const W = () => tC.width, H = () => tC.height;

const nodes = [
  { label:'INTERNET',   type:'external',x:.05,y:.5  },
  { label:'WAF',        type:'control', x:.16,y:.5  },
  { label:'API-GW',     type:'control', x:.28,y:.5  },
  { label:'AUTH-SVC',   type:'critical',x:.28,y:.18 },
  { label:'IDP/OIDC',   type:'critical',x:.42,y:.18 },
  { label:'SVC-A',      type:'server',  x:.45,y:.38 },
  { label:'SVC-B',      type:'server',  x:.45,y:.62 },
  { label:'DB-PRIMARY', type:'critical',x:.62,y:.38 },
  { label:'DB-REPLICA', type:'server',  x:.62,y:.62 },
  { label:'VAULT',      type:'critical',x:.76,y:.18 },
  { label:'SIEM/LOG',   type:'monitor', x:.76,y:.76 },
  { label:'POLICY-ENG', type:'monitor', x:.89,y:.5  },
];
const edges = [[0,1],[1,2],[2,3],[3,4],[2,5],[2,6],[5,7],[6,8],[7,9],[8,10],[5,10],[6,10],[11,7],[11,5],[11,6],[4,5],[4,6]];
const flows = [];
let policyCount=1420, anomalies=12, authReqs=5830, events=91204;

function spawnFlow() {
  const e = edges[Math.floor(Math.random()*edges.length)];
  const a=nodes[e[0]], b=nodes[e[1]];
  const blocked = Math.random()>.87;
  flows.push({ax:a.x,ay:a.y,bx:b.x,by:b.y,p:0,spd:.013+Math.random()*.018,blocked,color:blocked?'#ff3c6e':(Math.random()>.55?'#7b5ea7':'#00ffe7')});
}
setInterval(spawnFlow, 380);

const colorMap={external:'#4a6070',control:'#00ffe7',critical:'#ff3c6e',server:'#7b5ea7',monitor:'#ffd700'};

function drawArch() {
  tX.clearRect(0,0,W(),H());
  tX.fillStyle='rgba(10,21,32,1)'; tX.fillRect(0,0,W(),H());
  // grid
  tX.strokeStyle='rgba(0,255,231,0.04)'; tX.lineWidth=1;
  for(let x=0;x<W();x+=40){tX.beginPath();tX.moveTo(x,0);tX.lineTo(x,H());tX.stroke();}
  for(let y=0;y<H();y+=40){tX.beginPath();tX.moveTo(0,y);tX.lineTo(W(),y);tX.stroke();}
  // edges
  tX.setLineDash([4,7]); tX.strokeStyle='rgba(0,255,231,0.07)'; tX.lineWidth=1;
  edges.forEach(([ai,bi])=>{
    const a=nodes[ai],b=nodes[bi];
    tX.beginPath(); tX.moveTo(a.x*W(),a.y*H()); tX.lineTo(b.x*W(),b.y*H()); tX.stroke();
  });
  tX.setLineDash([]);
  // flows
  for(let i=flows.length-1;i>=0;i--){
    const f=flows[i]; f.p+=f.spd;
    const x=f.ax*W()+(f.bx*W()-f.ax*W())*f.p;
    const y=f.ay*H()+(f.by*H()-f.ay*H())*f.p;
    tX.fillStyle=f.color; tX.shadowColor=f.color; tX.shadowBlur=8;
    tX.beginPath(); tX.arc(x,y,2.5,0,Math.PI*2); tX.fill(); tX.shadowBlur=0;
    if(f.p>=1){
      flows.splice(i,1);
      if(f.blocked)anomalies++; else policyCount++;
      authReqs+=Math.random()>.6?1:0;
      events+=Math.floor(Math.random()*8+2);
    }
  }
  // nodes
  nodes.forEach(n=>{
    const color=colorMap[n.type];
    const nx=n.x*W(), ny=n.y*H();
    const r=n.type==='critical'?9:n.type==='control'?8:7;
    tX.strokeStyle=color; tX.lineWidth=1; tX.globalAlpha=0.18;
    tX.beginPath(); tX.arc(nx,ny,r+10,0,Math.PI*2); tX.stroke(); tX.globalAlpha=1;
    tX.fillStyle=color; tX.shadowColor=color; tX.shadowBlur=14;
    tX.beginPath(); tX.arc(nx,ny,r,0,Math.PI*2); tX.fill(); tX.shadowBlur=0;
    tX.fillStyle='rgba(200,220,232,0.75)'; tX.font='8px Share Tech Mono';
    tX.textAlign='center'; tX.fillText(n.label,nx,ny+r+12);
  });
}
setInterval(drawArch,33);

setInterval(()=>{
  document.getElementById('stat-blocked').textContent=policyCount.toLocaleString();
  document.getElementById('stat-detected').textContent=anomalies;
  document.getElementById('stat-scans').textContent=authReqs.toLocaleString();
  document.getElementById('stat-packets').textContent=(events/1000).toFixed(1)+'K';
},600);

setInterval(()=>{
  const d=new Date();
  document.getElementById('threat-time').textContent=d.toISOString().replace('T',' ').slice(0,19)+' UTC';
},1000);
function downloadPDF() {
    const link = document.createElement('a');
    link.href = 'Zuniga, Moises Fall 2025 - Spring 2025 Resume .pdf';
    link.download = 'Zuniga, Moises Fall 2025 - Spring 2025 Resume .pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
// ═══ SCROLL FADE ═══
const faders=document.querySelectorAll('.fade-in');
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:0.1});
faders.forEach(f=>obs.observe(f));

// ═══ CONTACT ═══
async function sendMessage(){
  const name  = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const msg   = document.getElementById('contact-msg').value.trim();
  const out   = document.getElementById('send-output');
  const btn   = document.querySelector('#contact-section button');

  out.style.display = 'block';

  if(!name || !email || !msg){
    out.innerHTML = '<span style="color:var(--accent2)">❯ ERROR: All fields required. Aborting.</span>';
    return;
  }

  btn.disabled = true;
  btn.textContent = '▶ TRANSMITTING...';
  out.innerHTML = '<span style="color:var(--dim)">❯ Encrypting payload (AES-256)...</span>';

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: 'fe6915fb-1021-47ce-ba02-482038eb0271', // ← replace with key from web3forms.com
        subject: `[Portfolio] Message from ${name}`,
        from_name: name,
        replyto: email,
        message: `From: ${name}\nEmail: ${email}\n\n${msg}`
      })
    });

    const data = await res.json();

    if(data.success){
      out.innerHTML += '<br><span style="color:var(--dim)">❯ Establishing secure channel...</span>';
      setTimeout(() => {
        out.innerHTML += '<br><span style="color:var(--green)">✓ Message transmitted securely. Response within 24h.</span>';
        document.getElementById('contact-name').value  = '';
        document.getElementById('contact-email').value = '';
        document.getElementById('contact-msg').value   = '';
      }, 800);
    } else {
      out.innerHTML += '<br><span style="color:var(--accent2)">❯ ERROR: Transmission failed. Email directly: mz397@njit.edu</span>';
    }
  } catch(err) {
    out.innerHTML += '<br><span style="color:var(--accent2)">❯ ERROR: Network error. Email directly: mz397@njit.edu</span>';
  } finally {
    btn.disabled = false;
    btn.textContent = '▶ EXECUTE send_message.sh';
  }
}

