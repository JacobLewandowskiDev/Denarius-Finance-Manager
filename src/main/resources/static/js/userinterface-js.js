
/* Open/Close user interface menu */
const interfaceMenuPosition = document.getElementById('user-menu-container');
const burgerButtonPosition = document.getElementById('burger-menu');
const userDashboardWidth = document.getElementById('user-dashboard');
let isMenuOpen = true;

function toggleInterfaceMenu() {
    if(isMenuOpen == false) {
        interfaceMenuPosition.style.left = '0';
        burgerButtonPosition.style.left = '250px';
        burgerButtonPosition.style.transition = '.5s ease-in-out';
        interfaceMenuPosition.style.transition = '.5s ease-in-out';
        toggleDashboardWidth();
        isMenuOpen = true;
        console.log('Menu has been opened');
    }
    else if(isMenuOpen == true) {
        interfaceMenuPosition.style.left = '-256px';
        burgerButtonPosition.style.left = '0px';
        interfaceMenuPosition.style.transition = '.5s ease-in-out';
        burgerButtonPosition.style.transition = '.5s ease-in-out';
        toggleDashboardWidth();
        isMenuOpen = false;
        console.log('Menu has been closed');
    }

    function toggleDashboardWidth() {
        if(isMenuOpen == false) {
            userDashboardWidth.style.width = 'calc(100vw - 262px)';
            userDashboardWidth.style.transition = '.5s ease-in-out';
        }

        if(isMenuOpen == true) {
            userDashboardWidth.style.width = 'calc(100vw - 7px)';
            userDashboardWidth.style.transition = '.5s ease-in-out';
        }
    }
}


// User interface menu options - accordions
var accordions = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < accordions.length; i++) {
  accordions[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        panel.style.display = "block";
    }
  });
}
