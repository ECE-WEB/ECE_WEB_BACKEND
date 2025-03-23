const CrudRepository = require('./crudrepository');
const {Annoucements} = require('../models/index');

class AnnoucementsRespository extends CrudRepository{
    constructor(){
        super(Annoucements)
    }
    async getallannouncementbycategoryrepo(data){
        try {
            const response = await Annoucements.find({category:data.category})
            return response
        } catch (error) {
            throw error
        }
    }
}
module.exports = AnnoucementsRespository;