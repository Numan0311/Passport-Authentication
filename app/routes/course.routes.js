const express=require('express')
const courseController=require('../controllers/course.controller')
const authController=require('../middleware/auth.middleware')
const multer  = require('multer')
const upload = multer({ dest: '../assets/uploads' })

const router=express.Router();

// router.post('/addNewCourse',authController.authenticateToken,upload.single('image'),courseController.createCourse);

router.post('/addNewCourse',authController.authenticateToken,courseController.createCourse);
router.get('/getAllCourses',authController.authenticateToken,courseController.getAllCourses);
router.get('/getCourse/:name',authController.authenticateToken,courseController.getCourse)
    .patch('/editCourse/:id',authController.authenticateToken,courseController.editCourse)
    .delete('/deleteCourse/:id',authController.authenticateToken,courseController.deleteCourse)


module.exports=router;