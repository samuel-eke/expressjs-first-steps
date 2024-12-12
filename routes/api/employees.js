const express = require("express");
const router = express.Router();
const { getAllEmployees, createNewEmployee, getAnEmployee, removeEmployee, updateAnEmployee } = require("../../controllers/employeesController")


router.route("/")
  .get(getAllEmployees)
  .post(createNewEmployee)
  .put(updateAnEmployee)
  .delete(removeEmployee);

router.route("/:id").get(getAnEmployee);

module.exports = router;
