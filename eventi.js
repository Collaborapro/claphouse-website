async function loadEventi() {
  const grid = document.getElementById('eventiGrid');
  if (!grid) return;
  try {
    const res = await fetch('eventi.json');
    const eventi = await res.json();
    const eventiHome = eventi.slice(0, 6);
    grid.innerHTML = eventiHome.map(e => `
      <article class="evento-card reveal">
        <div class="evento-img">
          <img src="${e.immagine}" alt="${e.titolo}" loading="lazy" />
          <span class="evento-tag">${e.tag}</span>
        </div>
        <div class="evento-body">
          <p class="evento-data">${e.data} · ${e.orario}</p>
          <h3 class="evento-titolo">${e.titolo}</h3>
          <p class="evento-desc">${e.descrizione}</p>
        </div>
      </article>
    `).join('');
    observeReveal();
  } catch (err) {
    grid.innerHTML = '<p style="color:var(--white-dim);text-align:center;grid-column:1/-1;">Nessun evento in programma.</p>';
  }
}
loadEventi();