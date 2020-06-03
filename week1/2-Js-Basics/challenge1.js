//coding challenge 1
console.log('CODING CHALLENGE 1');

function calcBMI(mass, height) {
    return mass / (height * height);
}


const markMass = 70,
    markHeight = 1.8,
    johnMass = 65,
    johnHeight = 1.72;

const markBMI = calcBMI(markMass, markHeight);
const johnBMI = calcBMI(johnMass, johnHeight);

const markBMIhigherThanJohnBMI = markBMI > johnBMI;

console.log('Is Mark\'s BMI higher than John\'s? ' + markBMIhigherThanJohnBMI);


