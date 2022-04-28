// Get page url
const path = window.location.pathname;
const page = path.split("/").pop();

/* Open/Close user interface menu */
const interfaceMenuPosition = document.getElementById('user-menu-container');
const burgerButtonPosition = document.getElementById('burger-menu');
const userDashboard = document.getElementById('user-dashboard');
let isMenuOpen = true;
let newOpenedInterfaceMenuPosition;
let newClosedInterfaceMenuPosition;
let newOpenedBurgerButtonPosition;
let newClosedBurgerButtonPosition;

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


// EXPENSES PAGE JAVASCRIPT START - These functions will run only if the current URL ends with '/expenses.html'
if(page == 'expenses.html') {

   // Add new expense to table and database
   function addNewExpense() {
    const url = path + "/add-new-expense";

    // Get all of the users input and store them in variables
    const inputs = document.querySelectorAll('input');
    let expDate = inputs[0].value;
    let expName = inputs[1].value;
    let expCost = inputs[2].value;
    let expCategory = document.getElementById('expense-category-select');
    let expCategorySelectedOption = expCategory.options[expCategory.selectedIndex].value; // Get the selected option from the add expense select input

    // Turn the user input for add-new-expense to JSON obj
    const newExpense = {
      "date": expDate,
      "name": expName,
      "cost": expCost,
      "category": expCategorySelectedOption
    };
     
    console.log(newExpense);
    //TO DO - Add a fetch method for the current url and send JSON obj to server for further storage in DB


    expenseCalculator(); // Recalculate the costs after adding the new expense to the table
  }

    // Each category of expenses total
    let housingTotal = 0.00;
    let transportationTotal = 0.00;
    let foodTotal = 0.00;
    let utilitiesTotal = 0.00;
    let healthcareTotal = 0.00;
    let personalTotal = 0.00;
    let totalExpenses = 0.00;

    // Calculate each categories expense total & total expenses
    expenseCalculator();
    function expenseCalculator() {

      // Reset the amounts to zero to avoid counting expenses twice or more
       housingTotal = 0.00;
       transportationTotal = 0.00;
       foodTotal = 0.00;
       utilitiesTotal = 0.00;
       healthcareTotal = 0.00;
       personalTotal = 0.00;
       totalExpenses = 0.00;

       // Calculate the expenses loop
      let table = document.getElementById('expenses-table');
      for(let row = 1, rows = table.rows.length; row < rows; row++) {

        // This is the const for the expense cost column values
        const expenseCost = parseFloat(table.rows[row].cells[3].innerHTML);

        // This is the const for the expense category column values
        const expenseCategory = table.rows[row].cells[4].innerHTML;

        // Check if expense is of type housing category --> If yes, then proceed to add its cost to the appropriate total
        if(expenseCategory == 'Housing') {
          housingTotal += expenseCost;
        }

        // Check if expense is of type transportation category --> If yes, then proceed to add its cost to the appropriate total
        else if(expenseCategory == 'Transportation') {
          transportationTotal += expenseCost;
        }

        // Check if expense is of type food category --> If yes, then proceed to add its cost to the appropriate total
        else if(expenseCategory == 'Food') {
          foodTotal += expenseCost;
        }

        // Check if expense is of type utilities category --> If yes, then proceed to add its cost to the appropriate total
        else if(expenseCategory == 'Utilities') {
          utilitiesTotal += expenseCost;
        }

        // Check if expense is of type healthCare category --> If yes, then proceed to add its cost to the appropriate total
        else if(expenseCategory == 'HealthCare') {
          healthcareTotal += expenseCost;
        }

        // Check if expense is of type personal category --> If yes, then proceed to add its cost to the appropriate total
        else if(expenseCategory == 'Personal') {
          personalTotal += expenseCost;
        }

        // Add all of the expense category totals to one
        totalExpenses += expenseCost;
      }

      // Proceed to update the expense totals within the <div id="sum-table">
      document.getElementById('housingTotal').innerHTML = housingTotal + ' $';
      document.getElementById('transportationTotal').innerHTML = transportationTotal + ' $';
      document.getElementById('foodTotal').innerHTML = foodTotal + ' $';
      document.getElementById('utilitiesTotal').innerHTML = utilitiesTotal + ' $';
      document.getElementById('healthcareTotal').innerHTML = healthcareTotal + ' $';
      document.getElementById('personalTotal').innerHTML = personalTotal + ' $';
      document.getElementById('totalExpenses').innerHTML = totalExpenses + ' $';
    }

    // Add expense view status
    let addExpenseOpen = false;

    // Open add expense view
    function showAddExpenseView() {
        document.getElementById('add-expense-container').style.visibility='visible';
        document.getElementById('add-expense-container').style.opacity='1';
        document.getElementById('add-expense-container').style.transition='.5s ease-in-out';
        addExpenseOpen = true;
        console.log('Add expense view opened');
    }

    // Close add expense view
    function closeAddExpenseView() {
        if(addExpenseOpen == true) {
          document.getElementById('add-expense-container').style.visibility='hidden';
          document.getElementById('add-expense-container').style.opacity='0';
          document.getElementById('add-expense-container').style.transition='.5s ease-in-out';
            addExpenseOpen = false;
            console.log('Add expense view closed');
        }
    }


    // Delete row inside expenses table if appropriate delete button is clicked
    function deleteExpense(row) {
    let i = row.parentNode.parentNode.rowIndex;
      document.getElementById("expenses-table").deleteRow(i);
      expenseCalculator();  // Recalculate the expenses totals
      drawExpenseChart(); // Redraw the chart if row is deleted
    }

    // Expenses page - expense donut chart creator
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawExpenseChart);
    function drawExpenseChart() {
      let data = google.visualization.arrayToDataTable([
        ['Expense', 'Expenses by Category'],
        ['Housing', parseInt(housingTotal)],
        ['Transportation', parseInt(transportationTotal)],
        ['Food', parseInt(foodTotal)],
        ['Utilities', parseInt(utilitiesTotal)],
        ['Healthcare', parseInt(healthcareTotal)],
        ['Personal', parseInt(personalTotal)]
      ]);

      let options = {
        fontName:'Rambla',
        fontSize:'15',
        legend: {alignment: 'center', textStyle: {color: 'white'}},
        chartArea: {width:'95%',height:'95%'},
        backgroundColor: '#1e94dd',
        colors: ['#BFBFBF', '#e8b248', '#80aaff', '#f1c232', '#236D9C', '#838383'],
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
// EXPENSES PAGE - END

// SAVING-GOALS PAGE JAVASCRIPT - START
if(page == 'saving-goals.html') {

  // Set the <p> tag value to whatever the sliders range indicates
  let sliderValue = document.getElementById('current-slider-range');
  let sliderValueDisplay = document.getElementById('slider-goal-value');

  function updateSliderGoalValue() {
    sliderValueDisplay.innerHTML = sliderValue.value + ' $';
  }

  // Input type date - set min value of today's month and year
  let dateControl = document.getElementById('saving-goal-date');
  let today = new Date();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  
  // If the month is less then October than add a '0' before the number of the month
  if(month < 10 && month > 0) {
    today =  year +"-0" + month; 
  }
  // Else keep it as is
  else {
    today =  year +"-" + month; 
  }

  // Set the min value & current value to todays date - Until user changes it to his desired date
  dateControl.setAttribute('min',today);
  dateControl.setAttribute('value',today);
  document.getElementById('saving-date-value').innerHTML = today;
}
// SAVING-GOALS PAGE JAVASCRIPT - END


