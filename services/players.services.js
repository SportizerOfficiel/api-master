import { FirebaseService } from "../config/firebase.js";
import Player from "../models/player.model.js";
import admin from "firebase-admin"
import { listActionsDAO } from "../utils/utils.js";
import * as playersDaos from "../daos/players.daos.js";

const firebaseService = FirebaseService
const firestore = new FirebaseService().db


export const addPlayer = async (body) => {
    try {
        const player = new Player(undefined, body.idTH, body.idClub, body.lastName, body.firstName, new Date(body.birthDate), body.sport, body.category, body.num, new Date(), new Date())
        return await playersDaos.addPlayer(player)
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getPlayers = async (query, {sort, range, filter}) => {
    try {
        let idClub = query.idClub
        return await playersDaos.getPlayers(idClub, sort, range, filter)
    } catch (error) {
        throw error
    }
}

export const getPlayerById = async (params) => {
    try {
        const idPlayer = params.id
        return await playersDaos.getPlayerById(idPlayer)
    } catch (error) {
        throw error
    }
}

export const updatePlayer = async (params, body) => {
    try {
        const idPlayer = params.id
        const player = new Player(undefined, body.idTH, body.idClub, body.lastName, body.firstName, new Date(body.birthDate), undefined, body.category, body.matchsPlayed, undefined, new Date())
        return await playersDaos.updatePlayer(idPlayer, player)
    } catch (error) {
        throw error
    }
}

export const deletePlayer = async (params) => {
    try {
        const idPlayer = params.id
        return await playersDaos.deletePlayer(idPlayer)
    } catch (error) {
        throw error
    }
}