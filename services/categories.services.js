import { FirebaseService } from "../config/firebase.js";
import Category from "../models/category.model.js";
import * as categoriesDaos from "../daos/categories.daos.js";

const firebaseService = FirebaseService
const firestore = new FirebaseService().db



export const addCategory = async (body) => {
    try {
        const category = new Category(undefined, body.name, body.sport, body.parties, body.partyTime, body.halfTime, new Date(), new Date())
        return await categoriesDaos.addCategory(category)
    } catch (error) {
        throw error
    }
}

export const getCategories = async (query) => {
    try {
        const sport = query.sport
        return await categoriesDaos.getCategories(sport)
    } catch (error) {
        throw error
    }
}

export const getCategoryById = async (params) => {
    try {
        const idCategory = params.id
        return await categoriesDaos.getCategoryById(idCategory)
    } catch (error) {
        throw error
    }
}

export const updateCategory = async (params, body) => {
    try {
        const idCategory = params.id
        const category = new Category(undefined, body.name, body.sport, body.parties, body.partyTime, body.halfTime, undefined, new Date())
        return await categoriesDaos.updateCategory(idCategory, category)
    } catch (error) {
        throw error
    }
}

export const deleteCategory = async (params) => {
    try {
        const idCategory = params.id
        return await categoriesDaos.deleteCategory(idCategory)
    } catch (error) {
        throw error
    }
}