/* ══════════════════════════════════════
   MANUAL DOS CONVIDADOS
   ══════════════════════════════════════ */
(function () {
  const STORAGE_MANUAL = 'wedding_manual';

  const DEFAULT_MANUAL = [
    {
      id: 'traje',
      icon: '👗',
      title: 'Traje & Dress Code',
      type: 'dresscode',
      content: 'Venha elegante e confortável! Sugerimos traje semi-formal ou social.',
      colors: [
        { hex: '#1a3a6b', label: 'Azul Marinho' },
        { hex: '#2563a8', label: 'Azul Royal' },
        { hex: '#ffffff', label: 'Branco' },
        { hex: '#c8d8f0', label: 'Azul Claro' },
        { hex: '#4a4a6a', label: 'Cinza Azul' },
        { hex: '#f5f0e8', label: 'Off White' },
      ],
      forbidden: ['vermelho intenso', 'preto total', 'laranja', 'verde neon'],
      variant: ''
    },
    {
      id: 'celular',
      icon: '📱',
      title: 'Celular & Fotos',
      type: 'text',
      content: 'Peço que durante a cerimônia os celulares fiquem no silencioso. Temos um fotógrafo profissional registrando cada momento. Após a cerimônia, fique à vontade para tirar quantas fotos quiser — e nos marque nas redes! 📸',
      variant: 'proibido'
    },
    {
      id: 'horario',
      icon: '⏰',
      title: 'Pontualidade',
      type: 'text',
      content: 'Por favor, chegue com 30 minutos de antecedência. A cerimônia começará no horário marcado. Não queremos que você perca nenhum momento especial!',
      variant: ''
    },
    {
      id: 'presente',
      icon: '🎁',
      title: 'Presentes',
      type: 'text',
      content: 'Sua presença já é o presente mais importante para nós! Se desejar presentear, temos nossa lista de presentes disponível neste site. Contribuições via Pix também serão recebidas com muito amor.',
      variant: ''
    },
  ];

  function loadManual() {
    try {
      const saved = localStorage.getItem(STORAGE_MANUAL);
      return saved ? JSON.parse(saved) : DEFAULT_MANUAL;
    } catch { return DEFAULT_MANUAL; }
  }

  function renderManual() {
    const container = document.getElementById('manual-grid');
    if (!container) return;

    const cards = loadManual();

    if (!cards || cards.length === 0) {
      container.innerHTML = '<p class="manual-empty">O manual será publicado em breve pelos noivos. ♡</p>';
      return;
    }

    container.innerHTML = cards.map(card => {
      let bodyHTML = '';

      if (card.type === 'dresscode') {
        const swatches = (card.colors || []).map(c => `
          <div class="dress-option">
            <div class="dress-swatch" style="background:${c.hex};" title="${c.label}"></div>
            <span class="dress-label">${c.label}</span>
          </div>`).join('');

        const forbidden = (card.forbidden || []).length > 0
          ? `<p style="margin-top:1rem;font-size:0.8rem;color:rgba(255,255,255,0.5);">
               <span style="color:#ffb3b0;">✕ Evitar:</span> ${card.forbidden.join(', ')}
             </p>` : '';

        bodyHTML = `
          <p class="manual-card-content">${card.content || ''}</p>
          <div class="dress-options">${swatches}</div>
          ${forbidden}`;
      } else {
        bodyHTML = `<p class="manual-card-content">${card.content || ''}</p>`;
      }

      return `
        <div class="manual-card ${card.variant || ''}">
          <span class="manual-card-icon">${card.icon || '📌'}</span>
          <h3>${card.title}</h3>
          ${bodyHTML}
        </div>`;
    }).join('');
  }

  /* Re-render when admin updates */
  window.addEventListener('storage', e => {
    if (e.key === STORAGE_MANUAL) renderManual();
  });

  renderManual();
})();
