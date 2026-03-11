/* ══════════════════════════════════════
   CONTADOR · desde 14/12/2024
   ══════════════════════════════════════ */

(function () {
  const start = new Date(2024, 11, 14, 0, 0, 0); // 14 dez 2024

  const elDias = document.getElementById('c-dias');
  const elHoras = document.getElementById('c-horas');
  const elMin   = document.getElementById('c-min');
  const elSeg   = document.getElementById('c-seg');

  if (!elDias) return;

  let prevSeg = -1;

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick(el, val) {
    el.classList.remove('tick');
    void el.offsetWidth; // reflow
    el.classList.add('tick');
    el.textContent = val;
    setTimeout(() => el.classList.remove('tick'), 320);
  }

  function update() {
    const diff = Date.now() - start.getTime();

    const totalSec  = Math.floor(diff / 1000);
    const totalMin  = Math.floor(totalSec / 60);
    const totalHrs  = Math.floor(totalMin / 60);
    const totalDias = Math.floor(totalHrs / 24);

    const seg  = totalSec  % 60;
    const min  = totalMin  % 60;
    const hrs  = totalHrs  % 24;

    elDias.textContent  = totalDias;
    elHoras.textContent = pad(hrs);
    elMin.textContent   = pad(min);

    if (seg !== prevSeg) {
      tick(elSeg, pad(seg));
      prevSeg = seg;
    }
  }

  update();
  setInterval(update, 1000);
})();
