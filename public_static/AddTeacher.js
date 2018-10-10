$(()=>{
    Teacherview()

    $("#teacherbranch").change(()=>{
        console.log("changes teacher")
        Teacherview()
    })

    $("#addteacher").submit(function () {
        // console.log("inside")
        $.ajax({
            type : "POST",
            url : "/AddTeacher/Add",
            data : $(this).serialize(),

            success : function (data) {
                // console.log(data)
                alert(data.Message)
                if(data.token==1){
                    $("#addteacher").trigger("reset")
                }
            }

        })

        Teacherview()


        return false;
    })


    function Teacherview(){
        console.log("inside teacherview")
        $(".clr").remove()

        $.ajax({
            type: "GET",
            url : "/AddTeacher/GetTeacher",
            data : {
                teacherbranch: $("#teacherbranch").val(),
            },
            success : function (data) {
                // console.log(data)
                AddTeachers(data)
            }
        })
    }


    function AddTeachers(TeacherData){
        for(i=0;i<TeacherData.length;i++){
            var RoomObject = {
                resultteacherbranch : TeacherData[i].TeacherBranch,
                resultteachername :TeacherData[i].TeacherName,
                resultteacherid :TeacherData[i].TeacherId,
                resultteacherroom :TeacherData[i].TeacherRoom
            }
            ShowRoom(RoomObject)

        }
    }


    function ShowRoom(RoomObject) {
        var teacherbranch = RoomObject.resultteacherbranch
        var teachername = RoomObject.resultteachername
        var teacherid = RoomObject.resultteacherid
        var teacherroom = RoomObject.resultteacherroom


        $("#mainresult").append(
            `<tr class="clr" > <td > ${teacherbranch}</td>
               <td>${teacherid}</td>
               <td>${teachername}</td>
               <td>${teacherroom}</td>
               <td><input type="checkbox" class="checkteacher" ></td>
               
               </tr>`
        )
    }










})