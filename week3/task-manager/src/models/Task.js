const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    image: {
        type: Buffer,
        default: undefined
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { //Schema options
    timestamps: true
});


const Task = mongoose.model('Task', taskSchema);


module.exports = Task;