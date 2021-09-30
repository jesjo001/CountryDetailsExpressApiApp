import  { body, validationResult } from 'express-validator';
export const userValidationRules = () => {
  return [
    // username must be an email
    body('username').not().isEmpty(),
    //validation email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 8 }),
  ]
}

export const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}