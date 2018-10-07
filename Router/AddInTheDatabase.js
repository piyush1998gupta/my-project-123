const route = require('express').Router()
const controllerAdd = require('../Controller/AddDatabase')



//get data of all the teachers
route.get("/TeacherName",(req,res)=>{
    controllerAdd.getallteachers(req.query.CourseName).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
})



//get all the courses
route.get("/CourseName",(req,res)=>{
    controllerAdd.getallcourses(req.query.Semester,req.query.CourseType).then((data)=>{

        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
})




//get all the Room Numbers
route.get("/RoomNumber",(req,res)=>{
    controllerAdd.getallrooms(req.query.RoomType).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
})


// adding in the  database

route.post("/add",async (req,res)=>{

    var CourseCode = await controllerAdd.getcoursecode(req.body.qcoursename).then((coursecode)=>{
        return coursecode[0].CourseCode;
    })
    var TeacherId = await controllerAdd.getteacherid(req.body.qteachername).then((teacherid)=>{
        return teacherid[0].TeacherId;
    })
    var RoomId = req.body.qroomno;
    var EndTime= req.body.qendtime
    var StartTime=req.body.qstarttime
    var   Semester= req.body.qsemesterselect
    var   Day=req.body.qday
    var  CourseType= req.body.qroomtype
    var Message,classarray=[]




    var roomavailable = await controllerAdd.checkroomisavailable(RoomId,StartTime,EndTime,Day)
    var roommessage=""
    if(roomavailable.length!=0){
        roommessage = "Room number :- "+RoomId + " is not free from "+StartTime+" to "+roomavailable[0].EndTime +" "
        // console.log(roommessage)
    }
    var teachermessage=""
    var teacheravailable = await controllerAdd.checkteacherisavailable(TeacherId,StartTime,EndTime,Day)
    if(teacheravailable.length!=0){
        if(roommessage!=""){
            teachermessage= " And "+ req.body.qteachername + " is also not free from "+StartTime +" to " + teacheravailable[0].EndTime +" !"
        }else {
            teachermessage= " "+ req.body.qteachername + " is not free from "+StartTime +" to " + teacheravailable[0].EndTime +" !"

        }
        // console.log(teachermessage)
    }




    if(roomavailable.length==0 && teacheravailable.length==0){
        // console.log("add")


        if(req.body.qclassgroup=="C-123"||req.body.qclassgroup=="C-456"||req.body.qclassgroup=="C-789"||req.body.qclassgroup=="C-111213") {
            //  console.log(req.body.qclassgroup)
            var cla = (req.body.qclassgroup).split("-")
            if (cla[1]=="111213"){
                classarray[0]=11,classarray[1]=12,classarray[2]=13
            }else {

                classarray = cla[1].split("")

            }
            for (i = 0; i < 3; i++) {
                var qclassgroup = "C-" + classarray[i];
                //console.log(qclassgroup)
                //console.log(req.body)

                Message = await controllerAdd.addinthedatabase(Semester,qclassgroup,Day,StartTime,EndTime,RoomId,TeacherId,CourseCode,CourseType).then((result)=>{
                    return result;
                }).catch((err)=>{
                    return err;
                })
                if(Message == "Duplicate Entry"){
                    break;
                }




            }
        }
        else{

            Message = await controllerAdd.addinthedatabase(Semester,req.body.qclassgroup,Day,StartTime,EndTime,RoomId,TeacherId,CourseCode,CourseType).then((result)=>{
                return result
            }).catch((err)=>{
                return err
            })





        }
    }else{
        Message=roommessage + teachermessage


    }





    //console.log(req.body.qclassgroup)


    if (Message == "Duplicate Entry"){
        // console.log(" if")
        res.send({
            result : Semester+"-"+req.body.qclassgroup+" is already entered for the time slot "+StartTime+" to " + EndTime + " for "+Day+ " !",
            token : 0
        })
    }else if(roomavailable.length!=0 || teacheravailable.length!=0){
        // console.log("inside else if")
        res.send({
            result : Message,
            token :0
        })
    }
    else {
        // console.log("inside else ")
        res.send({
            result : "Successfully inserted for "+Semester+"-"+req.body.qclassgroup+" for "+StartTime+" to " + EndTime+ " for "+Day,
            token :1
        })
    }




})





module.exports = route ;