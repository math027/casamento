/* ══════════════════════════════════════
   ÁREA DOS NOIVOS — admin.js
   ══════════════════════════════════════ */

const STORAGE_GIFTS    = 'wedding_gifts_catalog';
const STORAGE_MANUAL   = 'wedding_manual';
const STORAGE_RESERVED = 'wedding_reserved';
const STORAGE_PWD      = 'wedding_admin_pwd';

const DEFAULT_PWD = 'emmily2024';

/* ── Helpers ── */
function getGifts() {
  try { return JSON.parse(localStorage.getItem(STORAGE_GIFTS)) || getDefaultGifts(); }
  catch { return getDefaultGifts(); }
}
function saveGifts(arr) { localStorage.setItem(STORAGE_GIFTS, JSON.stringify(arr)); }

function getManual() {
  try { return JSON.parse(localStorage.getItem(STORAGE_MANUAL)) || getDefaultManual(); }
  catch { return getDefaultManual(); }
}
function saveManual(arr) { localStorage.setItem(STORAGE_MANUAL, JSON.stringify(arr)); }

function getReserved() {
  try { return JSON.parse(localStorage.getItem(STORAGE_RESERVED)) || []; }
  catch { return []; }
}

function getPwd() { return localStorage.getItem(STORAGE_PWD) || DEFAULT_PWD; }
function savePwd(p) { localStorage.setItem(STORAGE_PWD, p); }

function showToast(msg, type='info') {
  document.querySelectorAll('.admin-toast').forEach(t=>t.remove());
  const t = document.createElement('div');
  t.className = 'admin-toast';
  t.style.borderLeftColor = type==='success' ? '#1a7a4a' : type==='danger' ? '#c0392b' : '#5b9fe8';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(()=>t.remove(), 3000);
}

function genId() { return 'gift_' + Date.now() + '_' + Math.random().toString(36).slice(2,7); }

/* ── Default data ── */
function getDefaultGifts() {
  return [
    { id:'terapia',  emoji:'🛋️', category:'Saúde Mental',      name:'Ajuda na Terapia do Noivo',       desc:'Ele precisa processar que vai dividir o controle remoto para sempre.',                                  price:150,  badge:'Urgente',     img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=480&q=75&fit=crop' },
    { id:'ps5',      emoji:'🎮', category:'Harmonia Doméstica', name:'2 Controles de PS5',               desc:'Para que as guerras aconteçam dentro do jogo e não na sala de estar.',                                 price:600,  badge:'Essencial',   img:'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=480&q=75&fit=crop' },
    { id:'fone',     emoji:'🎧', category:'Bem-estar Noturno',  name:'Fone com Cancelamento de Ruído',   desc:'Para Emmily sobreviver com elegância às sessões noturnas de PlayStation.',                             price:350,  badge:'Noturno',     img:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=480&q=75&fit=crop' },
    { id:'colchao',  emoji:'🛏️', category:'Logístico',          name:'Colchão King Size',                desc:'Porque espaço é amor.',                                                                               price:2500, badge:'Estratégico', img:'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=480&q=75&fit=crop' },
    { id:'lua',      emoji:'🌴', category:'Viagem',             name:'Contribuição Lua de Mel',          desc:'Destino: qualquer lugar com praia, sem Wi-Fi e com muito amor.',                                       price:null, badge:'Dos Sonhos',  img:'https://images.unsplash.com/photo-1439130490301-25e322d88054?w=480&q=75&fit=crop' },
  ];
}

function getDefaultManual() {
  return [
    { id:'traje',   icon:'👗', title:'Traje & Dress Code',  type:'dresscode', content:'Venha elegante e confortável! Sugerimos traje semi-formal ou social.', colors:[{hex:'#1a3a6b',label:'Azul Marinho'},{hex:'#2563a8',label:'Azul Royal'},{hex:'#ffffff',label:'Branco'},{hex:'#c8d8f0',label:'Azul Claro'}], forbidden:['vermelho intenso','preto total'], variant:'' },
    { id:'celular', icon:'📱', title:'Celular & Fotos',      type:'text',      content:'Durante a cerimônia, celulares no silencioso por favor. Após, fique à vontade para registrar tudo!', colors:[], forbidden:[], variant:'proibido' },
    { id:'horario', icon:'⏰', title:'Pontualidade',         type:'text',      content:'Por favor, chegue com 30 minutos de antecedência. A cerimônia começará no horário marcado.', colors:[], forbidden:[], variant:'' },
    { id:'presente',icon:'🎁', title:'Presentes',            type:'text',      content:'Sua presença já é o presente mais importante! Consulte nossa lista neste site.', colors:[], forbidden:[], variant:'' },
  ];
}

/* ══════════════════
   LOGIN
══════════════════ */
function doLogin() {
  const pwd = document.getElementById('login-pwd').value;
  const err = document.getElementById('login-error');
  if (pwd === getPwd()) {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-app').style.display = 'block';
    renderAll();
  } else {
    err.style.display = 'block';
    err.textContent = 'Senha incorreta. Tente novamente.';
    document.getElementById('login-pwd').value = '';
  }
}

function doLogout() {
  document.getElementById('admin-app').style.display = 'none';
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('login-pwd').value = '';
}

document.getElementById('login-pwd').addEventListener('keypress', e => {
  if (e.key === 'Enter') doLogin();
});

/* ══════════════════
   TABS
══════════════════ */
function switchTab(id) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === id));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-' + id));
}

