const {Section} = require("../models/index")
function total_class_taken_error_response(data){
    const NumberRegex =  /^[1-9][0-9]*$/;
    const {total_class_taken} = data
    if(!NumberRegex.test(total_class_taken)){
        const error = new Error(`Invalid number of total class taken:${total_class_taken}.Please check once total class taken`)
        error.statusCode=400
        throw error
        

    }
}
async function section_error_response(data){
    //  we need to group all the sections for particualr semester and check if the entred section is correct or wrong

    const grouping_field ="section"
    const filter={semester:data.semester} 
    const totalsections = await Section.distinct(grouping_field,filter)
    console.log(totalsections,'these are the total sections')
    const {section,...extrafields} = data
    if(!totalsections.includes(section.toLowerCase())){
        const error = new Error(`Invalid section:${section}.Please check once the entered section`)
        error.statusCode = 400
        throw error
    }


} 
function present_students_error_response(presentStudentsRollNo,sectionStudents){
    const presentstudentSet=new Set(presentStudentsRollNo)
    const result =[]
    const invalidRollNos=[]
    for(const student of sectionStudents){
        const {student_id,roll_no,...extrafields} = student
        console.log(student,'these are the students details')
        if(!student_id || !roll_no){
            const error = new Error('Something went wrong in the server') 
            error.statusCode= 500
            throw error
        } 
        const ispresent = presentstudentSet.has(roll_no)
        if(ispresent){
            presentstudentSet.delete(roll_no)
        }
        
       
        result.push({
            student_id:student_id,
            present:ispresent
        })
        
    }
    console.log(result)
    if(presentstudentSet.size>0){
        invalidRollNos.push(...presentstudentSet)
        const error = new Error(`Invalid present roll numbers found:${invalidRollNos.join(", ")}.Please check once the entred roll numbers`)
        error.statusCode=400
        throw error
    }
    console.log(result)
    return result

    


}
module.exports={
    total_class_taken_error_response,
    section_error_response,
    present_students_error_response

}