const slider = document.getElementById("slider");
const prevSlideBtn = document.getElementById("prev-slide");
const nextSlideBtn = document.getElementById("next-slide");
const mainMenuButton = document.getElementById("main-menu-button");
const mainMenu = document.getElementById("main-menu");

let currentIndex = 0;

function showSlide(index) {
    const test = `translateY(-${100 * (index)}vh)`;
    slider.style.transform = test /* Adjust for vertical sliding */
    currentIndex = index;
}

prevSlideBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        showSlide(currentIndex - 1);
    }
});

nextSlideBtn.addEventListener("click", () => {
    if (currentIndex < slider.children.length - 1) {
        showSlide(currentIndex + 1);
    }
});

mainMenuButton.addEventListener("click", () => {
    if (mainMenu.style.right === "-20vw" || !mainMenu.style.right) {
        mainMenu.style.right = "0";
        slider.style.transform = "translateX(-20vw)"; /* Slide the main content with the menu */
        mainMenuButton.style.right = "20vw"; /* Slide the button along with the menu */
        prevSlideBtn.style.left = "30px"; /* Slide the left arrow along with the menu */
        nextSlideBtn.style.right = "30px"; /* Slide the right arrow along with the menu */
        document.body.style.overflow = "hidden";
    } else {
        mainMenu.style.right = "-20vw";
        slider.style.transform = "translateX(0)"; /* Reset the main content position */
        mainMenuButton.style.right = "10px"; /* Reset the button position */
        prevSlideBtn.style.left = "10px"; /* Reset the left arrow position */
        nextSlideBtn.style.right = "10px"; /* Reset the right arrow position */
        document.body.style.overflow = "auto";
    }
});

showSlide(currentIndex);
