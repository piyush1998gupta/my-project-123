$(()=> {
        var RoomType, Semester, Branch, RoomNumber, ClassGroup, Day, StartTime, EndTime, CourseName

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
                    $("#steachename").append(
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


            $.ajax({
                type: 'POST',
                url: "/FetchingQuery/QuerySearch",
                data: $(this).serialize(),

                success: function (data) {
                    $("#mainresult").removeAttr("hidden");


                    // console.log(data[0].TeacherId)



                        ShowTable(data)

                }
            })


            return false;
        })

    function ShowTable (result){
    // console.log(result)
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
        var checkinglecture = $("." + day + "  ."+timeslot+" ."+classsemester+coursecode+teacherid+roomno)
        // console.log("." + day + "  ."+timeslot+" ."+classsemester+coursecode+teacherid+roomno)
            if (checkinglecture.length==0) {
                console.log("if")
                $("." + day + "  ." + timeslot).append(
                    `<div class="${classsemester}${coursecode}${teacherid}${roomno}">
                <div class="${classgroup.substring(0,1)}">Group :- ${classgroup}</div>
                <div class="${roomno}">Room :- ${roomno} </div> 
                <div class="${teachername}">Teacher :- ${teachername}</div>
                <div class="${coursename}">CourseName :- ${coursename}</div>
                <div class="${classtype}"> ( ${classtypesymbol} )</div>
                
                </div> <br>`
                )

            }else {
                console.log("else")
                $("." + day + "  ."+timeslot+" ."+classsemester+coursecode+teacherid+roomno+" ."+classgroup.substring(0,1)).append(classgroup.split("-")[1])
            }
    }

    $("#testing").click(()=>{
        console.log("clicked")
        var vals= 234
        $(".parent").append(
            `<div>   ${vals} </div>  `
        )
    })

    }

)