/* ══════════════════
   RENDER ALL
══════════════════ */
function renderAll() {
  renderStats();
  renderGiftList();
  renderManualEditor();
  renderReservations();
}

/* ══════════════════
   STATS
══════════════════ */
function renderStats() {
  const gifts    = getGifts();
  const reserved = getReserved();
  const manual   = getManual();

  document.getElementById('stat-total').textContent    = gifts.length;
  document.getElementById('stat-reserved').textContent = reserved.length;
  document.getElementById('stat-available').textContent= gifts.length - reserved.length;
  document.getElementById('stat-manual').textContent   = manual.length;

  const totalVal = gifts.filter(g => reserved.includes(g.id) && g.price).reduce((s,g)=>s+Number(g.price),0);
  document.getElementById('stat-value').textContent = totalVal > 0 ? 'R$ ' + totalVal.toLocaleString('pt-BR') : 'R$ 0';
}

/* ══════════════════
   GIFT LIST
══════════════════ */
function renderGiftList() {
  const gifts    = getGifts();
  const reserved = getReserved();
  const list     = document.getElementById('admin-gift-list');

  if (gifts.length === 0) {
    list.innerHTML = '<p style="text-align:center;color:var(--text-light);padding:3rem 0;font-style:italic;">Nenhum presente cadastrado ainda.</p>';
    return;
  }

  list.innerHTML = gifts.map((g, idx) => {
    const isRes = reserved.includes(g.id);
    const imgEl = g.img
      ? `<img class="gift-admin-img" src="${g.img}" alt="${g.name}" onerror="this.style.display='none'">`
      : `<div class="gift-admin-emoji">${g.emoji || '🎁'}</div>`;
    const priceStr = g.price ? `R$ ${Number(g.price).toLocaleString('pt-BR')}` : 'À combinar';

    return `
      <div class="gift-admin-card" id="admin-card-${g.id}">
        ${imgEl}
        <div class="gift-admin-info">
          <div class="gift-admin-name">${g.emoji || ''} ${g.name}</div>
          <div class="gift-admin-meta">${g.category || ''} · ${g.badge || ''}</div>
          <div class="gift-admin-price">${priceStr}</div>
          ${isRes ? '<span class="gift-admin-reserved">✓ Reservado</span>' : ''}
        </div>
        <div class="gift-admin-actions">
          <button class="btn btn-outline btn-sm" onclick="openEditModal('${g.id}')">✏️ Editar</button>
          <button class="btn btn-danger btn-sm" onclick="deleteGift('${g.id}')">🗑</button>
        </div>
      </div>`;
  }).join('');
}

/* ── Add / Edit Gift ── */
let editingId = null;

function openAddModal() {
  editingId = null;
  document.getElementById('modal-gift-title').textContent = 'Novo Presente';
  document.getElementById('gift-form').reset();
  document.getElementById('img-preview').src = '';
  document.getElementById('img-preview').classList.remove('visible');
  openModal('modal-gift');
}

function openEditModal(id) {
  const gifts = getGifts();
  const g = gifts.find(x => x.id === id);
  if (!g) return;
  editingId = id;

  document.getElementById('modal-gift-title').textContent = 'Editar Presente';
  document.getElementById('f-emoji').value    = g.emoji || '';
  document.getElementById('f-name').value     = g.name || '';
  document.getElementById('f-category').value = g.category || '';
  document.getElementById('f-badge').value    = g.badge || '';
  document.getElementById('f-price').value    = g.price || '';
  document.getElementById('f-desc').value     = g.desc || '';
  document.getElementById('f-img').value      = g.img || '';

  const prev = document.getElementById('img-preview');
  if (g.img) { prev.src = g.img; prev.classList.add('visible'); }
  else { prev.src=''; prev.classList.remove('visible'); }

  openModal('modal-gift');
}

