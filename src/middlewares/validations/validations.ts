import { body, validationResult } from 'express-validator';


export const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    return res.status(400).json({ errors: errors.array() });
}

export const userValidations = () => [
    body('username')
    .notEmpty()
    .isAlphanumeric(),
    body('password').notEmpty(),
    validate
]
