$(()=> {
    console.log("hi")
        var RoomType, Semester, Branch, RoomNumber, ClassGroup, Day, StartTime, EndTime, CourseName
        var queryask=[]
        RemoveRoomNo()
        RemoveCourses()
        RemoveTeacherName()
        Branch = $("#sbranch").val()
        RoomType = $("#sroomtype").val()
        Semester = $("#ssemester").val()
        CourseName = $("#scoursename").val()
        GetQueryRooms(Branch, RoomType)
        GetQueryCourses(Branch, RoomType, Semester)
        GetQueryTeachers(Branch, CourseName)


        $("#delete").click(function () {
            $.ajax({
                type: "POST",
                url: "/FetchingQuery/QueryDelete",
                data: {
                    sbranch: $("#sbranch").val(),
                    ssemester: $("#ssemester").val(),
                    sroomtype: $("#sroomtype").val(),
                    sroomno: $("#sroomno").val(),
                    sclassgroup: $("#sclassgroup").val(),
                    sstarttime: $("#sstarttime").val(),
                    sendtime: $("#sendtime").val(),
                    sday:$("#sday").val(),
                    scoursename: $("#scoursename").val(),
                    steachername: $("#steachername").val()
                },
                success: function (data) {
                    console.log(data)
                    alert(data)
                }
            })
        })




        $("#sbranch").change(() => {
                RemoveRoomNo()
                RemoveCourses()
                RemoveTeacherName()
                Branch = $("#sbranch").val()
                RoomType = $("#sroomtype").val()
                Semester = $("#ssemester").val()
                CourseName = $("#scoursename").val()
                GetQueryRooms(Branch, RoomType)
                GetQueryCourses(Branch, RoomType, Semester)
                GetQueryTeachers(Branch, CourseName)
            }
        )
        $("#ssemester").change(() => {
            RemoveCourses()
            RemoveTeacherName()
            Branch = $("#sbranch").val()
            RoomType = $("#sroomtype").val()
            Semester = $("#ssemester").val()
            GetQueryCourses(Branch, RoomType, Semester)
            CourseName = $("#scoursename").val()
            GetQueryTeachers(Branch, CourseName)

        })

        $("#sroomtype").change(() => {
            RemoveCourses()
            RemoveTeacherName()
            RemoveRoomNo()
            Branch = $("#sbranch").val()
            RoomType = $("#sroomtype").val()
            Semester = $("#ssemester").val()

            GetQueryRooms(Branch, RoomType)
            GetQueryCourses(Branch, RoomType, Semester)
            CourseName = $("#scoursename").val()
            GetQueryTeachers(Branch, CourseName)


        })

        $("#scoursename").change(() => {
            RemoveTeacherName()
            Branch = $("#sbranch").val()
            CourseName = $("#scoursename").val()
            GetQueryTeachers(Branch, CourseName)
        })


        function GetQueryTeachers(Branch, coursename) {
            // console.log(Branch)
            $.get("/FetchingQuery/GetTeachers", {
                Teacherbranch: Branch,
                Coursename: coursename,

            }, (Teachers) => {
                // console.log(Teachers)

                for (i = 0; i < Teachers.length; i++) {
                    $("#steachername").append(
                        $("<option>").attr("class", "tempoptionteachername").text(Teachers[i].TeacherName)
                    )
                }
            })
        }


        function GetQueryCourses(Branch, coursetype, semester) {
            // console.log(Branch)

            if (coursetype == "Tutorial") {
                coursetype = "Lecture"
            }
            $.get("/FetchingQuery/GetCourses", {
                Coursebranch: Branch,
                Coursetype: coursetype,
                Coursesemester: semester
            }, (Courses) => {
                // console.log(Courses)
                for (i = 0; i < Courses.length; i++) {
                    $("#scoursename").append(
                        $("<option>").attr("class", "tempoptioncourse").text(Courses[i].CourseName)
                    )
                }
            })
        }


        function GetQueryRooms(Branch, Roomtype) {
            //console.log(Branch,Roomtype)
            if (Roomtype == "Tutorial") {
                Roomtype = "Lecture"
            }
            $.get("/FetchingQuery/GetRooms", {
                RoomBranch: Branch,
                RoomType: Roomtype
            }, (RoomNo) => {
                // console.log(RoomNo)
                for (i = 0; i < RoomNo.length; i++) {
                    $("#sroomno").append(
                        $("<option>").text(RoomNo[i].RoomId).attr("class", "temproomid")
                    )
                }
            })
        }


        function RemoveRoomNo() {
            $(".temproomid").remove();
        }

        function RemoveCourses() {
            $(".tempoptioncourse").remove();
        }

        function RemoveTeacherName() {
            $(".tempoptionteachername").remove();
        }

        $('#dataquerys').submit(function () {
            Branch = $("#sbranch").val()
            RoomType = $("#sroomtype").val()
            Semester = $("#ssemester").val()
            CourseName = $("#scoursename").val()


            $(".clr").text("");
            $(".clr").removeAttr("colspan")
            $(".clr").removeAttr("hidden")
            $(".clr").removeAttr("rowspan")

            $.ajax({
                type: 'POST',
                url: "/FetchingQuery/QuerySearch",
                data: $(this).serialize(),

                success: function (data) {
                    $("#mainresult").removeAttr("hidden");

                        // console.log(data)
                    // console.log(data[0].TeacherId)

                        queryask = data[1]

                        ShowTable(data[0])

                }
            })


            return false;
        })

    function ShowTable (result){


    //
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
                ShowEntry(resultobject)
            }

    }


    function ShowEntry(resultobject){
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
        console.log(classtypesymbol)
        var checkinglecture = $("." + day + "  ."+timeslot+" ."+classsemester+coursecode+teacherid+roomno)


        if(classtype=="Lab" || classtype=="Tutorial") {
            if (classtype == "Lab") {
                // console.log("." + day + " ."+classgroup.split("-")[1]+ " ."+timeslot)

                $("." + day + " ." + classgroup.split("-")[1] + " ." + timeslot).append(
                    displaydynamicdata()
                ).attr("colspan", "2").next().attr("hidden", "true")
            } else {
                $("." + day + " ." + classgroup.split("-")[1] + " ." + timeslot).append(
                    displaydynamicdata()
                )
            }
        }else
        // if  (classtype=="Lecture")
        {
            var classgroupnumber = classgroup.split("-")[1]
            var groupentryrow



            //".lect class wo wali hai jisme lecture ki classes jayengi
            if( checkinglecture.length==0) {
                $("." + day + " .lect" + " ." + timeslot).append(
                    displaydynamicdata()
                ).attr("rowspan","3")
            }
            else{
                console.log("." + day + " .lect" +  "  ." + " ."+timeslot+" ."+classsemester+coursecode+teacherid+roomno+" ."+classgroup.substring(0,1))
                $("." + day + " .lect" +  "  ." +timeslot+" ."+classsemester+coursecode+teacherid+roomno+" ."+classgroup.substring(0,1)).append(classgroup.split("-")[1])

                $("."+day+" .comblect ."+timeslot).attr("hidden",true)
            }

        }


        function displaydynamicdata(){
            return  `<div class="${classsemester}${coursecode}${teacherid}${roomno}">`+
                            (queryask.semester=='All'||queryask.classgroup=='All'
                                ?
                                `<div class="${classgroup.substring(0,1)}"> Group :-`+
                                (queryask.semester=='All' ?
                                `${classsemester}-`:'')+
                                (queryask.classgroup=='All'?`${classgroup}`:'')+

                                    `</div>`
                            :'')
                            +
                            (queryask.roomno=='All' ? `<div class="${roomno}">Room :- ${roomno} </div>`:'')+
                            (queryask.teachername=='All'?`<div class="${teachername}">Teacher :- ${teachername}</div>`:'')+
                            (queryask.coursename=='All'?`<div class="${coursename}">CourseName :- ${coursename}</div>`:'')+
                            (queryask.roomtype=='All'?`<div class="${classtype}"> ( ${classtypesymbol} )</div>`:'')

                      + ` </div> <br>`
        }



        }



    }







)

