const { ObjectId } = require('mongodb');
const {marksrepository} = require("../repositories/index");
const axios = require('axios');
const marksservice = new marksrepository()
async function createmarksservice(studentmarks,studentdetails){
    
    let newstudentmarks = []
    let values = Object.values(studentmarks)
    for(let i=0; i<values.length; i++){
        newstudentmarks.push(...values[i])
    }
    
    const {subject_id,semester,...user_id} = studentdetails
    if (!subject_id) throw new Error("Enter The Subject Name")
    if (!semester) throw new Error("Enter The Semester")
    try {
        
        const validatefeilds = newstudentmarks.every((studentmarks)=>{
            let {student_id,...marks}=studentmarks
            console.log(student_id,marks)
            if(!student_id) {
                console.log(student_id,'false from the student_id')
                return false
            }
            for(const [key,value] of Object.entries(marks)){
                if(key==="__EMPTY" || value==="" || value ===undefined || value===null){
                    console.log(key,value)
                    return false
                }
            }
            return true
        })
        
        if(!validatefeilds){
            throw new Error("Please Check The Marks Sheet For Missing Fields. Student ID or Marks  Feild Is Missing or Both Feilds Are Missing")
        } 
        let user_id_marks=[]
        const users_data = await  axios.get('http://localhost:9002/api/v1/user/')
        
        newstudentmarks.forEach((student)=>{
            let {student_id,...marks} = student
            let user_deatils_of_id = users_data.data.data.filter((user)=>user.student_id == student_id)
            
            if(user_deatils_of_id.length!=0){
                
                const user_id = user_deatils_of_id[0]._id
                user_id_marks.push({
                    student_id:user_id,
                    ...marks
                })
            }
            

           
        })
        
        
        const alluser_marks= await marksservice.find()
        
        let alluser_id_data = alluser_marks.map((student_details)=>student_details.user_id.toString())
        let tmpsemester = `semester${semester}`
        const mongosubject_id = new ObjectId(subject_id)
        let marksquery=[]
        user_id_marks.forEach((student)=>{
            const {student_id,...marks} = student
            
            if(!alluser_id_data.includes(student_id)){
               
                let new_user_marks_creation = 
                {
                    updateOne: {
                        filter: { user_id: student_id },
                        update: {
                            $push: {
                                [tmpsemester]: {
                                    subject_id: subject_id,
                                    ...marks
                                }
                            }
                        },
                        upsert: true
                    }
                }
                
                marksquery.push(new_user_marks_creation)
                

            }
            else{
                let update_multiple_mid={}
                for(const [key,value] of Object.entries(marks)){
                    update_multiple_mid[`${tmpsemester}.$[element].${key}`] = value
                }
                let new_subject ={
                    updateOne:{
                        filter:{user_id:student_id,[tmpsemester]:{$not:{$elemMatch:{subject_id:mongosubject_id}}}},
                        update:{
                            $push:{
                                [tmpsemester]:{
                                    subject_id:subject_id,
                                    ...marks
                                }
                                
                            }
                        },
                        upsert:false
                    }
                }
                let already_present_subject = {
                    updateOne:{
                        filter:{user_id:student_id,[tmpsemester]:{$elemMatch:{subject_id:mongosubject_id}}},
                        update:{
                            $set:
                                update_multiple_mid
                            
                        },
                        arrayFilters: [
                            { "element.subject_id": mongosubject_id }
                        ],
                        upsert:false
                    }
                }
                marksquery.push(already_present_subject,new_subject)
            }

        })
            
        
        const studentmarks = await marksservice.bulkcreation(marksquery)
        return studentmarks
    } 
    catch (error) {
        console.log(error)
        throw error
    }
}
async function getmarksservice(data){
    try {
        console.log(data)
        const studentmarks = await marksservice.find(data)
        return studentmarks
    } catch (error) {
        throw error
    }
}
async function getmarksbyid(data){
    try {
        console.log(data ,'this is user_id')
        const user_marks = await marksservice.findbyid(data.id)
        return user_marks
    } catch (error) {
        throw error
    }
}
module.exports={
    createmarksservice,
    getmarksservice,
    getmarksbyid
}