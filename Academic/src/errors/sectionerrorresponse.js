const validator = require('validator');
function validate_section_error_response(studentssection,startIndex=0){
    const studentIdPattern = /^[rR]\d{6}$/;
    const NumberRegex =  /^[1-9][0-9]*$/; 
    let errors=[]
    studentssection.forEach((student,index)=>{
        let {
            student_id,
            roll_no,
            section,
            student_name,
            ...extrafields
        }=student
        console.log(student_id,roll_no,section,student_name)
        const row_number = startIndex+index+1
        if (!student_id || roll_no.toString().length===0 || !section) {
            errors.push({
                row: row_number,
                field: "general",
                message: `Missing required fields in row ${row_number}. Please ensure student_id, roll_no, section, and name are all filled.`
            })
            return;
            
        }
        
        if(!studentIdPattern.test(student_id)){
            errors.push({
                row:row_number,
                field:"student_id",
                message:`Invalid student_id:${student_id}.Please check once the xlsheet.`
            })
           
        }
        if(!NumberRegex.test(roll_no)){
            errors.push({
                row:row_number,
                field:"roll_no",
                message:`Invalid roll no:${roll_no} , roll no should be grater than 0.Please check once the xlsheet.`
            })
        }
        if(!/^[A-Za-z]$/.test(section)){
            errors.push({
                row:row_number,
                field:"section",
                message:`Invalid section: ${section}. Section should be a single alphabetic character (A-Z or a-z).`
            })
        }
        if(student_name){
            if (!/^[A-Za-z\s.]+$/.test(student_name)) {
                errors.push({
                    row: row_number,
                    field: "name",
                    message: `Invalid name format: ${student_name}. Name should only contain letters, spaces, and periods.`
                });
            }
            const sanitizedName = validator.escape(student_name);
            student.student_name = sanitizedName;
        }
        
        student.section=section.toLowerCase()
        

    })
    if(errors.length>0){
        const error = new Error('Validation is failed....')
        error.statusCode= 400
        error.message=errors
        throw error
    }
    
        
}
module.exports={
    validate_section_error_response
}