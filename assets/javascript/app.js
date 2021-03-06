var questions = [{
	question: "What is the surname given to babies born out of wedlock in Dorne?",
	choices: ["Rivers", "Stone", "Sand", "Waters"],
	correctAnswer: 2
},{
	question: "' The Mountain ' is the nickname for which character?",
	choices: ["Sandor Clegane", "Gerold Clegane", "Oberyn Martell", "Gregor Clegane"],
	correctAnswer: 3
}, {
	question: "Who is the  Lord  Commander of the  Kingsguard at the beginning of Game of Thrones?",
	choices: ["Ser Barristan Selmy", "Ser Loras Tyrell", "Ser Jaime Lannister", "ser Jorah Mormont"],
	correctAnswer: 0
}, {
	question: "Who was  Margaery  Tyrell's first husband?",
	choices: ["Tommen Baratheon", "Renly Baratheon", "Joffrey Baratheon", "Stannis Baratheon"],
	correctAnswer: 1
}, {
	question: "Who is known as  ' The King Beyond the Wall ' ?",
	choices: ["Stannis Baratheon", "Tormund Giantsbane", "Mance Rayder", "The Night King"],
	correctAnswer: 2
}, {
	question: "How many times has  Sansa  Stark been married?",
	choices: ["Once", "Twice", "Three times", "None"],
	correctAnswer: 1
}, {
	question: "Who is the ruler of the  Iron  Islands at the beginning of Game of Thrones?",
	choices: ["Balon Greyjoy", "Euron Greyjoy", "Yara Greyjoy", "Aeron Greyjoy"],
	correctAnswer: 0
}, {
	question: "Who was the  Mad  King's  firstborn son?",
	choices: ["Rhaegar Targaryen", "Aegon Targaryen", "Aemon Targaryen", "Viserys Targaryen"],
	correctAnswer: 0
}, {
	question: "Who delivered the fatal blow to the  King in the  North, Robb Stark?",
	choices: ["Ramsay Bolten", "Roose Bolton", "Walder Frey", "Alliser Thorne"],
	correctAnswer: 1
},{
	question: "Which  household  possesses the banner of a  moon and a  falcon?",
	choices: ["House Greyjoy","House Arryn", "House Lannister", "House Karstark"],
	correctAnswer: 1
}];
var currentQuestion = 0;
var correctAnswers = 0;
var totalQuestions = 0;
var quizOver = false;

$(document).ready(function () {

var scoreSetup = function() {
	console.log('inside scoreSetup')
	$('.result').append('<div class="correct"><p>"Correct: "' + correctAnswers +' </p> </div>');
	$('.result').append('<div class="total"><p>"Total: "' + totalQuestions +' </p> </div>');
}

scoreSetup();

	var interval;
	function timer() {
		var timerDiv = $("#timer");
		var counter = 30;
		stopTimer();
		timerDiv.text('Time Left: ' + counter);
		interval = setInterval(function () {
			counter--;
			// console.log('counter', counter);
			if (counter >= 0) {
				timerDiv.text('Time Left: ' + counter);
			}
			if (counter === 0) {
				timerDiv.text('Sorry, out of time');
				clearInterval(interval);
			}
		}, 1000);
	}
	 function stopTimer(){
		 clearInterval(interval);
	 }
	timer();
	// Display the first question
	displayCurrentQuestion();
	$(this).find(".quizMessage").hide();

	// On clicking next, display the next question
	$(this).find(".nextButton").on("click", function () {
		if (!quizOver) {
		
			value = $("input[type='radio']:checked").val();
				console.log('value: ', value);
			if (value == undefined) {
				$(document).find(".quizMessage").text("Please select an answer");
				$(document).find(".quizMessage").show();
			} else {
				// TODO: Remove any message -> not sure if this is efficient to call this each time....
				$(document).find(".quizMessage").hide();
				timer();
				if (value == questions[currentQuestion].correctAnswer) {
					correctAnswers++;
					showScore();
				}

				currentQuestion++; // Since we have already displayed the first question on DOM ready
				if (currentQuestion < questions.length) {
					displayCurrentQuestion();
					totalQuestions++;
					showScore();
				} else {
					displayScore();
					// Change the text in the next button to ask if user wants to play again
					$(document).find(".nextButton").text("Play Again?");
					quizOver = true;
					stopTimer();
				}
			}
		} else { // quiz is over and clicked the next button (which now displays 'Play Again?'
			quizOver = false;
			$(document).find(".nextButton").text("Next Question");
			resetQuiz();
			scoreSetup();
			displayCurrentQuestion();
			timer();
		}
	});

});

// This displays the current question AND the choices
function displayCurrentQuestion() {


	var question = questions[currentQuestion].question;
	var questionClass = $(document).find(".quizContainer > .question");
	var choiceList = $(document).find(".quizContainer > .choiceList");
	var numChoices = questions[currentQuestion].choices.length;
	showScore();

	// Set the questionClass text to the current question
	$(questionClass).text(question);

	// Remove all current <li> elements (if any)
	$(choiceList).find("li").remove();

	var choice;
	for (i = 0; i < numChoices; i++) {
		choice = questions[currentQuestion].choices[i];
		$('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
	}
}

function resetQuiz() {
	currentQuestion = 0;
	correctAnswers = 0;
	totalQuestions = 0;
	$('.result').empty();
	// scoreSetup();
	showScore();
	// timer();	
}

function displayScore() {
	$(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);

}

function showScore() {
	$(".correct").text("Correct: " + correctAnswers);
	$(".total").text("Total: " + totalQuestions)
}