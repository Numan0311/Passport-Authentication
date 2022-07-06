const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
username:{
    type:String,
    unique:true,
    index: true,
    required:[true,'A user must have a username']
},
    fullname:{
        type:String,
        required:[true,'A user must have a name']
    },
    email:{
        type:String,
        required:[true,'Please Provide Email']
    },
    password:{
    type:String,
    length:100,
    required:[true,'Enter Password']
    }
})
userSchema.methods.correctPassword=async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
}
const Users=mongoose.model('users',userSchema)
module.exports=Users;