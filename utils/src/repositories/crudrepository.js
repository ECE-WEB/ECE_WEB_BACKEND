class crudrepositoty{
    constructor(model){
        this.model=model

    }
    async create(data){
        try {
            const response = await this.model.create(data)
            return response
        } catch (error) {
            throw error
        }
    }
    async findbyid(id){
       
        try {
            const response = await this.model.findById(id)
            console.log(response)
            return response
        } catch (error) {
            throw error
        }
    }
    async find(query={}){
        try {
            const response = await this.model.find(query)
            return response
        } catch (error) {
            throw error
        }
    }
    
}
module.exports = crudrepositoty