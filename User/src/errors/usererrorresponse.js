function emailerrorresponse(data){
    if(data.email){
        const userrole = data.role;
        if(userrole==='student'){
            const studentEmailRegex = /^r\d{6}@rguktrkv\.ac\.in$/;
            if (!studentEmailRegex.test(data.email)) {
                const error= new Error('Invalid email format for student check the email once');
                error.statusCode = 400;
                throw error;
            }
        }
        else{
            const normalEmailRegex =/^\S+@\S+\.\S+$/;
            if (!normalEmailRegex.test(data.email)) {
                const error= new Error('Invalid email format please check the email once');
                error.statusCode = 400;
                throw error;
            }
        }


    }
}
function passworderrorresponse(data){
    if(data.password){
        if(!data.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)){
            
            const error = 
            data.password.length < 6 ?  
            new Error(`${data.password} is not valid !,Password must be least 6 characters long`)
            :
            new Error(`${data.password} is not valid !,Password must be at least 6 characters long and contain both letters and numbers.`)
            error.statusCode = 400;
            throw error

        }
    }
}
function roleerrorresponse(data){
    if(data.role){
        const validRoles = ['student', 'admin', 'faculty', 'alumni', 'superadmin'];
        if (!validRoles.includes(data.role)) {
            const error = new Error('Invalid role, please check the role');
            error.statusCode = 400;
            throw error;
        }
    }
}
module.exports={
    emailerrorresponse,
    passworderrorresponse,
    roleerrorresponse
}    