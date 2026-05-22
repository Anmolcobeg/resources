// EduPortal — Class Page JS

document.addEventListener('DOMContentLoaded', () => {
  const searchBar = document.getElementById('bookSearch');
  const tabs = document.querySelectorAll('.stream-tab');
  const groups = document.querySelectorAll('.stream-group');
  const noResults = document.querySelector('.no-results');

  // ── Tab Filtering ──
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.stream;
      groups.forEach(g => {
        if (target === 'all' || g.dataset.stream === target) {
          g.removeAttribute('hidden');
        } else {
          g.setAttribute('hidden', '');
        }
      });
      if (searchBar) { searchBar.value = ''; filterBooks(''); }
    });
  });

  // ── Search Filtering ──
  if (searchBar) {
    searchBar.addEventListener('input', e => filterBooks(e.target.value.trim().toLowerCase()));
  }

  function filterBooks(query) {
    let visibleCount = 0;
    document.querySelectorAll('.book-card').forEach(card => {
      const title = (card.querySelector('.book-title')?.textContent || '').toLowerCase();
      const subject = (card.querySelector('.book-subject')?.textContent || '').toLowerCase();
      const match = !query || title.includes(query) || subject.includes(query);
      card.classList.toggle('hidden', !match);
      if (match) visibleCount++;
    });
    // Show/hide groups that have visible cards
    groups.forEach(group => {
      if (group.hasAttribute('hidden')) return;
      const visible = group.querySelectorAll('.book-card:not(.hidden)').length;
      group.style.display = visible === 0 ? 'none' : '';
    });
    if (noResults) noResults.classList.toggle('show', visibleCount === 0);
  }

  // ── PDF open handler (opens in new tab) ──
  document.querySelectorAll('.book-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const url = btn.href;
      if (!url || url === '#') {
        alert('PDF link not available. Please check the NCERT website directly at ncert.nic.in');
        return;
      }
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });
});