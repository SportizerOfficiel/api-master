import Club from "../models/club.model.js";
import * as clubsServices from "../services/clubs.services.js"
import { listActions } from "../utils/utils.js";


export const addClub = async (req, res) => {
    try {
        const clubAdded = await clubsServices.addClub(req.params, req.body)
        res.status(200).send(clubAdded);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const getClubs = async (req, res) => {
    try {
        const listsActions = listActions(req.query.sort, req.query.range, req.query.filter);
        const clubs = await clubsServices.getClubs(req.params, listsActions)
        res.status(200).send(clubs);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const getClubById = async (req, res) => {
    try {
        const club = await clubsServices.getClubById(req.params)
        res.status(200).send(club);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const updateClub = async (req, res) => {
    try {
        const clubUpdated = await clubsServices.updateClub(req.params, req.body)
        res.status(200).send(clubUpdated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const deleteClub = async (req, res) => {
    try {
        const clubDeleted = await clubsServices.deleteClub(req.params)
        res.status(200).send(clubDeleted);
    } catch (error) {
        res.status(400).send(error.message);
    }
}