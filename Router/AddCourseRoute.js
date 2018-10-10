const route = require("express").Router()
const controlleradd = require('../Controller/AddCoursesController')


route.post("/Add",(req,res)=>{
    // console.log(req.body)
    var CourseBranch = req.body.coursebranch
    var CourseType = req.body.coursetype
    var CourseCode = req.body.coursecode
    var CourseName = req.body.coursename
    var CourseSemester = req.body.coursesemester

    controlleradd.AddCourse(CourseCode,CourseName,CourseBranch,CourseType,CourseSemester).then((data)=>{
        res.send({
            Message : CourseCode + " with "+CourseName + " is succesfully Added ",
            Token : 0
        })
    }).catch((err)=>{
        res.send({
            Message: CourseCode +" with "+CourseName + " in "+CourseSemester+" Sem "+" is already Inserted " ,
            Token: 1
        })
    })
})



route.get("/GetCourse",(req,res)=>{
    // console.log(req.query)

    var CourseObject= {
        CourseBranch : req.query.coursebranch,
        CourseType :  req.query.coursetype,
        CourseSemester: req.query.coursesemester
    }


    controlleradd.ShowCourses(req.query.coursebranch,req.query.coursetype,req.query.coursesemester).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send("error")
    })

})






module.exports=
    route
