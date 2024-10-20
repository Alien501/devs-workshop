const expenseAmountDisplay = document.querySelector('#expense-amount');
const incomeAmountDisplay = document.querySelector('#income-amount');

const addIncomeButton = document.getElementById('add-income-btn');
const addExpenseButton = document.getElementById('add-expense-btn');

const expenseCardContainer = document.querySelector('.expense-card-wrapper');

let expenses = [];
let stored = localStorage.getItem('expenses');

if (stored) {
    let store = JSON.parse(stored);
    expenses = Array.isArray(store) ? store : [store];
}

if (expenses.length === 0) {
    expenseCardContainer.innerHTML = '<p>No Transactions yet</p>';
} else {
    let totalExpense = 0;
    let totalIncome = 0;
    expenseCardContainer.innerHTML = ''
    expenses.forEach(expense => {
        const incomeCard = `
        <div class="expense-cat-card">
            <div>
                <p>${expense.type}</p>
                <p>${expense.description || 'NA'}</p>
                <p>${expense.date}</p>
            </div>
            <div>
                <span>${expense.amount}</span>
            </div>
        </div>
        `;
        if(expense.type == 'expense') totalExpense += expense.amount;
        else totalIncome += expense.amount

        expenseCardContainer.innerHTML += incomeCard;
        expenseAmountDisplay.textContent = `Rs. ${totalExpense}`
        incomeAmountDisplay.textContent = `Rs. ${totalIncome}`
    });

}

addIncomeButton.addEventListener('click', () => {
    let incomeValue = parseFloat(window.prompt('Enter Income Amount: '));
    let incomeDate = window.prompt('Enter Date');
    let incomeDescription = window.prompt('Enter Extra');

    if (isNaN(incomeValue) || incomeDate.trim().length === 0) {
        alert('Invalid input');
        return;
    }

    const incomeCard = `
                        <div class="expense-cat-card">
                            <div>
                                <p>Income</p>
                                <p>${incomeDescription || 'NA'}</p>
                                <p>${incomeDate}</p>
                            </div>
                            <div>
                                <span>${incomeValue}</span>
                            </div>
                        </div>
                        `;

    expenseCardContainer.innerHTML += incomeCard;

    expenses.push({
        type: 'income',
        description: incomeDescription,
        amount: incomeValue,
        date: incomeDate
    });

    let totalIncome = expenses
        .filter(expense => expense.type === 'income')
        .reduce((acc, curr) => acc + curr.amount, 0);
    
    incomeAmountDisplay.textContent = `${totalIncome}`;
    localStorage.setItem('expenses', JSON.stringify(expenses));
});


addExpenseButton.addEventListener('click', () => {
    let expenseValue = parseFloat(window.prompt('Enter Expense Amount: '));
    let expenseDate = window.prompt('Enter Date');
    let expenseDescription = window.prompt('Enter Extra');

    if (isNaN(expenseValue) || expenseDate.trim().length === 0) {
        alert('Invalid input');
        return;
    }

    const expenseCard = `
                        <div class="expense-cat-card">
                            <div>
                                <p>Income</p>
                                <p>${expenseDescription || 'NA'}</p>
                                <p>${expenseDate}</p>
                            </div>
                            <div>
                                <span>${expenseValue}</span>
                            </div>
                        </div>
                        `;

    expenseCardContainer.innerHTML += expenseCard;

    expenses.push({
        type: 'expense',
        description: expenseDescription,
        amount: expenseValue,
        date: expenseDate
    });

    let totalIncome = expenses
        .filter(expense => expense.type === 'expense')
        .reduce((acc, curr) => acc + curr.amount, 0);
    
    expenseAmountDisplay.textContent = `${totalIncome}`;
    localStorage.setItem('expenses', JSON.stringify(expenses));
});
