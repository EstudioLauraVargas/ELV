const express = require("express");
const router = express.Router();
const {addCourse,  updateCourse, deleteCourse} = require("../controllers/coursesController");
const {getCourses } = require("../controllers")
const {getCourseById}= require("../controllers")


router.post("/add", addCourse);
router.put("/update/:idCourse", updateCourse);
router.delete("/delete/:idCourse", deleteCourse);
router.get("/", getCourses);
router.get("/:idCourse", getCourseById);


module.exports = router;