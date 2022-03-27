// Information elements to observe 
const textDiv = document.querySelector('.why-denarius');
const fromLeftDiv = document.querySelectorAll('.information-1');
const fromRightDiv = document.querySelectorAll('.information-2');
const mainImage = document.querySelector('.info-main-image');

// Start animations for info section when scrolled passed a certain % od the viewport
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                textDiv.classList.add('fade-in');   // Information welcome text animation
                fromLeftDiv[0].classList.add('from-left');  // Animate info-#1 from left side of screen
                fromLeftDiv[1].classList.add('from-left');  // Animate info-#3 from left side of screen
                fromRightDiv[0].classList.add('from-right');  // Animate info-#2 from right side of screen
                fromRightDiv[1].classList.add('from-right');  // Animate info-#4 from right side of screen
                mainImage.classList.add('from-right');  // Animate relaxed dude image from right side of screen
                return; 
              }
        }); 
    }, {threshold: .7});  // --> 70% of viewport must be scrolled passed to start the animations 
    
    observer.observe(document.querySelector('.info-section')); // --> Observe the info section viewport



// Mobile menu status
let mobileMenuOpened = false;

// Open mobile menu
document.getElementById('mobile-menu').onclick=function() {
    if(mobileMenuOpened == false) {     // If mobile menu isn't opened start animations:
        document.getElementById('nav-links').style.animation='.7s openMobile forwards ease-in-out'; // Animate the mobile menu <ul> nav links down - Open mobile menu
        document.getElementById('mobile-close').style.animation='.7s openMobile forwards ease-in-out'; // Animate the mobile menu 'X' (exit) button down - Open mobile menu
        mobileMenuOpened = true;
        console.log('Mobile menu opened');
    }
}

// Close mobile menu function
    function closeMobile() {
        document.getElementById('nav-links').style.animation='.7s closeMobile forwards ease-in-out';    // Animate the mobile menu <ul> nav links up - Close mobile menu
        document.getElementById('mobile-close').style.animation='.7s closeMobile forwards ease-in-out'; // Animate the mobile menu 'X' (exit) button Up - Close mobile menu
        mobileMenuOpened = false;
        console.log('Mobile menu closed');
    }

// Close mobile menu when links are clicked or 'X' button
    document.getElementById('mobile-close').onclick=() => {
        if(mobileMenuOpened == true) {
            closeMobile();
        }
    }


// Sign in view status
let signInOpen = false;

// Open sign in view
function showSignInView() {
    document.getElementById('sign-in-screen').style.animation='.4s fadeSignIn forwards ease-in-out';
    signInOpen = true;
    console.log('Sign in view opened');
}

// Close sign in view
function closeSignIn() {
    if(signInOpen == true) {
        document.getElementById('sign-in-screen').style.animation='.4s fadeSigninOut forwards ease-in-out';
        signInOpen = false;
        console.log('Sign in view closed');
    }
}

