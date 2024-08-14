const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const authorizeRole = require("../middleware/authorizeRole");
const adminController = require("../controllers/coursesController");

router.use(verifyToken);
router.use(authorizeRole(["admin"]));

router.post("/add-course", adminController.addCourse);
router.put("/update-course/:id", adminController.updateCourse);
router.delete("/delete-course/:id", adminController.deleteCourse);

module.exports = router;
