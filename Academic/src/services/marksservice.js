const mongoose = require('mongoose');
const {marksrepository} = require("../repositories/index");
const axios = require('axios');
const marksservice = new marksrepository()
const {marks_error_response} = require("../errors/index")

/**
 * @function createmarksservice
 * @description Handles processing and bulk creation/updating of student marks for a given subject and semester.
 * 
 * @param {Object} studentmarks - An object containing marks of multiple students from the Excel sheet.
 * @param {Object} studentdetails - Details of the subject and semester (e.g., subject_id, semester).
 * 
 * @returns {Promise<Object>} - The result of the bulk mark operations.
 * 
 * @throws Will throw an error pif MongoDB operations fail or data validation throws.
 */
async function createmarksservice(studentmarks, studentdetails) {
    /**
     * @description
     * Step 1: Handle errors and validate input data
     * - subject_id_error_response: Checks if the subject ID exists
     * - semester_error_response: Validates semester number
     * - validatexlsheet_error_response: (Commented out) Validates the XLSheet format
     */
    const { 
        subject_id_error_response, 
        semester_error_response, 
        validatexlsheet_error_response 
    } = marks_error_response;

    console.log(studentmarks, studentdetails);

    await subject_id_error_response(studentdetails);
    semester_error_response(studentdetails);

    /**
     * Step 2: Flatten the student marks into a single list
     */
    let studentMarksList = Object.values(studentmarks).flat();
    console.log(studentMarksList);

    
    validatexlsheet_error_response(studentMarksList); 

    try {
        const { subject_id, semester } = studentdetails;
        const semesterNumber = `semester${semester}`;
        const subjectObjectId = new mongoose.Types.ObjectId(subject_id);

        let marksquery = [];

        studentMarksList.forEach((student) => {
            const { student_id, ...marks } = student;

            /**
             * @description
             * Build an update object dynamically to update multiple mid marks for a student.
             * Keys will follow the format: semesterNumber.$[element].midX
             */
            let updateMultipleMid = {};
            for (const [key, value] of Object.entries(marks)) {
                updateMultipleMid[`${semesterNumber}.$[element].${key}`] = value;
            }

            /**
             * @description
             * Query 1: Insert a new student record with marks if not already present.
             * Uses $setOnInsert with upsert: true.
             */
            let newUserQuery = {
                updateOne: {
                    filter: {
                        user_id: student_id
                    },
                    update:{
                        $setOnInsert: {
                            [semesterNumber]:
                                [
                                    {
                                        createdAt: new Date(),
                                        updatedAt: new Date(),
                                        subject_id: subject_id,
                                        ...marks
                                    }
                                ]
                        }
                    }
                    ,
                    upsert: true
                }
            };

            /**
             * @description
             * Query 2: Add a new subject to an existing student record if the subject doesn't exist yet.
             * Uses $push with $not and $elemMatch.
             */
            let addSubjectQuery = {
                updateOne: {
                    filter: {
                        user_id: student_id,
                        [semesterNumber]: {
                            $not: {
                                $elemMatch: {
                                    subject_id: subjectObjectId
                                }
                            }
                        }
                    },
                    update: {
                        $push: {
                            [semesterNumber]: {
                                subject_id: subject_id,
                                ...marks,
                                createdAt: new Date()
                            }
                        },
                        $set: {
                            updatedAt: new Date()
                        }
                    },
                    upsert: false
                }
            };

            /**
             * @description
             * Query 3: Update the mid marks for an existing subject in the student record.
             * Uses $set with arrayFilters to target the right subject.
             */
            let updateMarksQuery = {
                updateOne: {
                    filter: {
                        user_id: student_id,
                        [semesterNumber]: {
                            $elemMatch: {
                                subject_id: subjectObjectId
                            }
                        }
                    },
                    update: {
                        $set: updateMultipleMid
                    },
                    arrayFilters: [
                        { "element.subject_id": subjectObjectId }
                    ],
                    upsert: false
                }
            };

            // Add all three operations to the bulk query array
            marksquery.push(newUserQuery, updateMarksQuery,addSubjectQuery);
        });

        /**
         * @description
         * Perform bulk write operation for all the constructed queries.
         */
        const studentmarks = await marksservice.bulkcreation(marksquery);
        return studentmarks;
    } catch (error) {
        throw error;
    }
}

async function getmarksservice(data){
    try {
        console.log(data)
        const studentmarks = await marksservice.find(data)
        return studentmarks
    } catch (error) {
        throw error
    }
}
async function getmarksbyid(data){
    try {
        console.log(data ,'this is user_id')
        const user_marks = await marksservice.findbyid(data.id)
        return user_marks
    } catch (error) {
        throw error
    }
}
module.exports={
    createmarksservice,
    getmarksservice,
    getmarksbyid
}