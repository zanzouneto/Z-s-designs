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
