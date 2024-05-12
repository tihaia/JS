/**
 * объявляем массив транзакций
 * @type {Array<Object>}
 */
let transactions = [];

/**
 * Добавляем новую транзакцию
 * @param {Event} event - отправка формы
 */
function addTransaction(event) {
    event.preventDefault();

    const form = event.target;
    const date = form.date.value;
    const amount = parseFloat(form.amount.value);
    const category = form.category.value;
    const description = form.description.value;

    const id = transactions.length + 1;
    const transaction = { id, date, amount, category, description };
    transactions.push(transaction);

    const table = document.getElementById('transaction-table').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    row.innerHTML = `<td>${id}</td><td>${date}</td><td>${category}</td><td>${description.substring(0, 50)}</td><td><button onclick="deleteTransaction(${id})">Удалить</button></td>`;
    row.style.color = amount >= 0 ? 'green' : 'red';

    calculateTotal();
}

/**
 * Удаление транзакции по её идентификатору
 * @param {number} id - идентификатор транзакции, которую нужно удалить
 */
function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    document.getElementById('transaction-table').deleteRow(id);
    calculateTotal();
}

/**
 * Высчитываем общую сумму всех транзакций и обновляем нужный элемент на странице
 */
function calculateTotal() {
    const totalElement = document.getElementById('total');
    const totalAmount = transactions.reduce((total, transaction) => total + transaction.amount, 0);
    totalElement.textContent = `Общая сумма: ${totalAmount}`;
}

/**
 * Выводим подробности о выбранной транзакции
 * @param {number} id - идентификатор транзакции
 */
function showTransactionDetails(id) {
    const transaction = transactions.find(transaction => transaction.id === id);
    const detailsElement = document.getElementById('transaction-details');
    detailsElement.innerHTML = `<h2>Подробности транзакции #${id}</h2>
                                <p><strong>Дата и время:</strong> ${transaction.date}</p>
                                <p><strong>Сумма:</strong> ${transaction.amount}</p>
                                <p><strong>Категория:</strong> ${transaction.category}</p>
                                <p><strong>Описание:</strong> ${transaction.description}</p>`;
}

document.getElementById('transaction-form').addEventListener('submit', addTransaction);

document.getElementById('transaction-table').addEventListener('click', function(event) {
    const target = event.target;
    if (target.tagName === 'TD') {
        const row = target.parentElement;
        const id = parseInt(row.cells[0].textContent);
        showTransactionDetails(id);
    }
});