const mongoose=require('mongoose');

const courseSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Course must have a Name']
},
    category:{
        type:String,
        default:'web development'
    },
    price:{
        type:Number
    },
    duration:{
        type:String
    },
    description:{
        type:String
    },
    video:{
        type:String
    }
})

const course=mongoose.model('courses',courseSchema);

module.exports= course;