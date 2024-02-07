const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    username:{
        type:String
    },
    message: {
        type: String,
        required: true,
        maxlength: 255
    }
})

module.exports = mongoose.model("Message",messageSchema)