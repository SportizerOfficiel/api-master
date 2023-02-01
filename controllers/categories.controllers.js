import Category from "../models/category.model.js";
import * as categoriesServices from "../services/categories.services.js";


export const addCategory = async (req, res) => {
    try {
        const categoryAdded = await categoriesServices.addCategory(req.body)
        res.status(200).send(categoryAdded);
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message);
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = await categoriesServices.getCategories(req.query)
        res.status(200).send(categories);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const getCategoryById = async (req, res) => {
    try {
        const category = await categoriesServices.getCategoryById(req.params)
        res.status(200).send(category);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const updateCategory = async (req, res) => {
    try {
        const categoryUpdated = await categoriesServices.updateCategory(req.params, req.body)
        res.status(200).send(categoryUpdated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const categoryDeleted = await categoriesServices.deleteCategory(req.params)
        res.status(200).send(categoryDeleted);
    } catch (error) {
        res.status(400).send(error.message);
    }
}