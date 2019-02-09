const {connection} = require("../DB/DBServer")


async function getRoomNumbers(RoomBranch,RoomType){
    var roomtypesymbol="=",roomtypevalue=RoomType
    if(RoomType=="All"){
        roomtypesymbol="<>";
        roomtypevalue="aaaa"
    }


    return new Promise(async (resolve,reject)=>{
        await connection.then((conn)=>{
            var Query = "Select RoomId from AddRoom where RoomBranch = ? and RoomType "+ roomtypesymbol+" ?"
            conn.query(Query,[RoomBranch,roomtypevalue]).then(([row,field])=>{
                // console.log(row)
                resolve (row)
            }).catch((err)=>{
                reject(err)
            })
        })
    })


}

async function getfreeRooms(Day,StartTime,EndTime,Roomtype,Branch){
    var roomtype , Branchname , querypart=""
    if(Roomtype=='All'){

        Branchname=Branch

        querypart=" WHERE AddRoom.RoomBranch = '"+ Branchname+"' And AddRoom.RoomId"

    }else{

        roomtype = Roomtype
        Branchname = Branch

        querypart=" WHERE AddRoom.RoomBranch = '"+ Branchname+"' And RoomType = '"+ roomtype+"' And AddRoom.RoomId"



    }


    var Query = "SELECT DISTINCT AddRoom.RoomId From AddRoom " + querypart +"  NOT IN\n" +
        "(SELECT DISTINCT AddRoom.RoomId FROM `MasterCseTable` JOIN AddRoom  WHERE MasterCseTable.RoomId=AddRoom.RoomId AND ((MasterCseTable.StartTime>= ? AND MasterCseTable.StartTime< ?) OR ( MasterCseTable.StartTime < '"+ StartTime +"' And MasterCseTable.EndTime > '"+ StartTime +"' And MasterCseTable.Classtype= 'Lab' )) AND MasterCseTable.Day= ?)"


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





module.exports = {
    getRoomNumbers,getfreeRooms
}