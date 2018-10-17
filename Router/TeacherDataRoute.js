const route = require("express").Router()
const controllerfetch = require('../Controller/TeacherDataController')



route.post("/GetTeacher",(req,resp)=>{
    // console.log(req.body)
    // console.log(req.body.TeacherBranch)
    controllerfetch.getTeacher(req.body.TeacherBranch).then((data)=>{
        // console.log(data)
        resp.send(data)
    }).catch((err)=>{
        resp.send( err)
    })
})

route.get("/")





























module.exports=route