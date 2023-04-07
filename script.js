// Get HTML elements
const questionElement = document.querySelector('.question');
const choicesElement = document.querySelector('.choices');
const submitButton = document.querySelector('#submit-btn');

// Initialize variables
let currentQuestionIndex = 0;
let score = 0;

// Fetch questions from JSON file
fetch('questions.json')
  .then(response => response.json())
  .then(questions => {
    // Display initial question
    showQuestion(questions[currentQuestionIndex]);

    // Handle submit button click
    submitButton.addEventListener('click', () => {
      // Check if answer is correct
      const selectedChoice = document.querySelector('.selected');
      if (selectedChoice) {
        const selectedChoiceText = selectedChoice.innerText;
        if (selectedChoiceText === questions[currentQuestionIndex].answer) {
          score++;
        }
      }

      // Move to next question or end game
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
      } else {
        endGame();
      }
    });
  });

// Show question and answer choices
function showQuestion(question) {
  // Clear previous choices
  choicesElement.innerHTML = '';

  // Display question
  questionElement.innerText = question.question;

  // Display answer choices
  question.choices.forEach(choice => {
    const choiceElement = document.createElement('div');
    choiceElement.classList.add('choice');
    choiceElement.innerText = choice;
    choiceElement.addEventListener('click', () => {
      // Select choice
      const selectedChoice = document.querySelector('.selected');
      if (selectedChoice) {
        selectedChoice.classList.remove('selected');
      }
      choiceElement.classList.add('selected');
    });
    choicesElement.appendChild(choiceElement);
  });
}

// End game and display score
function endGame() {
  questionElement.innerText = `You scored ${score} out of ${currentQuestionIndex}.`;
  choicesElement.innerHTML = '';
  submitButton.disabled = true;
}
