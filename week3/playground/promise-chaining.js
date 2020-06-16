require('../task-manager/src/db/mongoose');
const User = require('../task-manager/src/models/User');
const Task = require('../task-manager/src/models/Task');

/* 
User.findByIdAndUpdate('5ee8bfe83de486125805226e', { age: 1 }).then(user => {
    console.log(user);
    return User.countDocuments({ age: 1 });

}).then(result => console.log(result))
    .catch(e => console.log(e));
 */

//async-await

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    return await User.countDocuments({ age });
}
/* 
updateAgeAndCount('5ee8bfe83de486125805226e', 5)
    .then(result => console.log(result))
    .catch(e => console.log(e));
 */

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    return await Task.countDocuments({ completed: false });
}


deleteTaskAndCount('5ee8dc6a92517e24d8070602')
    .then(result => console.log(result))
    .catch(e => console.log(e));