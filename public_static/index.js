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


                    console.log(data)
                    // for(i=0;i<data.length;i++) {
                    //
                    //     st=(data[i].Start_Time).split(":");
                    //     strttime= "."+st[0]+st[1]+st[2];
                    //     console.log(strttime)
                    //     $("#tablecaption").text("Time Table Of ALOK Sir");
                    //     var  day = "."+data[i].Day
                    //
                    //     $(day).children(strttime).append($("<li>").html("Group : -" + data[i].Semester+" - "+ data[i].Group_+"<br/> Course:- "+data[i].CourseName +"\n" + "<br/> Room-Number :-"+data[i].RoomId+"<br/>Teacher :-"+ data[i].Teacher_Name+"<br/><br/>"))
                    //
                    //
                    // }
                    // console.log(data);


                }
            })


            return false;
        })

    function ShowTable (result){
            for(i=0;i<result.length;i++){
                var resultobject = {
                     resultstarttime : result[i].StartTime,
                    resultendtime : result[i].EndTime,
                     resultclassgroup : result[i].Group_,
                     resultclasssemester : result[i].Semester,
                    resultclassteacher : result[i].TeacherName,
                    resultcoursename : result[i].CourseName,
                    resultclasstype : result[i].ClassType,
                    resultday : result[i].Day,
                    resultroomno : result[i].roomno

                }
                ShowEntry(resultobject)
            }

    }


    function ShowEntry(resultobject){
            var starttime = resultobject.StartTime
            var endtime = resultobject.EndTime
            var classgroup = resultobject.Group_
            var classsemester = resultobject.Semester
            var classteacher = resultobject.TeacherName
            var coursename = resultobject.CourseName
            var classtype = resultobject.ClassType
            var day = resultobject.Day
            var roomno =resultobject.roomno

            $(".parent").append(
                `<div class="pract"> ${RoomNumber} </div> `

            )
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

