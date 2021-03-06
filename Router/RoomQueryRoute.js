const route = require("express").Router()
const controllerroom = require("../Controller/RoomQuery")

route.get("/GetRooms",(req,res)=>{
    var RoomBranch = req.query.RoomBranch;
    var RoomType = req.query.RoomType;
    // console.log(req.query)
    controllerroom.getRoomNumbers(RoomBranch,RoomType).then((data)=>{
        // console.log(data)
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})
route.get("/GetFreeRooms",(req,res)=>{
    var StartTime = req.query.StartTime;
    var EndTime = req.query.EndTime;
    var RoomBranch = req.query.RoomBranch;
    var  Day = req.query.Day;
    var RoomType= req.query.RoomType;


    controllerroom.getfreeRooms(Day,StartTime,EndTime,RoomType,RoomBranch).then((data)=>{
        res.send(data)
    })

})
route.post("/GetAllRoomsData",(req,res)=>{
    // console.log(req.body)
    var querydata =
        {
            starttime : req.body.roomstarttime,
            endtime : req.body.roomendtime,
            roomtype  : req.body.roomtype,
            day : req.body.roomday,
            roomno: req.body.roomnumber,
        }

    // console.log(querydata)
    controllerroom.getroomdata(querydata).then((data)=>{
        res.send([data,req.body])
    }).catch((err)=>{
        throw err;
    })
})
module.exports = route