const root = document.documentElement;
const key = 'ansa-theme';
let saved = null;
try { saved = localStorage.getItem(key); } catch {}
if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;
document.addEventListener('DOMContentLoaded', () => {
  for (const button of document.querySelectorAll('[data-theme-toggle]')) {
    button.hidden = false;
    button.addEventListener('click', () => {
      const dark = root.dataset.theme === 'dark';
      root.dataset.theme = dark ? 'light' : 'dark';
      try { localStorage.setItem(key, root.dataset.theme); } catch {}
    });
  }
});
