$(()=>{
    var rbranch,rtype,rstarttime,rendtime,rday
    var queryask=[]
    removeroomnumbers()
    rbranch = $("#roombranch").val()
    rtype = $("#roomtype").val()
    getRoomNumber(rbranch,rtype)


    function getRoomNumber(roombranch, roomtype) {
        $.ajax({
            type: "GET",
            url: "/RoomQuery/GetRooms",
            data: {
                RoomBranch: roombranch,
                RoomType: roomtype
            },

            success: function (data) {
                AddRoomoptions(data)
            }
        })


    }



    $("#freeroom").click( ()=>{
    // console.log("hi")
        $("#AllRoomresult").attr("hidden","true")
        $("#freeroomresult").removeAttr("hidden")
        $("#freeroomresult").text("")

        rbranch = $("#roombranch").val()
        rtype = $("#roomtype").val()
        rstarttime = $("#roomstarttime").val()
        rendtime = $("#roomendtime").val()
        rday = $("#roomday").val()

        if(rstarttime=="All" || rendtime=='All' || rday=="All"){

            alert("Please specify StartTime,EndTime and Day")
        }else{
            removeRoomresult()
            findFreeRooms(rtype,rbranch,rstarttime,rendtime,rday)
        }

    })

    function findFreeRooms(roomtype,branch,startTime,endTime,day){
        $.ajax({
            type: "Get",
            url: "/RoomQuery/GetFreeRooms",
            data: {
                RoomType : roomtype,
                RoomBranch : branch,
                StartTime :startTime,
                EndTime :endTime,
                Day :day
            },
            success: function (data) {
                PrintRooms(data);
            }
        })
    }

    function PrintRooms(roomdata){
        $("#freeroomresult").append(`<h2 class="tempresult"> Free Rooms </h2>`)
        for(i=0;i<roomdata.length;i++) {
            $("#freeroomresult").append(`<li class="tempresult"> ${roomdata[i].RoomId} </li>`)
        }
    }

    function removeRoomresult(){
        $(".tempresult").remove();
    }


    function AddRoomoptions(roomdata){
        for(i=0;i<roomdata.length;i++){

            $("#roomnumber").append(
                `<option class="temproomid"> ${roomdata[i].RoomId} </option>`
            )
        }
    }

    function removeroomnumbers(){
        $(".temproomid").remove();
    }

    $("#roombranch").change(()=>{
        removeroomnumbers()
        rbranch = $("#roombranch").val()
        rtype = $("#roomtype").val()
        getRoomNumber(rbranch,rtype)
    })

    $("#roomtype").change(()=>{
        removeroomnumbers()
        rbranch = $("#roombranch").val()
        rtype = $("#roomtype").val()
        getRoomNumber(rbranch,rtype)
    })






    $("#roomform").submit(function(){
        $("#freeroomresult").attr("hidden","true")
        $("#AllRoomresult").removeAttr("hidden")
        $("#AllRoomresult").text("")

        // if (!$(".dayshow").attr("hidden")) {
        //     $(".dayshow").attr("hidden", "true")
        // }
        $.ajax({
            type: 'POST',
            url : "/RoomQuery/GetAllRoomsData",
            data : $(this).serialize(),

            success : function(data){
                console.log(data)
                queryask = data[1]
                AllRooms(data[0])



            }
        })
        return false;
    })




    function AllRooms(RoomData){
        // console.log(TeacherData)
        if($("#roomnumber").val()=="All"){
            $.ajax({
                type: "GET",
                url: "/RoomQuery/GetRooms",
                data: {
                    RoomBranch: queryask.roombranch,
                    RoomType: queryask.roomtype
                },

                success: function (data) {
                    console.log(data)
                    for(i=0 ; i<data.length;i++){
                        TableDesignforRoom(data[i].RoomId)
                    }
                    fordisplayingqueriesofroom(RoomData)
                }

            })



        }else{
            // console.log("inside else")

            TableDesignforRoom(queryask.roomnumber)

            fordisplayingqueriesofroom(RoomData)

            // TableDesignforTeacher(TeacherData[0][0].TeacherId,TeacherData[0][0].TeacherName)
        }




    }





    function fordisplayingqueriesofroom(result) {

        if(queryask.roomday=='All'){
            // console.log(queryask.teacherday)
            $(".dayshow").removeAttr("hidden")
        }else{
            $("."+queryask.roomday).removeAttr("hidden")

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
            ShowEntryforroom(resultobject,result[i].RoomId)
        }
    }



    function ShowEntryforroom(resultobject,tableid){
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
                `<div class="${teacherid}">${teachername} </div>`+
                `<div class="${roomno}">  </div>`+

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
                `<span class="${teacherid}">${teachername} </span>`+
                `<span class="${roomno},">  </span>`+

                ` </div> <br>`
        }

    }











    function TableDesignforRoom(tableid){
        // console.log("Teacher")
        $("#AllRoomresult").append(`
         <font size="1" face="Courier New" >
    <table id="${tableid}" width="100%" height="100%" border="1">
    <caption id="tablecaption"><h2 align="center">Room No :-  ${ tableid }</h2></caption>
   
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