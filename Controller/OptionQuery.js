const {connection} = require("../DB/DBServer")


async function getallRooms(RoomQuery){
        var roombranchsymbol ,roombranchvalue , roomtypesymbol , roomtypevalue
    if(RoomQuery.RoomBranch == "All"){
        roombranchsymbol="<>"
      roombranchvalue="a"
    }else{
       roombranchsymbol="="
     roombranchvalue= RoomQuery.RoomBranch
    }
    if(RoomQuery.RoomType == "All"){
        roomtypesymbol="<>"
        roomtypevalue="a"
    }else{
        roomtypesymbol="="
        roomtypevalue=RoomQuery.RoomType
    }

    return new Promise(async (resolve,reject)=>{
        await connection.then(async (conn)=>{

            var Query = "select RoomId from AddRoom where RoomType " + roomtypesymbol +" '"+roomtypevalue+"' And RoomBranch "+roombranchsymbol+" '"+roombranchvalue+"' "
            // console.log(Query)
            conn.query(Query).then(([row,field])=>{
                resolve (row);

            }).catch((err)=>{
                reject (err);
            })
        })
    })

}




async function getallCourses(CourseQuery){
    var coursesemestersymbol ,coursesemestervalue , coursetypesymbol , coursetypevalue
    if(CourseQuery.CourseSemester == "All"){
        coursesemestersymbol="<>"
        coursesemestervalue="a"
    }else{
        coursesemestersymbol="="
        coursesemestervalue= CourseQuery.CourseSemester
    }
    if(CourseQuery.CourseType == "All"){
        coursetypesymbol="<>"
        coursetypevalue="a"
    }else{
        coursetypesymbol="="
        coursetypevalue=CourseQuery.CourseType
    }

    return new Promise(async (resolve,reject)=>{
        await connection.then(async (conn)=>{

            var Query = "select CourseName from AddCourse where CourseType " + coursetypesymbol +" '"+coursetypevalue+"' And CourseSemester "
                +coursesemestersymbol+" '"+coursesemestervalue+"' And CourseBranch = '" + CourseQuery.CourseBranch + "' "
            // console.log(Query)
            conn.query(Query).then(([row,field])=>{
                resolve (row);

            }).catch((err)=>{
                reject (err);
            })
        })
    })

}




async function getallTeachers(TeacherQuery){
  var  coursename = TeacherQuery.CourseName
    var teacherbranch = TeacherQuery.TeacherBranch
    // console.log(coursename + "  " + teacherbranch)
    var Query
    if(coursename=="All"){
        Query = "Select TeacherName from AddTeacher where TeacherBranch = '"+teacherbranch+"' "
    }else{
        Query = "Select TeacherName from AddTeacher Join TeacherCourse Join AddCourse where AddTeacher.TeacherId=TeacherCourse.TeacherId And AddCourse.CourseCode " +
            " = TeacherCourse.CourseCode And CourseName = '"+coursename+"' "
    }

    return new Promise(async (resolve,reject)=>{
        await connection.then(async (conn)=>{

             // console.log(Query)
            conn.query(Query).then(([row,field])=>{
                resolve (row);

            }).catch((err)=>{
                reject (err);
            })
        })
    })

}



module.exports = {
    getallRooms,getallCourses,getallTeachers
}