import express from "express"
import { addCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controllers/categories.controllers.js";
import { validateAdmin } from "../middlewares/validate.middlewares.js";



const router = express.Router();

router.post('/categories', [validateAdmin, addCategory]);
router.get('/categories', [validateAdmin, getCategories]);
router.get('/categories/:id', [validateAdmin, getCategoryById]);
router.put('/categories/:id', [validateAdmin, updateCategory]);
router.delete('/categories/:id', [validateAdmin, deleteCategory]);


export default {
    routes: router
}