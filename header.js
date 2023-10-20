class HeaderLinksComponent extends HTMLElement {
    connectedCallback() {
      // Check if the links already exist to avoid duplicates
      if (!document.querySelector('link[href="./font/font.css"]')) {
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = './font/font.css';
        document.head.appendChild(fontLink);
      }
  
      if (!document.querySelector('link[href="assets/favicon.png"]')) {
        const iconLink = document.createElement('link');
        iconLink.rel = 'icon';
        iconLink.href = 'assets/favicon.png';
        iconLink.type = 'image/x-icon';
        document.head.appendChild(iconLink);
      }
    }
  }
  
  customElements.define('header-links', HeaderLinksComponent);
