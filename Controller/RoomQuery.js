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




async function getroomdata(queryobject){
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
    if(queryobject.roomno=="All"){
        RoomNoSymbol=notequalto
        RoomNoValue="a"
    }else{
        RoomNoSymbol=equalto
        RoomNoValue=queryobject.roomno
    }
    if(queryobject.roomtype=="All"){
        RoomTypeSymbol=notequalto
        RoomTypeValue="a"
    }else{
        RoomTypeSymbol=equalto
        RoomTypeValue=queryobject.roomtype
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


                " MasterCseTable.ClassType "+RoomTypeSymbol + " '" + RoomTypeValue + "' AND " +
                " MasterCseTable.RoomId " + RoomNoSymbol + " '" + RoomNoValue + "' "



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




module.exports = {
    getRoomNumbers,getfreeRooms,getroomdata
}