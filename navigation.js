class NavMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.basePath = this.getAttribute('base-path') || '';  // default to empty if not provided
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
                        <a href="#">Contact me</a> 
                    </div>
                </div>
            </div>
            <div class="contact-form-popup" id="contactForm">
                <div class="form-container">
                    <img class="close" src="${this.basePath}assets/x.svg">
                    <form class="form" action="https://formspree.io/f/xleyzdvq" method="POST">
                        <h2>Lets build awesomeness</h2>
                        <label>
                            <input placeholder="Your Email" type="email" name="email" class="input">
                        </label>
                        <label>
                            <textarea placeholder="Subject" name="Subject" class="input"></textarea>
                        </label>
                        <label>
                            <textarea placeholder="Tell me things" name="message" class="input"></textarea>
                        </label>
                        <button class="button" type="submit">Send</button>
                    </form>
                </div>
            </div>
        </menu-container>
        `;

        this.shadowRoot.innerHTML = template;
    }

    toggleMenu() {
        const menu = this.shadowRoot.querySelector('.dropdown-menu');
        if (menu.style.left === "-90vw") {
            menu.style.left = "0px";
        } else {
            menu.style.left = "-90vw";
        }
    }

    openForm(event) {
        event.preventDefault();
        this.shadowRoot.getElementById('contactForm').style.display = 'block';
        const menu = this.shadowRoot.querySelector('.dropdown-menu');
        menu.style.left = "-90vw";
    }

    closeForm() {
        this.shadowRoot.getElementById('contactForm').style.display = 'none';
    }

    
    initEventListeners() {
        this.shadowRoot.querySelector('.menu-icon').addEventListener('click', this.toggleMenu.bind(this));
        const contactLink = this.shadowRoot.querySelector('.menu-a-s a:nth-child(3)');
        contactLink.addEventListener('click', this.openForm.bind(this));
        this.shadowRoot.querySelector('.close').addEventListener('click', this.closeForm.bind(this));
        // ... [rest of the code]
    
        const menuContainer = this.shadowRoot.querySelector('.element-container');
        menuContainer.addEventListener('mouseenter', () => {
            const menu = this.shadowRoot.querySelector('.dropdown-menu');
            if (menu.style.left === "-90vw") {
                this.toggleMenu();
            }
        });
        menuContainer.addEventListener('mouseleave', () => {
            const menu = this.shadowRoot.querySelector('.dropdown-menu');
            if (menu.style.left !== "-90vw") {
                this.toggleMenu();
            }
        });
    }
    
}

customElements.define('nav-menu', NavMenu);
