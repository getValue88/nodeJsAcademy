// data module
const budgetController = (function () {

    const Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

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

    const calculateTotal = function (type) {

        let sum = 0;

        data.allItems[type].forEach(item => {
            sum += item.value;
        });

        data.totals[type] = sum;
    };

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

        getBudget: function () {

            return {
                budget: data.budget,
                totalIncome: data.totals.inc,
                totalExpenses: data.totals.exp,
                percentage: data.percentage
            }
        },

        tesData: function () {
            console.log(data);
        }
    };

})();


//ui module
const UIController = (function () {

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
        percentageLabel: '.budget__expenses--percentage'
    }

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
            const valuePrefix = type === 'exp' ? '-' : '+';
            const html = `<div class="item clearfix" id="${obj.id}">
                            <div class="item__description">${obj.description}</div>
                            <div class="right clearfix">
                                <div class="item__value">${valuePrefix} ${obj.value}</div>
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
            const percentageSufix = obj.percentage >= 0 ? obj.percentage + "%" : '---';

            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalIncome;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExpenses;
            document.querySelector(DOMstrings.percentageLabel).textContent = percentageSufix;
        },

        getDOMstrings: function () {

            return DOMstrings;
        }
    }
})();


//app module
const appController = (function (budgetCtrl, UICtrl) {

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
    }

    const updateBudget = function () {

        //calculate the budget
        budgetCtrl.calculateBudget();

        //return the budget
        const budget = budgetCtrl.getBudget();

        //update budget on the UI
        UICtrl.displayBudget(budget);

    }


    const addItem = function () {

        let input, newItem;

        //get input values from ui
        input = UICtrl.getInputValues();

        //input validation
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

            //create new item
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //add item to UI and clear input fields
            UICtrl.addListItem(newItem, input.type);
            UICtrl.clearFields();

            //calculate and update budget
            updateBudget();
        }
    };

    return {

        init: function () {
            UICtrl.displayBudget({ budget: 0, totalIncome: 0, totalExpenses: 0, percentage: 0 });
            setupEventListeners();
        }
    }

})(budgetController, UIController);


appController.init();