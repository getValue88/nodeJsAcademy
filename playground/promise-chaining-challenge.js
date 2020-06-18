require('../week3/task-manager/src/db/mongoose');
const Task = require('../week3/task-manager/src/models/Task');

Task.findByIdAndDelete('5ee8c5c1800be62e987b669e').then(task => {
    console.log(task);
    return Task.countDocuments({ completed: false });

}).then(result => console.log(result))
    .catch(e => console.log(e));