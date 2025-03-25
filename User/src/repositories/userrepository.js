const CrudRepository = require("./crudrepository");
const {User} = require('../models/index')
class Userrepository extends CrudRepository{
    constructor(){
        super(User)
    }
    async checklogin(data){
        try {
            const user = await User.findOne({
               
                    email:data.email
                
            })
            return user
        } catch (error) {
            throw error
        }
    }
}
module.exports=Userrepository