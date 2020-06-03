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