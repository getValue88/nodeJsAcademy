//CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

class Element {
    constructor(name, builtYear) {
        this.name = name;
        this.builtYear = builtYear;
    }
};


class Park extends Element {
    constructor(name, builtYear, treeQuantity, area) {
        super(name, builtYear);
        this.treeQuantity = treeQuantity;
        this.area = area;
    }


    getTreeDensity() {
        const density = this.treeQuantity / this.area;
        console.log(`${this.name} has a tree density of ${density} trees per square km.`);
    }

    calcAge() {
        return new Date().getFullYear() - this.builtYear;
    }
};


class Street extends Element {
    constructor(name, builtYear, length = 3) {
        super(name, builtYear);
        this.length = length;
    }


    getLength() {
        return this.length;
    }

    classify(){
        const classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');
        
        console.log(`${this.name}, built in ${this.builtYear}, is a ${classification.get(this.length)} street.`);
    }
};


function parkReport(parks) {
    let sumAges = 0, ageAvg;

    console.log('PARKS REPORT');
    console.log('-----------------------------\n');

    parks.forEach(park => {
        sumAges += park.calcAge();

        //1. Tree density of each park
        park.getTreeDensity();

        //3. The name of the park that has more than 1000 trees
        if (park.treeQuantity > 1000) {
            console.log(`${park.name} has more than 1000 trees`);
        }
    });

    //2. Average age of each town's park
    ageAvg = sumAges / parks.length;
    console.log(`Our ${parks.length} parks have an average age of ${ageAvg} years.`);

    console.log('-----------------------------\n');
}


function streetReport(streets) {
    let sumLength = 0, avgLength;

    console.log('STREETS REPORT');
    console.log('-----------------------------\n');

    streets.forEach(street => {
        sumLength += street.getLength();

        //5. Size classification of all streets: tiny/small/normal/big/huge
        street.classify();
    });

    //4. Total and average length of the town's streets
    avgLength = sumLength / streets.length;
    console.log(`Our ${streets.length} streets have a total length of ${sumLength} km and an average length of ${avgLength} km.`);
}


const parks = [
    new Park('Green Park', 1932, 888, 31),
    new Park('National Park', 1885, 764, 16),
    new Park('Ocean Park', 1945, 1232, 10)
];

const streets = [
    new Street('Ocean Avenue', 1926, 5),
    new Street('Evergreen Street', 1928),
    new Street('4th Street', 1956, 2),
    new Street('Sunset Boulevard', 1933, 4)
]


parkReport(parks);
streetReport(streets);


