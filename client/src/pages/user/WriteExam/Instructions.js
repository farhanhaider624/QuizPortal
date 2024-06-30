import React from "react";

const Instructions = ({ examData, view, setView, startTimer }) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <ul className="flex flex-col gap-1">
        <h1 className="text-2xl underline font-wt-none">Instructions</h1>
        <li>Exam must be completed in {examData.duration} seconds.</li>
        <li>
          Exam will be submitted automatically after {examData.duration}{" "}
          seconds.
        </li>
        <li>Once submitted, you cannot change your answers.</li>
        <li>Do not refresh the page.</li>
        <li>
          You can use the <span className="font-bold">"Previous"</span> and{" "}
          <span className="font-bold">"Next"</span> buttons to navigate between
          questions.
        </li>
        <li>
          Total marks of the exam is{" "}
          <span className="font-bold">{examData.totalMarks}</span>.
        </li>
        <li>
          Passing marks of the exam is{" "}
          <span className="font-bold">{examData.passingMarks}</span>.
        </li>
      </ul>
      <button
        className="primary-outlined-btn"
        onClick={() =>{
          startTimer();
          setView("questions")
        }}
      >
        Start Exam
      </button>
    </div>
  );
};

export default Instructions;
