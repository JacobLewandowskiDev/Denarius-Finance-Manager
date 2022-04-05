
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
        interfaceMenuPosition.style.left = '-255px';
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
