const route = require("express").Router()
const controlleradd = require("../Controller/AddRooms_Courses_Teacher")


route.post("/Add",(req,res)=>{
           // console.log(req.body)
            var RoomBranch = req.body.roombranch
        var RoomType = req.body.roomtype
            var RoomId = req.body.roomnumber
            controlleradd.AddRoom(RoomId,RoomBranch,RoomType).then((data)=>{
                res.send({
                    Message : RoomId + " is succesfully Added ",
                    Token : 0
                })
            }).catch((err)=>{
                   res.send({
                       Message: RoomId + " is already Inserted ",
                       Token: 1
                   })
            })

})


route.get("/GetRoom",(req,res)=>{

    var RoomObject= {
        RoomBranch : req.query.roombranch,
        RoomType :  req.query.roomtype
    }


    controlleradd.ShowRoom(req.query.roombranch,req.query.roomtype).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send("error")
    })

})



module.exports= route