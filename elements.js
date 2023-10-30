class HeaderLinks extends HTMLElement {
    connectedCallback() {
        const head = document.head;

        // Favicon link
        const faviconLink = document.createElement('link');
        faviconLink.rel = "icon";
        faviconLink.href = "assets/favicon.png";
        faviconLink.type = "image/x-icon";
        head.appendChild(faviconLink);

        // Preconnect links
        const preconnectGoogle = document.createElement('link');
        preconnectGoogle.rel = "preconnect";
        preconnectGoogle.href = "https://fonts.googleapis.com";
        head.appendChild(preconnectGoogle);

        const preconnectGstatic = document.createElement('link');
        preconnectGstatic.rel = "preconnect";
        preconnectGstatic.href = "https://fonts.gstatic.com";
        preconnectGstatic.crossOrigin = "anonymous";
        head.appendChild(preconnectGstatic);

        // Google Fonts link
        const googleFontsLink = document.createElement('link');
        googleFontsLink.href = "https://fonts.googleapis.com/css2?family=Coda:wght@400;800&display=swap";
        googleFontsLink.rel = "stylesheet";
        head.appendChild(googleFontsLink);

        // Styles
        const styleElem = document.createElement('style');
        styleElem.textContent = `
            @font-face {
                font-family: 'Micro';
                src: url('/font/Micro.otf') format('opentype');
                font-weight: 400; 
            }
            @font-face {
                font-family: 'Micro';
                src: url("/font/Micro bold.ttf") format('truetype');
                font-weight: 700;  
            }    
            ::selection {
                background-color: var(--main-yellow); 
                color: black; 
            }
            body{
                position: relative;
            }
            :root {
                --main-yellow: #ffcc00; 
            }
        `;
        head.appendChild(styleElem);
    }
}

class HeaderLinksProjects extends HTMLElement {
    connectedCallback() {
        const head = document.head;

        // Favicon link
        const faviconLink = document.createElement('link');
        faviconLink.rel = "icon"; 
        faviconLink.href = "../assets/favicon.png";
        faviconLink.type = "image/x-icon";
        head.appendChild(faviconLink);

        // Preconnect links
        const preconnectGoogle = document.createElement('link');
        preconnectGoogle.rel = "preconnect";
        preconnectGoogle.href = "https://fonts.googleapis.com";
        head.appendChild(preconnectGoogle);

        const preconnectGstatic = document.createElement('link');
        preconnectGstatic.rel = "preconnect";
        preconnectGstatic.href = "https://fonts.gstatic.com";
        preconnectGstatic.crossOrigin = "anonymous";
        head.appendChild(preconnectGstatic);

        // Google Fonts link
        const googleFontsLink = document.createElement('link');
        googleFontsLink.href = "https://fonts.googleapis.com/css2?family=Coda:wght@400;800&display=swap";
        googleFontsLink.rel = "stylesheet";
        head.appendChild(googleFontsLink);

        // Styles
        const styleElem = document.createElement('style');
        styleElem.textContent = `
            @font-face {
                font-family: 'Micro';
                src: url('../font/Micro.otf') format('opentype');
                font-weight: 400; 
            }
            @font-face {
                font-family: 'Micro';
                src: url("../font/Micro bold.ttf") format('truetype');
                font-weight: 700;  
            }    
            ::selection {
                background-color: var(--main-yellow); 
                color: black; 
            }
            :root {
                --main-yellow: #ffcc00; 
            }
        `;
        head.appendChild(styleElem);
    }
}




class MyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        `
    }
}

customElements.define('header-links-projects', HeaderLinksProjects); 
customElements.define('header-links', HeaderLinks); 
