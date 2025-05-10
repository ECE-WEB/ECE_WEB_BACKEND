const { check } = require("express-validator");

const signupValidation =[
    check('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .bail()
    .trim()
    .isLength({ min: 3 })
    .withMessage('First name must be at least 3 characters long')
    .bail()
    .isAlpha()
    .withMessage('First name must contain only letters')
    .escape()
    
    ,
    check('lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .bail()
    .trim()       
    .isLength({ min: 3 })   
    .withMessage('Last name must be at least 3 characters long')
    .bail()
    .isAlpha()
    .withMessage('Last name must contain only letters')
    .escape()
    ,
    check('student_id')
    .notEmpty()
    .withMessage('Student ID is required')
    .bail()
    .isLength({ min:7, max:7 })
    .withMessage('Student ID must be at least 7 characters long')
    .bail()
    .isAlphanumeric()
    .withMessage('Student ID must contain only alphanumeric characters')
    .bail()
    .escape()
    ,
    check('email')
    .notEmpty()
    .withMessage('Email is required')
    .bail()
    .trim()
    .isEmail()
    .withMessage('Invalid email format')
    .escape()
    ,
    check('password')
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .escape()
    ,
    check('role')
    .notEmpty()
    .withMessage('Role is required')
    .escape()
    ,

]
const loginValidation = [
    check('email')
    .notEmpty()
    .withMessage('Email is required')
    .trim()
    .bail()
    .isEmail()
    .withMessage('Invalid email format Please check your email')
    .bail()
    .escape()
    ,
    check('password')
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .isLength({min:6})
    .withMessage('Password must be at least 6 characters long')
    .escape()


]
const tokenValidation = [
    check('authorization')
    .notEmpty()
    .withMessage('Authorization token is required.')
    
    .custom((value,{req})=>{
        
        if(!value.startsWith('Bearer ')){
            throw new Error('Invalid token format. Token should be bearer token.');

        }
        const token = value.split(' ')[1]
        req.token = token
        
        return true
    })
    .escape()
]
module.exports = {
    signupValidation,
    loginValidation,
    tokenValidation
}