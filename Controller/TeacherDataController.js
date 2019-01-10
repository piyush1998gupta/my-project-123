const {connection} = require("../DB/DBServer")


async function getTeacher(TeacherBranch){

    return new Promise(async (resolve,reject)=>{

        await connection.then((conn)=>{
            var Query = "SELECT * from AddTeacher where TeacherBranch = ? "
            conn.query(Query,[TeacherBranch]).then(([row,field])=>{

                resolve (row)
            }).catch((err)=>{
                reject (err)
            })

        })
    })

}


module.exports={
    getTeacher
}
