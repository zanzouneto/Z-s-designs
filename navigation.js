// NAV MEMU 
class NavMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.basePath = this.getAttribute('base-path') || ''; 
        this.render();
        this.initEventListeners();
    }

    render() {
        const template = `
        <style>
            @import '${this.basePath}navigation.css';
            ::selection {
                background-color: #ffcc00; 
                color: black; 
            }
        </style>
        
        <menu-container class="element-container">
            <div class="nav-div">
                <div class="menu-icon">
                    <img src="${this.basePath}assets/webclip.png">
                </div>
                <div class="dropdown-menu">
                    <div class="menu-a-s">
                        <a href="${this.basePath}cv.html">CV</a> 
                        <a href="${this.basePath}portfolio.html">Portfolio</a> 
                        <a href="${this.basePath}hire-me.html">Contact me</a> 
                    </div>
                </div>
            </div>
        </menu-container>
        `;

        this.shadowRoot.innerHTML = template;
    }

    initEventListeners() {
        const menuIcon = this.shadowRoot.querySelector('.menu-icon');
        const dropdownMenu = this.shadowRoot.querySelector('.dropdown-menu');
        const elementContainer = this.shadowRoot.querySelector('.element-container');

        // Toggle the dropdown display state
        const toggleMenu = (show) => {
            dropdownMenu.style.left = show ? "0px" : "-110%";
        };

        // Mouse enters on menu icon or dropdown menu should show the menu
        menuIcon.addEventListener('mouseenter', () => toggleMenu(true));
        dropdownMenu.addEventListener('mouseenter', () => toggleMenu(true));

        // Mouse leaves the menu icon or dropdown menu should hide the menu, 
        // with a check to prevent closing when moving between them
        menuIcon.addEventListener('mouseleave', (event) => {
            if (!elementContainer.contains(event.relatedTarget)) {
                toggleMenu(false);
            }
        });

        dropdownMenu.addEventListener('mouseleave', () => toggleMenu(false));
    }
}

document.addEventListener("DOMContentLoaded", function() {
    customElements.define('nav-menu', NavMenu);
});

// FOOTER 
class MainFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.basePath = this.getAttribute('base-path') || ''; 
        this.render();
        this.initEventListeners();
    }

    render() {
        const template = `
            <style>
                @import '${this.basePath}navigation.css';
                ::selection {
                    background-color: #ffcc00; 
                    color: black; 
                }
                footer {
                    position: relative; /* or another position value as needed */
                    z-index: 10; /* Example z-index value */
                }
            </style>
            <footer>
                <div class="footer">
                    <h2>Zeina's Designs</h2>
                    <p> I'm currently open for new projects relating to Graphic Design & Web projects.<br>So get in touch</p>
                    <div class="footer-structure">
                        <div class="footer-div">
                            <a class="footer-a" href="${this.basePath}hire-me.html">Contact me</a>
                            <a class="footer-a" href="${this.basePath}cv.html">CV</a>
                        </div>
                        <div class="footer-div">
                            <a class="footer-a" href="${this.basePath}portfolio.html" style="margin-bottom: 10px;">Full portfolio</a>
                            <a class="footer-a" href="${this.basePath}logo.html">Logo designs</a>
                            <a class="footer-a" href="${this.basePath}logo.html">Web projects</a>
                        </div>
                    </div>
                </div>
            </footer>
        `;
        this.shadowRoot.innerHTML = template;
    }
}

customElements.define('main-footer', MainFooter);

// HIRE ME 
class HireMeComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.basePath = this.getAttribute('base-path') || '';  
        this.render();
        this.initEventListeners();
    }

    render() {
        const template = `
            <style>
                @import '${this.basePath}navigation.css';
            </style>
            <div class="hire-me-div">
                <a href="${this.basePath}hire-me.html">
                    <p class="hire-me-p">Hire<br>Me</p>
                    <img src="${this.basePath}assets/hire me.png">
                </a>
            </div>
        `;
        this.shadowRoot.innerHTML = template;
    }
}

customElements.define('hire-me-component', HireMeComponent);
