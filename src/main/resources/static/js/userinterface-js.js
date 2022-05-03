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

    tableRow = document.createElement('tr'); // Create First row of headers within the table of expenses

    tableHeader = document.createElement('th'); // Add Expense id No. header to table
    tableHeader.setAttribute('class', 'expense-invisible'); // Make this tag diplay:none; -> It is strictly for endpoint usage
    tableHeader.innerHTML = 'Id';
    tableRow.appendChild(tableHeader);

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
  
    expenseListTable.appendChild(tableRow);  // Append the row to the expense table
  }
  
  // Get the list of all expenses from the server database and populate the html table with the data
  getAllExpenses();

  // An array of all the expenses
  let expenses = Array();

  // ENDPOINT CONNECTION - Get List of all expenses from the server
  function getAllExpenses() {
    basicExpenseHeaders();
    // Fetch the response (expense list) from the server using the '/allexpenses' endpoint
    fetch(url + "/all-expenses", {
      method: 'GET'
    })
    .then(response => response.json()
    .then(expenseList => {

      // Table data tag that will contain information from the MySQL database expense list
      let tableData;
      // Expense table action button variable
      let actionButton;
      // Counter for table rows
      let count = 1;
      // Add all expense positions from the DB to the html table by looping through the list
      for(const expense of expenseList) {
        expenses.push(expense); // Create a list of expenses

        tableRow = document.createElement('tr'); // Create a new row inside the table

        tableData = document.createElement('td'); // Insert Expense Id data cell to appropriate row
        tableData.setAttribute('class', 'expense-invisible'); // Make this tag diplay:none; -> It is strictly for endpoint usage
        tableData.innerHTML = `${expense.id}`;
        tableRow.appendChild(tableData);

        tableData = document.createElement('td'); // Insert Expense row number to appropriate row
        tableData.innerHTML = count;
        count++;
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

        tableData = document.createElement('td'); // Insert Expense Category data cell to appropriate row
        tableData.innerHTML = `${expense.category}`;
        tableRow.appendChild(tableData);

        tableData = document.createElement('td'); //Insert a table data tag that will contain both the edit and delete action button
        actionButton = document.createElement('button'); // Add edit expense action button
        actionButton.innerHTML = 'Edit';
        actionButton.setAttribute('class', 'buttons');
        actionButton.setAttribute('onclick', 'showEditExpenseView(), getCurrentExpenseInfo(this)');
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

    // Get all of the users input and store them in variables
    const inputs = document.getElementById('add-new-expense').querySelectorAll('input');
    let expDate = inputs[0].value;
    let expName = inputs[1].value;
    let expCost = inputs[2].value;
    let expCategory = document.getElementById('expense-category-select');
    let expCategorySelectedOption = expCategory.options[expCategory.selectedIndex].value; // Get the selected option from the add expense select input

    // If any of the inputs are not filled out -> No add for you my good sir/maddame.
    if(expDate.length !== 0 && expName.length !== 0 && expCost.length !== 0) {
      basicExpenseHeaders();

      // Turn the user input for add-new-expense to JSON obj
      const newExpense = {
        'date': expDate,
        'expenseName': expName,
        'cost': expCost,
        'category': expCategorySelectedOption
      };
      
      // Post users new expense input data to the server to add it to the database
      fetch(url + "/new-expense", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newExpense)
      })
      .then(response => {
        getAllExpenses(); // Reload the html table and recalculate totals
        closeAddExpenseView();  // Close the add new expense view
        console.log(newExpense.expenseName + " was added to the users expense list")
      })
      .catch(e => console.log(e));
    } else {
      alert('Please fill all the fields');
    }
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
      let expenseCost = parseFloat(table.rows[row].cells[4].innerHTML);
      // This is the const for the expense category column values
      let expenseCategory = table.rows[row].cells[5].innerHTML;

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


  // Get the id of the expense the user wishes to update
  let oldId;
  function getCurrentExpenseInfo(currentRow) {
    oldId = currentRow.parentNode.parentNode.cells[0].textContent;
    console.log("Edit button works, id:" + oldId);
  }



  // ENDPOINT CONNECTION - Edit expense button
  function editExpense() {

        // Get all of the users input for expense update and store them in variables
        const newInputs = document.getElementById('update-expense').querySelectorAll('input');
        let newExpDate = newInputs[0].value;
        let newExpName = newInputs[1].value;
        let newExpCost = newInputs[2].value;
        let newExpCategory = document.getElementById('expense-category-select');
        let newExpCategorySelectedOption = newExpCategory.options[newExpCategory.selectedIndex].value; // Get the selected option from the add expense select input
    
        // If any of the inputs are not filled out -> No add for you my good sir/maddame.
        if(newExpDate.length !== 0 && newExpName.length !== 0 && newExpCost.length !== 0) {
          basicExpenseHeaders();
    
          // Turn the user input for update-expense to JSON obj
          const updatedExpense = {
            'date': newExpDate,
            'expenseName': newExpName,
            'cost': newExpCost,
            'category': newExpCategorySelectedOption
          };
          
          // Post users new expense input data to the server to add it to the database
          fetch((url + "/update-expense?id=" + oldId), {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedExpense)
          })
          .then(response => {
            getAllExpenses(); // Reload the html table and recalculate totals
            closeEditExpenseView(); // Close the edit expense view
            console.log("User has updated an expense")
          })
          .catch(e => console.log(e));
        } else {
          alert('Please fill all the fields');
        }

  }

  


  // ENDPOINT CONNECTION - Delete row inside expenses table if appropriate delete button is clicked
  function deleteExpense(row) {

  let id = row.parentNode.parentNode.cells[0].textContent;

    fetch((url + "/delete-expense?id=" + id), {
      method: 'DELETE'
    })
    .then(response => {
      getAllExpenses();
      console.log('Expense was removed from the database');
    })
    .catch(e => console.log(e));
  }




  // Expenses page - expense donut chart creator
  google.load('visualization', '1', { packages: ['corechart', 'controls'] });
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

  // Set the slider <p> tag value to whatever the sliders range indicates
  let sliderValue = document.getElementById('current-slider-range');
  let sliderValueDisplay = document.getElementById('slider-goal-value');

  function updateSliderGoalValue() {
    sliderValueDisplay.innerHTML = sliderValue.value + ' $';
  }

  // Input type date - set min value to today's month and year
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



  


  // If a goal is set this variable will turn to false until user has reached 100% of his/her saving goal
   let goalReached = true;

   // This is the 100% goal
   let currentGoal;
   
  // This function calculates the amount of money the user must save up in order to reach his/her saving goal
  function calculateSavingTime() {
    if(goalReached == true) {
      let goalReachDate = new Date(document.getElementById('saving-goal-date').value);
      let startDate = new Date();
      let goalMonth = goalReachDate.getMonth() + 1;
      let goalYear = goalReachDate.getFullYear();
       
      months = (goalReachDate.getFullYear() - startDate.getFullYear()) * 12;
      months -= startDate.getMonth();
      
      // The final value of month difference between two dates (startDate and goalReachDate)
      months += goalReachDate.getMonth() + 1;
      let monthlySavingAmount = parseInt(sliderValue.value / months);
      currentGoal = sliderValue.value;
      document.getElementById('current-goal').innerHTML = currentGoal;
      console.log(currentGoal);
      if(months != 0) {
        document.getElementById('saving-goal-result-amount').innerHTML = monthlySavingAmount + " $";
      }
  
      // If the month is less then October than add a '0' before the number of the month
      if(goalMonth < 10 && goalMonth > 0) {
        goalReachDate =  goalYear +"-0" + goalMonth; 
      }

      // Else keep it as is
      else {
        goalReachDate =  goalYear +"-" + goalMonth; 
      }

      document.getElementById('saving-date-value').innerHTML = goalReachDate;
      goalReached = false;
      console.log("A new saving goal has been set, setting goalReached to false");
    }
  }




  // This is the current status of the saving goal amount 
  let addedTotal;
  let newPercentage;
  // Increase percentage by 
  function addAmountToSavingGoal() {
    if(goalReached == false) {
      let addedAmount = document.getElementById('addedSavingValue').value; // This is the added value
      let currentPercentage = parseInt(document.getElementById('current-saving-percentage').innerHTML); // Grab the current percentage pre-update
      console.log("Current percentage: " + currentPercentage);

      let addedPercentage = parseInt((addedAmount / currentGoal) * 100); // This is the percentage achieved after adding to total
      console.log("Added percentage: " + addedPercentage);

      newPercentage = currentPercentage + addedPercentage;

      if(newPercentage <= 100){
        addedTotal += addedAmount; // Add the users added amount to the total
        document.getElementById('current-saving-percentage').innerHTML = newPercentage;
        console.log("New percentage: " + newPercentage);
        console.log("Total saving: " + addedTotal);
      }


      if(addedTotal <= currentGoal) {
        goalReached == true;
        console.log("Saving goal has been reached, setting goalReached to true");
      }
    }
  }


}







// SAVING-GOALS PAGE JAVASCRIPT - END


