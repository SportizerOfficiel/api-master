import express from "express"
import { authUser, createUser } from "../controllers/users.controllers.js";



const router = express.Router();

router.post('/createUser', createUser);
router.post('/auth', authUser);


export default {
    routes: router
}