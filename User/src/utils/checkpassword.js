const bcrypt = require('bcrypt');

async function checkhashpassword(myPlaintextPassword,hashpassword){
    console.log(myPlaintextPassword,hashpassword)
    return await bcrypt.compareSync(myPlaintextPassword, hashpassword);
}
module.exports={
    checkhashpassword
}