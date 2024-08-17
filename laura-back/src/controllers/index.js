const {catchedAsync} = require("../utils");
const YoutubeController = require("./YoutubeController");




module.exports = {
   
    coursesController:catchedAsync(require("./coursesController")),
    putUser:catchedAsync(require("./Users/putUser")),
    createUser:catchedAsync(require("./Users/createUser")),
    getUserByDocument:catchedAsync(require("./Users/getUserByDocument")),
    deleteUser:catchedAsync(require("./Users/deleteUser")),
    getAllUser:catchedAsync(require("./Users/getAllUser")),
    subsController:catchedAsync(require("./subsController")),
    YoutubeController:catchedAsync(require("./YoutubeController")),

   

}

