const Course=require('../models/course.model');

require('dotenv').config();

module.exports.createCourse=async (req,res,next)=> {
    console.log(req.files)
    if (req.files) {
        // console.log('in body',req.body)
        const file = req.files.video;
        await file.mv(`./app/assets/uploads/` + file.name);
        req.body.video = './app/assets/uploads/' + file.name;
        const course = await Course.create(req.body);
        if (course) {
            res.status(201).json({
                status: 'success',
                data: {
                    course
                }
            })
            next();
        }
    }
    else{
        res.status(401).json({
            status:'failed',
            message:'Error Creating Course'
        })
        next();
    }
};

module.exports.getAllCourses=async (req,res,next)=>{
    const course=await Course.find();
    if(course){
        res.status(200).json({
            status:'success',
            data:{
                course
            }
        })
    }
    else{
        res.status(401).json({
            status:'failed',
            message:'Error getting Courses'
        })
    }
    next();
}

module.exports.getCourse=async (req,res,next)=>{

    const course=await Course.find({name:req.params.name});

    if(course?.length>0){
        res.status(302).json({
            status:'success',
            data:{
                course
            }
        })
    }
    else{
        res.status(404).json({
            status:'failed',
            message:'no record found'
        })
    }
    next();

}

module.exports.editCourse=async (req,res,next)=>{
    const course=await Course.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    });
    console.log(course)
    if(course){
        res.status(302).json({
            status:'updated',
            data:{
                course
            }
        })
    }
    else{
        res.status(404).json({
            status:'failed',
            message:'No Record Found'
        })
    }
    next();
}

module.exports.deleteCourse=async (req,res,next)=>{
const course=await Course.findByIdAndDelete(req.params.id);
    if(course){
        res.status(302).json({
            status:'deleted',
            data:{
                course
            }
        })
    }
    else{
        res.status(404).json({
            status:'failed',
            message:'No Record Found'
        })
    }
next();
}