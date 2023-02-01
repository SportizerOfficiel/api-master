import { FirebaseService } from "../config/firebase.js";
import Club from "../models/club.model.js";
import * as clubsDaos from "../daos/clubs.daos.js";

const firebaseService = FirebaseService
const firestore = new FirebaseService().db

export const addClub = async (params, body) => {
    try {
        let idTH
        if (params.idTH !== undefined || body.idTH !== undefined) {
            idTH = params.idTH ? params.idTH : body.idTH
        } else {
            throw new Error("Townhall undefined")
        }
        const club = new Club(undefined, idTH, body.name, body.sport, body.address, new Date(), new Date())        
        return await clubsDaos.addClub(idTH, club)
    } catch (error) {
        throw error
    }
}

export const getClubs = async (params, {sort, range, filter}) => {
    try {
        const idTH = params.idTH
        return await clubsDaos.getClubs(idTH, sort, range, filter)
    } catch (error) {
        throw error
    }
}

export const getClubById = async (params) => {
    try {
        const idTH = params.idTH
        const idClub = params.id
        return await clubsDaos.getClubById(idTH, idClub)
    } catch (error) {
        throw error
    }
}

export const updateClub = async (params, body) => {
    try {
        const idClub = params.id
        const idTH = params.idTH
        const club = new Club(undefined, undefined, body.name, body.sport, body.address, undefined, new Date())
        return await clubsDaos.updateClub(idTH, idClub, club)
    } catch (error) {
        throw error
    }
}

export const deleteClub = async (params) => {
    let returnValue
    try {
        let idTH = params.idTH
        const idClub = params.id
        return await clubsDaos.deleteClub(idTH, idClub)
    } catch (error) {
        throw error
    }
}