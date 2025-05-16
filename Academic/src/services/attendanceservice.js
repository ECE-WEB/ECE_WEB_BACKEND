const axios = require('axios');
const {attendancerepository} = require("../repositories/index");
const sectionservice = require("./sectionservice");
const { default: mongoose } = require('mongoose');
const attendanceRepo = new attendancerepository()
const {attendance_error_response,marks_error_response} = require("../errors/index")
async function createnewattendaceuserservice(data){
    let {
        section,
        present_students,
        subject_id,
        semester,
        total_class_taken
    }   =  data
    const {
        total_class_taken_error_response,
        section_error_response,
        present_students_error_response
    } = attendance_error_response
    const {
        subject_id_error_response,
        semester_error_response
    } = marks_error_response
    semester_error_response(data)
    total_class_taken_error_response(data)
    await section_error_response(data)
    await subject_id_error_response(data)
    total_class_taken=parseInt(total_class_taken)

    const sectionLowercase = section.toLowerCase()

    const sectionquery = {section:sectionLowercase,semester:semester};
    const student_section_details= await sectionservice.getallsectiondetails(sectionquery);
    
    const attendanceList=present_students_error_response(present_students,student_section_details) 
    try {
        const subjectObjectId=new mongoose.Types.ObjectId(subject_id)
        const semesterNumber = `semester${semester}`
        const attendancequery =[]
        attendanceList.forEach((student)=>{
            const {present,student_id}=student
            let inital_user={
                updateOne:
                {
                    filter:
                    {
                        user_id:
                        student_id
                    }
                    ,
                    update:
                    {
                        $setOnInsert:
                        {
                            [semesterNumber]:
                            
                                [
                                    {
                                        subject_id:subjectObjectId,
                                        total_class_taken:total_class_taken,
                                        ...
                                        (present ? 
                                            { 
                                                total_class_present:total_class_taken

                                            } 
                                        : 
                                            {   
                                                total_class_present:0
                                                
                                            }
                                        )

                                    }
                                ]
                            
                        }
                        

                    },
                    
                    upsert:true,
                }
            }

                
            let subject_id_not_exist = {
                updateOne:{
                    filter:
                    {
                        user_id:student_id,
                        [semesterNumber]:
                        {
                            $not:
                            {
                                $elemMatch:
                                {
                                    subject_id:subjectObjectId 
                                }
                            }

                        }
                    },
                    update:{
                        $push:{
                            [semesterNumber]:{
                                subject_id:subjectObjectId,
                                total_class_taken:total_class_taken,
                                ...(present ? 
                                    {total_class_present:total_class_taken}:{total_class_present:0})

                            }
                        }
                    },
                    upsert:false
                }
            }
           
            let subject_id_exist = {
                    
                updateOne:{
                    filter:
                    {
                        user_id:student_id,
                        [semesterNumber]:
                        {
                            $elemMatch:
                                    
                            {
                                subject_id:subjectObjectId 
                                    
                            }
                        }
                    },
                    update:{
                        $inc:
                        {
                            [`${semesterNumber}.$[element].total_class_taken`]: total_class_taken
                        ,
                        
                            ...(present ? 
                                {
                                    [`${semesterNumber}.$[element].total_class_present`]
                                    : 
                                    total_class_taken
                                } 
                                :
                                {}
                            )
                        }
                    },
                    arrayFilters: [
                        { "element.subject_id": subjectObjectId }
                    ],
                    upsert:false
                }

                }
                attendancequery.push(subject_id_exist,subject_id_not_exist,inital_user)


            
            
            
        })
        
        const student_attendance = await attendanceRepo.bulkcreation(attendancequery)
        
        return student_attendance
    } catch (error) {
        throw error
    }
}
async function getallstudentattendance(query={}){
    try {
        
        const student_attendance = await attendanceRepo.find(query)
        return student_attendance
    } catch (error) {
        console.error(error);
        throw error;
    }
}
async function groupallsectionbysemester(grouping_field,filter){
    try {
        const sections = await attendanceRepo.groupsectionofsemester(grouping_field,filter)
        return sections
    } catch (error) {
        throw error
    }
}
module.exports={
    createnewattendaceuserservice,
    getallstudentattendance,
    groupallsectionbysemester
}
