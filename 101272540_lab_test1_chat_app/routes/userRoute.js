const express = require("express")
const UserModel = require("../model/User");
const routes = express.Router()

// SIGN UP
// http://localhost:3000/user/register
routes.post("/register", async (req,res) => {

    try{
        const { ...userData } = req.body;
        const newUser = new UserModel({
            ...userData
        }); 

        const result = await newUser.save();
        console.log(result)
        res.status(201).send("User Created");

    }catch(error){
        if(error.code == 11000){
            res.status(409).send("User already exists");
        }else if(error.name === 'ValidationError'){
            var errMsg =  "";

            Object.entries(error.errors).forEach(([key, value]) => {
                errMsg += `${value}\n\n`
            });

            res.status(422).send(errMsg)
        }
        else{
            console.log(error)
            res.status(500).send(error);
        }
    }

})

// LOG IN (QUERY PARAMETER)
// http://localhost:8080/api/v0.1/login
routes.post("/login", async (req,res) => {

    try{
        const { username , password } = req.body;

        // Checks if the identifier(email or username) or password is empty
         if(!username || !password){
             res.status(401).json({
                status: false,
                 message: `Inputs cannot be empty`
             })
             return
         }
        
         // Retrieves a user based on the identifier it received
        const user = await UserModel.findOne({username: username})
        
        if (user){
            // If user exist, checks if the user entered the correct password
            if(password == user.password){
                res.status(200).json({
                    status: true,
                    username: username,
                    password: password,
                    message: "User logged in successfully"
                })
            }else{
                res.status(401).json({
                    status: false,
                    message: 'Incorrect Password'})
            }
        }else{
            res.status(401).json({
                status: false,
                message: `Login failed`})
        }
    }catch(error){
        res.status(500).send(error)
        console.log(error)
    }
})

module.exports = routes