import { FirebaseService } from "../config/firebase.js";
import TownHall from "../models/townHall.model.js";
import User from "../models/user.model.js";
import "dotenv/config"
import * as usersDaos from "../daos/users.daos.js";

import { getAuth } from 'firebase-admin/auth'


const firebaseService = FirebaseService
const firestore = new FirebaseService().db
const auth = new FirebaseService().auth

export const createUser = async (body) => {
    try {
        const user = new User(body.email, body.password)
        let claims = {}
        if (body.admin) {
            claims = {
                admin: true
            }
        }
        if (!!body.idTH) {
            claims = {
                ...claims,
                idTH: body.idTH
            }
        }
        return await usersDaos.createUser(user, claims)
    } catch (e) {
        throw e
    }
}

export const authUser = async (body) => {
    try{
        const email = body.email
        const password = body.password
        return await usersDaos.authUser(email, password)
    } catch (e) {
        throw e
    }
}


export const authCheck = async (token) => {
    try {
        return await usersDaos.authCheck(token)
    } catch (e) {
        throw e
    }
}


