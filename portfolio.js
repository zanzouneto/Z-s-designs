// Portfolio: filter chips + "load more" (12 at a time) + video sound button.
(function () {
    'use strict';
    var PER_PAGE = 12;
    var cards = Array.prototype.slice.call(document.querySelectorAll('#pf-grid .pcard'));
    var chips = document.querySelectorAll('.pf-filters .zs-chip');
    var more = document.getElementById('load-more');
    var filter = 'all', shown = PER_PAGE;

    function render() {
        var matches = cards.filter(function (c) { return filter === 'all' || c.getAttribute('data-cat') === filter; });
        cards.forEach(function (c) { c.hidden = true; });
        matches.slice(0, shown).forEach(function (c) { c.hidden = false; });
        more.parentElement.hidden = matches.length <= shown;
    }
    chips.forEach(function (chip) {
        chip.addEventListener('click', function () {
            filter = chip.getAttribute('data-filter');
            shown = PER_PAGE;
            chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
            render();
        });
    });
    more.addEventListener('click', function () { shown += PER_PAGE; render(); });
    render();

    // "Play with sound": reload the video unmuted, with controls (a click allows sound)
    var btn = document.getElementById('cool-sound');
    var frame = document.getElementById('cool-iframe');
    if (btn && frame) {
        btn.addEventListener('click', function () {
            frame.src = 'https://www.youtube.com/embed/bOcN1J2Hgeo?autoplay=1&loop=1&playlist=bOcN1J2Hgeo&mute=0&controls=1&playsinline=1&rel=0';
            btn.textContent = '♪ Playing with sound';
            btn.disabled = true;
        });
    }
})();
