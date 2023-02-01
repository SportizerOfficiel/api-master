import TownHall from "../models/townHall.model.js";
import * as townHallServices from "../services/townHalls.services.js";
import { listActions } from "../utils/utils.js";

export const addTownHall = async (req, res) => {
    try {        
        const townhallAdded = await townHallServices.addTownHall(req.body)
        res.status(200).send(townhallAdded);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const getTownHalls = async (req, res) => {
    try {
        const listsActions = listActions(req.query.sort, req.query.range, req.query.filter);
        const townHalls = await townHallServices.getTownHalls(listsActions)
        res.status(200).send(townHalls);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const getTownHallById = async (req, res) => {
    try {
        const townHall = await townHallServices.getTownHallById(req.params)
        res.status(200).send(townHall);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const updateTownHall = async (req, res) => {
    try {
        const townHall = await townHallServices.updateTownHall(req.params, req.body)
        res.status(200).send(townHall);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const deleteTownHall = async (req, res) => {
    try {
        const townhallDeleted = await townHallServices.deleteTownHall(req.params)
        res.status(200).send(townhallDeleted);
    } catch (error) {
        res.status(400).send(error.message);
    }
}