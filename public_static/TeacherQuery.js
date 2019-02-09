$(()=> {
    var tcourse,tsem ,tbranch,tstarttime,tendtime,tday
    var queryask=[]
    removeCourse()
    removeTeacher()
    tbranch = $("#teacherbranch").val()
    tcourse = $("#teachercourse").val()
    tsem = $("#semester").val()
    getCourse(tbranch,tsem)
    getTeacher(tbranch,tcourse)
    $("#freeteacher").click( ()=>{
        $("#AllTeacherresult").attr("hidden","true")
        $("#freeTeacherresult").removeAttr("hidden")
        $("#freeTeacherresult").text("")

        tbranch = $("#teacherbranch").val()
        tcourse = $("#teachercourse").val()
        tstarttime = $("#teacherstarttime").val()
        tendtime = $("#teacherendtime").val()
        tday = $("#teacherday").val()

        if(tstarttime=="All" || tendtime=='All' || tday=="All"){

            alert("Please specify StartTime,EndTime and Day")
        }else{
            removeTeachersresult()
            findFreeTeacher(tcourse,tbranch,tstarttime,tendtime,tday)
        }

    })
    $("#teacherform").submit(function(){
       $("#freeTeacherresult").attr("hidden","true")
        $("#AllTeacherresult").removeAttr("hidden")
        $("#AllTeacherresult").text("")

        // if (!$(".dayshow").attr("hidden")) {
        //     $(".dayshow").attr("hidden", "true")
        // }
        $.ajax({
            type: 'POST',
            url : "/TeacherQuery/GetAllTeachersData",
            data : $(this).serialize(),

            success : function(data){
                console.log(data)
                queryask = data[1]
                AllTeachers(data[0])


            }
        })
        return false;
    })





    function AllTeachers(TeacherData){
        // console.log(TeacherData)
        if($("#teachername").val()=="All"){
            $.ajax({
                type: "GET",
                url: "/TeacherQuery/GetTeachers",
                data: {
                    TeacherBranch: queryask.teacherbranch,
                    TeacherCourse: queryask.teachercourse
                },

                success: function (data) {
                    console.log(data)
                    for(i=0 ; i<data.length;i++){
                        TableDesignforTeacher(data[i].TeacherId,data[i].TeacherName)
                    }
                    fordisplayingqueriesofsinglegroup(TeacherData)
                }

            })



        }else{
            // console.log("inside else")

            $.ajax({
                type: "GET",
                url: "/TeacherQuery/GetTeacherId",
                data: {
                    TeacherName: queryask.teachername,
                    TeacherBranch : queryask.teacherbranch
                },

                success: function (data) {

                        TableDesignforTeacher(data[0].TeacherId,data[0].TeacherName)
                    fordisplayingqueriesofsinglegroup(TeacherData)
                }
            })


                // TableDesignforTeacher(TeacherData[0][0].TeacherId,TeacherData[0][0].TeacherName)
        }




    }



    $("#teacherbranch").change(()=>{
        removeTeacher()
        removeCourse()
        console.log("teacher branch change")
         tbranch = $("#teacherbranch").val()
         tcourse = $("#teachercourse").val()
         tsem = $("#semester").val()
        // console.log(tbranch)
        // console.log(tcourse)
        // console.log(tsem)
        getCourse(tbranch,tsem)
        getTeacher(tbranch,tcourse)
    })

    $("#teachercourse").change(()=>{
        removeTeacher()
        tbranch = $("#teacherbranch").val()
        tcourse = $("#teachercourse").val()
        getTeacher(tbranch,tcourse)
    })

    $("#semester").change(()=>{
        removeCourse()
        tcourse = $("#teachercourse").val()
        tsem = $("#semester").val()
        getCourse(tbranch,tsem)
    })

    function getTeacher(branch, course) {
        $.ajax({
            type: "GET",
            url: "/TeacherQuery/GetTeachers",
            data: {
                TeacherBranch: branch,
                TeacherCourse: course
            },

            success: function (data) {
                AddTeacheroptions(data)
            }
        })


    }

    function AddTeacheroptions(teacherdata) {
        for(i=0;i<teacherdata.length;i++){
            // console.log(teacherdata[i])
            $("#teachername").append(`<option class="tempteacherid"> ${teacherdata[i].TeacherName} </option>`)
        }
    }

    function getCourse(branch, semester) {
        $.ajax({
            type: "GET",
            url: "/TeacherQuery/GetCourses",
            data: {
                TeacherBranch: branch,
                TeacherSemester: semester
            },

            success: function (data) {
                AddCourseoptions(data)
            }
        })


    }

    function AddCourseoptions(coursedata){
        for(i=0;i<coursedata.length;i++){
            $("#teachercourse").append(
                `<option class="tempcourseid"> ${coursedata[i].CourseName} </option>`
            )
        }
    }

    function removeCourse(){
        $(".tempcourseid").remove();
    }

    function removeTeacher(){
        $(".tempteacherid").remove();
    }

    function findFreeTeacher(coursename,branch,startTime,endTime,day){
        $.ajax({
            type: "Get",
            url: "/TeacherQuery/GetFreeTeachers",
            data: {
                CourseName : coursename,
                TeacherBranch : branch,
                StartTime :startTime,
                EndTime :endTime,
                Day :day
            },
            success: function (data) {
                PrintTeachers(data);
            }
        })
    }

    function PrintTeachers(teacherdata){
        $("#freeTeacherresult").append(`<h2 class="tempresult"> Free Teachers </h2>`)
        for(i=0;i<teacherdata.length;i++) {
            $("#freeTeacherresult").append(`<li class="tempresult"> ${teacherdata[i].TeacherName} </li>`)
        }
    }

    function removeTeachersresult(){
        $(".tempresult").remove();
    }



    function fordisplayingqueriesofsinglegroup(result) {

        if(queryask.teacherday=='All'){
            // console.log(queryask.teacherday)
            $(".dayshow").removeAttr("hidden")
        }else{
            $("."+queryask.teacherday).removeAttr("hidden")

        }

        for(i=0;i<result.length;i++){
            var resultobject = {
                resultstarttime : result[i].StartTime,
                resultendtime : result[i].EndTime,
                resultclassgroup : result[i].Group_,
                resultclasssemester : result[i].Semester,
                resultteachername : result[i].TeacherName,
                resultcoursename : result[i].CourseName,
                resultclasstype : result[i].ClassType,
                resultday : result[i].Day,
                resultroomno : result[i].RoomId,
                resultteacherid : result[i].TeacherId,
                resultcoursecode : result[i].CourseCode

            }
            // console.log(resultobject)
            // console.log(result[i].TeacherId)
            ShowEntryforsinglegroups(resultobject,result[i].TeacherId)
        }
    }



    function ShowEntryforsinglegroups(resultobject,tableid){
        // console.log(tableid)
        var starttime = resultobject.resultstarttime
        var endtime = resultobject.resultendtime
        var classgroup = resultobject.resultclassgroup
        var classsemester = resultobject.resultclasssemester
        var teachername = resultobject.resultteachername
        var coursename = resultobject.resultcoursename
        var classtype = resultobject.resultclasstype
        var day = resultobject.resultday
        var roomno =resultobject.resultroomno
        var teacherid = resultobject.resultteacherid
        var coursecode = resultobject.resultcoursecode

        var t = starttime.split(":")
        var timeslot = t[0]+""+t[1]+t[2]
        var classtypesymbol = classtype.substring(0,3)
        // console.log(classtypesymbol)
        var checkinglecture = $("#"+tableid+" ." + day + "  ."+timeslot+" ."+classsemester+coursecode+teacherid+roomno)

        // console.log("." + day + "  ."+timeslot+" ."+classsemester+coursecode+teacherid+roomno)
            console.log(classtype)
        if(classtype=="Lecture") {

            if (checkinglecture.length == 0) {
                // console.log("if")
                $("#" + tableid + " ." + day + "  ." + timeslot).append(
                    displaydynamiclecturedata()
                )

            } else {
                // console.log("else")
                $("#" + tableid + " ." + day + "  ." + timeslot + " ." + classsemester + coursecode + teacherid + roomno + " ." + classgroup.substring(0, 1)).append(classgroup.split("-")[1])
            }
        }else{
            if(classtype=="Lab"){

                $("#" + tableid + " ." + day + "  ." + timeslot).append(

                    displaydynamiclabdata()
                ).attr("colspan","2").next().attr("hidden","true")
            }else{
                $("#" + tableid + " ." + day + "  ." + timeslot).append(
                    displaydynamiclabdata()
                )
            }
        }




        function displaydynamiclecturedata(){
            return  `<div class="${classsemester}${coursecode}${teacherid}${roomno}" align="center">`+

                    `<div class="${classgroup.substring(0,1)}"> `+

                        `${classsemester}`+
                   `-${classgroup}`
                            +

                    `</div>`

                +


                `<span class="${coursecode}">${coursename}</span>`+
                `<span class="${classtype}"> (${classtypesymbol})</span>` +
                `<div class="${teacherid}"> </div>`+
                 `<div class="${roomno}"> ${roomno} </div>`+

                ` </div> <br>`
        }

        function displaydynamiclabdata(){
            return  `<div class="${classsemester}${coursecode}${teacherid}${roomno}">`+
                `<div class="${classgroup.substring(0,1)}"> `+

                `${classsemester}`+
                `-${classgroup}`
                +

                `</div>`
                +


               `<span class="${coursecode}">${coursename}</span>`+
               `<span class="${classtype}"> (${classtypesymbol}),</span>` +
               `<span class="${teacherid}"> </span>`+
                `<span class="${roomno},"> ${roomno} </span>`+

                ` </div> <br>`
        }

    }










    function TableDesignforTeacher(tableid,tablename){
        // console.log("Teacher")
        $("#AllTeacherresult").append(`
         <font size="1" face="Courier New" >
    <table id="${tableid}" width="100%" height="100%" border="1">
    <caption id="tablecaption"><h2 align="center">Result:-  ${ tablename }</h2></caption>
   
    <thead >
    <td class="heading"></td>
    <td class="heading">9:15-10:05</td>
    <td class="heading">10:05-10:55</td>
    <td class="heading">10:55-11:45</td>
    <td class="heading">11:45-12:35</td>
    
    <td class="heading">1:15-2:05</td>
    <td class="heading">2:05-2:55</td>
    <td class="heading">2:55-3:45</td>
    <td class="heading">3:45-4:35</td>

    </thead>
     
     <tbody>
    <tr class="Monday dayshow bott" hidden>
    <td class="heading">Monday</td>
    <td class="091500 clr"></td>
    <td class="100500 clr"></td>
    <td class="105500 clr"></td>
    <td class="114500 clr"></td>
    <td class="131500 clr"></td>
    <td class="140500 clr"></td>
    <td class="145500 clr"></td>
    <td class="154500 clr"></td>
    </tr>

    <tr class="Tuesday dayshow bott" hidden>
    <td class="heading">Tuesday</td>
    <td class="091500 clr"></td>
    <td class="100500 clr"></td>
    <td class="105500 clr"></td>
    <td class="114500 clr" ></td>

    <td class="131500 clr"></td>
    <td class="140500 clr"></td>
    <td class="145500 clr"></td>
    <td class="154500 clr"></td>
    </tr>
    <tr class="Wednesday dayshow bott" hidden>
    <td class="heading">Wednesday</td>
    <td class="091500 clr"></td>
    <td class="100500 clr"></td>
    <td class="105500 clr"></td>
    <td class="114500 clr"></td>

    <td class="131500 clr"></td>
    <td class="140500 clr"></td>
    <td class="145500 clr"></td>
    <td class="154500 clr"></td>
    </tr>
    <tr class="Thursday dayshow bott" hidden>
    <td class="heading">Thursday</td>
    <td class="091500 clr"></td>
    <td class="100500 clr"></td>
    <td class="105500 clr"></td>
    <td class="114500 clr"></td>

    <td class="131500 clr"></td>
    <td class="140500 clr"></td>
    <td class="145500 clr"></td>
    <td class="154500 clr"></td>
    </tr>
    <tr class="Friday dayshow bott" hidden>
    <td class="heading">friday</td>
    <td class="091500 clr" ></td>
    <td class="100500 clr" ></td>
    <td class="105500 clr"></td>
    <td class="114500 clr"></td>

    <td class="131500 clr"></td>
    <td class="140500 clr"></td>
    <td class="145500 clr"></td>
    <td class="154500 clr"></td>
    </tr>
    </tbody>
    </table>
    </font>
    

        
        `)

    }












})