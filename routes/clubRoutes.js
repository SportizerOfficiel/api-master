import express from "express"

import {addClub, deleteClub, getClubById, getClubs, updateClub} from '../controllers/clubs.controllers.js'
import { validateAdmin, validateBoth } from "../middlewares/validate.middlewares.js";
import { clubValidator } from "../validators/clubs.validators.js";
import { BodyNotEmptyValidator } from "../validators/common.validators.js";


const router = express.Router();
router.post('/townhalls/:idTH/clubs', [validateAdmin, BodyNotEmptyValidator, clubValidator, addClub]);
router.post('/clubs', [validateAdmin, BodyNotEmptyValidator, clubValidator, addClub]);
router.get('/townhalls/:idTH/clubs', [validateBoth, getClubs]);
router.get('/clubs', [validateBoth, getClubs]);
// router.get('/clubs/all', getAllClubs);
router.get('/townhalls/:idTH/clubs/:id', [validateBoth, getClubById]);
router.get('/clubs/:id', [validateBoth, getClubById]);
router.put('/townhalls/:idTH/clubs/:id', [validateBoth, BodyNotEmptyValidator, clubValidator, updateClub]);
router.put('/clubs/:id', [validateBoth, BodyNotEmptyValidator, clubValidator, updateClub]);
router.delete('/townhalls/:idTH/clubs/:id', [validateAdmin, deleteClub]);
router.delete('/clubs/:id', [validateAdmin, deleteClub]);


export default {
    routes: router
}