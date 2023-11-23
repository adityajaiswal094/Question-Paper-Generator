const _ = require("lodash");

function questionBasedOnDifficulty({
  totalSectionalMarks,
  questions,
  difficultyLevel,
}) {
  let filteredQuestions = questions.filter(
    (question) => question.difficulty === difficultyLevel
  );

  const n = filteredQuestions.length;
  const dp = Array.from({ length: n + 1 }, () =>
    Array(totalSectionalMarks + 1).fill(0)
  );

  for (let i = 1; i <= n; i++) {
    const currentQuestion = filteredQuestions[i - 1];
    const { marks } = currentQuestion;

    for (let j = 0; j <= totalSectionalMarks; j++) {
      if (parseInt(marks) > j) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(
          dp[i - 1][j],
          dp[i - 1][j - parseInt(marks)] + parseInt(marks)
        );
      }
    }
  }

  let j = totalSectionalMarks;
  let totalMarksGenerated = 0;
  let selectedQuestions = [];

  for (let i = n; i > 0 && j > 0; i--) {
    if (dp[i][j] !== dp[i - 1][j]) {
      const selectedQuestion = filteredQuestions[i - 1];
      selectedQuestions.push(selectedQuestion);
      totalMarksGenerated += selectedQuestion.marks;
      j -= selectedQuestion.marks;
    }
  }

  if (totalMarksGenerated < totalSectionalMarks) {
    filteredQuestions = _.shuffle(filteredQuestions);
    let extraQuestion = filteredQuestions.find(
      (question) => question.difficulty === difficultyLevel
    );
    extraQuestion.marks = totalSectionalMarks - totalMarksGenerated;
    selectedQuestions = [...selectedQuestions, extraQuestion];
  }

  return selectedQuestions;
}

function questionGenerator({ questions, difficultyDistribution, totalMarks }) {
  let easyQuestions = questionBasedOnDifficulty({
    totalSectionalMarks: totalMarks * difficultyDistribution.Easy,
    questions: questions,
    difficultyLevel: "Easy",
  });

  let mediumQuestions = questionBasedOnDifficulty({
    totalSectionalMarks: totalMarks * difficultyDistribution.Medium,
    questions: questions,
    difficultyLevel: "Medium",
  });

  let hardQuestions = questionBasedOnDifficulty({
    totalSectionalMarks: totalMarks * difficultyDistribution.Hard,
    questions: questions,
    difficultyLevel: "Hard",
  });

  return [...easyQuestions, ...mediumQuestions, ...hardQuestions];
}

module.exports = questionGenerator;

// - difficulty validation for 100%, provide default if total difficulty doesn't add up to 100%

// - marks adjustment for difficulty level if the fn cannot provide questions for the reqd marks

// total question paper - 100 marks

// - allow user to add proportion for topic as well
// - waves (20%) -> 0.2 * 20 easy, 0.5 * 20 medium, 0.3 * 20 hard for waves
// - others (80%)

// - easy(20%)
// - medium(50%)
// - hard(30%)

// - hard -> 6 marks, fn(6, [10,10,10]) -> 0 questions -> random of ([10,10,10]) and then make the marks of it to 6
