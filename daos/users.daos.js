import { FirebaseService } from "../config/firebase.js";
import TownHall from "../models/townHall.model.js";
import User from "../models/user.model.js";
import "dotenv/config"

import { getAuth } from 'firebase-admin/auth'


const firebaseService = FirebaseService
const firestore = new FirebaseService().db
const auth = new FirebaseService().auth

export const createUser = async (user, claims) => {
    try {
        const res = await getAuth().createUser(user)
        await getAuth().setCustomUserClaims(res.uid, claims)
        return user
    } catch (e) {
        throw e
    }
}

export const authUser = async (email, password) => {
    try{
        await auth.signInWithEmailAndPassword(email, password)
        const user = await auth.currentUser.getIdTokenResult();
        const returnValue = {
            token: user.token,
            expiration: user.expirationTime
        }
        return returnValue;
    } catch (e) {
        throw e
    }
}


export const authCheck = async (token) => {
    try {
        const userInfo = await getAuth().verifyIdToken(token);
        return userInfo
    } catch (e) {
        throw e
    }


}


