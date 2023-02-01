import TownHall from "../models/townHall.model.js";
import * as usersService from "../services/users.services.js";

export const createUser = async (req, res) => {
    try {
        const user = await usersService.createUser(req.body)
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const authUser = async (req, res) => {
    try {
        const user = await usersService.authUser(req.body)
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const authCheck = async (req) => {
    try {
        const token = req.headers.authorization
        if (!token) {
            throw ("Token not found")
        }
        const user = await usersService.authCheck(token)
        return user
    } catch (error) {
        throw error
    }
}