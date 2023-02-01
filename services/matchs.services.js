import { FirebaseService } from "../config/firebase.js";
import Match from "../models/match.model.js";
import { listActionsDAO } from "../utils/utils.js";
import * as matchsDaos from "../daos/matchs.daos.js";

const firebaseService = FirebaseService
const firestore = new FirebaseService().db

export const addMatch = async (body) => {
    try {
        const match = new Match(undefined, body.homeTeam, body.awayTeam, new Date(body.date), body.place, body.category, body.sport, 0, 0, 0, 0, body.duration, new Date(), new Date())
        return await matchsDaos.addMatch(match)
    } catch (error) {
        throw error
    }
}

export const getMatchs = async ({sort, range, filter}) => {
    try {
        return await matchsDaos.getMatchs(sort, range, filter)
    } catch (error) {
        throw error
    }
}

export const getMatchById = async (params) => {
    try {
        const idMatch = params.id
        return await matchsDaos.getMatchById(idMatch)
    } catch (error) {
        throw error
    }
}

export const updateMatch = async (params, body) => {
    try {
        const idMatch = params.id
        const match = new Match(undefined, body.homeTeam, body.awayTeam, new Date(body.date), body.place, body.category, body.sport, body.homePoints, body.awayPoints, body.homeFouls, body.awayFouls, body.duration, undefined, new Date())
        return await matchsDaos.updateMatch(idMatch, match)
    } catch (error) {
        throw error
    }
}

export const deleteMatch = async (params) => {
    try {
        const idMatch = params.id
        return await matchsDaos.deleteMatch(idMatch)
    } catch (error) {
        throw error
    }
}