const controllerquery = require("../Controller/MainQuery")
const route = require("express").Router()
route.post("/Query",(req,res)=>{

    var Semester,RoomType,RoomNo,ClassGroup,Day,StartTime,Endtime,CourseName,TeacherName
    Semester= req.body.ssemester
    RoomType= req.body.sroomtype
    RoomNo = req.body.sroomno
    Day = req.body.sday
    ClassGroup = req.body.sclassgroup
    StartTime = req.body.sstarttime
    Endtime = req.body.sendtime
    CourseName = req.body.scoursename
    TeacherName = req.body.steachername

    var query1 = {
        semester : Semester,
        roomtype : RoomType,
        roomno : RoomNo,
        day : Day,
        classgroup : ClassGroup,
        starttime : StartTime,
        endtime : Endtime,
        coursename : CourseName,
        teachername : TeacherName
    }
// console.log(query1)
    controllerquery.getallvalues(query1)


    res.send("his")
})

module.exports=route;

