import express from "express"
import { addMatch, deleteMatch, getMatchById, getMatchs, updateMatch } from "../controllers/matchs.controllers.js";
import { validateAdmin, validateBoth } from "../middlewares/validate.middlewares.js";
import { BodyNotEmptyValidator } from "../validators/common.validators.js";
import { matchValidator } from "../validators/matchs.validators.js";

const router = express.Router();

router.post('/matchs', [validateBoth, BodyNotEmptyValidator, matchValidator, addMatch]);
router.get('/matchs', [validateBoth, getMatchs]);
router.get('/matchs/:id', [validateBoth, getMatchById]);
router.put('/matchs/:id', [validateBoth, BodyNotEmptyValidator, matchValidator, updateMatch]);
router.delete('/matchs/:id', [validateAdmin, deleteMatch]);


export default {
    routes: router
}