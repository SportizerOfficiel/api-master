import { FirebaseService } from "../config/firebase.js";
import Match from "../models/match.model.js";
import { listActionsDAO } from "../utils/utils.js";

const firebaseService = FirebaseService
const firestore = new FirebaseService().db

export const addMatch = async (match) => {
    let returnValue
    try {
        const query = firestore.collection(firebaseService.matchsNode).withConverter(Match.matchConverter).doc()
        match.id = query.id
        const matchAdd = await query.set(match)
        const matchSnapshot = await firestore.collection(firebaseService.matchsNode).withConverter(Match.matchConverter).doc(query.id).get()
        returnValue = matchSnapshot.data()
        return returnValue
    } catch (error) {
        throw error
    }
}

export const getMatchs = async (sort, range, filter) => {
    let returnValue = []
    try {
        const dbRef = firestore.collection(firebaseService.matchsNode).withConverter(Match.matchConverter);
        let query = listActionsDAO(dbRef, sort, range, filter)
        const snapshot = await query.get()
        snapshot.forEach(doc => {
            returnValue.push(doc.data())
        });
        return returnValue
    } catch (error) {
        throw error
    }
}

export const getMatchById = async (idMatch) => {
    let returnValue
    try {
        const snapshot = await firestore.collection(firebaseService.matchsNode).doc(idMatch).withConverter(Match.matchConverter).get();
        returnValue = snapshot.data()
        return returnValue
    } catch (error) {
        throw error
    }
}

export const updateMatch = async (idMatch, match) => {
    let returnValue = []
    try {
        const matchUpdate = await firestore.collection(firebaseService.matchsNode).doc(idMatch).withConverter(Match.matchConverter).set(match, { merge: true });
        const snapshot = await firestore.collection(firebaseService.matchsNode).doc(idMatch).withConverter(Match.matchConverter).get()
        returnValue =  snapshot.data()
        return returnValue  
    } catch (error) {
        throw error
    }
}

export const deleteMatch = async (idMatch) => {
    let returnValue
    try {
        const matchDelete = await firestore.collection(firebaseService.matchsNode).doc(idMatch).delete()
        returnValue = `Match ${idMatch} deleted`
        return returnValue
    } catch (error) {
        throw error
    }
}