(function () {
  'use strict';
  var t = ZS.t, data, teams, getTheme, getTime, getRounds;
  var state, timerId;

  ZS.header();
  ZS.load('taboo').then(init).catch(function () { ZS.toast('Could not load cards.'); });

  function init(d) {
    data = d;
    teams = ZS.nameList({ input: 'team-input', list: 'team-list', button: 'team-add', max: 6, initial: [t('team') + ' 1', t('team') + ' 2'] });
    getTheme = ZS.pick(document.getElementById('themes'), d.themes);
    getTime = ZS.seg(document.getElementById('time-seg'), [{ value: 60, label: '60' + t('seconds') }, { value: 90, label: '90' + t('seconds') }, { value: 120, label: '120' + t('seconds') }], 60);
    getRounds = ZS.seg(document.getElementById('round-seg'), [{ value: 2, label: '2' }, { value: 3, label: '3' }, { value: 5, label: '5' }], 3);
    document.getElementById('start').addEventListener('click', start);
    document.getElementById('go').addEventListener('click', startTurn);
    document.getElementById('got').addEventListener('click', function () { mark('ok', 1); });
    document.getElementById('skip').addEventListener('click', function () { mark('skip', 0); });
    document.getElementById('buzz').addEventListener('click', function () { mark('no', -1); });
    document.getElementById('next-turn').addEventListener('click', nextTurn);
    document.getElementById('again').addEventListener('click', function () { ZS.show('setup'); });
    ZS.onSwipe(document.getElementById('tcard'), function (dir) {
      var rtl = document.documentElement.dir === 'rtl';
      var forward = rtl ? 'left' : 'right';
      mark(dir === forward ? 'ok' : 'skip', dir === forward ? 1 : 0);
    });
  }

  function start() {
    var names = teams.get();
    if (names.length < 2) return ZS.toast(t('addTeams'));
    var theme = data.themes.filter(function (x) { return x.id === getTheme(); })[0];
    state = { names: names, scores: names.map(function () { return 0; }), turn: 0, rounds: +getRounds(), time: +getTime(), deck: ZS.deck(theme.cards) };
    ready();
  }

  function ready() {
    var i = state.turn % state.names.length;
    document.getElementById('round-label').textContent = t('taboo_round', { r: Math.floor(state.turn / state.names.length) + 1, t: state.rounds });
    document.getElementById('ready-team').textContent = t('taboo_turn', { team: state.names[i] });
    renderScores(document.getElementById('mini-scores'));
    ZS.show('ready');
  }

  function startTurn() {
    state.points = 0; state.log = []; state.left = state.time;
    document.getElementById('turn-team').textContent = state.names[state.turn % state.names.length];
    document.getElementById('turn-points').textContent = '0';
    tick(); timerId = setInterval(function () { state.left--; tick(); if (state.left <= 0) endTurn(); }, 1000);
    ZS.show('turn'); draw();
  }

  function tick() {
    var el = document.getElementById('timer'); el.textContent = Math.max(0, state.left);
    el.classList.toggle('low', state.left <= 10);
  }

  function draw() {
    state.card = state.deck.next();
    document.getElementById('word').textContent = state.card.word;
    var ul = document.getElementById('taboo-words'); ul.innerHTML = '';
    state.card.taboo.forEach(function (w) { var li = document.createElement('li'); li.textContent = w; ul.appendChild(li); });
  }

  function mark(kind, pts) {
    if (!state || document.getElementById('turn').hidden) return;
    state.points += pts; state.log.push({ word: state.card.word, kind: kind });
    document.getElementById('turn-points').textContent = state.points;
    draw();
  }

  function endTurn() {
    clearInterval(timerId);
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
    state.scores[state.turn % state.names.length] += state.points;
    document.getElementById('sum-points').textContent = t('taboo_points', { n: state.points });
    var ul = document.getElementById('sum-list'); ul.innerHTML = '';
    state.log.forEach(function (l) { var li = document.createElement('li'); li.className = l.kind; li.textContent = l.word; ul.appendChild(li); });
    ZS.show('summary');
  }

  function nextTurn() {
    state.turn++;
    if (state.turn >= state.rounds * state.names.length) return finish();
    ready();
  }

  function renderScores(ul) {
    var max = Math.max.apply(null, state.scores);
    ul.innerHTML = '';
    state.names.map(function (n, i) { return { n: n, s: state.scores[i] }; })
      .sort(function (a, b) { return b.s - a.s; })
      .forEach(function (r) { var li = document.createElement('li'); if (r.s === max && max > 0) li.className = 'lead'; li.innerHTML = '<span></span><span></span>'; li.children[0].textContent = r.n; li.children[1].textContent = r.s; ul.appendChild(li); });
  }

  function finish() {
    var max = Math.max.apply(null, state.scores);
    var top = state.names.filter(function (n, i) { return state.scores[i] === max; });
    document.getElementById('winner').textContent = top.length > 1 ? t('tie') : t('winner', { name: top[0] });
    renderScores(document.getElementById('final-scores'));
    ZS.show('final');
  }
})();
