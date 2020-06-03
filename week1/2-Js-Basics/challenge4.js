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