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

if(page == 'userinterface.html') {
  let interfaceTotalSave;
  let interfaceTotalExpense;

  //TODO Add endpoint to get total savings and total expenses amount and populate appropriate html tags
}



// EXPENSES PAGE JAVASCRIPT START - These functions will run only if the current URL ends with '/expenses.html'
if(page == 'expenses.html') {

  // Create header columns for expense list table
  const expenseListTable = document.getElementById('expenses-table');
  let tableRow; 
  let tableHeader;

  // Create empty expense table
  basicExpenseHeaders();




  // Create empty expense table
  function basicExpenseHeaders() {
    expenseListTable.innerHTML = "";

    // Create First row of headers within the table of expenses
    tableRow = document.createElement('tr'); 

    // Add Expense id No. header to table
    tableHeader = document.createElement('th'); 
    tableHeader.setAttribute('class', 'expense-invisible'); // Make this tag diplay:none; -> It is strictly for endpoint usage
    tableHeader.innerHTML = 'Id';
    tableRow.appendChild(tableHeader);

    // Add Expense id No. header to table
    tableHeader = document.createElement('th'); 
    tableHeader.innerHTML = 'No';
    tableRow.appendChild(tableHeader);
  
    // Add Expense date header to table
    tableHeader = document.createElement('th'); 
    tableHeader.innerHTML = 'Date'; 
    tableRow.appendChild(tableHeader);
  
    // Add Expense name header to table
    tableHeader = document.createElement('th'); 
    tableHeader.innerHTML = 'Expense';
    tableRow.appendChild(tableHeader);
  
    // Add Expense cost header to table
    tableHeader = document.createElement('th');  
    tableHeader.innerHTML = 'Cost $';
    tableRow.appendChild(tableHeader);
  
    // Add Expense category header to table
    tableHeader = document.createElement('th'); 
    tableHeader.innerHTML = 'Category';
    tableRow.appendChild(tableHeader);
  
    // Add Expense action header to table
    tableHeader = document.createElement('th');  
    tableHeader.innerHTML = 'Action'; 
    tableRow.appendChild(tableHeader);
  
    // Append the row to the expense table
    expenseListTable.appendChild(tableRow);  
  }
  
  // Get the list of all expenses from the server database and populate the html table with the data
  getAllExpenses();




  // ENDPOINT CONNECTION - Get List of all expenses from the server
  function getAllExpenses() {

    // Create the basic table headers for the expense list
    basicExpenseHeaders();

    // Fetch the response (expense list data) from the server database using the '/allexpenses' endpoint
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

        // Create a new row inside the table
        tableRow = document.createElement('tr'); 

        // Insert Expense Id data cell to appropriate row
        tableData = document.createElement('td'); 
        tableData.setAttribute('class', 'expense-invisible'); // Make this tag diplay:none; -> It is strictly for endpoint usage
        tableData.innerHTML = `${expense.id}`;
        tableRow.appendChild(tableData);

        // Insert Expense row number to appropriate row
        tableData = document.createElement('td'); 
        tableData.innerHTML = count;
        count++;
        tableRow.appendChild(tableData);

        // Insert Date data cell to appropriate row
        tableData = document.createElement('td'); 
        tableData.innerHTML = `${expense.date}`;
        tableRow.appendChild(tableData);

        // Insert Expense Name data cell to appropriate row
        tableData = document.createElement('td'); 
        tableData.innerHTML = `${expense.expenseName}`;
        tableRow.appendChild(tableData);

        // Insert Expense Cost data cell to appropriate row
        tableData = document.createElement('td'); 
        tableData.innerHTML = parseFloat(`${expense.cost}`);
        tableRow.appendChild(tableData);

        // Insert Expense Category data cell to appropriate row
        tableData = document.createElement('td'); 
        tableData.innerHTML = `${expense.category}`;
        tableRow.appendChild(tableData);

        //Insert a table data tag that will contain both the edit and delete action button
        tableData = document.createElement('td'); 
        // Add edit expense action button
        actionButton = document.createElement('button'); 
        actionButton.innerHTML = 'Edit';
        actionButton.setAttribute('class', 'buttons');
        actionButton.setAttribute('onclick', 'showEditExpenseView(), getCurrentExpenseInfo(this)');
        tableData.appendChild(actionButton);

        // Add delete expense action button
        actionButton = document.createElement('button'); 
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
    // Get the selected option from the add expense select input
    let expCategory = document.getElementById('expense-category-select');
    let expCategorySelectedOption = expCategory.options[expCategory.selectedIndex].value; 

    // If any of the inputs are not filled out -> No add for you my good sir/maddame.
    if(expDate.length !== 0 && expName.length !== 0 && expCost.length !== 0) {

      // Create the basic table headers for the expense list
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
        // Reload the html table and recalculate totals
        getAllExpenses(); 

        // Close the add new expense view
        closeAddExpenseView();  
        console.log(newExpense.expenseName + " was added to the users expense list")
      })
      .catch(e => console.log(e));
    }
    // If the user hasn't filled out all the fields alert him about it.
     else {
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
    // The total of all of the above expenses
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


  


  // Old expense id variable
  let oldId;

  // Get the id of the expense the user wishes to update
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
    // Get the selected option from the add expense select input
    let newExpCategory = document.getElementById('update-expense-category-select');
    let newExpCategorySelectedOption = newExpCategory.options[newExpCategory.selectedIndex].value; 

    // If any of the inputs are not filled out -> It won't work my good sir/maddame.
    if(newExpDate.length !== 0 && newExpName.length !== 0 && newExpCost.length !== 0) {

      // Create the basic table headers for the expense table
      basicExpenseHeaders();

      // Turn the user input for update-expense to JSON obj
      const updatedExpense = {
        'date': newExpDate,
        'expenseName': newExpName,
        'cost': newExpCost,
        'category': newExpCategorySelectedOption
      };
      
      // Post users updated expense input data to the server to update it within the database
      fetch((url + "/update-expense?id=" + oldId), {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedExpense)
      })
      .then(response => {
        // Reload the html table and recalculate the totals
        getAllExpenses(); 

        // Close the edit expense view
        closeEditExpenseView(); 
        console.log("User has updated an expense")
      })
      .catch(e => console.log(e));
    } 
    // If the user hasn't filled out all of the fields alert him about the issue
    else {
      alert('Please fill all the fields');
    }
  }

  


  // ENDPOINT CONNECTION - Delete row inside expenses table if appropriate delete button is clicked
  function deleteExpense(row) {

    // Grab the id of the row in order to send that information to the server for deletion
    let id = row.parentNode.parentNode.cells[0].textContent;

      // Send a DELETE request to the server to remove the position from the database
      fetch((url + "/delete-expense?id=" + id), {
        method: 'DELETE'
      })
      .then(response => {
        // Reload the table after the removal
        getAllExpenses();
        console.log('Expense was removed from the database');
      })
      .catch(e => console.log(e));
  }




  // Expense donut chart creator
  google.load('visualization', '1', { packages: ['corechart', 'controls'] });
  google.charts.setOnLoadCallback(drawExpenseChart);

  // Draw the google chart function for the expense page
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

    // Chart CSS properties
    let options = {
      fontName:'Rambla',
      fontSize:'15',
      legend: {alignment: 'center', textStyle: {color: 'white'}},
      chartArea: {width:'95%',height:'95%'},
      backgroundColor: '#1e94dd',
      colors: ['#BFBFBF', '#e8b248', '#80aaff', '#f1c232', '#236D9C', '#838383'],
      pieHole: 0.4,
    };

    // Resize the chart if the window size changes
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
  // If a goal is set this variable will turn to false until user has reached 100% of his/her saving goal
  let goalReached;
  // This is the current goal amount
  let currentGoal;
  // This is the current goal date by which the user wants toachieve his savings goal
  let currentGoalDate;
  // This is the amount the user must save up monthly to reach his goal
  let monthlySavingAmount;
  // This is the amount of all the savings the user has ever collected 
  let totalSavings = 0;
  // This is the new percentage that has been reached after adding a certain money amount to the pool of savings.
  let newPercentage;
  // This is the current amount of the saving goal collected by the user 
  let userSavedForCurrentGoal;
  // The amount that the user has added to the pool
  let addedAmount;
  // The current percentage of the savings goal by the user - value display
  let currentPercentage;
  // The added percentage to the savings goal calculated based on the added amount and the set current goal
  let addedPercentageOfGoal;   
  // The savings information id and user id
  let savingsId;
  let savingsUserId;
  // If this variable is set to false allow the function to execute once per page load
  let executed = false;
  // Set the slider <p> tag value to whatever the sliders range indicates
  let sliderValue = document.getElementById('current-slider-range');
  // The current text displaying the users selected slider range
  let sliderValueDisplay = document.getElementById('slider-goal-value');
  // This is the wave level DOM element
  const waveElement = document.getElementById('wave');

  // Fetch savings info for the user using fetch GET method --> Fills currentGoal, currentGoalDate, userSavedForCurrentGoal, goalReached
  getUserSavingsInfo();




  // Update the slider text value upon change
  function updateSliderGoalValue() {
    sliderValueDisplay.innerHTML = sliderValue.value + ' $';
  }

  // Input type date - set min value to today's month and year
  let dateControl = document.getElementById('saving-goal-date');
  let today = new Date();
  let month = today.getMonth() + 2;
  let year = today.getFullYear();
  
  // If the month is less then October (10) and greater than 0, then add a '0' before the number of the month
  if(month < 10 && month > 0) {
    today =  year +"-0" + month; 
  }
  // If else keep it as is
  else {
    today =  year +"-" + month; 
  }

  // Set the min value & current value to todays date - Until user changes it to his desired date
  dateControl.setAttribute('min',today);
  dateControl.setAttribute('value',today);
  document.getElementById('saving-date-value').innerHTML = today;




  // This function calculates the amount of money the user must save up in order to reach his/her saving goal
  function setSavingGoalAndDate() {
    if(goalReached == true) {

      // Reset the percentage and saving amounts
      currentPercentage = document.getElementById('current-saving-percentage').innerText = 0;
      console.log("currentPercentage: " + currentPercentage);
      userSavedForCurrentGoal = 0;
      document.getElementById('current-savings').innerText = userSavedForCurrentGoal;
      console.log("userSavedForCurrentGoal: " + userSavedForCurrentGoal);

      // Reset the wave level
      waveElement.style.transform = 'translateY(120%)';
      waveElement.style.transition = '.5s ease-in-out';

      // Set a new current savings goal to be reached
      currentGoal = sliderValue.value;
      document.getElementById('current-goal').innerHTML = currentGoal;

      // Get the date by which the user wants the saving goal to be reached
      currentGoalDate = new Date(document.getElementById('saving-goal-date').value);
      let startDate = new Date();
      let goalMonth = currentGoalDate.getMonth() + 2; // Add 2 to skip over current month
      let goalYear = currentGoalDate.getFullYear();
       
      // Calculate the number of months between todays date and users date
      months = (currentGoalDate.getFullYear() - startDate.getFullYear()) * 12;
      months -= startDate.getMonth();
      months += currentGoalDate.getMonth() + 1;

      // Calculate the monthly amount the user needs to save up to reach the goal by that date
      monthlySavingAmount = parseInt(currentGoal / months);

      // If the user hasn't put in a date to reach his goal just accept the amount as a goal
      if(months == 0) {
        monthlySavingAmount = currentGoal;
      }

      // If the month is less then October (10) and is greater than 0 then append a '0' before the number of the month
      if(goalMonth < 10 && goalMonth > 0) {
        currentGoalDate = goalYear +"-0" + goalMonth; 
      }

      // If else keep the goal reach date as is
      else {
        currentGoalDate = goalYear +"-" + goalMonth; 
      }

      // If the current goal value is greater than 0 -> show the goal reach div and put the users saving goal amount and goal reach date in it
      if(currentGoal > 0) {
        document.getElementById('saving-date-value').innerHTML = currentGoalDate; // Set the date to currentGoalDate
        goalReached = false;  // Set the goal has been reached variable to false;
        console.log("A new saving goal has been set to: " + currentGoal + ", setting goalReached to " + goalReached);
        document.getElementById('saving-goal-result-amount').innerHTML = monthlySavingAmount; // Set the monthly savings amount to monthlySavingAmount
        document.getElementById('saving-goal-result').style.display = "block";  // Display the hidden goal reach div
      }

      // If the user hasn't put a desired saving amount to be reached alert him
      else {
        alert("Please use the range slider to select a desired amount of money you would like to save up.");
        console.log("Missing some data to perform the function: " + setSavingGoalAndDate.name);
      }

      // Partially update users saving information in the server
      updateUserSavingsInfo();
    }
  }




  // This is the cuurent wave percentage 
  let wavePercentage;

  // Increase percentage of savings amount function -> It is only active if the goalReached variable is false. Otherwise user needs to set up a savings goal.
  function addAmountToSavingGoal() {
    // If the goal hasn't been reached allow to keep on adding money to the pool
    if(goalReached == false) {

      // Grab the amount added by the user to the total
      addedAmount = document.getElementById('addedSavingValue').value;
      console.log("User added amount: " + addedAmount);

      // Check if the added amount is not a negative number or not equals to 0
      if(addedAmount > 0) {

        // Add the users added amount to a pool of the current goal savings total
        userSavedForCurrentGoal += parseFloat(addedAmount);
        document.getElementById('current-savings').innerHTML = userSavedForCurrentGoal;
        console.log("userSavedForCurrentGoal: " +  userSavedForCurrentGoal);

        // Add the users added amount to a grand total of all of his savings
        totalSavings += parseFloat(addedAmount);
        console.log("totalSavings: " +  totalSavings);

        // Calculate what the added amounts percentage is of the current goal
        addedPercentageOfGoal = Math.round((addedAmount / currentGoal) * 10000) / 100;
        console.log("addedPercentageOfGoal: " +  addedPercentageOfGoal);

        // Grab the current percentage of the goal achievement displayed to the user
        currentPercentage = parseFloat(document.getElementById('current-saving-percentage').innerText);
        console.log("currentPercentage: " + currentPercentage);

        // Calculate the new percentage of goal achievement after the user adds the amount
        newPercentage = Math.round((currentPercentage + addedPercentageOfGoal) * 100) / 100;
        console.log("newPercentage: " + newPercentage);

        // Raise the percentage wave level according to the current percentage
        /** translate: transformY(120%) ==> 0% of savings,
         *  translate: transformY(10%) ==> 100% of savings,
         *  So the math behind this would be: 
         *  If the newPercentage = 30% ==> translateY( 120% - 30%)*/
        wavePercentage = Math.round((120 - newPercentage) * 100) / 100;
        let translateY_Value = "translateY(" + wavePercentage + "%)" 
        waveElement.style.transform = translateY_Value;
        waveElement.style.transition = '.5s ease-in-out';
        console.log("wavePercentage: " + wavePercentage);

        // Save the new percentage as updated currentPercentage
        document.getElementById('current-saving-percentage').innerHTML = newPercentage;
      
        // Check if the new percentage is greater or equal to 100%
        if(newPercentage >= 100) {
          // Set the goalReached variable to true -> Unlocks the possibility to set a new goal up
          goalReached = true;

          // Alert user of reaching the goal
          alert("You have reached your goal");

          // Set the percentage to 100% and lock it so that it cant be changed untill a new goal has been set
          document.getElementById('current-saving-percentage').innerHTML = 100;
        }
        // Update all of the users savings information in the servers database
        updateUserSavingsInfo();
      }
   } 
   else {
   // Alert the user that he hasn't yet set a savings goal
   alert("You cannot add to your savings pool, please set up a new savings goal.");
   }
  }



  // Update all of the users savings info in the server
  // This method updates these variables: today, currentGoal, totalSavings, userSavedForCurrentGoal, for user id (1) for now, implement auto generation for logged in user later
  function updateUserSavingsInfo() {
      // Turn the users saving ingo to JSON obj
      const savingsInfo = {
        'userId': 1,
        'currentGoal': parseFloat(currentGoal),
        'currentGoalDate': currentGoalDate,
        'monthlySavingAmount': monthlySavingAmount,
        'userSavedForCurrentGoal': parseFloat(userSavedForCurrentGoal),
        'totalSavings': parseFloat(totalSavings),
        'goalReached': goalReached
      };

      
      // Post users updated savings info to the server to update it within the database
      fetch((url + "/update-savings?id=1"), {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(savingsInfo)
      })
      .then(response => {
        console.log(savingsInfo);

        console.log("Users savings information has been updated.")
      })
      .catch(e => console.log(e));
  }






