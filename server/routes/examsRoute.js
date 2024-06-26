const router = require("express").Router();
const Exam = require("../models/examModel");
const Question = require("../models/questionModel");
const authMiddleware = require("../middlewares/authMiddleware");

//add exam
router.post("/add", authMiddleware, async (req, res) => {
  try {
    //check if the exam already exists
    const examExists = await Exam.findOne({ name: req.body.name });
    if (examExists) {
      return res
        .status(200)
        .send({ message: "Exam already exists", success: false });
    }
    req.body.questions = [];
    const newExam = new Exam(req.body);
    await newExam.save();
    res.send({
      message: "Exam added successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

//get all exams
router.post("/get-all-exams", authMiddleware, async (req, res) => {
  try {
    const exams = await Exam.find({});
    res.send({
      message: "Exams fetched successfully",
      success: true,
      data: exams,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
})

//get exams by id
router.post("/get-exam-by-id", authMiddleware, async (req, res) => {
  try {
    const exam = await Exam.findById(req.body.examId).populate("questions");
    if (!exam) {
      return res
       .status(404)
       .send({ message: "Exam not found", success: false });
    }
    res.send({
      message: "Exam fetched successfully",
      success: true,
      data: exam,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

//edit exam by id
router.post("/edit-exam-by-id", authMiddleware, async (req, res) => {
  try {
    await Exam.findByIdAndUpdate(req.body.examId, req.body, { new: true });
    res.send({
      message: "Exam updated successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});


//delete exam by id
router.post("/delete-exam-by-id", authMiddleware, async (req, res) => {
  try {
    await Exam.findByIdAndDelete(req.body.examId);
    res.send({
      message: "Exam deleted successfully",
      success: true,
    })
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

//add question to exam
router.post("/add-question-to-exam", authMiddleware, async (req, res) => {
  try {
    //adding questions to Questions collection
    const newQuestion = new Question(req.body);
    const question = await newQuestion.save();

    //adding questions to exam
    const exam = await Exam.findById(req.body.exam);
    exam.questions.push(question._id);
    await exam.save();
    res.send({
      message: "Question added successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

//edit question in exam
router.post("/edit-question-in-exam", authMiddleware, async (req, res) =>{
  try {
    //updating question in Questions collection
    await Question.findByIdAndUpdate(req.body.questionId, req.body);
    res.send({
      message: "Question updated successfully",
      success: true,
    });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: error,
        success: false,
      });
    }
});

//delete question from exam
router.post("/delete-question-from-exam", authMiddleware, async (req, res) => {
  try {
    //deleting question from the questions colletion
    await Question.findByIdAndDelete(req.body.questionId);

    //deleting question from the exam
    const exam = await Exam.findById(req.body.examId);
    exam.questions = exam.questions.filter(
      (question) => question._id!=req.body.questionId
    );
    await exam.save();
    res.send({
      message: "Question deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    })
  }
})


module.exports = router;
