class CrudRepository {
    constructor(model) {
        this.model = model
    }
    async create(data) {
        try {
            const response = await this.model.create(data)
            return response
        } catch (error) {
            console.log('error in crud repo', error);
            throw error
        }
    }
    async get(id) {
        try {
            const response = await this.model.findById(id)
            return response
        } catch (error) {
            console.log('error in crud repo', error);
        }
    }
    async getAll() {
        try {
            const response = await this.model.find();
            console.log(response);
            return response
        } catch (error) {
            console.log('error in crud repo', error);
        }
    }
    async update(id, data) {
        try {
            const response = await this.model.findByIdAndUpdate(id, data, { new: true })
            return response
        } catch (error) {
            console.log('error in crud repo', error);
        }
    }
    async delete(id) {
        try {
            const response = await this.model.findByIdAndDelete(id)
            return response
        } catch (error) {
            console.log('error in crud repo', error);
        }
    }
}
module.exports = CrudRepository
