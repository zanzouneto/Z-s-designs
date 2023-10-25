function reveal() {
  var reveals = document.querySelectorAll("section");

  for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;

      // Default value for larger screens
      var elementVisible = 150;

      // If screen width is less than or equal to 768px (common breakpoint for mobile)
      if (window.innerWidth <= 768) {
          elementVisible = 40; // Adjust this value to suit your requirements
      }

      if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
      } else {
          reveals[i].classList.remove("active");
      }
  }
}

window.addEventListener("scroll", reveal);
