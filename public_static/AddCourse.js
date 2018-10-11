$(()=>{
    Courseview()
    var coursebranch = $("#coursebranch").val()
    var coursesemester=$("#coursesemester").val()
    var coursecode = $("#coursecode").val()
    var coursename = $("#coursename").val()
    var coursetype = $("#coursetype").val()

    $("#coursesemester").change(()=>{
        // console.log("change semester")
        Courseview()
    })

    $("#coursetype").change(()=>{
        Courseview()
    })

    $("#coursebranch").change(()=>{
        Courseview()
    })



    $("#addcourse").submit(function () {
        console.log("inside")
        $.ajax({

            type: "POST",
            url: "/AddCourse/Add",
            data: $(this).serialize(),

            success: function (data) {
                alert(data.Message)

                    $("#addcourse").trigger("reset")



            }


        })


        Courseview()
        return false;


    })



    function Courseview(){
        $(".clr").remove()
        // console.log("Inside Courseview")
        // console.log($("#coursebranch").val())
        // console.log($("#coursetype").val())
        // console.log($("#coursesemester").val())

        $.ajax({
            type: "GET",
            url : "/AddCourse/GetCourse",
            data : {
                coursebranch: $("#coursebranch").val(),
                coursetype : $("#coursetype").val(),
                coursesemester:$("#coursesemester").val()
            },
            success : function (data) {
                console.log(data)
                AddCourse(data)
            }

        })
    }

    function AddCourse(CourseData){
        for(i=0;i<CourseData.length;i++){
            var CourseObject = {
                resultcoursebranch : CourseData[i].CourseBranch,
                resultcoursetype : CourseData[i].CourseType,
                resultcoursesemester :CourseData[i].CourseSemester,
                resultcoursename:  CourseData[i].CourseName,
                resultcoursecode : CourseData[i].CourseCode
            }
            ShowCourses(CourseObject)

        }
    }
    function ShowCourses(CourseObject) {
        var coursecode = CourseObject.resultcoursecode
        var coursename = CourseObject.resultcoursename
        var coursebranch = CourseObject.resultcoursebranch
        var coursesemester = CourseObject.resultcoursesemester
        var coursetype = CourseObject.resultcoursetype



        $("#mainresult").append(
            `<tr class="clr" > 
                   <td>${coursebranch}</td>
                <td > ${coursesemester}</td>
               <td>${coursecode}</td>
               <td>${coursename}</td>
               
               <td>${coursetype}</td>
               <td><input type="checkbox" class="checkcourse" ></td>
               
               </tr>`
        )
    }








})