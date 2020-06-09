//Object property shorthand

const name = 'Andrew';
const userAge = 27;

const user = {
    name,
    age: userAge,
    location: 'Philadelphia'
};

console.log(user);


//Object destructuring

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
};

/*
// objectProperty: newName   --> rename variable when destructuring
// objectProperty = value    --> set a default value if the property doesn't exists or its undefined
const { label: productLabel, stock, rating = 5 } = product;
console.log(productLabel + '\n' + stock + '\n' + rating);
*/

//destructuring in parameters
const transaction = (type, { label, stock }) => {
    console.log(type, label, stock);
}


transaction('order', product);