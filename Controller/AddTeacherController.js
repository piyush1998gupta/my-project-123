const {connection} = require("../DB/DBServer")

async function AddTeacher(TeacherBranch,TeacherId,TeacherName,TeacherRoom){

    return new Promise(async (resolve,reject)=>{

        await connection.then((conn)=>{
            var Query = "INSERT INTO `AddTeacher`(`TeacherId`, `TeacherName`, `TeacherRoom`, `TeacherBranch`) VALUES (?,?,?,?)"
            conn.query(Query,[TeacherId,TeacherName,TeacherRoom,TeacherBranch]).then(([row,field])=>{

                resolve ("Succesfully Inserted")
            }).catch((err)=>{
                reject (err)
            })

        })
    })

}


async function ShowTeachers(TeacherBranch){
    return new Promise(async (resolve,reject)=>{
        Query = "Select * from AddTeacher where TeacherBranch = ? "
        await connection.then((conn)=>{
            conn.query(Query,[TeacherBranch]).then(([row,field])=>{
                resolve (row)
            }).catch((err)=>{
                reject (err)
            })
        })
    })
}




module.exports={
    AddTeacher,ShowTeachers
}