const express = require("express");
const router = express.Router();
const checkauth = require("../middlewars/auth");
const orderController = require("../controllers/orderController");
const commanQueries = require("../models/commanQueries");

// Comman Queries
// commanQueries.creteOrderTable()
// commanQueries.dropTable('orders')

router.get("/", checkauth, orderController.getAll);
router.get("/get/:id", checkauth, orderController.getById);
router.post("/", orderController.create);
router.get("/filter/", checkauth, orderController.filter);
router.get("/pagination/", checkauth, orderController.paginate);

router.delete("/:id", checkauth, orderController.deleteById);

module.exports = router;
