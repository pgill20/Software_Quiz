// create_quiz.js
// Created by Dan Glendon, October 17th 2022
// This loads along with create_quiz.html and allows a user (employer) to create a quiz to be sent to potential candidates.
// It is flexible, as it doesn't suggest questions and just allows input.
// Please note, the style as of right now is temporary. It will be changed in the future.

// Websites used for solutions and inspiration in this file:
// https://codepen.io/Kanecodes/pen/EeejJv
// https://stackoverflow.com/questions/16715075/preventing-multiple-clicks-on-button

// Once the window is loaded run the beginning code.
// Note that without this, the script runs before the DOM loads
// and it can't find the buttons to add click events to.
window.onload=function(){

// Screen 1, where you click "Create Question" or submit the finished quiz
var configContainer = document.getElementById('configContainer');
var createButton = document.getElementById('createButton');
var submitButton = document.getElementById('submitButton');
var numberOfQuestions = document.getElementById('numberOfQuestions');
var questions = [[]];
var totalQuestions = 0;
var successText = document.getElementById('successText');

// Screen 2, where you pick what type of question you want to make
var chooseContainer = document.getElementById('chooseContainer');
var multipleChoice = document.getElementById('multipleChoice');
var shortAnswer = document.getElementById('shortAnswer');
var checkAll = document.getElementById('checkAll');
var trueOrFalse = document.getElementById('trueOrFalse');

// Screen 3, where you type in the questions and answers you want
var inputQuestion = document.getElementById('inputQuestion');
var answerOne = document.getElementById('inputOne');
var answerTwo = document.getElementById('inputTwo');
var answerThree = document.getElementById('inputThree');
var answerFour = document.getElementById('inputFour');
var questionText = document.getElementById('questionText');
var answerOneText = document.getElementById('answerOneText');
var answerTwoText = document.getElementById('answerTwoText');
var answerThreeText = document.getElementById('answerThreeText');
var answerFourText = document.getElementById('answerFourText');
var addButton = document.getElementById('addButton');
var position = 0;

// Screen 1 Buttons
if (createButton) {
createButton.addEventListener('click', () => {
    if (totalQuestions <= 100) {
        hideConfiguration();
        unhideChoose();
    } else {
        alert('Too many questions');
    }
})}

if (submitButton) {
submitButton.addEventListener('click', () => {
    if (totalQuestions == 0) {
        alert('Your quiz has zero questions. Please add some.');
    } else {
        hideConfiguration();
        showSuccess();
        submitQuiz();
    }
})}

// Screen 2 Type Buttons
multipleChoice.addEventListener('click', () => {
    hideChoose();
    unhideMultipleChoiceOrCheckAll();
    createMultipleChoice();
})

shortAnswer.addEventListener('click', () => {
    hideChoose();
    unhideShortAnswerOrTrueFalse();
    createShortAnswer();
})

checkAll.addEventListener('click', () => {
    hideChoose();
    unhideMultipleChoiceOrCheckAll();
    createCheckAll();
})

trueOrFalse.addEventListener('click', () => {
    hideChoose();
    unhideShortAnswerOrTrueFalse();
    createTrueOrFalse();
})

backButton.addEventListener('click', () => {
    hideChoose();
    unhideConfiguration();
})

// Screen 3 Add Button
if (addButton) {
    addButton.addEventListener('click', () => {
        //TODO: If any fields are empty, don't continue
        if (1 == 2) {
            alert('Fields need to be filled before submission.');
        } else {
            // TODO: Add "check all" status into the form somewhere
            addButton.disabled = true;
            addQuestion();
            hideMultipleChoiceOrCheckAll();
            unhideConfiguration();
            clearQuiz();
        }
    })}

// Third screens where you fill in the question and answers
function createMultipleChoice() {
    inputQuestion.innerHTML = questions[position][0]
    inputOne.innerHTML = questions[position][1]
    inputTwo.innerHTML = questions[position][2]
    inputThree.innerHTML = questions[position][3]
    inputFour.innerHTML = questions[position][4]
    addButton.disabled = false; 
}

function createCheckAll() {
    inputQuestion.innerHTML = questions[position][0]
    inputOne.innerHTML = questions[position][1]
    inputTwo.innerHTML = questions[position][2]
    inputThree.innerHTML = questions[position][3]
    inputFour.innerHTML = questions[position][4]
    addButton.disabled = false;
}

function createShortAnswer() {
    inputQuestion.innerHTML = questions[position][0]
    addButton.disabled = false;
}

function createTrueOrFalse() {
    inputQuestion.innerHTML = questions[position][0]
    addButton.disabled = false;
}

function addQuestion() {
    // TODO: Add to the bank to be sent to the database
    console.log("WIP");
    totalQuestions += 1;
    if (totalQuestions == 1) {
        numberOfQuestions.innerHTML = 'Your quiz currently has 1 question.'
    } else {
        numberOfQuestions.innerHTML = 'Your quiz currently has ' + totalQuestions + ' questions.'
    }
    
}

function submitQuiz() {
    fetch("/submit_quiz", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(questions)
    }).then(res => {
        console.log("Quiz Submitted! Response:", res);
    });
}

var clearForm = () => { form.classList.add('hide'); }
var clearQuiz = () => { 
    answerOne.innerHTML = '', 
    answerTwo.innerHTML = '', 
    answerThree.innerHTML = '', 
    answerFour.innerHTML = ''
}
var hideConfiguration = () => {
    configContainer.classList.add('hide')
}
var hideChoose = () => {
    chooseContainer.classList.add('hide')
}

var hideMultipleChoiceOrCheckAll = () => { 
    inputQuestion.classList.add('hide');
    answerOne.classList.add('hide');
    answerTwo.classList.add('hide');
    answerThree.classList.add('hide');
    answerFour.classList.add('hide');
    questionText.classList.add('hide');
    answerOneText.classList.add('hide');
    answerTwoText.classList.add('hide');
    answerThreeText.classList.add('hide');
    answerFourText.classList.add('hide');
    addButton.classList.add('hide');
}
var hideShortAnswerOrTrueFalse = () => { 
    questionText.classList.add('hide');
    inputQuestion.classList.add('hide');
    addButton.classList.add('hide');
}
var unhideConfiguration = () => { 
    configContainer.classList.remove('hide');
}
var unhideChoose = () => { 
    chooseContainer.classList.remove('hide');
}
var unhideMultipleChoiceOrCheckAll = () => { 
    inputQuestion.classList.remove('hide');
    answerOne.classList.remove('hide');
    answerTwo.classList.remove('hide');
    answerThree.classList.remove('hide');
    answerFour.classList.remove('hide');
    questionText.classList.remove('hide');
    answerOneText.classList.remove('hide');
    answerTwoText.classList.remove('hide');
    answerThreeText.classList.remove('hide');
    answerFourText.classList.remove('hide');
    addButton.classList.remove('hide');
}
var unhideShortAnswerOrTrueFalse = () => { 
    questionText.classList.remove('hide');
    inputQuestion.classList.remove('hide');
    addButton.classList.remove('hide');
}
var showSuccess = () => {
    successText.classList.remove('hide');
}
}
