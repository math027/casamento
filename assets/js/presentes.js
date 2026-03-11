/* ══════════════════════════════════════
   PRESENTES · localStorage + cancelar reserva
   ══════════════════════════════════════ */
(function () {

  const STORAGE_GIFTS     = 'wedding_gifts_catalog';
  const STORAGE_RESERVED  = 'wedding_reserved';

  /* ── Default catalog ── */
  const DEFAULT_GIFTS = [
    { id: 'terapia',   emoji:'🛋️', category:'Saúde Mental',       name:'Ajuda na Terapia do Noivo',         desc:'Ele precisa processar que vai dividir o controle remoto para sempre. E a manta do sofá. E o travesseiro bom.',                       price:150,  badge:'Urgente',     img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=480&q=75&fit=crop' },
    { id: 'ps5',       emoji:'🎮', category:'Harmonia Doméstica',  name:'2 Controles de PS5',                desc:'Para que as guerras aconteçam dentro do jogo e não na sala de estar. Paz garantida com player 2!',                                  price:600,  badge:'Essencial',   img:'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=480&q=75&fit=crop' },
    { id: 'fone',      emoji:'🎧', category:'Bem-estar Noturno',   name:'Fone com Cancelamento de Ruído',    desc:'Para Emmily sobreviver com elegância às sessões noturnas de PlayStation. A arte de dormir às 3h.',                                  price:350,  badge:'Noturno',     img:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=480&q=75&fit=crop' },
    { id: 'lencos',    emoji:'🧻', category:'Uso Coletivo',        name:'Caixas de Lenço Premium (c/12)',    desc:'Para Emmily no altar, na festa, no carro indo pra festa, na foto da festa e lembrando da festa.',                                   price:80,   badge:'Colecionável',img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&q=75&fit=crop' },
    { id: 'culinaria', emoji:'👨‍🍳',category:'Gastronomia',         name:'Curso de Culinária para Dois',      desc:'Porque "hoje tem o quê?" não pode ser respondido com silêncio eterno. Juntos na cozinha!',                                          price:280,  badge:'Gastronômico',img:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=480&q=75&fit=crop' },
    { id: 'colchao',   emoji:'🛏️', category:'Logístico',           name:'Colchão King Size',                 desc:'Porque espaço é amor. E porque eventualmente alguém vai roncar e alguém vai precisar de muito espaço.',                             price:2500, badge:'Estratégico', img:'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=480&q=75&fit=crop' },
    { id: 'lua',       emoji:'🌴', category:'Viagem',              name:'Contribuição Lua de Mel',           desc:'Destino: qualquer lugar com praia, sem Wi-Fi e com muito amor. Qualquer contribuição é ouro!',                                      price:null, badge:'Dos Sonhos',  img:'https://images.unsplash.com/photo-1439130490301-25e322d88054?w=480&q=75&fit=crop' },
    { id: 'flores',    emoji:'💐', category:'Romance',             name:'Assinatura de Flores Mensais',      desc:'Flores falam o que as palavras às vezes cansam. E porque ela merece flores todos os meses do ano.',                                  price:120,  badge:'Floral',      img:'https://images.unsplash.com/photo-1490750967868-88df5691cc33?w=480&q=75&fit=crop' },
    { id: 'streaming', emoji:'🎬', category:'Entretenimento',      name:'Streaming Vitalício',               desc:'Para as noites de romance dela E para as maratonas de série que ele fará fingindo assistir junto.',                                  price:240,  badge:'Cultural',    img:'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=480&q=75&fit=crop' },
    { id: 'paciencia', emoji:'📖', category:'Relacional',          name:'Voucher de Paciência Infinita',     desc:'Uso exclusivo da noiva. Válido para quando ele deixar a louça pra "depois" pelo terceiro dia seguido.',                              price:null, badge:'Espiritual',  img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=480&q=75&fit=crop' },
  ];

  function loadGifts() {
    try {
      const saved = localStorage.getItem(STORAGE_GIFTS);
      return saved ? JSON.parse(saved) : DEFAULT_GIFTS;
    } catch { return DEFAULT_GIFTS; }
  }

  function loadReserved() {
    try {
      const saved = localStorage.getItem(STORAGE_RESERVED);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  }

  function saveReserved(arr) {
    localStorage.setItem(STORAGE_RESERVED, JSON.stringify(arr));
  }

  let gifts    = loadGifts();
  let reserved = loadReserved(); // array of ids

  /* ── Render grid ── */
  function renderGrid() {
    const grid = document.getElementById('gift-grid');
    if (!grid) return;

    if (gifts.length === 0) {
      grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;font-family:\'Cormorant Garamond\',serif;font-style:italic;color:var(--text-light);padding:3rem 0;">Nenhum presente cadastrado ainda. Os noivos estão preparando a lista! ♡</p>';
      updateUI();
      return;
    }

    grid.innerHTML = gifts.map(g => {
      const isRes = reserved.includes(g.id);
      const priceHTML = g.price
        ? `<span class="gift-price-label">Sugestão</span><span class="gift-price-value">R$ ${Number(g.price).toLocaleString('pt-BR')}</span>`
        : `<span class="gift-price-value symbolic">À combinar ♡</span>`;
      const imgSrc = g.img || 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=480&q=75&fit=crop';

      return `
        <div class="gift-card ${isRes ? 'reserved' : ''}" id="gift-${g.id}">
          <span class="gift-badge">${g.badge || 'Presente'}</span>
          <div class="gift-reserved-stamp"><div class="stamp">Reservado ♡</div></div>
          <div class="gift-img-wrap">
            <img src="${imgSrc}" alt="${g.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=480&q=75&fit=crop'">
            <div class="gift-emoji-thumb">${g.emoji || '🎁'}</div>
          </div>
          <div class="gift-info">
            <span class="gift-category">${g.category || ''}</span>
            <h3 class="gift-name">${g.name}</h3>
            <p class="gift-desc">${g.desc || ''}</p>
          </div>
          <div class="gift-footer">
            <div class="gift-price">${priceHTML}</div>
            <button class="gift-btn"        onclick="toggleGift('${g.id}')">🛒 Reservar</button>
            <button class="gift-cancel-btn" onclick="toggleGift('${g.id}')">✕ Cancelar</button>
          </div>
        </div>`;
    }).join('');

    updateUI();
  }

  /* ── Toggle reservation ── */
  window.toggleGift = (id) => {
    const gift = gifts.find(g => g.id === id);
    if (!gift) return;
    const card = document.getElementById('gift-' + id);

    if (reserved.includes(id)) {
      reserved = reserved.filter(r => r !== id);
      card.classList.remove('reserved');
      window.showToast('Reserva cancelada 💙');
    } else {
      reserved.push(id);
      card.classList.add('reserved');
      window.showToast(gift.emoji + ' ' + gift.name + ' reservado! ♡');
    }

    saveReserved(reserved);
    updateUI();
    if (document.getElementById('cart-overlay').classList.contains('open')) {
      renderCartItems();
    }
  };

  function updateUI() {
    const badge = document.getElementById('cart-badge');
    const count = document.getElementById('store-reserved-count');
    if (badge) badge.textContent = reserved.length;
    if (count) count.textContent = reserved.length;
  }

  /* ── Cart ── */
  window.openCart = () => {
    document.getElementById('cart-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
    renderCartItems();
  };
  window.closeCart = () => {
    document.getElementById('cart-overlay').classList.remove('open');
    document.body.style.overflow = '';
  };
  document.getElementById('cart-overlay').addEventListener('click', e => {
    if (e.target.id === 'cart-overlay') window.closeCart();
  });

  function renderCartItems() {
    const container = document.getElementById('cart-items');
    const totalEl   = document.getElementById('cart-total-val');

    const cartGifts = gifts.filter(g => reserved.includes(g.id));

    if (cartGifts.length === 0) {
      container.innerHTML = '<p class="cart-empty">Nenhum presente reservado ainda... 🌸</p>';
      totalEl.textContent = 'R$ 0';
      return;
    }

    let total = 0;
    container.innerHTML = cartGifts.map(g => {
      if (g.price) total += Number(g.price);
      const priceStr = g.price ? `R$ ${Number(g.price).toLocaleString('pt-BR')}` : 'À combinar';
      const imgSrc = g.img || 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=480&q=75&fit=crop';
      return `
        <div class="cart-item">
          <img src="${imgSrc}" alt="${g.name}">
          <div class="cart-item-info">
            <div class="cart-item-name">${g.name}</div>
            <div class="cart-item-price">${priceStr}</div>
          </div>
          <button class="cart-remove" onclick="toggleGift('${g.id}')" title="Cancelar reserva">✕</button>
        </div>`;
    }).join('');

    totalEl.textContent = total > 0 ? `R$ ${total.toLocaleString('pt-BR')}` : 'À combinar ♡';
  }

  window.renderCartItems = renderCartItems;

  /* ── Listen for catalog updates from admin ── */
  window.addEventListener('storage', e => {
    if (e.key === STORAGE_GIFTS) {
      gifts    = loadGifts();
      reserved = loadReserved();
      renderGrid();
    }
  });

  /* ── Init ── */
  renderGrid();
})();
