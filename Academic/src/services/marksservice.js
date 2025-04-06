const { ObjectId } = require('mongodb');
const {marksrepository} = require("../repositories/index")
const marksservice = new marksrepository()
async function createmarksservice(studentmarks,studentdetails){
    let newstudentmarks = []
    let values = Object.values(studentmarks)
    for(let i=0; i<values.length; i++){
        newstudentmarks.push(...values[i])
    }
    
    const {subject_id,mid,semester,...user_id} = studentdetails
    if (!subject_id) throw new Error("Enter The Subject Name")
    if (!mid) throw new Error("Enter The Type of Mid")
    if (!semester) throw new Error("Enter The Semester")
    try {
        
        const validatefeilds = newstudentmarks.every(midmarks=>midmarks.student_id && midmarks.marks)
        if(!validatefeilds){
            throw new Error("Please Check The Marks Sheet For Missing Fields. Student ID or Marks  Feild Is Missing or Both Feilds Are Missing")
        } 
        
        const alluser_marks= await marksservice.find()
        
        let alluser_id_data = alluser_marks.map((student_details)=>student_details.user_id.toString())
        
       
        let tmpsemester = `semester${semester}`
        const mongosubject_id = new ObjectId(subject_id)
        for(let key in randomdata){
            const value = randomdata[key]
            
            if(!alluser_id_data.includes(value)){
               
                let new_user_marks_creation = 
                {
                    updateOne: {
                        filter: { user_id: value },
                        update: {
                            $push: {
                                [tmpsemester]: {
                                    subject_id: subject_id,
                                    [mid]:40
                                }
                            }
                        },
                        upsert: true
                    }
                }
                
                marksquery.push(new_user_marks_creation)
                

            }
            else{
                
                let new_subject ={
                    updateOne:{
                        filter:{user_id:value,[tmpsemester]:{$not:{$elemMatch:{subject_id:mongosubject_id}}}},
                        update:{
                            $push:{
                                [tmpsemester]:{
                                    subject_id:subject_id,
                                    [mid]:30
                                }
                                
                            }
                        },
                        upsert:false
                    }
                }
                let already_present_subject = {
                    updateOne:{
                        filter:{user_id:value,[tmpsemester]:{$elemMatch:{subject_id:mongosubject_id}}},
                        update:{
                            $set:{
                                [`${tmpsemester}.$[element].${mid}`]: 50
                            }
                        },
                        arrayFilters: [
                            { "element.subject_id": mongosubject_id }
                        ],
                        upsert:false
                    }
                }
                marksquery.push(already_present_subject,new_subject)
            }
        }
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
module.exports={
    createmarksservice,
    getmarksservice
}