$(()=>{
    Roomview()

    $("#roombranch").change(()=>{
        Roomview()
    })
    $("#roomtype").change(()=>{
        Roomview()
    })
    $("#addroom").submit(function () {
        // console.log("inside")
        $.ajax({
            type : "POST",
            url : "/AddRoom/Add",
            data : $(this).serialize(),

            success : function (data) {
                // console.log(data)
                alert(data.Message)
                if(data.token==1){
                    $("#addroom").trigger("reset")
                }
            }

        })

        Roomview()


            return false;
        })


    function Roomview(){
        $(".clr").remove()

        $.ajax({
            type: "GET",
            url : "/AddRoom/GetRoom",
            data : {
                roombranch: $("#roombranch").val(),
                roomtype : $("#roomtype").val()
            },
            success : function (data) {
                // console.log(data)
                AddRooms(data)
            }
        })
    }


    function AddRooms(RoomData){
        for(i=0;i<RoomData.length;i++){
            var RoomObject = {
                resultroombranch : RoomData[i].RoomBranch,
                resultroomtype : RoomData[i].RoomType,
                resultroomnumber :RoomData[i].RoomId
            }
            ShowRoom(RoomObject)

        }
    }


    function ShowRoom(RoomObject) {
        var roomnumber = RoomObject.resultroomnumber
        var roomtype = RoomObject.resultroomtype
        var roombranch = RoomObject.resultroombranch


        $("#mainresult").append(
            `<tr class="clr" > <td > ${roomnumber}</td>
               <td>${roombranch}</td>
               <td>${roomtype}</td>
               <td><input type="checkbox" class="checkroom" onclick=checkrooms($(this))></td>
               
               </tr>`
        )
    }


    function checkrooms(event){
        console.log(event)
        console.log("clicked")
        // if (event).is(":checked")==true){
        //     console.log("notchecked")
        //     $(this).attr("checked",false)
        // }else{
        //     $(this).attr("checked",true)
        //     console.log("checked")
        // }
        // return false
    }







})