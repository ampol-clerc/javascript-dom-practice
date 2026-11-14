// Section 1 : DOM Elements Selection
const menuToggle = document.querySelector(".menu-toggle");
const navList = document.querySelector(".nav-list");
const navLinks = document.querySelectorAll(".nav-link");

// Section 5 : Event Listeners
// Open / Close the menu by clicking the hamburger button
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navList.classList.toggle("active");
});

// Automatically close the menu when a link is selected
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    navList.classList.remove("active");
  });
});
