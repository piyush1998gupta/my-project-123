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


    return new Promise(async (resolve,reject)=>{
        await connection.then(async (conn)=>{
            var que = "INSERT INTO `MasterCseTable`(`Semester`, `Group_`, `Day`, `StartTime`, `EndTime`, `RoomId`, `TeacherId`, `CourseCode`,`ClassType`) VALUES (?,?,?,?,?,?,?,?,?)"
            conn.query(que,[Semester,Group,Day,StartTime,EndTime,RoomId,TeacherId,CourseCode,ClassType]).then(([row,field])=>{

                resolve ("Successfully inserted In The Database");

            }).catch((err)=>{
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


module.exports={
getallcourses,getallrooms,getallteachers,addinthedatabase,getcoursecode,getteacherid
}

