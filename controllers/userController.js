// const asyncHandler = require("express-async-handler");

// //@desc Register a user
// //@route Get /api/users/register
// //@access public
// const registerUser =asyncHandler(async(req,res)=>{
//     res.json({message: "Register the user"});
// }); //from here

// const loginUser =asyncHandler(async(req,res) =>{
//     res.json({message:" login user"});
// })

// const currentUser =asyncHandler (async(req,res) =>{
//     res.json({message:" current user information"});

// })
// module.exports ={registerUser,loginUser,currentUser};

// above code is fine for creating the basic api without connecting to actual database
//below codes modifies them and adds functionality according to the model created
//-------------------------------------------------------------------------------

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Register a user
//@route Get /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error(" User already registered!");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password :", hashedPassword);

    // we have hashed password now we will create a new usser sing our model   
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log(`user created ${user}`);
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error(" User data is not valid");
    }
    res.json({ message: "Register the user" });
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error(" All fields are mandotory");
    }
    const user = await User.findOne({ email });
    //compare password with hashedpassword
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "5m" }
        );
        res.status(200).json({ accessToken });
    }else {
        res.status(401)
        throw new Error("email or password is not valid");
    }
    
});
//@desc Current user info
// @route POST?api/ users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);

})
module.exports = { registerUser, loginUser, currentUser }; 