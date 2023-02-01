import express from "express"
import { addTownHall, deleteTownHall, getTownHallById, getTownHalls, updateTownHall } from "../controllers/townHalls.controllers.js";
import { townHallValidator } from "../validators/townhalls.validators.js";
import { BodyNotEmptyValidator } from "../validators/common.validators.js";
import { validateAdmin, validateBoth } from "../middlewares/validate.middlewares.js";


const router = express.Router();
router.post('/townhalls', [validateAdmin, BodyNotEmptyValidator, townHallValidator, addTownHall]  );
router.get('/townhalls', [validateAdmin, getTownHalls]);
router.get('/townhalls/:id', [validateBoth, getTownHallById]);
router.put('/townhalls/:id', [validateBoth, BodyNotEmptyValidator, townHallValidator, updateTownHall]);
router.delete('/townhalls/:id', [validateAdmin, deleteTownHall]);


export default {
    routes: router
}