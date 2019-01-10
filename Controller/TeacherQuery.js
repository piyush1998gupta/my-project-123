const {connection} = require("../DB/DBServer")


async function getCourse(Branch,Semester){
    return new Promise(async (resolve,reject)=>{
        await connection.then((conn)=>{
            var Query = "Select CourseName from AddCourse where CourseBranch = ? and CourseSemester = ?"
            conn.query(Query,[Branch,Semester]).then(([row,field])=>{
                // console.log(row)
                resolve (row)
            }).catch((err)=>{
                reject(err)
            })
        })
    })


}

// getCourse("CSE",5).then((data)=>{
//     console.log(data)
// })


async function getTeacher(Branch,CourseName){
    var Query;
    return new Promise((resolve,reject)=>{
            if(CourseName=="All"){
                Query = "select TeacherName from AddTeacher where TeacherBranch = ? " 
                // console.log(Query)
                connection.then((conn)=>{
                    conn.query(Query,[Branch]).then(([row,field])=>{
                        // console.log(row)
                        resolve(row)
                    }).catch((err)=>{
                        reject(err)
                    })
                })
            }else{
                Query = "select AddTeacher.TeacherName from AddTeacher join AddCourse join TeacherCourse where AddTeacher.TeacherId=TeacherCourse.TeacherId and AddCourse.CourseCode=TeacherCourse.CourseCode and AddCourse.CourseName = ? and AddCourse.CourseBranch= ?"
                connection.then((conn)=>{
                    conn.query(Query,[CourseName,Branch]).then(([row,field])=>{
                        resolve(row)
                    }).catch((err)=>{
                        reject(err)
                    })
                })
            }

    })
            
  
}
//
// getTeacher("CSE","JAVA").then((data)=>{
//     console.log(data)
// }).catch((err)=>{
//     console.log(err)
// })


async function getfreeTeachers(Day,StartTime,EndTime,CourseName,Branch){
    var CourseSign,newCourseName,Branchname,BranchSign
    if(CourseName=='All'){
        CourseSign="<>";
        newCourseName="bnbsbnj"
        BranchSign="="
        Branchname=Branch

    }else{
        CourseSign="=";
        newCourseName=CourseName;
        BranchSign="<>";
        Branchname="sghgjahs"
    }

    // var Query = "SELECT DISTINCT AddTeacher.TeacherName From AddTeacher JOIN TeacherCourse join AddCourse WHERE TeacherCourse.TeacherId=AddTeacher.TeacherId AND TeacherCourse.CourseCode=AddCourse.CourseCode AND AddCourse.CourseName "+ CourseSign+"?  AND AddTeacher.TeacherBranch "+BranchSign +" ? AND TeacherCourse.TeacherId NOT IN\n" +
    //     "(SELECT DISTINCT AddTeacher.TeacherId FROM `MasterCseTable` JOIN AddTeacher  WHERE MasterCseTable.TeacherId=AddTeacher.TeacherId AND MasterCseTable.StartTime>= ? AND MasterCseTable.EndTime<= ? AND MasterCseTable.Day= ?)"

    var Query = "SELECT DISTINCT AddTeacher.TeacherName From AddTeacher JOIN TeacherCourse join AddCourse WHERE TeacherCourse.TeacherId=AddTeacher.TeacherId AND TeacherCourse.CourseCode=AddCourse.CourseCode AND AddCourse.CourseName "+ CourseSign+"?  AND AddTeacher.TeacherBranch "+BranchSign +" ? AND TeacherCourse.TeacherId NOT IN\n" +
        "(SELECT DISTINCT AddTeacher.TeacherId FROM `MasterCseTable` JOIN AddTeacher  WHERE MasterCseTable.TeacherId=AddTeacher.TeacherId AND ((MasterCseTable.StartTime>= ? AND MasterCseTable.EndTime<= ?) OR ( MasterCseTable.StartTime < '"+ StartTime +"' And MasterCseTable.EndTime > '"+ StartTime +"' And MasterCseTable.Classtype= 'Lab' )) AND MasterCseTable.Day= ?)"


console.log(Query)

    return new Promise(async (resolve,reject)=>{
        await connection.then((conn)=>{
            conn.query(Query,[newCourseName,Branchname,StartTime,EndTime,Day]).then(([row,field])=>{
                console.log(row)

                resolve(row)
            }).catch((err)=>{
                reject(err);
            })
        })
    })
}


 getfreeTeachers("Monday","13:15:00","14:05:00","ADA","ECE")
a
module.exports={
    getCourse,getTeacher,getfreeTeachers
}