import { body, validationResult } from "express-validator";
import { responseStandar } from "../helpers/response.js";

const validateVehicle = [
  body("vehicleName")
    .notEmpty()
    .withMessage("Vehicle name is required")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Vehicle name must be between 3 and 50 characters"),

  body("plate")
    .notEmpty()
    .withMessage("Plate is required")
    .trim()
    .isLength({ min: 3, max: 7 })
    .withMessage("Plate must be between 3 and 7 characters"),

  body("brand")
    .notEmpty()
    .withMessage("Brand is required")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Brand must be between 2 and 50 characters"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number"),

  body("description")
    .optional()
    .isLength({ max: 50 })
    .withMessage("Description must be up to 50 characters"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const mappedErrors = errors.array().map((error) => ({ msg: error.msg }));
      return res.status(400).json(responseStandar(false, [], mappedErrors));
    }
    next();
  },
];

export { validateVehicle };
