document.addEventListener("scroll", function() {
    let viewHeight = window.innerHeight;
    let viewCenter = viewHeight / 2;

    document.querySelectorAll('.project-main-div').forEach(div => {
        let divTop = div.getBoundingClientRect().top;
        let divBottom = div.getBoundingClientRect().bottom;
        let divCenter = divTop + (divBottom - divTop) / 2;

        let distanceFromCenter = Math.abs(divCenter - viewCenter);

        // Calculate scale based on distance from center
        let scale = 1 - (distanceFromCenter / viewHeight * 0.7); // The 0.4 factor controls the scale amount.
        scale = Math.max(scale, 0.6); // Ensure it doesn't scale below 60%

        div.style.transform = `scale(${scale})`;
    });
});
document.addEventListener("scroll", function() {
    let projects = document.querySelectorAll('.project-main-div');
    
    projects.forEach((div, index) => {
        if(div.getBoundingClientRect().top <= 0) {
            div.style.zIndex = `${index + 10}`; // +10 just to ensure it's above other content if any
        } else {
            div.style.zIndex = '0';
        }
    });

    // If the last project is at the top, release all of them to scroll normally
    if(projects[projects.length - 1].getBoundingClientRect().top <= 0) {
        projects.forEach(div => {
            div.style.position = 'static';
        });
    } else {
        projects.forEach(div => {
            div.style.position = 'sticky';
        });
    }
});
