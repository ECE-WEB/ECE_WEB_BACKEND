const { check } = require("express-validator");

const announcementsValidations = [
  check('posted_id')
    .notEmpty().withMessage('posted_id is required')
    .isMongoId().withMessage('Invalid posted_id format'),

  check('title')
    .notEmpty().withMessage('Title is required')
    .trim()
    .escape(),

  check('description')
    .notEmpty().withMessage('Description is required')
    .trim()
    .escape(),

  check('category')
    .notEmpty().withMessage('Category is required')
    .trim()
    .isIn(['Jobs', 'Interns', 'Announcements']).withMessage('Category must be one of Jobs, Interns, or Announcements'),

  check('date')
    .notEmpty()
    .withMessage('Date is required')
    .bail()
    .isISO8601().withMessage('Invalid date format')
    .toDate(),

  check('venue')
    .optional() 
    .trim()
    .escape(), 
];

module.exports = { announcementsValidations };
