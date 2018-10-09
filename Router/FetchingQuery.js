const controllerquery = require("../Controller/MainQueryFetch")
const controlleroptions = require("../Controller/OptionQuery")
const controllerquerydelete = require("../Controller/MainQueryDelete")
const route = require("express").Router()


route.get("/GetRooms",(req,res)=>{
    // console.log(req.query.RoomBranch)
    const Queryobject = {
        RoomBranch: req.query.RoomBranch,
        RoomType : req.query.RoomType
    }

    // console.log(Queryobject)
    controlleroptions.getallRooms(Queryobject).then((data)=>{
        res.send(data)
    })






})



route.get("/GetCourses",(req,res)=>{
    // console.log(req.query.RoomBranch)
    const Queryobject = {
        CourseBranch : req.query.Coursebranch,
        CourseType : req.query.Coursetype,
        CourseSemester: req.query.Coursesemester
    }

    // console.log(Queryobject)
    controlleroptions.getallCourses(Queryobject).then((data)=>{
        // console.log(data)
        res.send(data)
    })






})


route.get("/GetTeachers",(req,res)=>{

    var Query = {
        TeacherBranch : req.query.Teacherbranch,
        CourseName : req.query.Coursename
    }

    controlleroptions.getallTeachers(Query).then((data)=>{
        // console.log(data)
        res.send(data)
    })
})







route.post("/QuerySearch",(req,res)=>{

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
    controllerquery.getallvalues(query1).then((result)=>{
      //  console.log(result)
       res.send([result,query1]);
    })



})


route.post("/dumy",(req,res)=>{
    console.log(req.body)
})




route.post("/QueryDelete",(req,res)=>{

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
console.log(query1)
    controllerquerydelete.deleteallvaluesbasedoncondition(query1).then((result)=>{
        //  console.log(result)
        res.send("succesfully deleted ");
    }).catch((err)=>{
        console.log(err)
        res.send("err")
    })



})

module.exports=route;

