//coding challenge 5
console.log('\nCODING CHALLENGE 5');

function tipAverage(tipsArray) {
    let sum = 0;
    for (let i = 0; i < tipsArray.length; i++) {
        sum += tipsArray[i];
    }
    return sum / tipsArray.length;
}

const johnFamily = {
    bills: [124, 48, 268, 180, 42],
    tips: [],
    totalAmounts: [],
    calcTips: function () {
        for (let i = 0; i < this.bills.length; i++) {
            let bill = this.bills[i];
            let percentage;

            if (bill > 0 && bill < 50) {
                percentage = .2;
            } else if (bill >= 50 && bill < 200) {
                percentage = .15;
            } else if (bill >= 200) {
                percentage = .1;
            } else {
                this.tips[i] = 0;
                percentage = 0;
            }

            this.tips[i] = bill * percentage;
            this.totalAmounts[i] = bill + this.tips[i];
        }
    }
}

const markFamily = {
    bills: [77, 375, 110, 45],
    tips: [],
    totalAmounts: [],
    calcTips: function () {
        for (let i = 0; i < this.bills.length; i++) {
            let bill = this.bills[i];
            let percentage;

            if (bill > 0 && bill < 100) {
                percentage = .2;
            } else if (bill >= 100 && bill < 300) {
                percentage = .10;
            } else if (bill >= 300) {
                percentage = .25;
            } else {
                this.tips[i] = 0;
                percentage = 0;
            }

            this.tips[i] = bill * percentage;
            this.totalAmounts[i] = bill + this.tips[i];
        }
    }
}

johnFamily.calcTips();
console.log('John\s family');
console.log(johnFamily);

markFamily.calcTips();

const johnTipAvg = tipAverage(johnFamily.tips);
const markTipAvg = tipAverage(markFamily.tips);

if (johnTipAvg > markTipAvg) {
    console.log('Highest Tip Average: John\'s family (' + johnTipAvg + ')');
} else if (markTipAvg > johnTipAvg) {
    console.log('Highest Tip Average: Mark\'s family (' + markTipAvg + ')');
} else {
    console.log('Both families gave the same average tip.');
}