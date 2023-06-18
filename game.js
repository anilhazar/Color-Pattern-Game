var userClickedPattern = []; // Array to store the answers of the user to compare with gamePattern
var gamePattern = []; // Array to store randomly generated gamepattern

var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0,
  flag = 0;

function nextSequence() {
  // everytime user level up we need to set things so the game runs properly
  userClickedPattern = []; // clearing the user template every time the user levels up so that the user can memorize and apply the game template from scratch
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber]; // randomly generated numbers so the button color
  gamePattern.push(randomChosenColor); // pushing the chosen color to the end of gamepattern array so we can create a template
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100); // flash animation everytime a button chosen or clicked
  playSounds(randomChosenColor); // sounds for the chosen color
  level++; // level variable is incremented so the h1 inform the user about current level
  $("#level-title").html("Level " + level);
  flag++; // flag to check rather it is starting level of the game or not
}

$(".btn").on("click", function () {
  var userChosenColor = $(this).attr("id"); // getting id( also the color name) of chosen colour through "this" to add it to usersPattern
  userClickedPattern.push(userChosenColor); // We add the clicked color to the end of userClickedPattern array.
  playSounds(userChosenColor); // sounds
  animatePress(userChosenColor); // animate of buttons
  checkAnswer(); // Checking the current answer clicked
});

function playSounds(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); // sound names are related to color names so we can play the sound using the id name
  audio.play();
}

function animatePress(currentColor) {
  // animation of the press button pressed using css property
  $("." + currentColor).addClass("pressed"); // adding "pressed" class so the css properties applied to the right button
  setTimeout(function () {
    $("." + currentColor).removeClass("pressed"); // removing the "pressed" after 100 milsecs so it wont animation isnt permanent
  }, 100);
}

$(document).on("keydown", function () {
  // function to start the game when the users click the key on the keyboard
  if (flag == 0) {
    // checking rather its beginning of the game
    $("#level-title").html("Level " + level);
    flag++; // increasing the flag variable when the game starts
    nextSequence(); // to start the game and select the first cbutton of the gamepattern we call nextsequence function manually
  }
});

function checkAnswer() {
  // checking the answer of the user to contunie the game
  var currentIndex = userClickedPattern.length - 1; // var to acces the last elemnt of the usersPattern
  if (userClickedPattern[currentIndex] === gamePattern[currentIndex]) {
    // checking the same indexes of the patterns, if the most recent answer of the users
    if (userClickedPattern.length === gamePattern.length) {
      // do matches with the gamepatterns or not
      setTimeout(nextSequence, 1000); // if the lengths of the arrays are equal means we can move to the next level
    }
  } else {
    var waudio = new Audio("sounds/wrong.mp3"); // when the user click the wrong button due to gamePattern playing the endgame sound
    waudio.play();
    $("body").addClass("game-over");

    setTimeout(function () {
      // adding game-over class to apply hame over css properties to the screen
      $("body").removeClass("game-over");
    }, 200); // removing the game-over class and set things same as the beginning of the game  incase player
    // incase players wants to start over the game

    startOver();
  }
}

function startOver() {
  gamePattern = []; // resetting the basic values of the game so the user can start over the game from scratch
  (level = 0), (flag = 0);
}
