
//lager linker til HTML koden
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");

//legger til en lytter på hamburger elemtentet i HTMLen og kjører kommende kommandoer deretter
hamburger.addEventListener("click", mobileMenu);
navLink.forEach(n => n.addEventListener("click", closeMenu));

//Åpner menu
function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}
//lukker meny når noen trykker på en link
function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}
