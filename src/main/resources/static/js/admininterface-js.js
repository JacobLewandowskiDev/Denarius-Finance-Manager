// Get page url
const url = window.location.pathname;
const page = url.split("/").pop();

// Open/Close user interface menu 
const interfaceMenuPosition = document.getElementById('user-menu-container');
const burgerButtonPosition = document.getElementById('burger-menu');
const userDashboard = document.getElementById('user-dashboard');
let isMenuOpen = true;
let newOpenedInterfaceMenuPosition;
let newClosedInterfaceMenuPosition;
let newOpenedBurgerButtonPosition;
let newClosedBurgerButtonPosition;

// Toggle viewport width depending on interface menu status
function toggleInterfaceMenu() {
  const windowWidth = window.innerWidth;
    if(windowWidth > 430) {
      newOpenedBurgerButtonPosition = '250px';
      newClosedBurgerButtonPosition = '0px';
      newOpenedInterfaceMenuPosition = '0px';
      newClosedInterfaceMenuPosition = '-256px';
    }

    else if(windowWidth <= 430) {
      newOpenedBurgerButtonPosition = '208px';
      newClosedBurgerButtonPosition = '0px';
      newOpenedInterfaceMenuPosition = '0px';
      newClosedInterfaceMenuPosition = '-207px';
    }

    if(isMenuOpen == false) {
        interfaceMenuPosition.style.left = newOpenedInterfaceMenuPosition;
        burgerButtonPosition.style.left = newOpenedBurgerButtonPosition;
        burgerButtonPosition.innerHTML = '<i class="fa fa-times fa-3x" aria-hidden="true"></i>';
        burgerButtonPosition.style.transition = '.5s ease-in-out';
        interfaceMenuPosition.style.transition = '.5s ease-in-out';
        toggleDashboardWidth();

        isMenuOpen = true;
        console.log('Menu has been opened');
    }

    else if(isMenuOpen == true) {
        interfaceMenuPosition.style.left = newClosedInterfaceMenuPosition;
        burgerButtonPosition.style.left = newClosedBurgerButtonPosition;
        burgerButtonPosition.innerHTML = '<i class="fa fa-bars fa-3x" aria-hidden="true"></i>';
        interfaceMenuPosition.style.transition = '.5s ease-in-out';
        burgerButtonPosition.style.transition = '.5s ease-in-out';
        toggleDashboardWidth();

        isMenuOpen = false;
        console.log('Menu has been closed');
    }



    // Change the width of the user dashboard, depends on the isMenuOpen letiable
    function toggleDashboardWidth() {
        if(windowWidth > 430) {
          calculatedDashboardWidthOpen = 'calc(100vw - 262px)';
          calculatedDashboardWidthClosed = 'calc(100vw - 7px)';
        }
        else if(windowWidth <= 430) {
          calculatedDashboardWidthOpen = 'calc(100vw - 210px)';
          calculatedDashboardWidthClosed = 'calc(100vw - 3px)';
        }

        if(isMenuOpen == false) {
      
            userDashboard.style.width = calculatedDashboardWidthOpen;
            userDashboard.style.transition = '.5s ease-in-out';
        }

        if(isMenuOpen == true) {
            userDashboard.style.width = calculatedDashboardWidthClosed;
            userDashboard.style.transition = '.5s ease-in-out';
        }
    }
}



// User interface menu options - accordions
let accordions = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < accordions.length; i++) {
  accordions[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    let panel = this.nextElementSibling;
    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        panel.style.display = "block";
    }
  });
}




if(page == 'admininterface.html') {
  // Create header columns for expense list table
  const userListTable = document.getElementById('users-table');
  let tableRow; 
  let tableHeader;

  // On load of the page creat the basic table headers
  basicUserListHeaders();

  // Create empty userList table
  function basicUserListHeaders() {
    userListTable.innerHTML = "";

    // Create First row of headers within the table of users
    tableRow = document.createElement('tr'); 

    // Add No. header to table
    tableHeader = document.createElement('th'); 
    tableHeader.innerHTML = 'No.';
    tableRow.appendChild(tableHeader);

    // Add Username header to table
    tableHeader = document.createElement('th'); 
    tableHeader.innerHTML = 'Username';
    tableRow.appendChild(tableHeader);

    // Append the row to the table
    userListTable.appendChild(tableRow);  
  }



  // Get a list of all webapp users from the server
  function getAllUsers() {
    basicUserListHeaders();

    fetch((url + "/get-user-list"), {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => response.json())
      .then(userList => {
        let i = 1;
        for(user of userList) {
          tableRow = document.createElement('tr');
          
          tableHeader = document.createElement('th');
          tableHeader.innerHTML = i + ".";
          tableRow.appendChild(tableHeader);

          tableHeader = document.createElement('th');
          tableHeader.innerHTML = user;
          tableRow.appendChild(tableHeader);
          userListTable.appendChild(tableRow);
          i++;
        }
      })
  }



}

