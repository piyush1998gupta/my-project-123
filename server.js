const express = require("express")
const app = express();
const DBServer = require("./DB/DBServer")

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/AddInTheDatabase',express.static(__dirname+"/public_static/AddInTheDatabase.html"))
app.use('/',express.static(__dirname+"/public_static"))
app.use("/FetchingQuery",require("./Router/FetchingQuery"))
app.use('/AddInTheDatabase',require("./Router/AddInTheDatabase"))


app.listen(9090,(err)=>{
    console.log("Server Started")
})