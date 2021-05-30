const express = require("express");
const router = express.Router();
const checkauth = require("../middlewars/auth");
const productController = require('../controllers/productController')
const commanQueries = require('../models/commanQueries')


// Comman Queries
// commanQueries.creteProductTable()
// commanQueries.dropTable('products')

router.get("/",productController.getAll)
router.get("/get/:id",productController.getById)
router.post("/", checkauth, productController.create)
router.delete("/:id",checkauth,productController.deleteById)

module.exports = router;