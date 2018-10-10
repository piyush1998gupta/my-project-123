const route = require("express").Router()
const controlleradd = require('../Controller/AddTeacherController')


route.post("/Add",(req,res)=>{
    // console.log(req.body)
    var TeacherBranch = req.body.teacherbranch

    var TeacherId = req.body.teacherid
    var TeacherName = req.body.teachername
    var TeacherRoom = req.body.teacherroom

    controlleradd.AddTeacher(TeacherBranch,TeacherId,TeacherName,TeacherRoom).then((data)=>{
        res.send({
            Message : TeacherId + " with "+TeacherName + " is succesfully Added ",
            Token : 0
        })
    }).catch((err)=>{
        res.send({
            Message: TeacherName +" with same "+TeacherId+ " in "+TeacherBranch+" Branch"+" is already exist" ,
            Token: 1
        })
    })
})



route.get("/GetTeacher",(req,res)=>{
    // console.log(req.query)

    var CourseObject= {
        TeacherBranch : req.query.teacherbranch,

    }


    controlleradd.ShowTeachers(req.query.teacherbranch).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send("error")
    })

})






module.exports=
    route
