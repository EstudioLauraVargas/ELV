const express = require("express");
const router = express.Router();
const {addCourse,  updateCourse, deleteCourse} = require("../controllers/coursesController");
const {getCourses } = require("../controllers")
const {getCourseById}= require("../controllers")

router.post("/add", addCourse);
router.get("/", getCourses);
router.get("/:idCourse", getCourseById);
router.put("/update", updateCourse);
router.delete("/delete", deleteCourse);

module.exports = router;