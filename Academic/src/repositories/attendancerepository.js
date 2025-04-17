const crudrepository = require("./crudrepository");
const { Attendance } = require("../models/index");
class attendancerepository extends crudrepository {
    constructor() {
        super(Attendance);
    }
    async bulkcreation(query) {
        try {
            const response = await Attendance.bulkWrite(query);
            return response;
        } catch (error) {
           throw error
        }
    }
}

module.exports = attendancerepository;
