$(()=>{

    var roomtype;
    $("#sroomtype").change(async ()=> {
            roomtype = $("#sroomtype").val();
            console.log(roomtype);

            removeendtime()
            if (roomtype == "Lab") {
                $('.labdisabled').attr("disabled", "true")
            } else {
                $('.labdisabled').removeAttr("disabled")
            }


            $('.temproomid').remove();
            $('.strthide').removeAttr("hidden");
            await $.get('/addquery/roomid', (data) => {
                console.log(data);

                for (i = 0; i < data.length; i++) {
                    if (data[i].Room_Type == roomtype) {
                        console.log("ghs")
                        $("#sroom_no").append(
                            $("<option>").text(data[i].Room_ID).attr("class", "temproomid")
                        )
                    }
                }

            })





            $("#sstarttime").change(() => {

                removeendtime()
                var starttime = $("#sstarttime").val();
                var endtime
                valuesofstrttime = starttime.split(':').map(function (i) {
                    return parseInt(i, 10);
                });

                if (roomtype == "Tutorial" || roomtype == "Lecture") {




                    // if(valuesofstrttime[1])
                    // }
                    if (valuesofstrttime[1] != 5) {
                        valuesofstrttime[1] -= 10;
                        valuesofstrttime[0] += 1;

                        if (parseInt(valuesofstrttime[1] / 10) == 0) {
                            valuesofstrttime[1] = "0" + valuesofstrttime[1].toString();
                        }


                    } else {
                        valuesofstrttime[1] = "55";

                    }
                    valuesofstrttime[2] = "0" + valuesofstrttime[2].toString()
                    endtime = valuesofstrttime[0] + ":" + valuesofstrttime[1] + ":" + valuesofstrttime[2]

                    //console.log(valuesofstrttime[0] + " hd " + valuesofstrttime[1])
                }

                else{
                    if(valuesofstrttime[1]==15){
                        valuesofstrttime[0]+=1;
                        valuesofstrttime[1]=55;

                    }else if(valuesofstrttime[1]==5){
                        valuesofstrttime[0]+=1;
                        valuesofstrttime[1]=45;
                    }else {
                        valuesofstrttime[0]+=2;
                        valuesofstrttime[1]=35;
                    }
                    valuesofstrttime[2] = "0" + valuesofstrttime[2].toString();
                    endtime = valuesofstrttime[0] + ":" + valuesofstrttime[1] + ":" + valuesofstrttime[2]



                }

                $("#sendtime").append(
                    $("<option>").attr({class: "tempoptionendtime", selected: true}).text(endtime)
                )


            })

        }
    )


    $.get('/addquery/coursename',(data)=>{
        //   console.log(data);

        for(i=0;i<data.length;i++){
            $("#scoursename").append(
                $("<option>").attr("class","tempoptioncourse").text(data[i].CourseName)
            )
        }
    })


    $.get('/addquery/teachername',(data)=>{


        for(i=0;i<data.length;i++){
            $("#steachename").append(
                $("<option>").attr("class","tempoptionteachername").text(data[i].Teacher_Name)
            )
        }
    })

//
$("#dataqueryss").submit(function (e){

    $.ajax({
        type: "POST",
        url: "/fetchdata/add",
        data: $(this).serialize(),

        success : function (data) {
            console.log(data);
        }

    })

    return false;
})

    $("#dataqueryss").change(()=>{
        console.log("jkdds");
    })



    // $('#dataqueryss').submit(function(e){
    //     console.log("hjhdkd")
    //     // var values
    //    $(".clr").text("");
    //
    //
    //
    //
    //
    //
        // $.ajax({
        //     type: 'POST',
        //     url: "/fetchdata/add",
        //     data: $(this).serialize(),
        //
        //     success: function (data) {
        //       $("#mainresult").removeAttr("hidden");
        //
        //       console.log(data)
        //       for(i=0;i<data.length;i++) {
        //
        //           st=(data[i].Start_Time).split(":");
        //           strttime= "."+st[0]+st[1]+st[2];
        //           console.log(strttime)
        //         $("#tablecaption").text("Time Table Of ALOK Sir");
        //            var  day = "."+data[i].Day
        //
        //          $(day).children(strttime).append($("<li>").html("Group : -" + data[i].Semester+" - "+ data[i].Group_+"<br/> Course:- "+data[i].CourseName +"\n" + "<br/> Room-Number :-"+data[i].RoomId+"<br/>Teacher :-"+ data[i].Teacher_Name+"<br/><br/>"))
        //
        //
        //       }
        //        console.log(data);
        //
        //
        //     }
        // })
//
//
//
    //
    //    return false;
    // })


    // $("#sadd").click(()=>{
    //     console.log("hfddk")
    // })




    // $('#dataqueryss').submit(()=>{
    //     console.log("djdk")
    // })



    // function removeteachername(){
    //     $(".tempoptionteachername").remove();
    // }
    // function removecoursename(){
    //     $(".tempoptioncourse").remove();
    // }
    function removeendtime() {
        $(".tempoptionendtime").remove();
    }





      // $('#dataqueryss').submit(function() {
        //     $.ajax({
        //         type: 'POST',
        //         url: "/fetchdata/add",
        //         data: $(this).serialize(),
        //
        //         success: function(data) {
        //
        //
        //
        //         }
        //     })
        //     return false;
        // });
        //


    }

)