const express = require("express")
const app = express();
const DBServer = require("./DB/DBServer")

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/AddInTheDatabase',express.static(__dirname+"/public_static/AddInTheDatabase.html"))
app.use('/AddCourse',express.static(__dirname+"/public_static/AddCourse.html"))
app.use('/AddRooms',express.static(__dirname+"/public_static/AddRoom.html"))
app.use('/AddTeacher',express.static(__dirname+"/public_static/AddTeacher.html"))
app.use('/',express.static(__dirname+"/public_static"))
app.use("/FetchingQuery",require("./Router/FetchingQuery"))
app.use('/AddInTheDatabase',require("./Router/AddInTheDatabase"))
app.use("/AddRoom",require("./Router/AddRoomRoute"))
app.use("/FetchingQuery",express.static(__dirname+"/public_static/FetchingQuery.html"))
app.use("/AddCourse",require("./Router/AddCourseRoute"))
app.use("/AddTeacher",require("./Router/AddTeacherRouter"))
app.use("/TeacherData",require("./Router/TeacherDataRoute"))
app.use("/TeacherData",express.static(__dirname+"/public_static/TeacherData.html"))
app.use("/TeacherQuery",require("./Router/TeacherQueryRoute"))
app.use("/TeacherQuery",express.static(__dirname+"/public_static/TeacherQuery.html"))
app.use("/RoomQuery",require("./Router/RoomQueryRoute"))
app.use("/RoomQuery",express.static(__dirname+"/public_static/RoomQuery.html"))



app.listen(9099,(err)=>{
    console.log("Server Started")
})