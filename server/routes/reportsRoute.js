const router = require('express').Router();
const authMiddleWare = require('../middlewares/authMiddleware');
const Exam = require('../models/examModel');
const User = require('../models/userModel');
const Report = require('../models/reportModel');

//add report

router.post("/add-report", authMiddleWare, async (req, res) => {
    try {
        const newReport = new Report(req.body);
        await newReport.save();
        res.send({
            message: "Report added successfully",
            success: true,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        })
    }
});

//get all reports

router.post("/get-all-attempts", authMiddleWare, async (req, res) => {
    try {
        const reports = await Report.find();
        res.send({
            message: "Reports fetched successfully",
            data:reports,
            success: true,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        })
    }
});

//get all reports by userId

router.post("/get-all-attempts-by-user", authMiddleWare, async (req, res)=>{
    try {
        const reports = await Report.find({userId: req.body.userId});
        res.send({
            message: "Reports fetched successfully",
            data:reports,
            success: true,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        })
    }
});


module.exports = router;