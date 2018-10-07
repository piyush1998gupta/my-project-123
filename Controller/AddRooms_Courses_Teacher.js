
const {connection} = require("../DB/DBServer")


async function AddRoom(RoomId,RoomBranch,RoomType){

    return new Promise(async (resolve,reject)=>{

       await connection.then((conn)=>{
           conn.query("INSERT INTO `AddRoom`(`RoomId`, `RoomType`, `RoomBranch`) VALUES (?,?,?)",[RoomId,RoomType,RoomBranch]).then(([row,field])=>{

               resolve ("Succesfully Inserted")
           }).catch((err)=>{
               reject (err)
           })

       })
    })

}


async function ShowRoom(RoomBranch,RoomType){
    return new Promise(async (resolve,reject)=>{
        Query = "Select * from AddRoom where RoomBranch = ? And RoomType = ? "
       await connection.then((conn)=>{
             conn.query(Query,[RoomBranch,RoomType]).then(([row,field])=>{
                resolve (row)
            }).catch((err)=>{
                reject (err)
            })
        })
    })
}


module.exports={
    AddRoom,ShowRoom
}

