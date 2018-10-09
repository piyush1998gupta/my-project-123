const {connection} = require("../DB/DBServer")


async function getallrooms(RoomType){


    return new Promise(async (resolve,reject)=>{
        await connection.then(async (conn)=>{
            conn.query("select * from AddRoom where RoomType = ?",[RoomType]).then(([row,field])=>{
                resolve (row);

            }).catch((err)=>{
                reject (err);
            })
        })
    })

}


async function getallteachers(CourseName){


    return new Promise(async (resolve,reject)=>{
        await connection.then(async (conn)=>{
            var que = "select TeacherName from AddTeacher JOIN AddCourse JOIN TeacherCourse where AddTeacher.TeacherId=TeacherCourse.TeacherId AND AddCourse.CourseCode=TeacherCourse.CourseCode AND CourseName=?"
            conn.query(que,[CourseName]).then(([row,field])=>{
                resolve (row);

            }).catch((err)=>{
                reject (err);
            })
        })
    })

}


async function getallcourses(Semester,CourseType){


    return new Promise(async (resolve,reject)=>{
        await connection.then(async (conn)=>{

            conn.query("select * from AddCourse where CourseSemester = ? And CourseType = ?",[Semester,CourseType]).then(([row,field])=>{

                resolve (row);

            }).catch((err)=>{
                reject (err);
            })
        })
    })

}


async function addinthedatabase(Semester,Group,Day,StartTime,EndTime,RoomId,TeacherId,CourseCode,ClassType){
// console.log(Semester)
// console.log(Group)
// console.log(Day)
// console.log(StartTime)
// console.log(EndTime)
//     console.log(RoomId)
//     console.log(TeacherId)
//     console.log(CourseCode)
//     console.log(ClassType)
    var SemesterType
if(Semester%2==0)
{
    SemesterType='EVEN'
}else{
    SemesterType='ODD'
}

    return new Promise(async (resolve,reject)=>{
        await connection.then(async (conn)=>{
            var que = "INSERT INTO `MasterCseTable`(`Semester`, `Group_`, `Day`, `StartTime`, `EndTime`, `RoomId`, `TeacherId`, `CourseCode`,`ClassType`,`SemesterType`) VALUES (?,?,?,?,?,?,?,?,?,?)"
            conn.query(que,[Semester,Group,Day,StartTime,EndTime,RoomId,TeacherId,CourseCode,ClassType,SemesterType]).then(([row,field])=>{
                // console.log(row)
                resolve ("Successfully inserted In The Database");

            }).catch((err)=>{
                // console.log(err)
                reject ("Duplicate Entry");
            })
        })
    })

}

async function getcoursecode(coursename){


    return new Promise(async (resolve,reject)=>{
        await connection.then(async (conn)=>{

            conn.query("select CourseCode from AddCourse where CourseName = ?",[coursename]).then(([row,filed])=>{
                resolve (row);

            }).catch((err)=>{
                reject (err);
            })
        })
    })

}



async function getteacherid(teachername){


    return new Promise(async (resolve,reject)=>{
        await connection.then(async (conn)=>{

            conn.query("select TeacherId from AddTeacher where TeacherName = ?",[teachername]).then(([row,field])=>{

                resolve (row);

            }).catch((err)=>{
                reject (err);
            })
        })
    })

}



async function checkteacherisavailable(TeacherId,StartTime,EndTime,Day){

    return  new Promise (async(resolve,reject)=>{
        await connection.then((conn)=>{
            var Query = "select * from MasterCseTable where TeacherId = ? And(( StartTime >= ? And StartTime< ? ) OR (  StartTime < ? And EndTime > ? And ClassType='lab' ))And Day = ? "

            conn.query(Query,[TeacherId,StartTime,EndTime,StartTime,StartTime,Day]).then(([row,field])=>{
                resolve(row)

            }).catch((err)=>{
                reject (err)
            })
        })
    })

}




async function checkroomisavailable(RoomId,StartTime,EndTime,Day){

    return  new Promise (async(resolve,reject)=>{
        await connection.then((conn)=>{
            var Query = "select * from MasterCseTable where RoomId = ? And(( StartTime >= ? And StartTime< ? ) OR ( StartTime < ? And EndTime > ? And ClassType='lab' ))And Day = ? "

            conn.query(Query,[RoomId,StartTime,EndTime,StartTime,StartTime,Day]).then(([row,field])=>{
                // console.log(row)
                resolve(row)

            }).catch((err)=>{
                reject (err)
            })
        })
    })




}


// checkroomisavailable(912,'10:05:00','11:45:00','Friday')




//console.log(checkteacherisavailable("Neetu","01:15:00","02:05:00","Monday"))
module.exports={
getallcourses,getallrooms,getallteachers,addinthedatabase,getcoursecode,getteacherid,checkteacherisavailable,checkroomisavailable
}

