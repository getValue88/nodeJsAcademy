// DATA MODULE
const budgetController = (function () {

    // expense class
    const Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);

        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    };


    //income class
    const Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };


    //data structure
    const data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };


    //private methods
    const calculateTotal = function (type) {
        let sum = 0;

        data.allItems[type].forEach(item => {
            sum += item.value;
        });

        data.totals[type] = sum;
    };


    //public methods
    return {

        addItem: function (type, description, value) {
            let newItem, id;

            //create new id
            if (data.allItems[type].length) {
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;

            } else {
                id = 0;
            }

            //create new item based on type "inc" or "exp"
            if (type === 'exp') {
                newItem = new Expense(id, description, value);
            } else if (type === 'inc') {
                newItem = new Income(id, description, value);
            }

            //add the new item to the data structure
            data.allItems[type].push(newItem);

            //return the new item
            return newItem;
        },


        deleteItem: function (type, id) {
            data.allItems[type] = data.allItems[type].filter(item => item.id !== id);
        },


        calculateBudget: function () {
            //calculate total income and expenses
            calculateTotal('inc');
            calculateTotal('exp');

            //calculate the budget
            data.budget = data.totals.inc - data.totals.exp;

            //calculate the percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);

            } else {
                data.percentage = -1;
            }
        },


        calculatePercentages: function () {
            data.allItems.exp.forEach(expense => expense.calcPercentage(data.totals.inc));
        },


        getPercentages: function () {
            return data.allItems.exp.map(expense => expense.getPercentage());
        },


        getBudget: function () {
            return {
                budget: data.budget,
                totalIncome: data.totals.inc,
                totalExpenses: data.totals.exp,
                percentage: data.percentage
            }
        },


        testData: function () {
            console.log(data);
        }
    };

})();


//UI MODULE
const UIController = (function () {

    //dom classes objetc
    const DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputAddValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercentageLabels: '.item__percentage',
        dateLabel: '.budget__title--month'
    };

    //private methods
    const formatNumber = function (num, type) {
        const sign = type === 'exp' ? '-' : '+';

        num = Math.abs(num);
        num = num.toFixed(2);

        const numSplit = num.split('.');

        let int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }

        const decimal = numSplit[1];

        return sign + ' ' + int + '.' + decimal;
    };


    //public methods
    return {

        getInputValues: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputAddValue).value)
            }
        },


        addListItem: function (obj, type) {
            //Create html string with placeholder text
            const id = type === 'exp' ? 'exp-' + obj.id : 'inc-' + obj.id;
            const value = formatNumber(obj.value, type);
            const percentageDiv = type === 'exp' ? '<div class="item__percentage"></div>' : '';

            const html = `<div class="item clearfix" id="${id}">
                            <div class="item__description">${obj.description}</div>
                            <div class="right clearfix">
                                <div class="item__value">${value}</div>
                                ${percentageDiv}
                                <div class="item__delete">
                                    <button class="item__delete--btn">
                                        <i class="ion-ios-close-outline"></i>
                                    </button>
                                </div>
                            </div>
                        </div>`;

            //insert html string into the DOM
            const element = type === 'exp' ? DOMstrings.expensesContainer : DOMstrings.incomeContainer;
            document.querySelector(element).insertAdjacentHTML('beforeend', html);
        },


        deleteListItem: function (selectorID) {
            const element = document.getElementById(selectorID);
            element.parentNode.removeChild(element);
        },


        clearFields: function () {
            const fields = document.querySelectorAll(`${DOMstrings.inputDescription}, ${DOMstrings.inputAddValue}`);
            fields.forEach(field => field.value = "");
            // if foreach is not a function because the variable isn't an array then we need to parse the variable into an array:
            // Array.prototype.slice.call(fields)    OR
            // Array.from(fields).forEach...        OR
            //[...fields].forEach...

            fields[0].focus();
        },


        displayBudget: function (obj) {

            const type = obj.budget >= 0 ? 'inc' : 'exp';
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalIncome, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExpenses, 'exp');

            const percentageSufix = obj.percentage >= 0 ? obj.percentage + "%" : '---';
            document.querySelector(DOMstrings.percentageLabel).textContent = percentageSufix;
        },


        displayPercentages: function (percentages) {
            const fields = document.querySelectorAll(DOMstrings.expensesPercentageLabels);

            fields.forEach((field, i) => percentages[i] > 0 ? field.textContent = percentages[i] + '%' : field.textContent = '---');
        },


        displayMonth: function () {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth();

            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
        },


        inputTypeChanged: function () {
            const fields = document.querySelectorAll(`${DOMstrings.inputType}, ${DOMstrings.inputDescription}, ${DOMstrings.inputAddValue}`);

            fields.forEach(field => {
                field.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
        },


        getDOMstrings: function () {
            return DOMstrings;
        }
    }
})();


//APP MODULE
const appController = (function (budgetCtrl, UICtrl) {

    //private methods
    const setupEventListeners = function () {
        const DOM = UICtrl.getDOMstrings();

        //add button click event handler
        document.querySelector(DOM.inputBtn).addEventListener('click', addItem);

        //global document keypress event handler
        document.addEventListener('keypress', function (e) {

            //check for return key
            if (e.keyCode === 13) {
                addItem();
            }
        });

        //income and expenses items container click event handler on delete
        document.querySelector(DOM.container).addEventListener('click', deleteItem);

        //listen to change values on input type select tag
        document.querySelector(DOM.inputType).addEventListener('change', UIController.inputTypeChanged);
    }


    const updateBudget = function () {
        //calculate the budget
        budgetCtrl.calculateBudget();

        //return the budget
        const budget = budgetCtrl.getBudget();

        //update budget on the UI
        UICtrl.displayBudget(budget);
    }


    const updatePercentages = function () {
        //calculate percentages
        budgetController.calculatePercentages();

        //get percentages from budget controller
        const percentages = budgetController.getPercentages();

        //update percentages in UI
        UIController.displayPercentages(percentages);

    }


    const addItem = function () {
        let input, newItem;

        //get input values from ui
        input = UICtrl.getInputValues();

        //input validation
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            //create new item
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //add item to UI
            UICtrl.addListItem(newItem, input.type);

            //clear input fields
            UICtrl.clearFields();

            //calculate and update budget
            updateBudget();

            //calculate and update percentages
            updatePercentages();
        }
    };


    const deleteItem = function (e) {
        const itemId = e.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemId) {
            const splitId = itemId.split('-');  // -> ['type','id']
            const type = splitId[0];
            const id = parseInt(splitId[1]);

            //delete item from data structure
            budgetController.deleteItem(type, id);

            //delete item from the ui
            UIController.deleteListItem(itemId);

            //update and show budget value
            updateBudget();

            //calculate and update percentages
            updatePercentages();
        }
    }


    //public methods
    return {

        init: function () {
            UICtrl.displayBudget({ budget: 0, totalIncome: 0, totalExpenses: 0, percentage: 0 });
            UIController.displayMonth();
            setupEventListeners();
        }
    }

})(budgetController, UIController);


//APP INITIALIZE
appController.init();