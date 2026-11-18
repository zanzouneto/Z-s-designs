// Home: crossfade between the two photos as the mouse moves left / right.
(function () {
    'use strict';
    var games = document.querySelector('.home-photo.is-games');
    var port = document.querySelector('.home-photo.is-port');
    var lGames = document.querySelector('.home-label.games');
    var lPort = document.querySelector('.home-label.port');
    if (!window.matchMedia('(hover: hover) and (min-width: 1024px)').matches) return;

    function set(x) {
        var w = window.innerWidth, a = w * 0.25, b = w * 0.75;
        var p = x <= a ? 0 : x >= b ? 1 : (x - a) / (b - a); // 0 = games side, 1 = portfolio side
        port.style.opacity = p;
        games.style.opacity = 1 - p;
        lPort.classList.toggle('on', p > 0.5);
        lGames.classList.toggle('on', p <= 0.5);
    }
    var home = document.querySelector('.home');
    set(home && home.getAttribute('data-start') === 'games' ? 0 : window.innerWidth); // which photo to open on
    document.addEventListener('mousemove', function (e) { set(e.clientX); }, { passive: true });
})();

// The giant pixel hand: follows the mouse and grows the faster you move.
(function () {
    'use strict';
    var hand = document.getElementById('hand-cursor');
    if (!hand || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var x = -200, y = -200, lastX = 0, lastY = 0, lastT = 0, target = 1, scale = 1, ticking = false;
    var TIP_X = 22, TIP_Y = 3; // fingertip inside the 90×100 image

    function frame() {
        target += (1 - target) * 0.05;           // calm back down when you slow / stop
        scale += (target - scale) * 0.18;        // smooth growth
        hand.style.transform = 'translate(' + (x - TIP_X) + 'px,' + (y - TIP_Y) + 'px) scale(' + scale.toFixed(3) + ')';
        if (Math.abs(scale - 1) > 0.002 || Math.abs(target - 1) > 0.002) requestAnimationFrame(frame);
        else ticking = false;
    }
    document.addEventListener('mousemove', function (e) {
        var t = performance.now(), dt = Math.max(t - lastT, 8);
        var speed = Math.hypot(e.clientX - lastX, e.clientY - lastY) / dt; // px per ms
        lastX = e.clientX; lastY = e.clientY; lastT = t;
        x = e.clientX; y = e.clientY;
        if (!reduce) target = Math.max(target, 1 + Math.min(speed * 0.35, 1.2)); // up to 2.2× when fast
        hand.classList.add('on');
        if (!ticking) { ticking = true; requestAnimationFrame(frame); }
    }, { passive: true });
    document.documentElement.addEventListener('mouseleave', function () { hand.classList.remove('on'); });
})();
