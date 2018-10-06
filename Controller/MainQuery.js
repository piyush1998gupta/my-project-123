const {connection} = require("../DB/DBServer")
const controller = require("./AddDatabase")


async function getallvalues(queryobject){
    console.log(queryobject)
    var SemeseterSymbol,SemesterValue,RoomTypeSymbol,RoomTypeValue,RoomNoSymbol,RoomNoValue,DaySymbol,DayValue,ClassGroupSymbol,ClassGroupvalue,StartTimeSymbol,StartTimeValue,EndTimeSymbol,EndTimeValue,CourseNameSymbol,CourseNameValue,TeacherNameSymbol,TeacherNameValue
    var equalto = "="
    var notequalto = "<>"

    if(queryobject.semester=="All"){
        SemeseterSymbol=notequalto
        SemesterValue="a"
    }else{
        SemeseterSymbol=equalto
        SemesterValue=queryobject.semester
    }

    if(queryobject.roomtype=="All"){
        RoomTypeSymbol=notequalto
        RoomTypeValue="a"
    }else{
        RoomTypeSymbol=equalto
        RoomTypeValue=queryobject.roomtype
    }

    if(queryobject.roomno=="All"){
        RoomNoSymbol=notequalto
        RoomNoValue="a"
    }else{
        RoomNoSymbol=equalto
        RoomNoValue=queryobject.roomno
    }

    if(queryobject.day=="All"){
        DaySymbol=notequalto
        DayValue="a"
    }else{
        DaySymbol=equalto
        DayValue=queryobject.day
    }


    if(queryobject.classgroup=="All"){
        ClassGroupSymbol=notequalto
        ClassGroupvalue="a"
    }else{
        ClassGroupSymbol=equalto
        ClassGroupvalue=queryobject.classgroup
    }


    if(queryobject.starttime =="All"){
        StartTimeSymbol=">="
        StartTimeValue='09:00:00'
    }else{
        StartTimeSymbol=equalto
        StartTimeValue=queryobject.starttime
    }

    if(queryobject.endtime=="All"){
        EndTimeSymbol= '<='
        EndTimeValue='17:00:00'
    }else{
        EndTimeSymbol=equalto
        EndTimeValue=queryobject.endtime
    }
    if(queryobject.coursename=="All"){
        CourseNameSymbol=notequalto
        CourseNameValue="a"
    }else{
        CourseNameSymbol=notequalto
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
                "MasterCseTable.EndTime ,MasterCseTable.RoomId,MasterCseTable.CourseType, MasterCseTable.CourseCode," +
                "MasterCseTable.TeacherId,AddTeacher.TeacherName,AddCourse.CourseName FROM `MasterCseTable` JOIN " +
                "`AddCourse`JOIN`AddTeacher`JOIN `AddRoom`WHERE MasterCseTable.CourseCode=AddCourse.CourseCode AND " +
                "MasterCseTable.TeacherId=AddTeacher.TeacherId AND MasterCseTable.RoomId=AddRoom.RoomId AND" +
                " MasterCseTable.Semester " + SemeseterSymbol +" '"+SemesterValue   + "' AND " +
                " MasterCseTable.Group_ "+ ClassGroupSymbol + " '" + ClassGroupvalue + "' AND " +
                " MasterCseTable.CourseType "+RoomTypeSymbol + " '" + RoomTypeValue + "' AND " +
                " MasterCseTable.Day "+ DaySymbol + " '" + DayValue +"' AND " +
                " MasterCseTable.StartTime "+ StartTimeSymbol + " '" + StartTimeValue + "' AND " +
                " MasterCseTable.EndTime "+ EndTimeSymbol + " '" + EndTimeValue + "' AND " +
                " MasterCseTable.RoomId " + RoomNoSymbol + " '" + RoomNoValue + "' AND " +
                " AddCourse.CourseName " + CourseNameSymbol + " '" + CourseNameValue + "' AND " +
                " AddTeacher.TeacherName " + TeacherNameSymbol + " '"+ TeacherNameValue + "' "



            console.log(MainQuery)



            conn.query(MainQuery).then(([row,field])=>{
                console.log(row.length)
                resolve(row)
            }).catch((err)=>{
                reject (err)
            })
        })
    })
}





module.exports={
getallvalues
}