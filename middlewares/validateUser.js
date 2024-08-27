import { body, validationResult } from "express-validator";
import { responseStandar } from "../helpers/response.js";

const validateUser = [
    body("username").notEmpty().withMessage("username field is required").trim(),
    body('email')
    .notEmpty().withMessage('Email field is required')
    .isEmail().withMessage('Email format is not valid')
    .trim(),
    body("password").notEmpty().withMessage("password field is required").trim(),
    body("firstName").notEmpty().withMessage("firstname field is required").trim(),
    body("lastName").notEmpty().withMessage("lastname field is required").trim(),

    (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            const mappedErrors = errors.array().map(error => ({ msg: error.msg }));
            return res.status(400).json(
                responseStandar(false, [] ,mappedErrors)
            );
        }
        next();
    },
];

const validateUserLogin = [
    body("username").notEmpty().withMessage("username field is required").trim(),
    body("password").notEmpty().withMessage("password field is required").trim(),

    (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            const mappedErrors = errors.array().map(error => ({ msg: error.msg }));
            return res.status(400).json(
                responseStandar(false, [] ,mappedErrors)
            );
        }
        next();
    },
]

export {
    validateUser,
    validateUserLogin,
} ;