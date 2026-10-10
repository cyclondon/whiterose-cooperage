// Mobile navigation toggle
(function () {
  var btn = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', function () {
    var open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open', !open);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      btn.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
      btn.focus();
    }
  });
})();

// Cask stock search filter
(function () {
  var input = document.getElementById('cask-filter');
  if (!input) return;
  var cats = Array.prototype.slice.call(document.querySelectorAll('.stock-cat'));
  var out = document.querySelector('.stock-count');
  input.addEventListener('input', function () {
    var q = input.value.trim().toLowerCase();
    var total = 0;
    cats.forEach(function (cat) {
      var catHit = q && (cat.getAttribute('data-k') || '').indexOf(q) > -1;
      var shown = 0;
      Array.prototype.forEach.call(cat.querySelectorAll('tbody tr'), function (row) {
        var hit = !q || catHit || row.textContent.toLowerCase().indexOf(q) > -1;
        row.hidden = !hit;
        if (hit) shown++;
      });
      cat.hidden = shown === 0;
      total += shown;
    });
    if (out) out.textContent = !q ? '' : (total ? out.getAttribute('data-tpl').replace('{n}', total) : out.getAttribute('data-none'));
  });
})();
