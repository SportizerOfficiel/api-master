import { FirebaseService } from "../config/firebase.js";
import Category from "../models/category.model.js";
import admin from "firebase-admin"


const firebaseService = FirebaseService
const firestore = new FirebaseService().db



export const addCategory = async (category) => {
    try {
        const snapshot = await firestore.collection(firebaseService.categoriesNode).orderBy("id", "desc").withConverter(Category.categoryConverter).get()
        let lastId = 0
        if (!snapshot.empty){
            lastId = snapshot.docs[0].id
        }
        category.id = parseInt(lastId) + 1
        console.log(category)
        const categoryAdd = await firestore.collection(firebaseService.categoriesNode).doc(category.id.toString()).withConverter(Category.categoryConverter).set(category)
        return categoryAdd
    } catch (error) {
        throw error
    }
}

export const getCategories = async (sport) => {
    let returnValue = []
    try {
        let snapshot
        if (!!sport){
            snapshot = await firestore.collection(firebaseService.categoriesNode).where("sport", "==", sport).withConverter(Category.categoryConverter).get()
        } else {
            snapshot = await firestore.collection(firebaseService.categoriesNode).withConverter(Category.categoryConverter).get()
        }
        snapshot.forEach(doc => {
            returnValue.push(doc.data())
        });
        return returnValue
    } catch (error) {
        throw error
    }
}

export const getCategoryById = async (idCategory) => {
    let returnValue
    try {
        const snapshot = await firestore.collection(firebaseService.categoriesNode).doc(idCategory).withConverter(Category.categoryConverter).get()
        returnValue = snapshot.data()
        return returnValue
    } catch (error) {
        throw error
    }
}

export const updateCategory = async (idCategory, category) => {
    try {
        const categoryUpdate = await firestore.collection(firebaseService.categoriesNode).doc(idCategory.toString()).withConverter(Category.categoryConverter).set(category, { merge: true })
        return categoryUpdate
    } catch (error) {
        throw error
    }
}

export const deleteCategory = async (idCategory) => {
    try {
        const categoryDelete = await firestore.collection(firebaseService.categoriesNode).doc(idCategory).delete()
        return categoryDelete
    } catch (error) {
        throw error
    }
}