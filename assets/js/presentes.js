/* ══════════════════════════════════════
   PRESENTES · lógica de carrinho
   ══════════════════════════════════════ */

(function () {
  /* Catálogo de presentes */
  const gifts = [
    {
      id: 'terapia',
      emoji: '🛋️',
      category: 'Saúde Mental',
      name: 'Ajuda na Terapia do Noivo',
      desc: 'Ele precisa processar que vai dividir o controle remoto para sempre. E a manta do sofá. E o travesseiro bom.',
      price: 150,
      badge: 'Urgente',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=480&q=75&fit=crop'
    },
    {
      id: 'ps5',
      emoji: '🎮',
      category: 'Harmonia Doméstica',
      name: '2 Controles de PS5',
      desc: 'Para que as guerras aconteçam dentro do jogo e não na sala de estar. Paz garantida com player 2!',
      price: 600,
      badge: 'Essencial',
      img: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=480&q=75&fit=crop'
    },
    {
      id: 'fone',
      emoji: '🎧',
      category: 'Bem-estar Noturno',
      name: 'Fone com Cancelamento de Ruído',
      desc: 'Para Emmily sobreviver com elegância às sessões noturnas de PlayStation. A arte de dormir às 3h.',
      price: 350,
      badge: 'Noturno',
      img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=480&q=75&fit=crop'
    },
    {
      id: 'lencos',
      emoji: '🧻',
      category: 'Uso Coletivo',
      name: 'Caixas de Lenço Premium (caixa c/12)',
      desc: 'Para Emmily no altar, na festa, no carro indo pra festa, na foto da festa e no dia seguinte lembrando da festa.',
      price: 80,
      badge: 'Colecionável',
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&q=75&fit=crop'
    },
    {
      id: 'culinaria',
      emoji: '👨‍🍳',
      category: 'Gastronomia',
      name: 'Curso de Culinária para Dois',
      desc: 'Porque "hoje tem o quê?" não pode ser respondido com silêncio eterno e olhares vazios. Juntos na cozinha!',
      price: 280,
      badge: 'Gastronômico',
      img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=480&q=75&fit=crop'
    },
    {
      id: 'colchao',
      emoji: '🛏️',
      category: 'Logístico',
      name: 'Colchão King Size',
      desc: 'Porque espaço é amor. E porque eventualmente alguém vai roncar e alguém vai precisar de muito espaço.',
      price: 2500,
      badge: 'Estratégico',
      img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=480&q=75&fit=crop'
    },
    {
      id: 'lua',
      emoji: '🌴',
      category: 'Viagem',
      name: 'Contribuição Lua de Mel',
      desc: 'Destino: qualquer lugar com praia, sem Wi-Fi e com muito, muito amor. Qualquer contribuição é ouro!',
      price: null,
      badge: 'Dos Sonhos',
      img: 'https://images.unsplash.com/photo-1439130490301-25e322d88054?w=480&q=75&fit=crop'
    },
    {
      id: 'flores',
      emoji: '💐',
      category: 'Romance',
      name: 'Assinatura de Flores Mensais',
      desc: 'Flores falam o que as palavras às vezes cansam. E porque ela merece flores todos os meses do ano.',
      price: 120,
      badge: 'Floral',
      img: 'https://images.unsplash.com/photo-1490750967868-88df5691cc33?w=480&q=75&fit=crop'
    },
    {
      id: 'streaming',
      emoji: '🎬',
      category: 'Entretenimento',
      name: 'Streaming Vitalício',
      desc: 'Para as noites de romance dela E para as maratonas de série que ele fará fingindo assistir junto.',
      price: 240,
      badge: 'Cultural',
      img: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=480&q=75&fit=crop'
    },
    {
      id: 'paciencia',
      emoji: '📖',
      category: 'Relacional',
      name: 'Voucher de Paciência Infinita',
      desc: 'Uso exclusivo da noiva. Válido para quando ele deixar a louça pra "depois" pelo terceiro dia seguido.',
      price: null,
      badge: 'Espiritual',
      img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=480&q=75&fit=crop'
    },
  ];

  let cart = [];

  /* ── Render grid ── */
  function renderGrid() {
    const grid = document.getElementById('gift-grid');
    if (!grid) return;

    grid.innerHTML = gifts.map(g => {
      const inCart = cart.some(c => c.id === g.id);
      const priceHTML = g.price
        ? `<span class="gift-price-label">Sugestão</span><span class="gift-price-value">R$ ${g.price.toLocaleString('pt-BR')}</span>`
        : `<span class="gift-price-value symbolic">À combinar ♡</span>`;

      const btnLabel = inCart ? '✓ Reservado' : '🛒 Reservar';

      return `
        <div class="gift-card ${inCart ? 'reserved' : ''}" id="gift-${g.id}">
          <span class="gift-badge">${g.badge}</span>
          <div class="gift-reserved-stamp"><div class="stamp">Reservado ♡</div></div>
          <div class="gift-img-wrap">
            <img src="${g.img}" alt="${g.name}" loading="lazy">
            <div class="gift-emoji-thumb">${g.emoji}</div>
          </div>
          <div class="gift-info">
            <span class="gift-category">${g.category}</span>
            <h3 class="gift-name">${g.name}</h3>
            <p class="gift-desc">${g.desc}</p>
          </div>
          <div class="gift-footer">
            <div class="gift-price">${priceHTML}</div>
            <button class="gift-btn" onclick="toggleGift('${g.id}')">${btnLabel}</button>
          </div>
        </div>`;
    }).join('');

    updateCartBadge();
  }

  /* ── Toggle gift ── */
  window.toggleGift = (id) => {
    const gift = gifts.find(g => g.id === id);
    if (!gift) return;

    const idx = cart.findIndex(c => c.id === id);
    const card = document.getElementById('gift-' + id);

    if (idx >= 0) {
      cart.splice(idx, 1);
      card.classList.remove('reserved');
      card.querySelector('.gift-btn').textContent = '🛒 Reservar';
      window.showToast('Presente removido da lista 💔');
    } else {
      cart.push(gift);
      card.classList.add('reserved');
      card.querySelector('.gift-btn').textContent = '✓ Reservado';
      window.showToast(gift.emoji + ' ' + gift.name + ' reservado! ♡');
    }

    updateCartBadge();
    renderStoreCount();
  };

  function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (badge) badge.textContent = cart.length;
    document.getElementById('store-reserved-count').textContent = cart.length;
  }

  function renderStoreCount() {
    const el = document.getElementById('store-reserved-count');
    if (el) el.textContent = cart.length;
  }

  /* ── Cart modal ── */
  window.openCart = () => {
    const overlay = document.getElementById('cart-overlay');
    overlay.classList.add('open');
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

    if (cart.length === 0) {
      container.innerHTML = '<p class="cart-empty">Sua lista está vazia por enquanto... 🌸</p>';
      totalEl.textContent = 'R$ 0';
      return;
    }

    let totalNum = 0;

    container.innerHTML = cart.map(g => {
      if (g.price) totalNum += g.price;
      const priceStr = g.price ? `R$ ${g.price.toLocaleString('pt-BR')}` : 'À combinar';
      return `
        <div class="cart-item">
          <img src="${g.img}" alt="${g.name}">
          <div class="cart-item-info">
            <div class="cart-item-name">${g.name}</div>
            <div class="cart-item-price">${priceStr}</div>
          </div>
          <button class="cart-remove" onclick="toggleGift('${g.id}'); renderCartItems();" title="Remover">✕</button>
        </div>`;
    }).join('');

    totalEl.textContent = totalNum > 0
      ? `R$ ${totalNum.toLocaleString('pt-BR')}`
      : 'Combinamos ♡';
  }

  /* renderCartItems must be accessible inside close callback */
  window.renderCartItems = renderCartItems;

  /* ── Init ── */
  renderGrid();

})();
