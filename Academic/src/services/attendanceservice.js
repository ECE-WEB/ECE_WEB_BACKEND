const axios = require('axios');
const {attendancerepository} = require("../repositories/index");
const sectionservice = require("./sectionservice");
const { ObjectId } = require('mongodb');
const {envconfig} = require("../config/index")
const attendanceservice = new attendancerepository()
async function createnewattendaceuserservice(data){
    let {section,present_students,subject_id,semester,total_class_taken}=data
    total_class_taken=parseInt(total_class_taken)
    subject_id=new ObjectId(subject_id)
    if(typeof present_students==='string'){
        present_students=JSON.parse(present_students)
    }
    try {
        
        /*
            -firstly i will get the all the roll no from the faculcty
            -then i need to get the all users of that section ex:sec-c like this 
            -now from the i will get only the present students data and absent studnet data
            -if he is presnent increase his attendace 
            -else increase only the class taken
        
        
        i need  the data of a seperate section  api call for that
        */
        const sectionquery = {section:section,semester:semester};
        const student_section_details=await sectionservice.getallsectiondetails(sectionquery);
        const all_student_details=await axios.get(`${envconfig.USER_API}/api/v1/user/`)
        if(all_student_details?.data?.data.length===0 || !all_student_details){
            throw new Error("Error While Fecthing User Data")
        }
        const total_student_details=[]
        const attendancequery =[]
        all_student_details?.data?.data.forEach((student_deatils)=>{
            const student_attendance_details=student_section_details.forEach((student)=>{
                if(student.student_id===student_deatils.student_id){
                    total_student_details.push({...student_deatils,present:present_students.includes(student.roll_no)})
                }
                
            })
            
           



        })
        
        const allstudent_ids = (await attendanceservice.find()).map(student=>student.user_id.toString())
        console.log(allstudent_ids ,'thease are all students ids',total_student_details ,'these are total student details');
        total_student_details.forEach((student)=>{
            const {_id:user_id} = student
            const {present,student_id}=student
            console.log(present)
            // console.log(allstudent_ids.includes(user_id.toString()),user_id.toString())
            if (!allstudent_ids.includes(user_id))
{               
                console.log(user_id,'came to the if statement')
                let inital_user={
                    updateOne:{
                        filter:{user_id:user_id},
                        update:{
                            $setOnInsert:{
                                user_id:user_id,
                                // student_id:student_id
                                
                            },
                            $addToSet:{
                                
                                    [`semester${semester}`]:
                                    
                                        {
                                            subject_id:subject_id,
                                            total_class_taken:total_class_taken,
                                            ...(present ? {total_class_present:total_class_taken}:{total_class_present:0})
                                            
        
                                        }
                                    
                                
                            }
    
                        },
                        
                        upsert:true,
                    }
                }

                attendancequery.push(inital_user)
            }
            else{
                console.log('came to the else part')
                let subject_id_not_exist = {
                    updateOne:{
                        filter:{user_id:user_id,[`semester${semester}`]:{$not:{$elemMatch:{
                           subject_id:subject_id 
                        }}}},
                        update:{
                            $addToSet:{
                                [`semester${semester}`]:{
                                    subject_id:subject_id,
                                    total_class_taken:total_class_taken,
                                    ...(present ? 
                                        {total_class_present:total_class_taken}:{total_class_present:0})

                                }
                            }
                        },
                        upsert:false
                    }
                }
                console.log(subject_id_not_exist,'this is the subject id does not exist')
                let subject_id_exist = {
                        
                    updateOne:{
                        filter:{user_id:user_id,[`semester${semester}`]:{$elemMatch:{
                           subject_id:subject_id 
                        }}},
                        update:{
                            $inc:
                            {
                                [`semester${semester}.$[element].total_class_taken`]: total_class_taken
                            ,
                            
                                ...(present ? {[`semester${semester}.$[element].total_class_present`]: total_class_taken} :{})
                            }
                        },
                        arrayFilters: [
                            { "element.subject_id": subject_id }
                        ],
                        upsert:false
                    }

                }
                attendancequery.push(subject_id_exist,subject_id_not_exist)


            }
            
            
        })
        
        // console.log(attendancequery ,'this is an attendance query')
        const student_attendance = await attendanceservice.bulkcreation(attendancequery)
        
        console.log(student_attendance);
        return student_attendance
    } catch (error) {
        throw error
    }
}
async function getallstudentattendance(query={}){
    try {
        console.log(
            query
        )
        const student_attendance = await attendanceservice.find(query)
        return student_attendance
    } catch (error) {
        console.error(error);
        throw error;
    }
}
module.exports={
    createnewattendaceuserservice,
    getallstudentattendance
}
