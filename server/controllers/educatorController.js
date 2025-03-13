import {clerkClient } from '@clerk/express'
import {v2 as cloudinary} from 'cloudinary' 

import Course from '../models/course.js'
import { Purchase } from '../models/purchase.js'
import User from '../models/user.js'

export const updateRoleToEducator=async(req,res)=>{
    try {
        const userId=req.auth.userId
        await clerkClient.users.updateUserMetadata(userId,{
            publicMetadata:{
                role:'educator',   
                     }
        })
        res.json({success:true,message:"You can publish a course"})
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
} 

// add course
export const addCourse=async(req,res)=>{
    try {
        const {courseData}=req.body
        const imageFile=req.file
        const educatorId=req.auth.userId
        if(!imageFile){
            return res.json({success:false,message:'Thumbnail not Attached'})

        }
        const parsedCourseData=await JSON.parse(courseData)
        parsedCourseData.educator=educatorId 
        const newCourse =await Course.create(parsedCourseData)
        const imageUpload=await cloudinary.uploader.upload(imageFile.path)
        newCourse.courseThumbnail=imageUpload.secure_url
        await newCourse.save()
        res.json({success:true,message:'Course addedd'})
    } catch (error) {
        console.error(error)
        res.json({success:false,message:error.message})
        
    }

} 


// get educator courses

export const getEducatorCourses=async(req ,res)=>{
try {
    const educator=req.auth.userId;
    const courses=await Course.find({educator})
/*    if(courses.length >0){console.log("There are courses")}
    else{console.log("There are no courses")}*/
    res.json({success:true,courses})

}
 catch (error) {
    res.json({success:false,message:error.message})
    
}

}

// Getting educator dashboard data
 
export const educatorDashboardData=async(req,res)=>{
    try {
        const educator=req.auth.userId;
        console.log('Edu id: ',educator)

        const courses=await Course.find({educator});
        const totalCourses=courses.length;
        console.log("Courses Found:", courses.length); // Log course count

        const courseIds=courses.map(course=>course._id)

        //calculating earnings
        const purchases=await Purchase.find({
            courseId:{$in:courseIds},
            status:'completed'
        });
        const totalEarnings=purchases.reduce((sum,purchase)=>sum+purchase.amount,0);
        //getting unique students enrolled 
        const enrolledStudentsData=[];
        
        for(const course of courses){
            const students=await User.find({
                _id:{$in:course.enrolledStudents}
               
            }, 'name imageUrl');

            students.forEach(student=>{
                enrolledStudentsData.push({
                    courseTitle:course.courseTitle,
                    student
                });
            });
        }

        const dashboardData = {
            totalEarnings,
            enrolledStudentsData,
            totalCourses
        };
        console.log(dashboardData)
        res.json({success:true,dashboardData})

    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}

export const getEnrolledStudentsData=async(req,res)=>{
    try {
        const educator=req.auth.userId;
        const courses=await Course.find({educator});
        const courseIds=courses.map(course=>course._id);
        
        const purchases=await Purchase.find({
            courseId:{$in:courseIds},
            status:'completed',
        }).populate('userId','name igameUrl').populate('courseId','courseTitle')

        const enrolledStudents=purchases.map(purchase=>({
            student:purchase.userId,
            courseTitle:purchase.courseId.courseTitle,
            purchaseDate:purchase.createdAt
        }));
        res.json({success:true,enrolledStudents})


    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}


