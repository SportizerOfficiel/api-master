import { FirebaseService } from "../config/firebase.js";
import TownHall from "../models/townHall.model.js";
import * as townHallDaos from "../daos/townHalls.daos.js";

const firebaseService = FirebaseService
const firestore = new FirebaseService().db

export const addTownHall = async (body) => {
        try {
                const townhall = new TownHall(undefined, body.name, body.address, new Date(), new Date())
                return await townHallDaos.addTownHall(townhall)
        } catch (e) {
                throw e
        }
}

export const getTownHalls = async ({ sort, range, filter }) => {
        try {
                return await townHallDaos.getTownHalls(sort, range, filter)
        } catch (error) {
                throw error
        }
}

export const getTownHallById = async (params) => {
        try {
                const idTH = params.id
                return await townHallDaos.getTownHallById(idTH)
        } catch (error) {
                throw error
        }
}

export const updateTownHall = async (params, body) => {
        try {
                const idTH = params.id
                const townhall = new TownHall(undefined, body.name, body.address, undefined, new Date())
                return await townHallDaos.updateTownHall(idTH, townhall);
        } catch (error) {
                throw error
        }
}

export const deleteTownHall = async (params) => {
        try {
                const idTH = params.id
                return await townHallDaos.deleteTownHall(idTH)
        } catch (error) {
                throw error
        }
}