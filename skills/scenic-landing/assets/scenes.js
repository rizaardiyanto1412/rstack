// Starts the animated product scenes. Each scene's first frame is already in
// the page; its script takes that frame over when the scene nears the screen.
// Export the scenes with stageshow-js: see references/demos.md in the scenic-landing skill.
const start = host => import(`/assets/scenes/${host.dataset.scene}.js`).then(scene => scene.default(host)).catch(() => {});
const watcher = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    watcher.unobserve(entry.target);
    start(entry.target);
  }
}, { rootMargin: '400px' });
for (const host of document.querySelectorAll('stageshow-scene[data-scene]')) watcher.observe(host);
