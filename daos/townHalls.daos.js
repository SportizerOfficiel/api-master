import { FirebaseService } from "../config/firebase.js";
import TownHall from "../models/townHall.model.js";
import { listActionsDAO } from "../utils/utils.js";
import admin from "firebase-admin"

const firebaseService = FirebaseService
const firestore = new FirebaseService().db

export const addTownHall = async (townhall) => {
        const query = firestore.collection(firebaseService.townHallsNode).doc();
        townhall.id = query.id
        await query.withConverter(TownHall.townHallConverter).set(townhall)
        const snapshot = await firestore.collection(firebaseService.townHallsNode).doc(query.id).withConverter(TownHall.townHallConverter).get()
        return snapshot.data()
}

/**
 * @param {admin.firestore.CollectionReference} dbRef
 * @param {admin.firestore.Query} query
 */
export const getTownHalls = async (sort, range, filter) => {
        let returnValue = []
        try {
                const dbRef = firestore.collection(firebaseService.townHallsNode).withConverter(TownHall.townHallConverter)
                let query = listActionsDAO(dbRef, sort, range, filter)
                const snapshot = await query.get();
                snapshot.forEach(doc => {
                        returnValue.push(doc.data())
                });
                return returnValue
        } catch (error) {
                throw error
        }
}

export const getTownHallById = async (idTH) => {
        let returnValue
        try {
                const snapshot = await firestore.collection(firebaseService.townHallsNode).doc(idTH).withConverter(TownHall.townHallConverter).get();
                returnValue = snapshot.data()
                return returnValue;
        } catch (error) {
                throw error
        }
}

export const updateTownHall = async (idTH, townhall) => {
        try {
                
                const townhallUpdate = await firestore.collection(firebaseService.townHallsNode).doc(idTH).withConverter(TownHall.townHallConverter).set(townhall, { merge: true })
                return townhallUpdate;
        } catch (error) {
                throw error
        }
}

export const deleteTownHall = async (idTH) => {
        try {
                const townhallDelete = await firestore.collection(firebaseService.townHallsNode).doc(idTH).delete()
                return townhallDelete
        } catch (error) {
                throw error
        }
}