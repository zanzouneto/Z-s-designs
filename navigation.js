/* ==========================================================
   Shared page parts: <nav-menu>, <main-footer>, <hire-me-component>
   plus the following cursor and the glow background.
   Styles live in /site.css.
   ========================================================== */
(function () {
    'use strict';

    var LINKS = [
        { id: 'work', label: 'Work', href: '/portfolio' },
        { id: 'cv', label: 'CV', href: '/cv' },
        { id: 'games', label: 'Games', href: '/games' },
        { id: 'contact', label: 'Contact', href: '/hire-me' }
    ];

    function currentSection() {
        var p = location.pathname.replace(/\.html$/, '').replace(/\/$/, '');
        if (/^\/(portfolio|project|logo|website)/.test(p)) return 'work';
        if (p === '/cv') return 'cv';
        if (/^\/games/.test(p)) return 'games';
        if (p === '/hire-me') return 'contact';
        return '';
    }

    var ICON_MENU = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>';
    var ICON_CLOSE = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>';

    // ---------- header ----------
    class NavMenu extends HTMLElement {
        connectedCallback() {
            if (this._done) return;
            this._done = true;
            // always sit at the very top of the page
            if (document.body && document.body.firstElementChild !== this) document.body.prepend(this);
            var cur = currentSection();
            var overlay = this.getAttribute('variant') === 'overlay';
            var links = LINKS.map(function (l) {
                return '<a class="zs-navlink" href="' + l.href + '"' + (l.id === cur ? ' aria-current="page"' : '') + '>' + l.label + '</a>';
            }).join('');
            var big = LINKS.map(function (l) {
                return '<a href="' + l.href + '"' + (l.id === cur ? ' aria-current="page"' : '') + '>' + l.label + '</a>';
            }).join('');
            this.innerHTML =
                '<header class="zs-header' + (overlay ? ' is-overlay' : '') + '">' +
                  '<div class="zs-header-in">' +
                    '<a class="zs-brand" href="/"><img src="/assets/webclip.png" alt="" width="40" height="40"><span>Zeina Saade</span></a>' +
                    '<nav class="zs-nav" aria-label="Main">' + links +
                      '<a class="zs-btn zs-btn-yellow" href="/hire-me">Hire me</a>' +
                    '</nav>' +
                    '<button class="zs-menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="zs-menu">' + ICON_MENU + '</button>' +
                  '</div>' +
                '</header>' +
                '<div class="zs-menu" id="zs-menu" role="dialog" aria-modal="true" aria-label="Menu" hidden>' +
                  '<div class="zs-menu-top"><span>Zeina Saade</span><button class="zs-menu-close" type="button" aria-label="Close menu">' + ICON_CLOSE + '</button></div>' +
                  '<nav aria-label="Main">' + big + '</nav>' +
                  '<a class="zs-btn zs-btn-ink" href="/hire-me">Hire me</a>' +
                '</div>';

            var openBtn = this.querySelector('.zs-menu-btn');
            var closeBtn = this.querySelector('.zs-menu-close');
            var menu = this.querySelector('.zs-menu');
            function open() { menu.hidden = false; openBtn.setAttribute('aria-expanded', 'true'); document.documentElement.style.overflow = 'hidden'; closeBtn.focus(); }
            function close() { menu.hidden = true; openBtn.setAttribute('aria-expanded', 'false'); document.documentElement.style.overflow = ''; openBtn.focus(); }
            openBtn.addEventListener('click', open);
            closeBtn.addEventListener('click', close);
            document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) close(); });
        }
    }

    // ---------- footer ----------
    class MainFooter extends HTMLElement {
        connectedCallback() {
            if (this._done) return;
            this._done = true;
            var second = this.getAttribute('secondary') === 'work'
                ? '<a class="zs-btn zs-btn-lg zs-btn-ink-line" href="/portfolio">See my work</a>'
                : '<a class="zs-btn zs-btn-lg zs-btn-ink-line" href="/cv">See my CV</a>';
            this.innerHTML =
                '<footer class="zs-footer">' +
                  '<div class="zs-footer-card">' +
                    '<h2 class="zs-display">Got a project?</h2>' +
                    '<p>I’m open for new graphic design &amp; web projects. So get in touch.</p>' +
                    '<div class="zs-footer-row"><a class="zs-btn zs-btn-lg zs-btn-ink" href="/hire-me">Contact me</a>' + second + '</div>' +
                    '<div class="zs-footer-bottom">' +
                      '<span class="zs-micro" style="font-size:22px">Zeina Saade</span>' +
                      '<nav aria-label="Footer"><a href="/portfolio">Full portfolio</a><a href="/logo">Logo designs</a><a href="/website">Web projects</a><a href="/games">Games</a></nav>' +
                      '<span>© ' + new Date().getFullYear() + ' Zeina Saade</span>' +
                    '</div>' +
                  '</div>' +
                '</footer>';
        }
    }

    // ---------- hire me sticker ----------
    class HireMeComponent extends HTMLElement {
        connectedCallback() {
            // live directly in <body> so no section or footer can cover it
            // (moving it calls connectedCallback again, which then renders)
            if (this.parentElement !== document.body) { document.body.appendChild(this); return; }
            if (this._done) return;
            this._done = true;
            if (currentSection() === 'contact') { this.remove(); return; }
            this.innerHTML = '<a class="zs-hire" href="/hire-me" aria-label="Hire me"><img src="/assets/hire%20me.png" alt="" width="132" height="138"><span aria-hidden="true">Hire<br>me</span></a>';
        }
    }

    customElements.define('nav-menu', NavMenu);
    customElements.define('main-footer', MainFooter);
    customElements.define('hire-me-component', HireMeComponent);

    // ---------- background + cursor ----------
    function setup() {
        var body = document.body;
        if (!body.hasAttribute('data-no-bg') && !document.querySelector('.grainy-div')) {
            var bg = document.createElement('div');
            bg.className = 'grainy-div';
            bg.setAttribute('aria-hidden', 'true');
            bg.innerHTML = '<div class="grainy"></div><div class="grain"></div>';
            body.prepend(bg);
        }
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
        if (body.hasAttribute('data-hand')) return; // the home page has the big hand instead
        var c1 = document.getElementById('cursor1');
        var c2 = document.getElementById('cursor2');
        if (!c1) { c1 = document.createElement('div'); c1.id = 'cursor1'; c1.setAttribute('aria-hidden', 'true'); body.appendChild(c1); }
        if (!c2) { c2 = document.createElement('div'); c2.id = 'cursor2'; c2.setAttribute('aria-hidden', 'true'); body.appendChild(c2); }
        document.addEventListener('mousemove', function (e) {
            c1.style.left = c2.style.left = e.clientX + 'px';
            c1.style.top = c2.style.top = e.clientY + 'px';
        }, { passive: true });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup);
    else setup();
})();
