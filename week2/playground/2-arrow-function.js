/*
const square = function (x) {
    return x * x;
}
*/

// const square = x => x * x;

// console.log(square(3));


/*
// for object methods use this
const event = {
    name: 'Birthday Party',
    guestList: ['Andrew', 'Jen', 'Mike'],
    printGuestList() { // for object methods use this sintax to keep the scope of "this" pointing to the parent object
        console.log('Guest list for ' + this.name);

        this.guestList.forEach(guest => console.log(guest + " is attending" + this.name)); //for callbacks use arrow sintax to keep the scope of "this" to parent function
    }
}

event.printGuestList();
*/