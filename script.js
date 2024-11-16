document.addEventListener('DOMContentLoaded', function() {
    let balance = 0;
    const transactionList = document.getElementById('transactionList');
    const balanceDisplay = document.getElementById('currentBalance');
    const transactionForm = document.getElementById('transactionForm');

    function updateBalance(amount) {
        balance += amount;
        balanceDisplay.textContent = `$${balance.toFixed(2)}`;
    }

    function addTransaction(amount, type) {
        const li = document.createElement('li');
        li.textContent = `${type === 'deposit' ? '+' : '-'} $${Math.abs(amount).toFixed(2)}`;
        transactionList.appendChild(li);
    }

    transactionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const amount = parseFloat(document.getElementById('amount').value);
        const type = document.querySelector('input[name="transactionType"]:checked').value;

        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount.');
            return;
        }

        if (type === 'deposit') {
            updateBalance(amount);
            addTransaction(amount, type);
        } else if (type === 'withdraw') {
            if (amount > balance) {
                alert('Insufficient funds.');
                return;
            }
            updateBalance(-amount);
            addTransaction(-amount, type);
        }

        this.reset();
    });
});
