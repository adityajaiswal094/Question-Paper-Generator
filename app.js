const express = require("express");
const app = express();

const _ = require("lodash");
const pool = require("./db/db");

const QuestionStore = require("./data/data.json");
const questionGenerator = require("./utils/questionGenerator");
const difficultyLevelDistributor = require("./utils/difficultyLevel");
const questionsBasedOnTopic = require("./utils/questionsBasedOnTopic");

app.get("/", (req, res) => {
  let easy = req.query.easy || 0;
  let medium = req.query.medium || 0;
  let hard = req.query.hard || 0;

  ({ easy, medium, hard } = difficultyLevelDistributor({
    easy: easy,
    medium: medium,
    hard: hard,
  }));

  const difficultyDistribution = {
    Easy: easy,
    Medium: medium,
    Hard: hard,
  };

  console.log(
    "easy, medium, hard: ",
    difficultyDistribution.Easy,
    difficultyDistribution.Medium,
    difficultyDistribution.Hard
  );
  res.send("Home");
});

app.get("/generatepaper", (req, res) => {
  try {
    const subject = req.query.subject || "Physics";
    const totalMarks = req.query.totalMarks || 100;
    let easy = req.query.easy || 0;
    let medium = req.query.medium || 0;
    let hard = req.query.hard || 0;

    ({ easy, medium, hard } = difficultyLevelDistributor({
      easy: easy,
      medium: medium,
      hard: hard,
    }));

    const difficultyDistribution = {
      Easy: easy,
      Medium: medium,
      Hard: hard,
    };

    const fetchQuestions = QuestionStore.filter(
      (question) => question.subject === subject
    );
    const shuffledQuestions = _.shuffle(fetchQuestions);

    const questionPaper = questionGenerator({
      questions: shuffledQuestions,
      difficultyDistribution: difficultyDistribution,
      totalMarks: totalMarks,
    });

    res.json({
      Subject: subject,
      TotalMarks: totalMarks,
      QuestionPaper: questionPaper,
    });
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/generatepaper/topic", (req, res) => {
  try {
    const subject = req.query.subject || "Physics";
    const totalMarks = req.query.totalMarks || 100;
    const topic = req.query.topic || "";
    const topicPercentage = req.query.topicPercentage;
    let easy = req.query.easy || 0;
    let medium = req.query.medium || 0;
    let hard = req.query.hard || 0;

    ({ easy, medium, hard } = difficultyLevelDistributor({
      easy: easy,
      medium: medium,
      hard: hard,
    }));

    const difficultyDistribution = {
      Easy: easy,
      Medium: medium,
      Hard: hard,
    };

    const fetchQuestions = QuestionStore.filter(
      (question) => question.subject === subject
    );
    const shuffledQuestions = _.shuffle(fetchQuestions);

    // topic wise question selection
    const topicMarks = totalMarks * topicPercentage;
    const topicQuestions = questionsBasedOnTopic({
      questions: shuffledQuestions,
      topic: topic,
      difficultyDistribution: difficultyDistribution,
      topicMarks: topicMarks,
    });

    // remaining questions
    const remainingMarks = totalMarks - topicMarks;
    let remainingQuestions = shuffledQuestions.filter(
      (question) => question.topic !== topic
    );

    remainingQuestions = questionGenerator({
      questions: remainingQuestions,
      difficultyDistribution: difficultyDistribution,
      totalMarks: remainingMarks,
    });

    const questionPaper = [...topicQuestions, ...remainingQuestions];

    res.json({
      Subject: subject,
      TotalMarks: totalMarks,
      QuestionPaper: questionPaper,
    });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = app;
