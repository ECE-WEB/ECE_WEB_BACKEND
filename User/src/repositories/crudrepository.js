class CrudRepository{
    constructor(model){
        this.model = model
    }
    async create(data){
        try {
            const response = await this.model.create(data)
            return response
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    async destroy(data){
        try {
            const response = await this.model.findByIdAndDelete(data)
            return response
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    async get(data){
        try {
            const response = await this.model.findById(data)
            return response
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    async getAll(){
        try {
            const response = await this.model.find({})
            return response
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    
}
module.exports = CrudRepository
