// Get page url
const path = window.location.pathname;
const page = path.split("/").pop();

/* Open/Close user interface menu */
const interfaceMenuPosition = document.getElementById('user-menu-container');
const burgerButtonPosition = document.getElementById('burger-menu');
const userDashboard = document.getElementById('user-dashboard');
let isMenuOpen = true;

function toggleInterfaceMenu() {
    if(isMenuOpen == false) {
        interfaceMenuPosition.style.left = '0';
        burgerButtonPosition.style.left = '250px';
        burgerButtonPosition.innerHTML = '<i class="fa fa-times fa-3x" aria-hidden="true"></i>';
        burgerButtonPosition.style.transition = '.5s ease-in-out';
        interfaceMenuPosition.style.transition = '.5s ease-in-out';
        toggleDashboardWidth();

        isMenuOpen = true;
        console.log('Menu has been opened');
    }

    else if(isMenuOpen == true) {
        interfaceMenuPosition.style.left = '-256px';
        burgerButtonPosition.style.left = '0px';
        burgerButtonPosition.innerHTML = '<i class="fa fa-bars fa-3x" aria-hidden="true"></i>';
        interfaceMenuPosition.style.transition = '.5s ease-in-out';
        burgerButtonPosition.style.transition = '.5s ease-in-out';
        toggleDashboardWidth();

        isMenuOpen = false;
        console.log('Menu has been closed');
    }

    // Change the width of the user dashboard, depends on the isMenuOpen letiable
    function toggleDashboardWidth() {
        if(isMenuOpen == false) {
            userDashboard.style.width = 'calc(100vw - 262px)';
            userDashboard.style.transition = '.5s ease-in-out';
        }

        if(isMenuOpen == true) {
            userDashboard.style.width = 'calc(100vw - 7px)';
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



// Expenses page - expense donut chart creator - Active only if the current page url ends with '/expenses.html'
if(page == 'expenses.html') {
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawExpenseChart);
    function drawExpenseChart() {
      let data = google.visualization.arrayToDataTable([
        ['Expense', 'Expenses by Category'],
        ['Housing', 11],
        ['Transportation', 2],
        ['Food', 2],
        ['Utilities', 2],
        ['Healthcare', 7],
        ['Personal', 7]
      ]);

      let options = {
        fontName:'Rambla',
        fontSize:'14',
        legend: {alignment: 'center', textStyle: {color: 'white'}},
        chartArea: {width:'95%',height:'95%'},
        backgroundColor: '#1e94dd',
        pieHole: 0.4,
      };
      function resize () {
          let chart = new google.visualization.PieChart(document.getElementById('donut-chart'));
          chart.draw(data, options);
      }
      
      window.onload = resize();
      window.onresize = resize;
    }
}

