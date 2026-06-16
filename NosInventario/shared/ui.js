/* ============================================================
   UI — Utility functions (no data dependency)
   ============================================================ */

/* ── Modal helpers ───────────────────────────────────────────── */
function openMo(id){ document.getElementById(id).classList.add('open') }
function closeMo(id){ document.getElementById(id).classList.remove('open') }

/* ── Toggle (switch) sync ────────────────────────────────────── */
function updateToggle(wrapId, inputId){
  const on = document.getElementById(inputId).checked;
  const w  = document.getElementById(wrapId);
  w.classList.toggle('on', on);
  w.classList.toggle('off', !on);
}

/* ── Bool card (checkbox styled as card) ─────────────────────── */
function toggleBoolCard(chkId, cardId){
  const chk = document.getElementById(chkId);
  chk.checked = !chk.checked;
  syncBoolCard(chkId, cardId);
}
function syncBoolCard(chkId, cardId){
  const on = document.getElementById(chkId).checked;
  const c  = document.getElementById(cardId);
  c.classList.toggle('on', on);
  c.classList.toggle('off', !on);
}

/* ── Char counter for textareas ──────────────────────────────── */
function updateCharCount(taId, cntId, max){
  const len = document.getElementById(taId).value.length;
  document.getElementById(cntId).textContent = `${len} / ${max}`;
}

/* ── Toast ───────────────────────────────────────────────────── */
const TOAST_ICONS = {
  success: `<svg class="toast-icon" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>`,
  warning: `<svg class="toast-icon" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/></svg>`,
  danger:  `<svg class="toast-icon" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
  info:    `<svg class="toast-icon" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/></svg>`
};

let _toastTimer;
function showToast(msg, type = 'success'){
  const t = document.getElementById('toast');
  if(!t) return;
  clearTimeout(_toastTimer);
  t.className = '';
  t.innerHTML = `${TOAST_ICONS[type] || TOAST_ICONS.info}${msg}`;
  t.classList.add(type);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  _toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ── Theme ───────────────────────────────────────────────────── */
function applyTheme(dark){
  document.body.classList.toggle('dark', dark);
  const sun  = document.getElementById('icon-sun');
  const moon = document.getElementById('icon-moon');
  if(sun)  sun.style.display  = dark ? 'none'  : 'block';
  if(moon) moon.style.display = dark ? 'block' : 'none';
  localStorage.setItem('nos-theme', dark ? 'dark' : 'light');
}
function toggleTheme(){
  applyTheme(!document.body.classList.contains('dark'));
}

/* ── Code generator (for new records) ───────────────────────── */
function doGenerar(prefix, inputId){
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = (prefix || 'NOS-') + '';
  for(let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  const inp = document.getElementById(inputId || 'f-cod');
  if(inp){ inp.value = code; inp.dispatchEvent(new Event('input')); }
  return code;
}

/* ── Modal backdrop click-to-close ───────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.mo').forEach(el => {
    el.addEventListener('click', e => { if(e.target === el) el.classList.remove('open'); });
  });
});