// Get all of the users savings information from the server
function getUserSavingsInfo() {
  if(executed == false) {
    fetch((url + "/get-savings-info?id=1"), {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      // Get all of the data from the json response and store them in the appropriate variables
      currentGoal = data.currentGoal;
      currentGoalDate = data.currentGoalDate;
      monthlySavingAmount = data.monthlySavingAmount;
      userSavedForCurrentGoal = data.userSavedForCurrentGoal;
      goalReached = data.goalReached;
      totalSavings = data.totalSavings;
      savingsId = data.id;
      savingsUserId = data.userId;

      // Populate the appropriate html tags with the data and set the percentage 
      if(currentGoal > 0) {
        document.getElementById('current-goal').innerHTML = currentGoal;
        document.getElementById('saving-date-value').innerHTML = currentGoalDate;
        document.getElementById('saving-goal-date').value = currentGoalDate;
        document.getElementById('saving-goal-result-amount').innerHTML = monthlySavingAmount;
        document.getElementById('saving-goal-result').style.display = 'block';

        document.getElementById('current-savings').innerHTML = userSavedForCurrentGoal;

        currentPercentage = Math.round(((userSavedForCurrentGoal / currentGoal) * 100) * 100) / 100;
        document.getElementById('current-saving-percentage').innerHTML = currentPercentage;
        wavePercentage = Math.round((120 - currentPercentage) * 100) / 100;
        let translateY_Value = "translateY(" + wavePercentage + "%)" 
        waveElement.style.transform = translateY_Value;
        waveElement.style.transition = '.5s ease-in-out';
      } else {
        goalReached == true;
        console.log("Goal reached set to: " + goalReached);
      }
      executed = true;
    })
    .catch(e => console.log(e));
  };
}
  

}
// SAVING-GOALS PAGE JAVASCRIPT - END