function saveGiftForm() {
  const name = document.getElementById('f-name').value.trim();
  if (!name) { showToast('O nome é obrigatório!', 'danger'); return; }

  const gifts = getGifts();
  const data = {
    emoji:    document.getElementById('f-emoji').value.trim(),
    name,
    category: document.getElementById('f-category').value.trim(),
    badge:    document.getElementById('f-badge').value.trim(),
    price:    document.getElementById('f-price').value ? Number(document.getElementById('f-price').value) : null,
    desc:     document.getElementById('f-desc').value.trim(),
    img:      document.getElementById('f-img').value.trim(),
  };

  if (editingId) {
    const idx = gifts.findIndex(g => g.id === editingId);
    if (idx >= 0) gifts[idx] = { ...gifts[idx], ...data };
    showToast('Presente atualizado! ✓', 'success');
  } else {
    gifts.push({ id: genId(), ...data });
    showToast('Presente adicionado! ✓', 'success');
  }

  saveGifts(gifts);
  closeModal('modal-gift');
  renderGiftList();
  renderStats();
}

function deleteGift(id) {
  if (!confirm('Remover este presente da lista?')) return;
  const gifts = getGifts().filter(g => g.id !== id);
  saveGifts(gifts);
  // Also remove from reservations
  const reserved = getReserved().filter(r => r !== id);
  localStorage.setItem(STORAGE_RESERVED, JSON.stringify(reserved));
  renderGiftList();
  renderStats();
  renderReservations();
  showToast('Presente removido.', 'danger');
}

/* Image preview on URL input */
document.getElementById('f-img').addEventListener('input', function () {
  const prev = document.getElementById('img-preview');
  if (this.value) {
    prev.src = this.value;
    prev.classList.add('visible');
    prev.onerror = () => prev.classList.remove('visible');
  } else {
    prev.src = '';
    prev.classList.remove('visible');
  }
});

/* ══════════════════
   MANUAL EDITOR
══════════════════ */
function renderManualEditor() {
  const manual = getManual();
  const list   = document.getElementById('manual-editor-list');

  list.innerHTML = manual.map((card, idx) => {
    const colorsHTML = card.type === 'dresscode'
      ? renderColorsEditor(card.colors || [], idx)
      : '';

    return `
      <div class="manual-editor-card" id="me-card-${idx}">
        <div class="manual-editor-header">
          <h4>${card.icon || ''} ${card.title}</h4>
          <div style="display:flex;gap:0.5rem;">
            <button class="btn btn-danger btn-sm" onclick="deleteManualCard(${idx})">🗑 Remover</button>
          </div>
        </div>
        <div class="manual-editor-body">
          <div class="form-row">
            <div class="form-group">
              <label>Ícone (emoji)</label>
              <input type="text" value="${card.icon||''}" onchange="updateManualField(${idx},'icon',this.value)" placeholder="👗">
            </div>
            <div class="form-group">
              <label>Título</label>
              <input type="text" value="${card.title||''}" onchange="updateManualField(${idx},'title',this.value)">
            </div>
          </div>
          <div class="form-group">
            <label>Tipo</label>
            <select onchange="updateManualField(${idx},'type',this.value)">
              <option value="text"      ${card.type==='text'?'selected':''}>Texto simples</option>
              <option value="dresscode" ${card.type==='dresscode'?'selected':''}>Dress Code (com paleta)</option>
            </select>
          </div>
          <div class="form-group">
            <label>Conteúdo / Descrição</label>
            <textarea onchange="updateManualField(${idx},'content',this.value)">${card.content||''}</textarea>
          </div>
          <div class="form-group">
            <label>Estilo do card</label>
            <select onchange="updateManualField(${idx},'variant',this.value)">
              <option value=""         ${card.variant===''?'selected':''}>Padrão (azul)</option>
              <option value="proibido" ${card.variant==='proibido'?'selected':''}>Atenção (vermelho)</option>
            </select>
          </div>
          ${card.type === 'dresscode' ? `
          <div class="form-group">
            <label>Cores permitidas</label>
            <div class="colors-editor" id="colors-editor-${idx}">${colorsHTML}</div>
            <button class="btn btn-outline btn-sm add-color-btn" onclick="addColor(${idx})" style="margin-top:0.5rem;">+ Cor</button>
          </div>
          <div class="form-group">
            <label>Cores proibidas (separadas por vírgula)</label>
            <input type="text" value="${(card.forbidden||[]).join(', ')}" onchange="updateManualField(${idx},'forbidden',this.value.split(',').map(s=>s.trim()).filter(Boolean))">
          </div>` : ''}
        </div>
      </div>`;
  }).join('');
}

function renderColorsEditor(colors, cardIdx) {
  return colors.map((c, ci) => `
    <div class="color-row" id="cr-${cardIdx}-${ci}">
      <input type="color" value="${c.hex}" onchange="updateColor(${cardIdx},${ci},'hex',this.value)">
      <input type="text"  value="${c.label}" placeholder="Rótulo" onchange="updateColor(${cardIdx},${ci},'label',this.value)">
      <button class="btn btn-danger btn-sm" onclick="removeColor(${cardIdx},${ci})">✕</button>
    </div>`).join('');
}

