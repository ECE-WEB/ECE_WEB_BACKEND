const { default: mongoose } = require("mongoose");
async function subject_id_error_response(data) {
    if(!data.subject_id) {
        const error = new Error("subject_id is required")
        error.statusCode = 400
        throw error
    }
    
    const {subject_id} = data
    if (!mongoose.Types.ObjectId.isValid(subject_id)) {
        const error = new Error("subject_id is invaild.Please check the subject_id")
        error.statusCode = 400
        throw error
    }
    // const subject_idExists  = await Subjects.findById(subject_id)
    // if(!subject_idExists){
    //     const error = new Error("Invalid subject please check  exist of subject.")
    //     error.statusCode = 404
    //     throw error
    // }
       
    

}
function semester_error_response(data){

    if(!data.semester){
        const error = new Error("semester is required")
        error.statusCode = 400
        throw error
    }
    const semester = parseInt(data.semester)
    if(semester<1 || semester>8){
        const error = new Error("Invalid semester please check  exist of semester.")
        error.statusCode = 404
        throw error
    }
}
function validatexlsheet_error_response(data,startIndex){
    /*
        throwing only error for individual student_id and marks will get the bad user experience.So we will gather all the erros and throw at once

    */
    const marksvaritions = ["mid1","mid2","mid3","vat1","vat2","vat3","vat4"] 
    const Numericregex =/^-?\d+(\.\d+)?$/
    const studentIdPattern = /^[rR]\d{6}$/;
    const studentIdSet = new Set();
    let errors=[]
    if(data.length===0){
        const error = new Error('Invalid data .Please make sure data is entered propely')
        statusCode = 400
        throw error
    }
    data.forEach((studentmarks,index)=>{
        const row_number=startIndex+index+1;
        const {student_id , ...marks} = studentmarks;
        
        if(!student_id){
            errors.push({
                row:row_number,
                field:"student_id",
                message:`student_id is required in xlsheet.`
            })
        }
        else{
            const normalizedStudentId = student_id.toLowerCase();
            if (!studentIdPattern.test(normalizedStudentId)) {
                errors.push({
                    row:row_number,
                    field:"student_id",
                    message:`${student_id}, this is Invalid student_id format in xlsheet.Please check the student_id format`
                })
            }
            if (studentIdSet.has(normalizedStudentId)) {
                errors.push({
                    row: row_number,
                    field: "student_id",
                    message: `Duplicate student_id '${normalizedStudentId}' found in xlsheet. Each student_id should be unique.PLease check once`
                });
            } else {
                studentIdSet.add(normalizedStudentId);
            }

            studentmarks.student_id = normalizedStudentId;
        }
        
        
        console.log(marks)
        if(!marks || Object.keys(marks).length==0){
            errors.push({
                row:row_number,
                field:"marks",
                message:"Marks are required in xlsheet"
            })
        }
        for(const [key,value] of Object.entries(marks)){
            if(key==="__EMPTY" || value==="" || value ===undefined || value===null){
                console.log("empty marks are entered")
                errors.push({
                    row:row_number,
                    field:"marks",
                    message:`Invalid or empty field detected in the marks data for student_id: ${student_id}. Please ensure all fields are properly filled.`
                })
            }
            if(!marksvaritions.includes(key)){
                errors.push({
                    row:row_number,
                    field:key,
                    message:`Invalid mid name format ${key} .It should like this midX or vatX(e.g mid1 , vat1).Please check the name format and error field`
                })
            }
            //  value check 
            if(!value){
                errors.push({
                    row:row_number,
                    field:"marks",
                    message:`Please check marks on not propely entred at the rownumber given above`
                })
            }
            if(!Numericregex.test(value) ){
                errors.push({
                    row:row_number,
                    field:"marks",
                    message:`Invalid marks detected for student_id: ${student_id}.Please check once`
                })
            }
            if (value < 0 || value > 15) {
                errors.push({
                    row:row_number,
                    field:"marks",
                    message:`Invalid marks detected for student_id: ${student_id}. Marks should be between 0 and 15. Please verify the input.`
                })
            }
            
        }
    })
    if(errors.length>0){
        const error = new Error('Validation is failed.Please check the xlsheet once')
        error.statusCode= 400
        error.message=errors
        throw error
    }
}
module.exports={
    subject_id_error_response,
    semester_error_response,
    validatexlsheet_error_response
    
}