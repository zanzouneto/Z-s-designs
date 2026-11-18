(function () {
  'use strict';
  var t = ZS.t, data, getTheme, getTime;
  var words = [], idx = 0, log = [], left = 0, timerId, running = false, locked = false, wakeLock = null;
  var tilt = { enabled: false, armed: true };

  ZS.header();
  ZS.load('heads-up').then(init).catch(function () { ZS.toast('Could not load words.'); });

  function init(d) {
    data = d;
    getTheme = ZS.pick(document.getElementById('themes'), d.themes);
    getTime = ZS.seg(document.getElementById('time-seg'), [30, 60, 90, 120].map(function (s) { return { value: s, label: s + t('seconds') }; }), 60);
    document.getElementById('start').addEventListener('click', start);
    document.getElementById('again').addEventListener('click', function () { ZS.show('setup'); });
    document.getElementById('play').addEventListener('pointerdown', function (e) {
      if (!running || locked) return;
      answer(e.clientX > window.innerWidth / 2 ? 'ok' : 'skip');
    });
    window.addEventListener('deviceorientation', onTilt);
  }

  function start() {
    var theme = data.themes.filter(function (x) { return x.id === getTheme(); })[0];
    words = ZS.shuffle(theme.words.slice()); idx = 0; log = []; left = +getTime();
    // iOS needs permission for motion sensors, asked from this tap.
    var ask = window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function'
      ? DeviceOrientationEvent.requestPermission().catch(function () { return 'denied'; }) : Promise.resolve('granted');
    ask.then(function (p) { tilt.allowed = p === 'granted'; });
    var el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen().then(function () { return screen.orientation && screen.orientation.lock && screen.orientation.lock('landscape'); }).catch(function () {});
    requestWake();
    var play = document.getElementById('play'); play.hidden = false; play.className = '';
    document.getElementById('word').textContent = ''; document.getElementById('timer').textContent = '';
    document.getElementById('tilt-state').textContent = '';
    countdown(3);
  }

  function countdown(n) {
    var c = document.getElementById('count');
    c.hidden = false; c.textContent = n;
    document.getElementById('word').textContent = t('hu_ready');
    if (n > 0) return setTimeout(function () { countdown(n - 1); }, 1000);
    c.hidden = true; begin();
  }

  function begin() {
    running = true; tilt.armed = false; // must be held upright on the forehead before the first tilt counts
    document.getElementById('tilt-state').textContent = tilt.enabled ? t('hu_tilt_on') : '';
    show(); tickTimer();
    timerId = setInterval(function () { left--; tickTimer(); if (left <= 0) end(); }, 1000);
  }

  function tickTimer() {
    var el = document.getElementById('timer'); el.textContent = Math.max(0, left); el.classList.toggle('low', left <= 10);
  }

  function show() {
    if (idx >= words.length) return end();
    document.getElementById('word').textContent = words[idx];
  }

  function answer(kind) {
    if (!running || locked) return;
    log.push({ word: words[idx], kind: kind }); idx++;
    var play = document.getElementById('play');
    play.className = kind === 'ok' ? 'ok' : 'no'; locked = true;
    document.getElementById('word').textContent = kind === 'ok' ? '✓' : '↷';
    if (navigator.vibrate) navigator.vibrate(kind === 'ok' ? 60 : [30, 40, 30]);
    setTimeout(function () { play.className = ''; locked = false; if (running) show(); }, 450);
  }

  // Tilt: phone held sideways on the forehead, screen facing out (|gamma| ≈ 90).
  // Tipping it forward/back past ~40° makes |gamma| small; beta then tells us whether
  // the screen now faces the floor (|beta| > 90 → "got it") or the ceiling (→ "pass").
  function onTilt(e) {
    if (e.gamma === null || e.beta === null) return;
    tilt.enabled = true;
    if (!running || locked) return;
    var g = Math.abs(e.gamma), b = Math.abs(e.beta);
    if (!tilt.armed) { if (g > 70) tilt.armed = true; return; }
    if (g < 50) { tilt.armed = false; answer(b > 90 ? 'ok' : 'skip'); }
  }

  function end() {
    if (!running) return;
    running = false; clearInterval(timerId);
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
    releaseWake();
    if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(function () {});
    document.getElementById('play').hidden = true;
    var ok = log.filter(function (l) { return l.kind === 'ok'; }).length;
    document.getElementById('res-score').textContent = ok + ' ✓';
    var ul = document.getElementById('res-list'); ul.innerHTML = '';
    log.forEach(function (l) { var li = document.createElement('li'); li.className = l.kind; li.textContent = l.word; ul.appendChild(li); });
    ZS.show('results');
  }

  function requestWake() {
    if ('wakeLock' in navigator) navigator.wakeLock.request('screen').then(function (w) { wakeLock = w; }).catch(function () {});
  }
  function releaseWake() { if (wakeLock) { wakeLock.release().catch(function () {}); wakeLock = null; } }
})();
