// Elements to observe 
const textDiv = document.querySelector('.why-denarius');
const fromLeftDiv = document.querySelectorAll('.information-1');
const fromRightDiv = document.querySelectorAll('.information-2');
const mainImage = document.querySelector('.info-main-image');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
    
            if (entry.isIntersecting) {
                textDiv.classList.add('fade-in');
                fromLeftDiv[0].classList.add('from-left');
                fromLeftDiv[1].classList.add('from-left');
                fromRightDiv[0].classList.add('from-right');
                fromRightDiv[1].classList.add('from-right');
                mainImage.classList.add('from-right');
                return; 
              }
        }); 
    }, {threshold: .7});
    
    observer.observe(document.querySelector('.info-section'));

// Open mobile menu
var mobileMenuOpened = false;
document.getElementById('mobile-menu').onclick=function() {
    if(mobileMenuOpened == false) {
        document.getElementById('nav-links').style.animation='.7s openMobile forwards ease-in-out';
        document.getElementById('mobile-close').style.animation='.7s openMobile forwards ease-in-out';
        mobileMenuOpened = true;
        console.log('Mobile menu opened');
    }
}

// Close mobile menu function
    function closeMobile() {
        document.getElementById('nav-links').style.animation='.7s closeMobile forwards ease-in-out';
        document.getElementById('mobile-close').style.animation='.7s closeMobile forwards ease-in-out';
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
var signInOpen = false;
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