function updateManualField(idx, field, value) {
  const manual = getManual();
  if (!manual[idx]) return;
  manual[idx][field] = value;
  saveManual(manual);
  if (field === 'type') renderManualEditor(); // re-render to show/hide color editor
}

function updateColor(cardIdx, colorIdx, field, value) {
  const manual = getManual();
  if (!manual[cardIdx] || !manual[cardIdx].colors) return;
  manual[cardIdx].colors[colorIdx][field] = value;
  saveManual(manual);
}

function addColor(cardIdx) {
  const manual = getManual();
  if (!manual[cardIdx].colors) manual[cardIdx].colors = [];
  manual[cardIdx].colors.push({ hex: '#1a3a6b', label: 'Nova cor' });
  saveManual(manual);
  renderManualEditor();
}

function removeColor(cardIdx, colorIdx) {
  const manual = getManual();
  manual[cardIdx].colors.splice(colorIdx, 1);
  saveManual(manual);
  renderManualEditor();
}

function deleteManualCard(idx) {
  if (!confirm('Remover este card do manual?')) return;
  const manual = getManual();
  manual.splice(idx, 1);
  saveManual(manual);
  renderManualEditor();
  renderStats();
  showToast('Card removido.', 'danger');
}

function addManualCard() {
  const manual = getManual();
  manual.push({ id: genId(), icon: '📌', title: 'Novo Card', type: 'text', content: '', colors: [], forbidden: [], variant: '' });
  saveManual(manual);
  renderManualEditor();
  renderStats();
  showToast('Card adicionado! ✓', 'success');
}

function publishManual() {
  showToast('Manual publicado para os convidados! ✓', 'success');
}

/* ══════════════════
   RESERVATIONS
══════════════════ */
function renderReservations() {
  const gifts    = getGifts();
  const reserved = getReserved();
  const tbody    = document.getElementById('reservations-body');

  if (gifts.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:2rem;color:var(--text-light)">Nenhum presente cadastrado.</td></tr>';
    return;
  }

  tbody.innerHTML = gifts.map(g => {
    const isRes = reserved.includes(g.id);
    const badge = isRes
      ? '<span class="badge-reserved">✓ Reservado</span>'
      : '<span class="badge-available">Disponível</span>';
    const price = g.price ? `R$ ${Number(g.price).toLocaleString('pt-BR')}` : 'À combinar';
    const clearBtn = isRes
      ? `<button class="btn btn-outline btn-sm" onclick="clearReservation('${g.id}')">Liberar</button>`
      : '—';
    return `<tr>
      <td>${g.emoji || '🎁'} ${g.name}</td>
      <td>${price}</td>
      <td>${badge}</td>
      <td>${clearBtn}</td>
    </tr>`;
  }).join('');
}

function clearReservation(id) {
  if (!confirm('Liberar esta reserva?')) return;
  const reserved = getReserved().filter(r => r !== id);
  localStorage.setItem(STORAGE_RESERVED, JSON.stringify(reserved));
  renderReservations();
  renderStats();
  renderGiftList();
  showToast('Reserva liberada.', 'success');
}

/* ══════════════════
   SETTINGS / PASSWORD
══════════════════ */
function changePassword() {
  const current  = document.getElementById('s-current').value;
  const newPwd   = document.getElementById('s-new').value.trim();
  const confirm  = document.getElementById('s-confirm').value;

  if (current !== getPwd()) { showToast('Senha atual incorreta!', 'danger'); return; }
  if (newPwd.length < 4)    { showToast('Nova senha muito curta!', 'danger'); return; }
  if (newPwd !== confirm)   { showToast('Senhas não coincidem!', 'danger'); return; }

  savePwd(newPwd);
  showToast('Senha alterada com sucesso! ✓', 'success');
  document.getElementById('s-current').value = '';
  document.getElementById('s-new').value = '';
  document.getElementById('s-confirm').value = '';
}

function resetAllData() {
  if (!confirm('⚠️ Isso vai apagar TODOS os presentes, reservas e manual. Confirma?')) return;
  localStorage.removeItem(STORAGE_GIFTS);
  localStorage.removeItem(STORAGE_MANUAL);
  localStorage.removeItem(STORAGE_RESERVED);
  renderAll();
  showToast('Todos os dados foram redefinidos.', 'danger');
}

/* ══════════════════
   MODALS
══════════════════ */
function openModal(id) { document.getElementById(id).classList.add('open'); document.body.style.overflow='hidden'; }
function closeModal(id) { document.getElementById(id).classList.remove('open'); document.body.style.overflow=''; }

document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', e => { if (e.target === m) closeModal(m.id); });
});
