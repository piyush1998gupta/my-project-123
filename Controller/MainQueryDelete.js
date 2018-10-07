const {connection} = require("../DB/DBServer")
const controller = require("./AddDatabase")


async function deleteallvaluesbasedoncondition(queryobject){
    // console.log(queryobject)
    var SemeseterSymbol,SemesterValue,RoomTypeSymbol,RoomTypeValue,RoomNoSymbol,RoomNoValue,DaySymbol,DayValue,ClassGroupSymbol,ClassGroupvalue,StartTimeSymbol,StartTimeValue,EndTimeSymbol,EndTimeValue,CourseNameSymbol,CourseNameValue,TeacherNameSymbol,TeacherNameValue
    var equalto = "="
    var notequalto = "<>"
    var NewClassGroupValue
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

    //classgroupmessage in Query For Tut And Labs
    if(ClassGroupvalue==queryobject.classgroup){
        NewClassGroupValue= " MasterCseTable.Group_ = '"+ClassGroupvalue + "' "
    }
    var classgroupsplit = ClassGroupvalue.split("-")
    //classgroupmessage in query for Lecture
    if(classgroupsplit[1]=="123" || classgroupsplit[1]=="456" || classgroupsplit[1]=="789" || classgroupsplit[1]=="111213"){
        var newclassgroup =[]
        if (classgroupsplit[1]=="111213"){
            newclassgroup[0]=11,newclassgroup[1]=12,newclassgroup[2]=13
        }else {

            newclassgroup = classgroupsplit[1].split("")

        }
        var newclassgroupvalue = [classgroupsplit[0]+"-"+newclassgroup[0],classgroupsplit[0]+"-"+newclassgroup[1],classgroupsplit[0]+"-"+newclassgroup[2]]

        NewClassGroupValue = "( MasterCseTable.Group_  = '"+newclassgroupvalue[0]+"' OR MasterCseTable.Group_ = '"+ newclassgroupvalue[1]+"' OR MasterCseTable.Group_ = '" + newclassgroupvalue[2] + "' )";



    }

    // classgroupmessage in  query if it is not mention
    if(ClassGroupvalue=='a'){
        NewClassGroupValue = " MasterCseTable.Group_ <> 'a' "
    }




    return new Promise (async (resolve,reject)=>{
        await connection.then((conn)=>{

            var MainQuery = "Delete FROM `MasterCseTable` JOIN " +
                "`AddCourse`JOIN`AddTeacher`JOIN `AddRoom`WHERE MasterCseTable.CourseCode=AddCourse.CourseCode AND " +
                "MasterCseTable.TeacherId=AddTeacher.TeacherId AND MasterCseTable.RoomId=AddRoom.RoomId AND" +
                " MasterCseTable.Semester " + SemeseterSymbol +" '"+SemesterValue   + "' AND " +
                NewClassGroupValue+" AND " +
                " MasterCseTable.ClassType "+RoomTypeSymbol + " '" + RoomTypeValue + "' AND " +
                " MasterCseTable.Day "+ DaySymbol + " '" + DayValue +"' AND " +
                "( ( MasterCseTable.StartTime "+ StartTimeSymbol + " '" + StartTimeValue + "' AND " +
                " MasterCseTable.StartTime "+ EndTimeSymbol + " '" + EndTimeValue + "' ) OR ( '" +
                StartTimeValue +"' Between MasterCseTable.StartTime And MasterCseTable.EndTime And MasterCseTable.Classtype= 'Lab' )"+ " )AND " +
                " MasterCseTable.RoomId " + RoomNoSymbol + " '" + RoomNoValue + "' AND " +
                " AddCourse.CourseName " + CourseNameSymbol + " '" + CourseNameValue + "' AND " +
                " AddTeacher.TeacherName " + TeacherNameSymbol + " '"+ TeacherNameValue + "' "


            console.log(MainQuery);



            conn.query(MainQuery).then(([row,field])=>{
                console.log("succesfully deleted ")
                resolve("Successfully deleted ")
            }).catch((err)=>{
                reject (err)
            })
        })
    })
}





module.exports={
    deleteallvaluesbasedoncondition
}