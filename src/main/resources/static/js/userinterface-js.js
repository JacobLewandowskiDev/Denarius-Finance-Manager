// Get page url
const path = window.location.pathname;
const page = path.split("/").pop();

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



// EXPENSES PAGE JAVASCRIPT START - These functions will run only if the current URL ends with '/expenses.html'
if(page == 'expenses.html') {
  const url = path;

  // Create named columns for expense list table
  const expenseListTable = document.getElementById('expenses-table');
  let tableRow; 
  let tableHeader;

  basicExpenseHeaders();

  // Create empty expense table
  function basicExpenseHeaders() {
    expenseListTable.innerHTML = "";
    tableRow = document.createElement('tr');
    tableHeader = document.createElement('th'); // Add Expense id No. header to table
    tableHeader.innerHTML = 'No';
    tableRow.appendChild(tableHeader);
  
    tableHeader = document.createElement('th'); // Add Expense date header to table
    tableHeader.innerHTML = 'Date'; 
    tableRow.appendChild(tableHeader);
  
    tableHeader = document.createElement('th');  // Add Expense name header to table
    tableHeader.innerHTML = 'Expense';
    tableRow.appendChild(tableHeader);
  
    tableHeader = document.createElement('th');  // Add Expense cost header to table
    tableHeader.innerHTML = 'Cost $';
    tableRow.appendChild(tableHeader);
  
    tableHeader = document.createElement('th'); // Add Expense category header to table
    tableHeader.innerHTML = 'Category';
    tableRow.appendChild(tableHeader);
  
    tableHeader = document.createElement('th');  // Add Expense action header to table
    tableHeader.innerHTML = 'Action'; 
    tableRow.appendChild(tableHeader);
  
    expenseListTable.appendChild(tableRow);  
  }
  
  // Get the list of all expenses from the server database and populate the html table with the data
  getAllExpenses();




  // ENDPOINT CONNECTION - Get List of all expenses from the server
  function getAllExpenses() {
    // Fetch the response (expense list) from the server using the '/allexpenses' endpoint
    fetch(url + "/allexpenses", {
      method: 'GET'
    })
    .then(response => response.json()
    .then(expenseList => {

      // Table data tag that will contain information from the MySQL database expense list
      let tableData;
      // Expense table action button variable
      let actionButton;
      // Add all expense positions from the DB to the html table by looping through the list
      for(const expense of expenseList) {
        tableRow = document.createElement('tr'); // Insert Expense Id data cell to appropriate row
        tableData = document.createElement('td');
        tableData.innerHTML = `${expense.id}`;
        tableRow.appendChild(tableData);

        tableData = document.createElement('td'); // Insert Date data cell to appropriate row
        tableData.innerHTML = `${expense.date}`;
        tableRow.appendChild(tableData);

        tableData = document.createElement('td'); // Insert Expense Name data cell to appropriate row
        tableData.innerHTML = `${expense.expenseName}`;
        tableRow.appendChild(tableData);

        tableData = document.createElement('td'); // Insert Expense Cost data cell to appropriate row
        tableData.innerHTML = parseFloat(`${expense.cost}`);
        tableRow.appendChild(tableData);
        console.log(tableData);

        tableData = document.createElement('td'); // Insert Expense Category data cell to appropriate row
        tableData.innerHTML = `${expense.category}`;
        tableRow.appendChild(tableData);

        tableData = document.createElement('td');
        actionButton = document.createElement('button'); // Add edit expense action button
        actionButton.innerHTML = 'Edit';
        actionButton.setAttribute('class', 'buttons');
        actionButton.setAttribute('onclick', 'showEditExpenseView()');
        tableData.appendChild(actionButton);

        actionButton = document.createElement('button'); // Add delete expense action button
        actionButton.innerHTML = 'Delete';
        actionButton.setAttribute('class', 'buttons');
        actionButton.setAttribute('onclick', 'deleteExpense(this)');
        tableData.appendChild(actionButton);
        tableRow.appendChild(tableData);

        // Append the new row to the html expense table
        expenseListTable.appendChild(tableRow);
      }

      // Recalculate the expense total costs after populating the table and redraw the chart
      expenseCalculator();
    })
    )};




   // ENDPOINT CONNECTION - Save a new expense item to the servers database and update the html table
   function addNewExpense() {
     basicExpenseHeaders();
      // Get all of the users input and store them in variables
      const inputs = document.querySelectorAll('input');
      let expDate = inputs[0].value;
      let expName = inputs[1].value;
      let expCost = inputs[2].value;
      let expCategory = document.getElementById('expense-category-select');
      let expCategorySelectedOption = expCategory.options[expCategory.selectedIndex].value; // Get the selected option from the add expense select input

      // Turn the user input for add-new-expense to JSON obj
      const newExpense = {
        'date': expDate,
        'expenseName': expName,
        'cost': expCost,
        'category': expCategorySelectedOption
      };

      console.log(newExpense);
      
      // Post users new expense input data to the server to add it to the database
      fetch(url + "/newexpense", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newExpense)
      })
      .then(console.log(newExpense.expenseName + " was added to the users expense list"))
      .catch(e => console.log(e));

      getAllExpenses(); // Reload the html table and recalculate totals
      closeAddExpenseView();  // Close the add new expense view
    }



    

    // Each category of expenses total
    let housingTotal;
    let transportationTotal;
    let foodTotal;
    let utilitiesTotal;
    let healthcareTotal;
    let personalTotal;
    let totalExpenses;

    // Calculate each categories expense total & total expenses
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
      const table = document.getElementById('expenses-table');
      for(let row = 1, rows = table.rows.length; row < rows; row++) {

      // This is the const for the expense cost column values
      let expenseCost = parseFloat(table.rows[row].cells[3].innerHTML);
      // This is the const for the expense category column values
      let expenseCategory = table.rows[row].cells[4].innerHTML;

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
      document.getElementById('housingTotal').innerHTML = (Math.round(housingTotal * 100) / 100) + ' $';
      document.getElementById('transportationTotal').innerHTML = (Math.round(transportationTotal * 100) / 100)  + ' $';
      document.getElementById('foodTotal').innerHTML = (Math.round(foodTotal * 100) / 100) + ' $';
      document.getElementById('utilitiesTotal').innerHTML = (Math.round(utilitiesTotal * 100) / 100) + ' $';
      document.getElementById('healthcareTotal').innerHTML = (Math.round(healthcareTotal * 100) / 100) + ' $';
      document.getElementById('personalTotal').innerHTML = (Math.round(personalTotal * 100) / 100) + ' $';
      document.getElementById('totalExpenses').innerHTML = (Math.round(totalExpenses * 100) / 100) + ' $';

      // Redraw the expense chart
      drawExpenseChart();
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

  // Edit expense view status
  let editExpenseOpen = false;
  
  // Open edit expense view
  function showEditExpenseView() {
    document.getElementById('edit-expense-container').style.visibility='visible';
    document.getElementById('edit-expense-container').style.opacity='1';
    document.getElementById('edit-expense-container').style.transition='.5s ease-in-out';
    editExpenseOpen = true;
    console.log('Edit expense view opened');
  }

  // Close edit expense view
  function closeEditExpenseView() {
    if(editExpenseOpen == true) {
      document.getElementById('edit-expense-container').style.visibility='hidden';
      document.getElementById('edit-expense-container').style.opacity='0';
      document.getElementById('edit-expense-container').style.transition='.5s ease-in-out';

      editExpenseOpen = false;
      console.log('Edit expense view closed');
    }
  }

  // Edit expense button
  function editExpense() {
    closeEditExpenseView();
  }


  // Delete row inside expenses table if appropriate delete button is clicked
  function deleteExpense(row) {
  let i = row.parentNode.parentNode.rowIndex;
    document.getElementById("expenses-table").deleteRow(i);
    expenseCalculator();  // Recalculate the expenses totals
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


