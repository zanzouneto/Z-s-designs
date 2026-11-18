(function () {
  'use strict';
  var t = ZS.t, data, teams, getCats, getCount, st;

  ZS.header();
  ZS.load('trivia').then(init).catch(function () { ZS.toast('Could not load questions.'); });

  function init(d) {
    data = d;
    teams = ZS.nameList({ input: 'team-input', list: 'team-list', button: 'team-add', max: 8 });
    getCats = ZS.chips(document.getElementById('themes'), d.categories);
    getCount = ZS.seg(document.getElementById('count-seg'), [{ value: 10, label: '10' }, { value: 20, label: '20' }, { value: 30, label: '30' }, { value: 0, label: t('trivia_all') }], 10);
    document.getElementById('start').addEventListener('click', start);
    document.getElementById('reveal').addEventListener('click', reveal);
    document.getElementById('next').addEventListener('click', next);
    document.getElementById('again').addEventListener('click', function () { ZS.show('setup'); });
  }

  function start() {
    var ids = getCats();
    if (!ids.length) return ZS.toast(t('pickTheme'));
    var pool = [];
    data.categories.forEach(function (c) { if (ids.indexOf(c.id) !== -1) c.questions.forEach(function (q) { pool.push({ q: q, cat: c.label }); }); });
    ZS.shuffle(pool);
    var n = +getCount(); if (n) pool = pool.slice(0, n);
    var names = teams.get();
    st = { pool: pool, i: -1, names: names, scores: names.map(function () { return 0; }), solo: !names.length, right: 0 };
    ZS.show('game'); next(true);
  }

  function next(first) {
    if (!first && !st.solo) {
      document.querySelectorAll('#who-chips input:checked').forEach(function (c) { st.scores[+c.value]++; });
    }
    st.i++;
    if (st.i >= st.pool.length) return finish();
    var item = st.pool[st.i], q = item.q;
    // shuffle the answer order but remember which one is right
    var order = ZS.shuffle(q.a.map(function (_, k) { return k; }));
    st.cur = { answers: order.map(function (k) { return q.a[k]; }), correct: order.indexOf(q.c), picked: -1, revealed: false };
    document.getElementById('qnum').textContent = t('trivia_q', { i: st.i + 1, n: st.pool.length });
    document.getElementById('qcat').textContent = item.cat;
    document.getElementById('question').textContent = q.q;
    var box = document.getElementById('answers'); box.innerHTML = '';
    st.cur.answers.forEach(function (a, k) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = a;
      b.addEventListener('click', function () { pick(k); });
      box.appendChild(b);
    });
    document.getElementById('who').hidden = true;
    document.getElementById('reveal').hidden = st.solo;
    document.getElementById('next').hidden = true;
    renderScores(document.getElementById('live-scores'));
  }

  function pick(k) {
    if (st.cur.revealed) return;
    st.cur.picked = k;
    document.querySelectorAll('#answers button').forEach(function (b, j) { b.classList.toggle('sel', j === k); });
    if (st.solo) { if (k === st.cur.correct) st.right++; reveal(); }
  }

  function reveal() {
    st.cur.revealed = true;
    document.querySelectorAll('#answers button').forEach(function (b, j) {
      b.classList.remove('sel');
      if (j === st.cur.correct) b.classList.add('right'); else if (j === st.cur.picked) b.classList.add('wrong');
    });
    document.getElementById('reveal').hidden = true;
    document.getElementById('next').hidden = false;
    if (!st.solo) {
      var box = document.getElementById('who-chips'); box.innerHTML = '';
      st.names.forEach(function (n, i) {
        var lab = document.createElement('label'); lab.className = 'chip';
        var cb = document.createElement('input'); cb.type = 'checkbox'; cb.value = i;
        var sp = document.createElement('span'); sp.textContent = n;
        lab.appendChild(cb); lab.appendChild(sp); box.appendChild(lab);
      });
      document.getElementById('who').hidden = false;
    }
  }

  function renderScores(ul) {
    ul.innerHTML = '';
    if (st.solo) return;
    var max = Math.max.apply(null, st.scores);
    st.names.map(function (n, i) { return { n: n, s: st.scores[i] }; }).sort(function (a, b) { return b.s - a.s; }).forEach(function (r) {
      var li = document.createElement('li'); if (r.s === max && max > 0) li.className = 'lead';
      var a = document.createElement('span'); a.textContent = r.n; var b = document.createElement('span'); b.textContent = r.s;
      li.appendChild(a); li.appendChild(b); ul.appendChild(li);
    });
  }

  function finish() {
    var w = document.getElementById('winner');
    if (st.solo) { w.textContent = t('trivia_solo_score', { s: st.right, n: st.pool.length }); }
    else {
      var max = Math.max.apply(null, st.scores);
      var top = st.names.filter(function (n, i) { return st.scores[i] === max; });
      w.textContent = top.length > 1 ? t('tie') : t('winner', { name: top[0] });
    }
    renderScores(document.getElementById('final-scores'));
    ZS.show('final');
  }
})();
