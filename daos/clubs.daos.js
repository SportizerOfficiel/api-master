import { FirebaseService } from "../config/firebase.js";
import Club from "../models/club.model.js";
import { listActionsDAO } from "../utils/utils.js";

const firebaseService = FirebaseService
const firestore = new FirebaseService().db

export const addClub = async (idTH, club) => {
    try {
        const query = firestore.collection(firebaseService.townHallsNode).doc(idTH).collection(firebaseService.clubsNode).withConverter(Club.clubConverter).doc();
        club.id = query.id
        const clubAdd = await query.set(club)
        return clubAdd
    } catch (error) {
        throw error
    }
}

export const getClubs = async (idTH, sort, range, filter) => {
    let returnValue = []
    try {
        let dbRef
        
        if (idTH != undefined) {
            dbRef = firestore.collection(firebaseService.townHallsNode).doc(idTH).collection(firebaseService.clubsNode).withConverter(Club.clubConverter)
        } else {
            dbRef = firestore.collectionGroup(firebaseService.clubsNode).withConverter(Club.clubConverter)
        }
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

export const getClubById = async (idTH, idClub) => {
    let snapshot
    let returnValue
    try {
        if (idTH !== undefined) {
            snapshot = await firestore.collection(firebaseService.townHallsNode).doc(idTH).collection(firebaseService.clubsNode).doc(idClub).withConverter(Club.clubConverter).get();
            returnValue = snapshot.data()
        } else {
            snapshot = await firestore.collectionGroup(firebaseService.clubsNode).where("id", "==", idClub).limit(1).withConverter(Club.clubConverter).get();
            snapshot.forEach(doc => {
                returnValue = doc.data()
            })
        }
        return returnValue
    } catch (error) {
        throw error
    }
}

export const updateClub = async (idTH, idClub, club) => {
    try {
        let clubUpdate
        let returnValue
        if (idTH === undefined) {
            const getIdTH = await firestore.collectionGroup(firebaseService.clubsNode).where("id", "==", idClub).withConverter(Club.clubConverter).get()
            getIdTH.forEach(doc => {
                idTH = doc.data().idTH
            })
        }

        clubUpdate = await firestore.collection(firebaseService.townHallsNode).doc(idTH).collection(firebaseService.clubsNode).doc(idClub).withConverter(Club.clubConverter).set(club, { merge: true });
        const snapshot = await firestore.collection(firebaseService.townHallsNode).doc(idTH).collection(firebaseService.clubsNode).doc(idClub).withConverter(Club.clubConverter).get()
        returnValue = snapshot.data()

        return returnValue
    } catch (error) {
        throw error
    }
}

export const deleteClub = async (idTH, idClub) => {
    let returnValue
    try {
        if (idTH === undefined) {
            const getIdTH = await firestore.collectionGroup(firebaseService.clubsNode).where("id", "==", idClub).withConverter(Club.clubConverter).get()
            getIdTH.forEach(doc => {
                idTH = doc.data().idTH
            })
        }
        const clubDelete = await firestore.collection(firebaseService.townHallsNode).doc(idTH).collection(firebaseService.clubsNode).doc(idClub).delete()
        returnValue = `CLub ${idClub} deleted`
        return returnValue
    } catch (error) {
        throw error
    }
}