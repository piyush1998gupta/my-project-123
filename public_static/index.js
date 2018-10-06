$(()=>{
    var RoomType,Semester

    // $("#ssemester").change(()=>{
    //
    //     RemoveCourses();
    //     RoomType = $("#sroomtype").val()
    //     Semester = $("#qsemester").val()
    //     if(RoomType=="Tutorial"){
    //         RoomType="Lecture"
    //     }
    //     GetCourses(Semester,RoomType)
    // })
    //
    //
    //
    // function GetCourses(semestervalue,coursetype) {
    //     $.get('/AddIntheDatabase/CourseName',{Semester : semestervalue,
    //         CourseType : coursetype
    //     } , (Courses) => {
    //
    //         for (i = 0; i < Courses.length; i++) {
    //             $("#qcoursename").append(
    //                 $("<option>").attr("class", "tempoptioncourse").text(Courses[i].CourseName)
    //             )
    //         }
    //     })
    // }
    //
    //
    // function RemoveCourses(){
    //     $(".tempoptioncourse").remove();
    // }
    //
    //
    //
    //
    //
    //
    //
    //
















    $('#dataquerys').submit(function(){
        console.log("hjhdkd")

        $(".clr").text("");





        $.ajax({
            type: 'POST',
            url: "/FetchingQuery/Query",
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
    }

)

