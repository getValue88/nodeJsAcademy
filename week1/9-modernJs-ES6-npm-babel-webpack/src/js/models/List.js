import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    addItem(count, unit, ingredient) {
        const newItem = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }

        this.items.push(newItem);
        return newItem;
    }

    deleteItem(id) {
        this.items = this.items.filter(item => item.id !== id);
    }


    updateCount(id, newCount) {
        const foundItem = this.items.find(item => item.id === id);
        if (foundItem) foundItem.count = newCount;
    }
}