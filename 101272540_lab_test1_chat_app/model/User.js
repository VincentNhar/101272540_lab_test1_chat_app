const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    confirm_password:{
        type: String,
        required: true,
        validate: {
            validator: function(value){
                return value === this.password
            },
            message: 'Passwords do not match!'
        }
    }
})

module.exports = mongoose.model("User",userSchema)