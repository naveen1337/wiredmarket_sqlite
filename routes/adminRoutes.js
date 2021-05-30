const express = require("express");
const router = express.Router();
const checkauth = require("../middlewars/auth");
const adminController = require('../controllers/adminController')
const commanQueries = require('../models/commanQueries')


// Comman Queries
// commanQueries.creteProductTable()

router.get("/",adminController.getAll)
router.post("/login",adminController.login)
router.get("/get/:email",adminController.getBy)
router.post("/",adminController.create)
router.delete("/:id",adminController.deleteBy)

module.exports = router;