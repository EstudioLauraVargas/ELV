const {catchedAsync} = require("../utils");
const { getOrderCompra } = require("./OrdersDetails");
const videosControllers = require("./videosControllers");



module.exports = {
   
    coursesController:catchedAsync(require("./coursesController")),
    putUser:catchedAsync(require("./Users/putUser")),
    createUser:catchedAsync(require("./Users/createUser")),
    createOrderDetail:catchedAsync(require("./OrdersDetails/createOrderDetail")),
    getOrderCompra:catchedAsync(require("./OrdersDetails/getOrderCompra")),
    getUserByDocument:catchedAsync(require("./Users/getUserByDocument")),
    deleteUser:catchedAsync(require("./Users/deleteUser")),
    getAllUser:catchedAsync(require("./Users/getAllUser")),
    subsController:catchedAsync(require("./subsController")),
    videosControllers:catchedAsync(require("./videosControllers")),
    addCourse: catchedAsync("./coursesController.addCourse"),
    updateCourse: catchedAsync("./coursesController.updateCourse"),
    deleteCourse: catchedAsync("./coursesController.deleteCourse"),
    getCourses:catchedAsync(require("./getCourses")),
    getCourseById:catchedAsync(require("./getCourseById")),
    createSubscription:catchedAsync(require("./Suscription/createSubscription")),
    deleteSubscription:catchedAsync(require("./Suscription/deleteSubscription")),
    getSubscriptions:catchedAsync(require("./Suscription/getSubscriptions")),
    getSubscriptionById:catchedAsync(require("./Suscription/getSubscriptionById")),
    updateSubscription:catchedAsync(require("./Suscription/updateSubscription")),
    webhook:catchedAsync(require("./webhook"))   
}

