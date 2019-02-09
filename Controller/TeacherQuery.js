const {connection} = require("../DB/DBServer")


async function getCourse(Branch,Semester){
    return new Promise(async (resolve,reject)=>{
        await connection.then((conn)=>{
            var Query = "Select CourseName from AddCourse where CourseBranch = ? and CourseSemester = ?"
            conn.query(Query,[Branch,Semester]).then(([row,field])=>{
                // console.log(row)
                resolve (row)
            }).catch((err)=>{
                reject(err)
            })
        })
    })


}

// getCourse("CSE",5).then((data)=>{
//     console.log(data)
// })


async function getTeacher(Branch,CourseName){
    var Query;
    return new Promise((resolve,reject)=>{
            if(CourseName=="All"){
                Query = "select TeacherName,TeacherId from AddTeacher where TeacherBranch = ? "
                // console.log(Query)
                connection.then((conn)=>{
                    conn.query(Query,[Branch]).then(([row,field])=>{
                        // console.log(row)
                        resolve(row)
                    }).catch((err)=>{
                        reject(err)
                    })
                })
            }else{
                Query = "select AddTeacher.TeacherName,AddTeacher.TeacherId from AddTeacher join AddCourse join TeacherCourse where AddTeacher.TeacherId=TeacherCourse.TeacherId and AddCourse.CourseCode=TeacherCourse.CourseCode and AddCourse.CourseName = ? and AddCourse.CourseBranch= ?"
                connection.then((conn)=>{
                    conn.query(Query,[CourseName,Branch]).then(([row,field])=>{
                        resolve(row)
                    }).catch((err)=>{
                        reject(err)
                    })
                })
            }

    })
            
  
}
//
// getTeacher("CSE","JAVA").then((data)=>{
//     console.log(data)
// }).catch((err)=>{
//     console.log(err)
// })


async function getfreeTeachers(Day,StartTime,EndTime,CourseName,Branch){
    var newCourseName,Branchname,querypart=""
    if(CourseName=='All'){

        Branchname=Branch

        querypart=" WHERE AddTeacher.TeacherBranch = '"+ Branchname+"' And AddTeacher.TeacherId"

    }else{

        newCourseName=CourseName;

        querypart = "JOIN TeacherCourse join AddCourse WHERE TeacherCourse.TeacherId=AddTeacher.TeacherId AND TeacherCourse.CourseCode=AddCourse.CourseCode AND AddCourse.CourseName = '"+ CourseName + "' AND TeacherCourse.TeacherId "
    }


    var Query = "SELECT DISTINCT AddTeacher.TeacherName From AddTeacher " + querypart +"  NOT IN\n" +
        "(SELECT DISTINCT AddTeacher.TeacherId FROM `MasterCseTable` JOIN AddTeacher  WHERE MasterCseTable.TeacherId=AddTeacher.TeacherId AND ((MasterCseTable.StartTime>= ? AND MasterCseTable.StartTime< ?) OR ( MasterCseTable.StartTime < '"+ StartTime +"' And MasterCseTable.EndTime > '"+ StartTime +"' And MasterCseTable.Classtype= 'Lab' )) AND MasterCseTable.Day= ?)"


// console.log(Query)

    return new Promise(async (resolve,reject)=>{
        await connection.then((conn)=>{
            conn.query(Query,[StartTime,EndTime,Day]).then(([row,field])=>{

                // console.log(row)
                // console.log(Query)

                resolve(row)
            }).catch((err)=>{
                reject(err);
            })
        })
    })
}


 // getfreeTeachers("Monday","13:15:00","14:05:00","ADA","ECE")




