//coding challenge 1
console.log('CODING CHALLENGE 1');

const markMass = 70,
    markHeight = 1.8,
    johnMass = 65,
    johnHeight = 1.72;

const markBMI = markMass / (markHeight * markHeight);
const johnBMI = johnMass / (johnHeight * johnHeight);

const markBMIhigherThanJohnBMI = markBMI > johnBMI;

console.log('Is Mark\'s BMI higher than John\'s? ' + markBMIhigherThanJohnBMI);

//coding challenge 2
console.log('\nCODING CHALLENGE 2');


const johnTeamAverage = (89 + 120 + 103) / 3,
    mikeTeamAverage = (116 + 94 + 123) / 3,
    maryTeamAverage = (97 + 134 + 105) / 3;

switch (true) {
    case johnTeamAverage > mikeTeamAverage && johnTeamAverage > maryTeamAverage:
        console.log('Winner: John\'s team with an average score of ' + johnTeamAverage + ' points.');
        break;
    case mikeTeamAverage > johnTeamAverage && mikeTeamAverage > maryTeamAverage:
        console.log('Winner: Mike\'s team with an average score of ' + mikeTeamAverage + ' points.');
        break;
    case maryTeamAverage > johnTeamAverage && maryTeamAverage > mikeTeamAverage:
        console.log('Winner: Mary\'s team with an average score of ' + maryTeamAverage + ' points.');
        break;
    default:
        console.log('Draw! Two or more teams have the same average score.');
}

//coding challenge 3
console.log('\nCODING CHALLENGE 3');


const calculateTip = bill => {
    switch (true) {
        case bill > 0 && bill < 50:
            return bill * 1.20;
        case bill >= 50 && bill <= 200:
            return bill * 1.15;
        case bill > 200:
            return bill * 1.1;
        default:
            return 0;
    }
}

const bills = [124, 48, 268];
const finalAmounts = [];

finalAmounts.push(calculateTip(bills[0]));
finalAmounts.push(calculateTip(bills[1]));
finalAmounts.push(calculateTip(bills[2]));

console.log('BILLS:');
console.log(bills);

console.log('FINAL AMOUNTS:');
console.log(finalAmounts);


//coding challenge 4
console.log('\nCODING CHALLENGE 4');

const mark = {
    name: 'Mark',
    mass: 70,
    height: 1.8,
    getBMI: function () {
        return this.BMI = this.mass / (this.height * this.height);
    }
}

const john = {
    name: 'John',
    mass: 65,
    height: 1.72,
    getBMI: function () {
        return this.BMI = this.mass / (this.height * this.height);
    }
}

if (mark.getBMI() > john.getBMI()) {
    console.log(mark.name + ' has bigger BMI (' + mark.BMI + ').');
} else if (john.BMI > mark.BMI) {
    console.log(john.name + ' has bigger BMI (' + john.BMI + ').');
} else {
    console.log('Both have the same BMI');
}


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



