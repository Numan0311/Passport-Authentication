const Users=require('../models/user.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();




module.exports.getMe=async (req,res,next)=>{
    console.log(req.user);
    const user=await Users.find({_id:req.user.id});
    if(user){
        res.status(200).json({
            status:'success',
            user

        })
    }
}

module.exports.createUser=async (req,res,next)=> {
    req.body.password = await bcrypt.hash(req.body.password, 10);

    const user=await Users.create(req.body);
    // save user token
    res.status(201).json({
        status:'success',
        data: {
            user
        }
    })
};

module.exports.login=async (req,res,next)=>{
    const {username}=req.body;
    const user=await Users.findOne({username});

    const password=await user.correctPassword(req.body.password,user.password);

    if(!user||!password){
        res.status(401).send('User Not Found');
    }
    else {
        const token =jwt.sign({id:user._id},
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        res.status(200).json({
            status:'Logged In',
            token
        })
    }

}