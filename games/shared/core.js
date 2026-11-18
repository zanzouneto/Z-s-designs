/* ZS party games — shared helpers: language (EN/AR + RTL), UI strings, content loading, toasts.
   Content lives in /games/data/<game>.<lang>.json so it can be edited without touching code. */
(function () {
  'use strict';

  var STORE_KEY = 'zs-games-lang';

  function pickLang() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q === 'ar' || q === 'en') { try { localStorage.setItem(STORE_KEY, q); } catch (e) {} return q; }
    try { var s = localStorage.getItem(STORE_KEY); if (s === 'ar' || s === 'en') return s; } catch (e) {}
    return (navigator.language || '').toLowerCase().indexOf('ar') === 0 ? 'ar' : 'en';
  }

  var lang = pickLang();
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  var S = {
    en: {
      back: 'Games', hub_title: 'Play online by ZS', hub_lead: 'Party games for your phone. Grab friends, pick a game, play. English and Arabic.', switchTo: 'عربي', start: 'Start', next: 'Next', back2: 'Back', playAgain: 'Play again',
      newGame: 'New game', settings: 'Settings', done: 'Done', add: 'Add', remove: 'Remove', or: 'OR',
      players: 'Players', playerName: 'Player name', teams: 'Teams', teamName: 'Team name', team: 'Team',
      themes: 'Themes', theme: 'Theme', time: 'Time', seconds: 's', minute: '1 min', minutes: '{n} min',
      pickTheme: 'Pick at least one theme.', addPlayer: 'Add at least one player.', addTeams: 'Add at least two teams.',
      score: 'Score', winner: '{name} wins!', tie: 'It\'s a tie!', reshuffled: 'All used up — reshuffled.',
      // Would you rather
      wyr_title: 'Would You Rather', wyr_mode: 'How do you want to play?',
      wyr_classic: 'Take turns', wyr_classic_d: 'Each player gets their own question.',
      wyr_group: 'Drinking game', wyr_group_d: 'One question for everyone. The smaller side drinks.',
      wyr_hey: '{name}, would you rather…', wyr_q: 'Would you rather…', wyr_group_hint: 'Everyone picks. The smaller side drinks 🍻',
      wyr_swipe: 'Swipe or tap Next for a new question',
      // Taboo
      taboo_title: 'Taboo', taboo_rounds: 'Rounds per team', taboo_turn: '{team}\'s turn',
      taboo_turn_d: 'Give the phone to the describer. Don\'t let your team see the screen!',
      taboo_got: 'Got it', taboo_skip: 'Skip', taboo_buzz: 'Taboo!', taboo_turn_over: 'Time\'s up!',
      taboo_points: '{n} points this turn', taboo_round: 'Round {r} of {t}', taboo_final: 'Final score',
      taboo_help: 'Describe the top word without saying any of the words below it.',
      // Heads up
      hu_title: 'Heads Up', hu_help: 'Hold the phone on your forehead, screen facing your friends. They act it out, you guess.',
      hu_controls: 'Tilt down = got it · Tilt up = pass. Or tap the right side = got it, left side = pass.',
      hu_ready: 'Phone on your forehead!', hu_correct: 'Got it', hu_pass: 'Pass', hu_results: 'Results',
      hu_tilt_on: 'Tilt controls on', hu_tilt_off: 'Tilt not available — use taps', hu_landscape: 'Turn your phone sideways',
      // Trivia
      trivia_title: 'Trivia', trivia_count: 'Questions', trivia_all: 'All', trivia_reveal: 'Show answer',
      trivia_who: 'Who got it right?', trivia_q: 'Question {i} of {n}', trivia_final: 'Final scores',
      trivia_solo: 'No teams? Play solo — tap an answer.', trivia_solo_score: '{s} / {n} correct',
      // Jenga
      jenga_title: 'Jenga Dares', jenga_help: 'Number your Jenga blocks. Pull a block, type its number, do the dare.',
      jenga_categories: 'Categories', jenga_enter: 'Block number', jenga_get: 'Get dare', jenga_range: 'Blocks are numbered 1–54.',
      jenga_block: 'Block {n}'
    },
    ar: {
      back: 'الألعاب', hub_title: 'العب أونلاين مع ZS', hub_lead: 'ألعاب سهرات عالتلفون. جمّع رفقاتك، اختار لعبة، وبلّشوا. بالعربي والإنجليزي.', switchTo: 'English', start: 'يلّا نبلّش', next: 'التالي', back2: 'رجوع', playAgain: 'نلعب كمان مرة',
      newGame: 'لعبة جديدة', settings: 'الإعدادات', done: 'تمام', add: 'زيد', remove: 'شيل', or: 'ولا',
      players: 'اللاعبين', playerName: 'اسم اللاعب', teams: 'الفرق', teamName: 'اسم الفريق', team: 'فريق',
      themes: 'المواضيع', theme: 'الموضوع', time: 'الوقت', seconds: 'ث', minute: 'دقيقة', minutes: '{n} دقايق',
      pickTheme: 'اختار موضوع واحد على الأقل.', addPlayer: 'زيد لاعب واحد على الأقل.', addTeams: 'زيد فريقين على الأقل.',
      score: 'النتيجة', winner: '{name} ربح!', tie: 'تعادل!', reshuffled: 'خلصوا كلّهم — رجعنا خلطناهم.',
      wyr_title: 'شو بتفضّل؟', wyr_mode: 'كيف بدكن تلعبوا؟',
      wyr_classic: 'كل واحد بدوره', wyr_classic_d: 'كل لاعب بيطلعله سؤال إله.',
      wyr_group: 'لعبة شرب', wyr_group_d: 'سؤال واحد للكل. الجهة الأقل بتشرب.',
      wyr_hey: '{name}، شو بتفضّل…', wyr_q: 'شو بتفضّل…', wyr_group_hint: 'الكل بيختار. الجهة الأقل بتشرب 🍻',
      wyr_swipe: 'اسحب أو كبوس «التالي» لسؤال جديد',
      taboo_title: 'تابو', taboo_rounds: 'عدد الجولات لكل فريق', taboo_turn: 'دور {team}',
      taboo_turn_d: 'عطوا التلفون للي رح يشرح. ما تخلّوا فريقكن يشوف الشاشة!',
      taboo_got: 'عرفوها', taboo_skip: 'تخطّي', taboo_buzz: 'تابو!', taboo_turn_over: 'خلص الوقت!',
      taboo_points: '{n} نقاط بهالدور', taboo_round: 'الجولة {r} من {t}', taboo_final: 'النتيجة النهائية',
      taboo_help: 'اشرح الكلمة الكبيرة بدون ما تقول ولا كلمة من الكلمات اللي تحتها.',
      hu_title: 'عراسك', hu_help: 'حط التلفون على جبينك والشاشة لرفقاتك. هنّي بيمثّلوا وانت بتحزر.',
      hu_controls: 'ميّل لتحت = عرفتها · ميّل لفوق = تخطّي. أو كبوس يمين = عرفتها، شمال = تخطّي.',
      hu_ready: 'حط التلفون على جبينك!', hu_correct: 'عرفتها', hu_pass: 'تخطّي', hu_results: 'النتيجة',
      hu_tilt_on: 'التحكم بالميلان شغّال', hu_tilt_off: 'الميلان مش متاح — استعمل الكبس', hu_landscape: 'لفّ التلفون عالعرض',
      trivia_title: 'أسئلة ومعلومات', trivia_count: 'عدد الأسئلة', trivia_all: 'الكل', trivia_reveal: 'فرجيني الجواب',
      trivia_who: 'مين جاوب صح؟', trivia_q: 'سؤال {i} من {n}', trivia_final: 'النتيجة النهائية',
      trivia_solo: 'ما في فرق؟ العب لحالك — كبوس على جواب.', trivia_solo_score: '{s} من {n} صح',
      jenga_title: 'جنغا التحديات', jenga_help: 'رقّم قطع الجنغا. اسحب قطعة، اكتب رقمها، ونفّذ التحدي.',
      jenga_categories: 'الأنواع', jenga_enter: 'رقم القطعة', jenga_get: 'جيب التحدي', jenga_range: 'القطع مرقّمة من ١ لـ ٥٤.',
      jenga_block: 'القطعة {n}'
    }
  };

  function t(key, vars) {
    var s = (S[lang] && S[lang][key]) || S.en[key] || key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.split('{' + k + '}').join(vars[k]); });
    return s;
  }

  function applyI18n(root) {
    (root || document).querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    (root || document).querySelectorAll('[data-i18n-ph]').forEach(function (el) { el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph'))); });
  }

  function setLang(l) {
    try { localStorage.setItem(STORE_KEY, l); } catch (e) {}
    var u = new URL(location.href); u.searchParams.delete('lang'); location.href = u.toString();
  }

  function load(game) {
    return fetch('/games/data/' + game + '.' + lang + '.json', { cache: 'no-cache' }).then(function (r) {
      if (!r.ok) throw new Error('Could not load ' + game);
      return r.json();
    });
  }

  var toastTimer;
  function toast(msg) {
    var el = document.getElementById('zs-toast');
    if (!el) { el = document.createElement('div'); el.id = 'zs-toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
    el.textContent = msg; el.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2600);
  }

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; }
    return a;
  }

  function show(id) {
    document.querySelectorAll('.screen').forEach(function (s) { s.hidden = s.id !== id; });
    window.scrollTo(0, 0);
  }

  // A deck that never repeats until every item has been used, then reshuffles.
  function deck(items) {
    var pile = [];
    return {
      next: function () {
        if (!pile.length) { if (!items.length) return null; pile = shuffle(items.slice()); if (this.used) toast(t('reshuffled')); this.used = true; }
        return pile.pop();
      },
      left: function () { return pile.length; },
      used: false
    };
  }

  // Swipe detection on touchend with a real threshold (no accidental triggers).
  function onSwipe(el, cb) {
    var x0 = null, y0 = null;
    el.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    el.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      x0 = null;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) cb(dx > 0 ? 'right' : 'left');
    });
  }

  // Simple editable list of names (players / teams).
  function nameList(opts) {
    var names = (opts.initial || []).slice();
    var input = document.getElementById(opts.input), list = document.getElementById(opts.list), btn = document.getElementById(opts.button);
    function render() {
      list.innerHTML = '';
      names.forEach(function (n, i) {
        var li = document.createElement('li'); li.className = 'name-chip';
        var span = document.createElement('span'); span.textContent = n;
        var x = document.createElement('button'); x.type = 'button'; x.className = 'chip-x'; x.setAttribute('aria-label', t('remove') + ' ' + n); x.textContent = '×';
        x.addEventListener('click', function () { names.splice(i, 1); render(); });
        li.appendChild(span); li.appendChild(x); list.appendChild(li);
      });
      if (opts.onChange) opts.onChange(names);
    }
    function add() {
      var v = input.value.trim();
      if (v && names.indexOf(v) === -1 && names.length < (opts.max || 12)) { names.push(v); render(); }
      input.value = ''; input.focus();
    }
    btn.addEventListener('click', add);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); add(); } });
    render();
    return { get: function () { return names.slice(); } };
  }

  // Theme/category chips from data: [{id,label,default}]
  function chips(container, items, defaults) {
    container.innerHTML = '';
    items.forEach(function (it) {
      var lab = document.createElement('label'); lab.className = 'chip';
      var cb = document.createElement('input'); cb.type = 'checkbox'; cb.value = it.id;
      cb.checked = defaults ? defaults.indexOf(it.id) !== -1 : it.default !== false;
      var sp = document.createElement('span'); sp.textContent = it.label;
      lab.appendChild(cb); lab.appendChild(sp); container.appendChild(lab);
    });
    return function () { return Array.prototype.map.call(container.querySelectorAll('input:checked'), function (c) { return c.value; }); };
  }

  // Single-choice segmented control: options [{value,label}]
  var segN = 0;
  function seg(container, options, def) {
    var name = 'seg' + (++segN);
    container.innerHTML = '';
    options.forEach(function (o) {
      var lab = document.createElement('label'); lab.className = 'chip';
      var r = document.createElement('input'); r.type = 'radio'; r.name = name; r.value = o.value; r.checked = String(o.value) === String(def);
      var sp = document.createElement('span'); sp.textContent = o.label;
      lab.appendChild(r); lab.appendChild(sp); container.appendChild(lab);
    });
    return function () { var c = container.querySelector('input:checked'); return c ? c.value : String(def); };
  }

  // Single-choice theme picker (radio chips) from data items [{id,label}]
  function pick(container, items) {
    return seg(container, items.map(function (i) { return { value: i.id, label: i.label }; }), items[0] && items[0].id);
  }

  function header() {
    var btn = document.getElementById('zs-lang');
    if (btn) { btn.textContent = t('switchTo'); btn.addEventListener('click', function () { setLang(lang === 'ar' ? 'en' : 'ar'); }); }
    applyI18n();
  }

  window.ZS = { lang: lang, t: t, applyI18n: applyI18n, load: load, toast: toast, shuffle: shuffle, show: show, deck: deck, onSwipe: onSwipe, nameList: nameList, chips: chips, seg: seg, pick: pick, header: header };
})();
