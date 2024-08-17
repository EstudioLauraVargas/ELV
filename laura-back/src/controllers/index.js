const {catchedAsync} = require("../utils");





module.exports = {
   
    coursesController:catchedAsync(require("./coursesController")),
    putUser:catchedAsync(require("./Users/putUser")),
    createUser:catchedAsync(require("./Users/createUser")),
    getUserByDocument:catchedAsync(require("./Users/getUserByDocument")),
    deleteUser:catchedAsync(require("./Users/deleteUser")),
    getAllUser:catchedAsync(require("./Users/getAllUser")),
    subsController:catchedAsync(require("./subsController")),
    YoutubeController:catchedAsync(require("./YoutubeController")),
    addCourse: catchedAsync("./coursesController.addCourse"),
    updateCourse: catchedAsync("./coursesController.updateCourse"),
    deleteCourse: catchedAsync("./coursesController.deleteCourse"),
    getCourses:catchedAsync(require("./getCourses")),
    getCourseById:catchedAsync(require("./getCourseById"))
   

}

