setTimeout(() => {
    console.log('Two seconds are up.');
}, 2000);


const names = ['Andrew', 'Jen', 'Jess'];
const shortNames = names.filter(name => name.length <= 4);

const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        };

        callback(data);
    }, 2000);
};

geocode('Philadelphia', (data) => {
    console.log(data);
});



//CHALLENGE

const sum = (n1, n2, callback) => {
    setTimeout(() => {
        callback(n1 + n2);
    }, 2000);
}

sum(2, 3, (sum) => {
    console.log(sum);
});