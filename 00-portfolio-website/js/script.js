/* DOM Elements Selection */
const menuToggle = document.querySelector(".menu-toggle");
const navList = document.querySelector(".nav-list");
const navLinks = document.querySelectorAll(".nav-link");

/* Event Listeners */
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navList.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    navList.classList.remove("active");
  });
});
