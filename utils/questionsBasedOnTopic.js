const questionGenerator = require("./questionGenerator");

function questionsBasedOnTopic({
  questions,
  topic,
  difficultyDistribution,
  topicMarks,
}) {
  const filteredQuestions = questions.filter(
    (question) => question.topic === topic
  );

  const topicWiseQuestions = questionGenerator({
    questions: filteredQuestions,
    difficultyDistribution: difficultyDistribution,
    totalMarks: topicMarks,
  });

  return topicWiseQuestions;
}

module.exports = questionsBasedOnTopic;
