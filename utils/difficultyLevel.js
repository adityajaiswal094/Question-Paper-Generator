function difficultyLevelDistributor({ easy, medium, hard }) {
    // Convert incoming values to numbers explicitly
    easy = parseFloat(easy);
    medium = parseFloat(medium);
    hard = parseFloat(hard);
  
    if ((easy === 0 && medium === 0 && hard === 0) || easy + medium + hard > 1) {
      easy = 0.2;
      medium = 0.5;
      hard = 0.3;
    } else if (medium === 0 && hard === 0) {
      let remainingDifficultyProportion = 1 - easy;
      medium = remainingDifficultyProportion / 2;
      hard = remainingDifficultyProportion / 2;
    } else if (easy === 0 && hard === 0) {
      let remainingDifficultyProportion = 1 - medium;
      easy = remainingDifficultyProportion / 2;
      hard = remainingDifficultyProportion / 2;
    } else if (easy === 0 && medium === 0) {
      let remainingDifficultyProportion = 1 - hard;
      easy = remainingDifficultyProportion / 2;
      medium = remainingDifficultyProportion / 2;
    } else if (easy === 0) {
      easy = 1 - medium - hard;
    } else if (medium === 0) {
      medium = 1 - easy - hard;
    } else if (hard === 0) {
      hard = 1 - easy - medium;
    }
  
    // Rounding to two decimal places without converting to string
    easy = +easy.toFixed(2);
    medium = +medium.toFixed(2);
    hard = +hard.toFixed(2);
  
    return { easy, medium, hard };
  }
  

module.exports = difficultyLevelDistributor;
