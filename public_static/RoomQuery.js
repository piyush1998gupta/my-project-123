$(()=>{
    var rbranch,rtype,rstarttime,rendtime,rday
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
    console.log("hi")
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



})