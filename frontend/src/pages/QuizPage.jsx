import { useState } from "react";

const questions = [
  {
    question: "What is the output of 2 + '2' in JavaScript?",
    options: ["4", "22", "NaN", "Error"],
    answer: 1,
  },
  {
    question: "Which hook is used for state in React?",
    options: ["useData", "useState", "useEffect", "useRef"],
    answer: 1,
  },
  {
    question: "Which keyword is used to define a constant?",
    options: ["var", "let", "const", "static"],
    answer: 2,
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style System",
      "Cascading Style Sheets",
      "Color Style Sheets",
    ],
    answer: 2,
  },
  {
    question: "Which company developed React?",
    options: ["Google", "Microsoft", "Facebook", "Amazon"],
    answer: 2,
  },
  {
    question: "Which method converts JSON to object?",
    options: ["JSON.parse()", "JSON.stringify()", "JSON.object()", "parse.JSON()"],
    answer: 0,
  },
  {
    question: "Which HTML tag is used for JavaScript?",
    options: ["<js>", "<javascript>", "<script>", "<code>"],
    answer: 2,
  },
  {
    question: "What is the default port for React?",
    options: ["3000", "5000", "8080", "4200"],
    answer: 0,
  },
  {
    question: "Which operator checks value & type?",
    options: ["==", "=", "===", "!="],
    answer: 2,
  },
  {
    question: "Which lifecycle hook runs once?",
    options: ["useState", "useEffect()", "useEffect([], [])", "useEffect([])"],
    answer: 3,
  },
];

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleNext = () => {
    if (selected === questions[current].answer) {
      setScore(score + 1);
    }

    setSelected(null);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center px-4">
      <div className="bg-base-100 p-6 rounded-xl shadow-lg max-w-xl w-full">
        {!finished ? (
          <>
            <h2 className="text-lg font-semibold mb-4">
              Question {current + 1} / {questions.length}
            </h2>

            <p className="mb-4 text-base-content">
              {questions[current].question}
            </p>

            <div className="space-y-2">
              {questions[current].options.map((opt, index) => (
                <button
                  key={index}
                  onClick={() => setSelected(index)}
                  className={`w-full p-2 rounded-lg border text-left transition
                    ${
                      selected === index
                        ? "bg-primary text-primary-content"
                        : "hover:bg-base-200"
                    }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={selected === null}
              className="mt-5 w-full btn btn-primary"
            >
              {current === questions.length - 1
                ? "Finish Test"
                : "Next"}
            </button>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Quiz Completed 🎉</h2>
            <p className="text-lg">
              Your Score: <span className="text-primary">{score}</span> /{" "}
              {questions.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
