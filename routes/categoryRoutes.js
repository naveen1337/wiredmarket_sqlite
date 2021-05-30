const express = require("express");
const router = express.Router();
const checkauth = require("../middlewars/auth");
const categoryController = require('../controllers/categoryController')
const commanQueries = require('../models/commanQueries')


// Comman Queries
// commanQueries.creteCategoryTable()
// commanQueries.dropTable('categories')

router.get("/",categoryController.getAll)
router.get("/:id",categoryController.getById)
router.post("/",categoryController.create)
router.put("/:id",checkauth,categoryController.update)
router.delete("/:id",categoryController.deleteBy)

module.exports = router;