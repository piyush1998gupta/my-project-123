$(()=>{
    var teacherbranch=$("#teacherbranch").val()
    var teachername =$("#teachername").val()

    $("#teacherbranch").change(()=>{
        // console.log($("#teacherbranch").val())
      deleteteacheroption()
      getteacher($("#teacherbranch").val())







    })


    $("#teacherform").submit(function () {
        $.ajax({
            type:"GET",
            url: "/TeacherData/GetTeacherData",
            data: $(this).urlencoded,

            success :function (data) {

            }
        })






        return false
    })




    function getteacher(teacherbranch) {
        $.ajax({
            type: "POST",
            url: "/TeacherData/GetTeacher",
            data: {
                TeacherBranch :teacherbranch
            },
            success : function (teacherdata) {
                for (i = 0; i < teacherdata.length; i++) {
                    $("#teachername").append(
                        $("<option>").attr("class", "tempoptionteachername").text(teacherdata[i].TeacherName)
                    )
                }
            }
        })
    }
 function deleteteacheroption() {
     $(".tempoptionteachername").remove()
 }









})