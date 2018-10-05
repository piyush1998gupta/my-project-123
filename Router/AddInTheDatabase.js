const route = require('express').Router()
const controller = require('../Controller/AddDatabase')



//get data of all the teachers
route.get("/TeacherName",(req,res)=>{
    controller.getallteachers(req.query.CourseName).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
})
//get all the courses
route.get("/CourseName",(req,res)=>{
    controller.getallcourses(req.query.Semester,req.query.CourseType).then((data)=>{

        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
})

//get all the Room Numbers
route.get("/RoomNumber",(req,res)=>{
    controller.getallrooms(req.query.RoomType).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
})




route.post("/add",async (req,res)=>{

    var CourseCode = await controller.getcoursecode(req.body.qcoursename).then((coursecode)=>{
        return coursecode[0].CourseCode;
    })
    var TeacherId = await controller.getteacherid(req.body.qteachername).then((teacherid)=>{
        return teacherid[0].TeacherId;
    })
    var RoomId = req.body.qroomno;
    var EndTime= req.body.qendtime
    var StartTime=req.body.qstarttime
    var   Semester= req.body.qsemesterselect
    var   Day=req.body.qday
    var  CourseType= req.body.qroomtype
    var Message,classarray=[]
    console.log(req.body.qclassgroup)
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

            Message = await controller.addinthedatabase(Semester,qclassgroup,Day,StartTime,EndTime,RoomId,TeacherId,CourseCode,CourseType).then((result)=>{
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

       Message = await controller.addinthedatabase(Semester,req.body.qclassgroup,Day,StartTime,EndTime,RoomId,TeacherId,CourseCode,CourseType).then((result)=>{
            return result
        }).catch((err)=>{
            return err
        })





    }

    if (Message == "Duplicate Entry"){
        res.send({
            result : Semester+"-"+req.body.qclassgroup+" is already entered for the time slot "+StartTime+" to " + EndTime + " for "+Day+ " !",
            token : 0
        })
    }else {
        res.send({
            result : "Successfully inserted for "+Semester+"-"+req.body.qclassgroup+" for "+StartTime+" to " + EndTime+ " for "+Day,
            token :1
        })
    }



































})




module.exports = route ;