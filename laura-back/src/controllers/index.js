const {catchedAsync} = require("../utils");
const { getOrderCompra } = require("./OrdersDetails");
const videosControllers = require("./videosControllers");
const benefitsControllers = require("./benefitsControllers");
const getCursosByDocument = require("./getCursosByDocument")



module.exports = {
   
    coursesController:catchedAsync(require("./coursesController")),
    benefitsControllers:catchedAsync(require("./benefitsControllers")),
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
    getCursosByDocument:catchedAsync(require("./getCursosByDocument")),
    createSubscription:catchedAsync(require("./Suscription/createSubscription")),
    deleteSubscription:catchedAsync(require("./Suscription/deleteSubscription")),
    getSubscriptions:catchedAsync(require("./Suscription/getSubscriptions")),
    getSubscriptionById:catchedAsync(require("./Suscription/getSubscriptionById")),
    updateSubscription:catchedAsync(require("./Suscription/updateSubscription")),
    createBenefit: catchedAsync(benefitsControllers.createBenefit),
    getBenefits: catchedAsync(benefitsControllers.getBenefits),
    getBenefitById: catchedAsync(benefitsControllers.getBenefitById),
    updateBenefit: catchedAsync(benefitsControllers.updateBenefit),
    deleteBenefit: catchedAsync(benefitsControllers.deleteBenefit),
    getBenefitsByUser: catchedAsync(benefitsControllers.getBenefitsByUser),
    
    webhook:catchedAsync(require("./webhook"))   
}

