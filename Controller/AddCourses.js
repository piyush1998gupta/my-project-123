const {connection} = require("../DB/DBServer")

async function AddCourse(CourseCode,CourseName,CourseBranch,CourseType,CourseSemester){

    return new Promise(async (resolve,reject)=>{

        await connection.then((conn)=>{
            var Query = "INSERT INTO `AddCourse`(`CourseCode`, `CourseName`, `CourseBranch`, `CourseType`, `CourseSemester`) VALUES (?,?,?,?,?)"
            conn.query(Query,[CourseCode,CourseName,CourseBranch,CourseType,CourseSemester]).then(([row,field])=>{

                resolve ("Succesfully Inserted")
            }).catch((err)=>{
                reject (err)
            })

        })
    })

}


async function ShowCourses(CourseBranch,CourseType,CourseSemester){
    return new Promise(async (resolve,reject)=>{
        Query = "Select * from AddCourse where CourseBranch = ? And CourseType = ?  And CourseSemester = ?"
        await connection.then((conn)=>{
            conn.query(Query,[CourseBranch,CourseType,CourseSemester]).then(([row,field])=>{
                resolve (row)
            }).catch((err)=>{
                reject (err)
            })
        })
    })
}




module.exports={
    AddCourse,ShowCourses
}