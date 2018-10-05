const mysql = require ('../node_modules/mysql2/promise')
const bluebird = require("../node_modules/bluebird")
const connection = mysql.createConnection({
    host:"localhost",
    user : "timetable",
    password: "pgupta",
    database: "College",
    Promise :bluebird,


})





module.exports = {mysql,connection,bluebird};