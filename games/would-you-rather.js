(function () {
  'use strict';
  var t = ZS.t, data, mode = 'classic', getThemes, players, deck, turn = 0;

  ZS.header();
  ZS.load('would-you-rather').then(init).catch(function () { ZS.toast('Could not load questions.'); });

  function init(d) {
    data = d;
    getThemes = ZS.chips(document.getElementById('themes'), d.themes);
    players = ZS.nameList({ input: 'player-input', list: 'player-list', button: 'player-add' });
    document.querySelectorAll('[data-mode]').forEach(function (b) {
      b.addEventListener('click', function () { mode = b.getAttribute('data-mode'); ZS.show('setup'); document.getElementById('players-block').hidden = mode !== 'classic'; });
    });
    document.getElementById('start').addEventListener('click', start);
    document.getElementById('next').addEventListener('click', next);
    document.getElementById('settings').addEventListener('click', function () { ZS.show('setup'); });
    document.getElementById('change-mode').addEventListener('click', function () { ZS.show('mode'); });
    ZS.onSwipe(document.getElementById('qcard'), function () { next(); });
    document.querySelectorAll('.wyr-opt').forEach(function (o) {
      o.addEventListener('click', function () { document.querySelectorAll('.wyr-opt').forEach(function (x) { x.classList.toggle('picked', x === o); }); });
    });
  }

  function start() {
    var ids = getThemes();
    if (!ids.length) return ZS.toast(t('pickTheme'));
    if (mode === 'classic' && !players.get().length) return ZS.toast(t('addPlayer'));
    var items = [];
    data.themes.forEach(function (th) { if (ids.indexOf(th.id) !== -1) items = items.concat(th.items); });
    deck = ZS.deck(items); turn = 0;
    document.getElementById('group-hint').hidden = mode !== 'group';
    ZS.show('game'); next();
  }

  function next() {
    var q = deck.next(); if (!q) return;
    var ps = players.get();
    document.getElementById('who').textContent = mode === 'classic' && ps.length ? t('wyr_hey', { name: ps[turn++ % ps.length] }) : t('wyr_q');
    document.getElementById('opt-a').textContent = q[0];
    document.getElementById('opt-b').textContent = q[1];
    document.querySelectorAll('.wyr-opt').forEach(function (x) { x.classList.remove('picked'); });
    var card = document.getElementById('qcard'); card.classList.remove('flip'); void card.offsetWidth; card.classList.add('flip');
  }
})();
