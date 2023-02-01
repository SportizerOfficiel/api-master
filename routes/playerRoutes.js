import express from "express"

import { addPlayer, deletePlayer, getPlayerById, getPlayers, updatePlayer } from "../controllers/players.controllers.js";
import { validateAdmin, validateBoth } from "../middlewares/validate.middlewares.js";
import { BodyNotEmptyValidator } from "../validators/common.validators.js";
import { playerValidator } from "../validators/players.validators.js";


const router = express.Router();

router.post('/players', [validateBoth, BodyNotEmptyValidator, playerValidator, addPlayer]);
router.get('/players', [validateBoth, getPlayers]);
router.get('/players/:id', [validateBoth, getPlayerById]);
router.put('/players/:id', [validateBoth, BodyNotEmptyValidator, playerValidator, updatePlayer]);
router.delete('/players/:id', [validateAdmin, deletePlayer]);


export default {
    routes: router
}