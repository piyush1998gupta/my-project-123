const route = require("express").Router()
const controllerteacher = require("../Controller/TeacherQuery")

route.get("/GetTeachers",(req,res)=>{
    var TeacherBranch = req.query.TeacherBranch;
    var TeacherCourse = req.query.TeacherCourse;
    // console.log(req.query)
    controllerteacher.getTeacher(TeacherBranch,TeacherCourse).then((data)=>{
        // console.log(data)
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})

route.get("/GetFreeTeachers",(req,res)=>{
    var StartTime = req.query.StartTime;
    var EndTime = req.query.EndTime;
    var TeacherBranch = req.query.TeacherBranch;
    var  Day = req.query.Day;
    var CourseName= req.query.CourseName;


        controllerteacher.getfreeTeachers(Day,StartTime,EndTime,CourseName,TeacherBranch).then((data)=>{
            res.send(data)
        })

})



route.get("/GetCourses",(req,res)=>{
    var TeacherBranch = req.query.TeacherBranch;
    var TeacherSemester = req.query.TeacherSemester;
    // console.log(req.query)
    controllerteacher.getCourse(TeacherBranch,TeacherSemester).then((data)=>{
        // console.log(data)
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})
module.exports = route