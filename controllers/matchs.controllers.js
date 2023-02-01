import Match from "../models/match.model.js";
import * as matchsServices from "../services/matchs.services.js"
import { listActions } from "../utils/utils.js";



export const addMatch = async (req, res) => {
    try {
        const matchAdded = await matchsServices.addMatch(req.body)
        res.status(200).send(matchAdded);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const getMatchs = async (req, res) => {
    try {
        const listsActions = listActions(req.query.sort, req.query.range, req.query.filter);
        const matchs = await matchsServices.getMatchs(listsActions)
        res.status(200).send(matchs);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const getMatchById = async (req, res) => {
    try {
        const match = await matchsServices.getMatchById(req.params)
        res.status(200).send(match);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const updateMatch = async (req, res) => {
    try {
        const matchUpdated = await matchsServices.updateMatch(req.params, req.body)
        res.status(200).send(matchUpdated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const deleteMatch = async (req, res) => {
    try {
        const matchDeleted = await matchsServices.deleteMatch(req.params)
        res.status(200).send(matchDeleted);
    } catch (error) {
        res.status(400).send(error.message);
    }
}