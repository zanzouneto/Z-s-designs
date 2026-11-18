(function () {
  'use strict';
  var t = ZS.t, data, getCats, deck, num = '', typing;

  ZS.header();
  ZS.load('jenga').then(init).catch(function () { ZS.toast('Could not load dares.'); });

  function init(d) {
    data = d;
    getCats = ZS.chips(document.getElementById('cats'), d.categories);
    document.getElementById('start').addEventListener('click', start);
    document.getElementById('settings').addEventListener('click', function () { ZS.show('setup'); });
    document.getElementById('get').addEventListener('click', get);
    document.querySelectorAll('#keypad button').forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.getAttribute('data-k');
        if (k === 'C') num = ''; else if (k === 'del') num = num.slice(0, -1); else if (num.length < 2) num += b.textContent;
        render();
      });
    });
    document.addEventListener('keydown', function (e) {
      if (document.getElementById('game').hidden) return;
      if (/^\d$/.test(e.key) && num.length < 2) num += e.key; else if (e.key === 'Backspace') num = num.slice(0, -1); else if (e.key === 'Enter') return get(); else return;
      render();
    });
  }

  function render() { document.getElementById('num').textContent = num || '–'; }

  function start() {
    var ids = getCats();
    if (!ids.length) return ZS.toast(t('pickTheme'));
    var items = [];
    data.categories.forEach(function (c) { if (ids.indexOf(c.id) !== -1) c.tasks.forEach(function (x) { items.push({ text: x, cat: c.label }); }); });
    deck = ZS.deck(items); num = ''; render();
    document.getElementById('dare-card').hidden = true;
    ZS.show('game');
  }

  function get() {
    var n = parseInt(num, 10);
    if (!n || n < 1 || n > 54) return ZS.toast(t('jenga_range'));
    var dare = deck.next();
    document.getElementById('dare-card').hidden = false;
    document.getElementById('dare-block').textContent = t('jenga_block', { n: n });
    document.getElementById('dare-cat').textContent = dare.cat;
    var el = document.getElementById('dare'); el.textContent = '';
    clearInterval(typing); var i = 0;
    typing = setInterval(function () { el.textContent = dare.text.slice(0, ++i); if (i >= dare.text.length) clearInterval(typing); }, 18);
    num = ''; render();
    document.getElementById('dare-card').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
})();
