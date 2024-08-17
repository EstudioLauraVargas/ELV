const express = require("express");
const router = express.Router();
const {addCourse,  updateCourse, deleteCourse} = require("../controllers/coursesController");
const {getCourses } = require("../controllers")
const {getCourseById}= require("../controllers")

router.post("/add", addCourse);
router.get("/", getCourses);
router.get("/:idCourse", getCourseById);
router.put("/update/:idCourse", updateCourse);
router.delete("/delete/:idCourse", deleteCourse);

module.exports = router;