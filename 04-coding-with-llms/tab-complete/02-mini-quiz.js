// Quiz data - note the specific property names
const quizQuestions = [
  {
    questionText: "What is the capital of France?",
    answerOptions: ["London", "Berlin", "Paris", "Madrid"],
    correctIndex: 2
  },
  {
    questionText: "Which planet is closest to the Sun?",
    answerOptions: ["Venus", "Mercury", "Mars", "Earth"],
    correctIndex: 1
  },
  {
    questionText: "What year did World War II end?",
    answerOptions: ["1943", "1944", "1945", "1946"],
    correctIndex: 2
  },
  {
    questionText: "Who wrote 'Romeo and Juliet'?",
    answerOptions: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctIndex: 1
  }
];

// TODO: Implement checkAnswer(questionIndex, userAnswer)
// Returns true if userAnswer matches the correctIndex for that question

// Test the function
console.log("Q1: Is 'Paris' (index 2) correct?", checkAnswer(0, 2));
console.log("Q1: Is 'London' (index 0) correct?", checkAnswer(0, 0));
console.log("Q2: Is 'Mercury' (index 1) correct?", checkAnswer(1, 1));
console.log("Q3: Is '1944' (index 1) correct?", checkAnswer(2, 1));
