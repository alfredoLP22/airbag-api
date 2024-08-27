import exoress from "express";
import checkAuth from "../middlewares/checkAuth.js";
import {
  createVehicle,
  deleteVehicle,
  editVehicle,
  getAllVehicles,
  getVehicleById,
} from "../controllers/vehicle,controller.js";
import { validateVehicle } from "../middlewares/validateVehicle.js";

const router = exoress.Router();

router.get("/", checkAuth, getAllVehicles);
router.get("/:id", checkAuth, getVehicleById);
router.put("/:id", checkAuth, editVehicle);
router.delete("/:id", checkAuth, deleteVehicle);
router.post("/", [checkAuth, validateVehicle], createVehicle);

export default router;
