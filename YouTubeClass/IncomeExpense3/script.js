// Toggle buttons for transaction type in the form
const incomeToggle = document.getElementById("income-toggle");
const expenseToggle = document.getElementById("expense-toggle");

// Set default transaction type (income)
let selectedType = "inc";

incomeToggle.addEventListener("click", function () {
  selectedType = "inc";
  incomeToggle.classList.add("active");
  expenseToggle.classList.remove("active");
});

expenseToggle.addEventListener("click", function () {
  selectedType = "exp";
  expenseToggle.classList.add("active");
  incomeToggle.classList.remove("active");
});

// DOM references for ledger and transactions
const balance = document.querySelector("#balance");
const inc_amt = document.querySelector("#inc-amt");
const exp_amt = document.querySelector("#exp-amt");
const trans = document.querySelector("#trans");
const form = document.querySelector("#form");
const description = document.querySelector("#desc");
const amount = document.querySelector("#amount");

// Load transactions from localStorage if available
const localStorageTrans = JSON.parse(localStorage.getItem("trans"));
let transactions =
  localStorage.getItem("trans") !== null ? localStorageTrans : [];

function loadTransactionDetails(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "exp" : "inc");
  item.innerHTML = `
     ${transaction.description}
     <span>${sign} ${Math.abs(transaction.amount)}</span>
     <button class="btn-del" onclick="removeTrans(${transaction.id})">x</button>
   `;
  trans.appendChild(item);
}

function removeTrans(id) {
  if (confirm("Are you sure you want to delete Transaction?")) {
    transactions = transactions.filter((transaction) => transaction.id != id);
    config();
    updateLocalStorage();
  }
}

function updateAmount() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  balance.innerHTML = `₹ ${total}`;

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  inc_amt.innerHTML = `₹ ${income}`;

  const expense = amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  exp_amt.innerHTML = `₹ ${Math.abs(expense)}`;
}

// The config function re-renders the transaction list based on the active filter
function config() {
  const activeFilter = document
    .querySelector(".filter-btn .toggle-button.active")
    .getAttribute("data-filter");
  trans.innerHTML = "";
  let filteredTransactions;
  if (activeFilter === "all") {
    filteredTransactions = transactions;
  } else if (activeFilter === "inc") {
    filteredTransactions = transactions.filter(
      (transaction) => transaction.amount > 0
    );
  } else if (activeFilter === "exp") {
    filteredTransactions = transactions.filter(
      (transaction) => transaction.amount < 0
    );
  }
  filteredTransactions.forEach(loadTransactionDetails);
  updateAmount();
}

function addTransaction(e) {
  e.preventDefault();
  if (description.value.trim() === "" || amount.value.trim() === "") {
    alert("Please enter both description and amount");
  } else {
    // Store income as a positive value; expense as negative
    let enteredAmount = +amount.value;
    if (selectedType === "exp") {
      enteredAmount = -Math.abs(enteredAmount);
    } else {
      enteredAmount = Math.abs(enteredAmount);
    }

    const transaction = {
      id: uniqueId(),
      description: description.value,
      amount: enteredAmount,
    };

    transactions.push(transaction);
    config();
    description.value = "";
    amount.value = "";
    updateLocalStorage();
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 10000000);
}

form.addEventListener("submit", addTransaction);

// Filter toggle buttons for transaction details
const filterButtons = document.querySelectorAll(".filter-btn .toggle-button");
filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
    config();
  });
});

window.addEventListener("load", function () {
  config();
});

function updateLocalStorage() {
  localStorage.setItem("trans", JSON.stringify(transactions));
}
