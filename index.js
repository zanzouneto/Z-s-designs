document.addEventListener('mousemove', function(e) {
    let x = e.clientX;
    let y = e.clientY;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Adjust the transition
    let transitionStart = width * 0.25;
    let transitionEnd = width * 0.75;
    
    if (x < transitionStart) {
        document.getElementById('backgroundA').style.opacity = '1';
        document.getElementById('backgroundB').style.opacity = '0'; // Ensure backgroundB is hidden
    } else if (x > transitionEnd) {
        document.getElementById('backgroundA').style.opacity = '0';
        document.getElementById('backgroundB').style.opacity = '1'; // Ensure backgroundB is fully visible
    } else {
        let transitionWidth = transitionEnd - transitionStart;
        let opacityA = 1 - (x - transitionStart) / transitionWidth;
        document.getElementById('backgroundA').style.opacity = opacityA;
        document.getElementById('backgroundB').style.opacity = 1 - opacityA; // Adjust backgroundB's opacity based on backgroundA's
    }
    
});
document.addEventListener('click', function(e) {
    let bgA = document.getElementById('backgroundA');
    let bgB = document.getElementById('backgroundB');

    if (window.getComputedStyle(bgA).opacity === "1") {
        window.open('cv.html', '_blank');
    } else if (window.getComputedStyle(bgB).opacity === "1") {
        window.location.href = 'portfolio.html';
    }
});
const cursor = document.getElementById('custom-cursor');

document.addEventListener('mousemove', (e) => {
    // Update the position of the custom cursor
    cursor.style.left = e.pageX - 16 + 'px';
    cursor.style.top = e.pageY - 16 + 'px';

    // Scale it up
    cursor.style.transform = 'scale(1.7)';
});

document.addEventListener('mouseout', () => {
    cursor.style.transform = 'scale(1)';
});

document.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(1.7)';
});

// Return to original size after a delay
document.addEventListener('mousemove', debounce(() => {
    cursor.style.transform = 'scale(1)';
}, 150));

// A simple debounce function
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}

