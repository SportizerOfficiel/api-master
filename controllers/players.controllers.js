import Player from "../models/player.model.js";
import * as playerServices from '../services/players.services.js'
import { listActions } from "../utils/utils.js";


export const addPlayer = async (req, res) => {
    try {
        const playerAdded = await playerServices.addPlayer(req.body)
        res.status(200).send(playerAdded);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const getPlayers = async (req, res) => {
    try {
        const listsActions = listActions(req.query.sort, req.query.range, req.query.filter);
        const players = await playerServices.getPlayers(req.query, listsActions)
        res.status(200).send(players);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const getPlayerById = async (req, res) => {
    try {
        const player = await playerServices.getPlayerById(req.params)
        res.status(200).send(player);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const updatePlayer = async (req, res) => {
    try {
        
        const playerUpdated = await playerServices.updatePlayer(req.params, req.body)
        res.status(200).send(playerUpdated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const deletePlayer = async (req, res) => {
    try {
        const playerDeleted = await playerServices.deletePlayer(req.params)
        res.status(200).send(playerDeleted);
    } catch (error) {
        res.status(400).send(error.message);
    }
}