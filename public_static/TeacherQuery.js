$(()=> {
    var tcourse,tsem ,tbranch,tstarttime,tendtime,tday
    removeCourse()
    removeTeacher()
    tbranch = $("#teacherbranch").val()
    tcourse = $("#teachercourse").val()
    tsem = $("#semester").val()
    getCourse(tbranch,tsem)
    getTeacher(tbranch,tcourse)
    // $("#freeTeacher").click(function () {
    //     console.log("clicked")
        tbranch = $("#teacherbranch").val()
        tcourse = $("#teachercourse").val()
        tstarttime = $("#teacherstarttime").val()
        tendtime = $("#teacherendtime").val()
        tday = $("#teacherday").val()

        if(tstarttime=="All" || tendtime=='All' || tday=="All"){
            console.log("hsk")
            alert("Please specify StartTime,EndTime and Day")
        }else{
            findFreeTeacher(tcourse,tbranch,tstarttime,tendtime,tday)
        }

    // })


    $("#teacherform").on('click','#freeteacher',function () {
    console.log("clicked")
        tbranch = $("#teacherbranch").val()
        tcourse = $("#teachercourse").val()
        tstarttime = $("#teacherstarttime").val()
        tendtime = $("#teacherendtime").val()
        tday = $("#teacherday").val()

        if(tstarttime=="All" || tendtime=='All' || tday=="All"){
            console.log("hsk")
            alert("Please specify StartTime,EndTime and Day")
        }else{
            removeTeachersresult()
            findFreeTeacher(tcourse,tbranch,tstarttime,tendtime,tday)
        }
    })




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
        for(i=0;i<teacherdata.length;i++) {
            $("#freeTeacherresult").append(`<span class="tempresult"> ${teacherdata[i].TeacherName} </span>`)
        }
    }

    function removeTeachersresult(){
        $(".tempresult").remove();
    }

})