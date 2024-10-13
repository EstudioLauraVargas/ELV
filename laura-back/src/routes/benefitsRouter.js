const express = require("express");
const router = express.Router();
const {createBenefit,
    getBenefits,
    getBenefitById,
    updateBenefit,
    deleteBenefit,
    getBenefitsByUser} = require("../controllers/benefitsControllers");



router.post("/add", createBenefit );
router.put("/update/:id", updateBenefit);
router.delete("/:id", deleteBenefit);
router.get("/", getBenefits);
router.get("/:id", getBenefitById);
router.get('/user/:userId', getBenefitsByUser);


module.exports = router;