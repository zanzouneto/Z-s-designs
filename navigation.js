function toggleMenu() {
    const menu = document.querySelector('.dropdown-menu');
    if (menu.style.left === "-90vw") {
        menu.style.left = "0px";
    } else {
        menu.style.left = "-90vw";
    }
}

function openForm(event) {
    event.preventDefault();  // Prevent the default behavior of the link
    document.getElementById('contactForm').style.display = 'block';
    // Close the navigation menu immediately when "Contact me" is clicked
    const menu = document.querySelector('.dropdown-menu');
    menu.style.left = "-90vw";
}

function closeForm() {
    document.getElementById('contactForm').style.display = 'none';
}

// Add this code to close the menu when the mouse leaves the nav-div
document.querySelector('.nav-div').addEventListener('mouseleave', function() {
    const menu = document.querySelector('.dropdown-menu');
    const contactForm = document.getElementById('contactForm');

    // Check if the contact form is not open
    if (contactForm.style.display !== 'block') {
        menu.style.left = "-90vw";
    }
});
