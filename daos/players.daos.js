import { FirebaseService } from "../config/firebase.js";
import Player from "../models/player.model.js";
import admin from "firebase-admin"
import { listActionsDAO } from "../utils/utils.js";

const firebaseService = FirebaseService
const firestore = new FirebaseService().db


export const addPlayer = async (player) => {
    let returnValue
    try {
        if (player.matchsPlayed === undefined) {
            player.matchsPlayed = []
        }
        const query = firestore.collection(firebaseService.playersNode).withConverter(Player.playerConverter).doc()
        player.id = query.id
        const playerAdd = await query.set(player)
        const playerSnapshot = await firestore.collection(firebaseService.playersNode).withConverter(Player.playerConverter).doc(query.id).get()
        returnValue = playerSnapshot.data()
        return returnValue
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getPlayers = async (idClub, sort, range, filter) => {
    let returnValue = []
    try {
        const dbRef = firestore.collection(firebaseService.playersNode).withConverter(Player.playerConverter)
        let query = listActionsDAO(dbRef, sort, range, filter)
        if (idClub !== undefined) {
            query = query.where("idClub", "==", idClub)
        } else {
            query = query
        }
        
        const snapshot = await query.get()
        snapshot.forEach(doc => {
            returnValue.push(doc.data())
        });
        return returnValue
    } catch (error) {
        throw error
    }
}

export const getPlayerById = async (idPlayer) => {
    let returnValue
    try {
        const snapshot = await firestore.collection(firebaseService.playersNode).doc(idPlayer).withConverter(Player.playerConverter).get();
        returnValue = snapshot.data()
        return returnValue
    } catch (error) {
        throw error
    }
}

export const updatePlayer = async (idPlayer, player) => {
    let returnValue
    try {
        const matchsPlayed = player.matchsPlayed
        delete player.matchsPlayed
        const playerUpdate = await firestore.collection(firebaseService.playersNode).doc(idPlayer).withConverter(Player.playerConverter).set(player, { merge: true })
        const playerSnapshot = await firestore.collection(firebaseService.playersNode).doc(idPlayer).withConverter(Player.playerConverter).get()
        returnValue = playerSnapshot.data()
        return returnValue
    } catch (error) {
        throw error
    }
}

export const deletePlayer = async (idPlayer) => {
    try {
        const playerDelete = await firestore.collection(firebaseService.playersNode).doc(idPlayer).delete()
        return `player ${idPlayer} deleted`
    } catch (error) {
        throw error
    }
}