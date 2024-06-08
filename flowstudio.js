// faq
function toggleAnswer(element) {
    const answer = element.nextElementSibling;
    const plus = element.querySelector('.plus');

    if (answer.classList.contains('show')) {
        answer.classList.remove('show');
        plus.style.transform = 'rotate(0deg)';
    } else {
        answer.classList.add('show');
        plus.style.transform = 'rotate(45deg)';
    }
}

// cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
    cursor.style.top = (e.pageY - 20) + 'px'; 
    cursor.style.left = (e.pageX - 20) + 'px'; 
});

document.querySelectorAll('a, button').forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});


// h1 text effect
document.addEventListener('DOMContentLoaded', function() {
    const text = "Webflow experts on-demand.";
    const typingSpeed = 100; // milliseconds
    const delayAfterTyping = 1000; // milliseconds

    let index = 0;
    const typedTextElement = document.getElementById('typed-text');
    const cursorElement = document.getElementById('typing-cursor');

    function type() {
        if (index < text.length) {
            typedTextElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(() => {
                cursorElement.style.display = 'inline-block';
            }, delayAfterTyping);
        }
    }

    setTimeout(type, 500); // Start typing after a brief delay
});

// work container
document.querySelectorAll('.work-container-outer').forEach((containerOuter, index) => {
    const container = containerOuter.querySelector('.work-container');

    let direction = (index % 2 === 0) ? 1 : -1; // Set initial direction based on the container's index
    let speed = 0.2; // Initial speed
    let currentTranslateX = (index % 2 === 0) ? 0 : -(container.scrollWidth - containerOuter.clientWidth); // Start position

    function animate() {
      currentTranslateX += speed * direction;
      container.style.transform = `translateX(${currentTranslateX}px)`;

      if (currentTranslateX > 0 || Math.abs(currentTranslateX) > (container.scrollWidth - containerOuter.clientWidth)) {
        direction *= -1;
      }

      requestAnimationFrame(animate);
    }

    function adjustSpeed(e) {
      const rect = containerOuter.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const half = rect.width / 2;

      direction = (x > half) ? 1 : -1;
      speed = 1; // Increase speed on hover
    }

    function resetSpeed() {
      speed = 0.2; // Reset speed when mouse leaves
    }

    containerOuter.addEventListener('mousemove', adjustSpeed);
    containerOuter.addEventListener('mouseleave', resetSpeed);

    animate();
});
