const transactions = require('./transactions.json');

class TransactionAnalyzer {
    
    /**
     * @property {number} transaction_amount
     */
    transactions;

    /**
     * @param {{transaction_id: string, transaction_date: string}[]} transactions
     */
    constructor(transactions) {
        this.transactions = transactions;
    }

    /**
     * Add new transaction to array
     * @param {{transaction_id: string, transaction_date: string}} transaction
     */

    addTransaction(transaction) {
        this.addTransactions.push(transaction);
    }

    /**
     * @returns All transactions from file
     */
    getAllTransaction() {
        return this.transactions;
    }

    /**
     * 1st method
     * @returns {Array} of possible transaction types
     */
    getUniqueTransactionType() {
        const uniqueTransactionType = new Set();
        this.transactions.forEach((transaction) => {
            uniqueTransactionType.add(transaction.transaction_type);
        });
        return [...uniqueTransactionType];
    }
    

    /** 
     * 2nd method
     * @returns {number} summary of all transactions
     */
    calculateTotalAmount() {
        return this.transactions.reduce((acc,transaction) => {
            return acc + transaction.transaction_amount;
        },0)
    }

    /**
     * 3th method
     * @returns Total amount in this date
     */
    calculateTotalAmountByDate(year, month, day) {
        let filteredTransactions = this.transactions;
        if (year) {
            filteredTransactions = filteredTransactions.filter(transaction => {
                const transactionYear = Number(transaction.transaction_date.split('-')[0]);
                return transactionYear === year;
            });
        }
        if (month) {
            filteredTransactions = filteredTransactions.filter(transaction => {
                const transactionMonth = Number(transaction.transaction_date.split('-')[1]);
                return transactionMonth === month;
            });
        }
        if (day) {
            filteredTransactions = filteredTransactions.filter(transaction => {
                const transactionDay = Number(transaction.transaction_date.split('-')[2]);
                return transactionDay === day;
            });
        }

        const totalAmount = filteredTransactions.reduce((acc, transaction) => {
            return acc + transaction.transaction_amount;
        }, 0);
        return totalAmount;
    }

    /**
     * 4th method
     * @param {string} type transactions type debit or credit
     * @returns {Array} of debit or credit transactions
     */
    getTransactionByType(type) {
        return this.transactions.filter((transaction) => {
            return transaction.transaction_type === type;
        })
    }

    /**
     * 5th method
     * @returns {Array} of transactions which has date in this range
     */
    getTransactionsInDateRange(startDate, endDate) {
        return this.transactions.filter((transaction) => {
            return transaction.transaction_date >= startDate && transaction.transaction_date <= endDate;
        })
    }

    /**
     * 6th method
     * @returns {Array} of transaction which has this merchan name
     */
    getTransactionsByMerchant(merchantName) {
        return this.transactions.filter((transaction) => {
            return transaction.merchant_name === merchantName;
        })
    }

    /**
     * 7th method
     * @returns {number} Average transaction amount 
     */
    calculateAverageTransactionAmount() {
        return this.transactions.reduce((acc, transaction) => {
            return acc + transaction.transaction_amount;
        }, 0) / this.transactions.length;
    }

    /**
     * 8th method
     * @returns {Array} of transactions which has amount in this range
     */
    getTransactionsByAmountRange(minAmount, maxAmount) {
        return this.transactions.filter((transaction) => {
            return transaction.transaction_amount >= minAmount && transaction.transaction_amount <= maxAmount;
        })
    }

    /**
     * 9th method
     * @returns {number} Total amount of debit transactions
     */
    calculateTotalDebitAmount() {
        return this.transactions.filter((transaction) => {
            return transaction.transaction_type === "debit";
        }).reduce((acc, transaction) => {
            return acc + transaction.transaction_amount;
        }, 0)
    }

    /**
     * 10th method
     * @returns Month with most transactions
     */
    findMostTransactionsMonth() {
        let mostTransactionsMonth = null;
        let maxTr = 0;
    
        const transactionsByMonth = this.transactions.reduce((acc, transaction) => {
            const month = transaction.transaction_date.split('-')[1];
            acc[month] = (acc[month] || 0) + 1;
            if (acc[month] > maxTr) {
                maxTr = acc[month];
                mostTransactionsMonth = month;
            }
            return acc;
        }, {});
    
        return mostTransactionsMonth;
    }

    /**
     * 11th method
     * @returns Month with most debit transactions
     */
    findMostDebitTransactionMonth() {
        let DebitMonth = null;
        let maxDebitTr = 0;
    
        for (const month in this.transactions.reduce((acc, transaction) => {
            if (transaction.transaction_type === 'debit') {
                const month = transaction.transaction_date.split('-')[1];
                acc[month] = (acc[month] || 0) + 1;
                if (acc[month] > maxDebitTr) {
                    maxDebitTr = acc[month];
                    DebitMonth = month;
                }
            }
            return acc;
        }, {}));
        return DebitMonth;
    }

    /**
     * 12th method
     * @returns {string} Which type is in most of the transactions: debit or credit
     */
    mostTransactionTypes() {
        const debitAmount = this.transactions.filter((transaction) => {
            return transaction.transaction_type === "debit";
        }).length;
        const creditAmount = this.transactions.filter((transaction) => {
            return transaction.transaction_type === "credit";
        }).length;

        if (debitAmount < creditAmount) {
            return "credit";
        }
        else if (debitAmount > creditAmount) {
            return "debit";
        }
        else {
            return "equal";
        }
    }

    /**
     * 13th method
     * @returns {Array} of transactions which have been done before this date
     */
    getTransactionsBeforeDate(date) {
        return this.transactions.filter((transaction) => {
            return transaction.transaction_date < date;
        })
    }

    /**
     * 14th method
     * @returns Transaction by its id
     */
    findTransactionById(id) {
        return this.transactions.find((transaction) => {
            return transaction.transaction_id === id;
        })
    }

    /**
     * 15th method
     * @returns Description of every transaction
     */
    mapTransactionDescriptions() {
        return this.transactions.map((transaction) => {
            return transaction.transaction_description;
        })
    }
}

const transactionAnalyzer = new TransactionAnalyzer(transactions);
console.log(transactionAnalyzer.addTransaction("new transaction to add"));
console.log(transactionAnalyzer.getAllTransactions());
console.log(transactionAnalyzer.getUniqueTransactionType());
console.log(transactionAnalyzer.calculateTotalAmount());
console.log(transactionAnalyzer.calculateTotalAmountByDate(2019, 1, 2));
console.log(transactionAnalyzer.getTransactionByType("debit"));
console.log(transactionAnalyzer.getTransactionsInDateRange("2019-03-01", "2019-04-01"));
console.log(transactionAnalyzer.getTransactionsByMerchant("BurgerJointXYZ"));
console.log(transactionAnalyzer.calculateAverageTransactionAmount());
console.log(transactionAnalyzer.getTransactionsByAmountRange(50, 100));
console.log(transactionAnalyzer.calculateTotalDebitAmount());
console.log(transactionAnalyzer.findMostTransactionsMonth());
console.log(transactionAnalyzer.findMostDebitTransactionMonth());
console.log(transactionAnalyzer.mostTransactionTypes());
console.log(transactionAnalyzer.getTransactionsBeforeDate("2019-03-10"));
console.log(transactionAnalyzer.findTransactionById("112"));
console.log(transactionAnalyzer.mapTransactionDescriptions());