async function getteacherdata(queryobject){
    // console.log(queryobject)
    var SemeseterSymbol,SemesterValue,RoomTypeSymbol,RoomTypeValue,RoomNoSymbol,RoomNoValue,DaySymbol,DayValue,ClassGroupSymbol,ClassGroupvalue,StartTimeSymbol,StartTimeValue,EndTimeSymbol,EndTimeValue,CourseNameSymbol,CourseNameValue,TeacherNameSymbol,TeacherNameValue
    var equalto = "="
    var notequalto = "<>"
    var NewClassGroupValue


   





    if(queryobject.day=="All"){
        DaySymbol=notequalto
        DayValue="a"
    }else{
        DaySymbol=equalto
        DayValue=queryobject.day
    }



    if(queryobject.starttime =="All"){
        StartTimeSymbol=">="
        StartTimeValue='09:00:00'
    }else{
        StartTimeSymbol=">="
        StartTimeValue=queryobject.starttime
    }

    if(queryobject.endtime=="All"){
        EndTimeSymbol= '<='
        EndTimeValue='17:00:00'
    }else{
        EndTimeSymbol="<"
        EndTimeValue=queryobject.endtime
    }
    if(queryobject.coursename=="All"){
        CourseNameSymbol=notequalto
        CourseNameValue="a"
    }else{
        CourseNameSymbol=equalto
        CourseNameValue=queryobject.coursename
    }

    if(queryobject.teachername=="All"){
        TeacherNameSymbol=notequalto
        TeacherNameValue="a"
    }else{
        TeacherNameSymbol=equalto
        TeacherNameValue=queryobject.teachername
    }






    return new Promise (async (resolve,reject)=>{
        await connection.then((conn)=>{

            var MainQuery = " SELECT MasterCseTable.Semester,MasterCseTable.Group_,MasterCseTable.Day, MasterCseTable.StartTime," +
                "MasterCseTable.EndTime ,MasterCseTable.RoomId,MasterCseTable.ClassType, MasterCseTable.CourseCode,MasterCseTable.TeacherId" +
                ",AddTeacher.TeacherName,AddCourse.CourseName FROM `MasterCseTable` JOIN " +
                "`AddCourse`JOIN`AddTeacher`JOIN `AddRoom`WHERE MasterCseTable.CourseCode=AddCourse.CourseCode AND " +
                "MasterCseTable.TeacherId=AddTeacher.TeacherId AND MasterCseTable.RoomId=AddRoom.RoomId AND" +
                // " MasterCseTable.Semester " + SemeseterSymbol +" '"+SemesterValue   + "' AND " +

                " MasterCseTable.Day "+ DaySymbol + " '" + DayValue +"' AND " +
                "( ( MasterCseTable.StartTime "+ StartTimeSymbol + " '" + StartTimeValue + "' AND " +
                " MasterCseTable.StartTime "+ EndTimeSymbol + " '" + EndTimeValue + "' ) OR " +
                "( MasterCseTable.StartTime < '"+ StartTimeValue +"' And MasterCseTable.EndTime > '"+ StartTimeValue +"' And MasterCseTable.Classtype= 'Lab' )"+ " )AND " +

                " AddCourse.CourseName " + CourseNameSymbol + " '" + CourseNameValue + "' AND " +
                " AddTeacher.TeacherName " + TeacherNameSymbol + " '"+ TeacherNameValue + "' "


            // console.log(MainQuery);



            conn.query(MainQuery).then(([row,field])=>{
                // console.log(row.length)
                resolve(row)
            }).catch((err)=>{
                reject (err)
            })
        })
    })
}

// var mad = {
//     day :  'Monday'  ,
//     starttime : '09:00:00' ,
//     endtime :   '17:00:00',
//     coursename:  'All',
//     teachername:    'All'
// }

//
// getteacherdata(mad).then((data)=>{
//     console.log(data[1])
// }).catch((err)=>{
//     console.log(err)
// })




async function getTeacherId(Branch,Name){
    var Query;
    return new Promise((resolve,reject)=>{

            Query = "select TeacherName,TeacherId from AddTeacher where TeacherBranch = ? And TeacherName= ?"
            // console.log(Query)
            connection.then((conn)=>{
                conn.query(Query,[Branch,Name]).then(([row,field])=>{
                    // console.log(row)
                    resolve(row)
                }).catch((err)=>{
                    reject(err)
                })
            })


    })


}

module.exports={
    getCourse,getTeacher,getfreeTeachers,getteacherdata,getTeacherId
}