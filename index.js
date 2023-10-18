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
    
        // Resize cursor

        let distanceToCenter = Math.sqrt(Math.pow(width/2 - x, 2) + Math.pow(height/2 - y, 2));
        let maxDistance = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
        let cursorSize = Math.min(128, 16 + (16 * (1 - (distanceToCenter / maxDistance))));
        document.body.style.cursor = `url('assets/pointer.png') ${cursorSize} ${cursorSize}, none`;

});
