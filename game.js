// const buttonColors = ["blue","green","yellow","red"];
// const gamePattern = [];
// const userClickedColors =[];
// const i = 0;


// function nextSequence(){
//     var randNum = Math.floor(Math.random() * 4);
//     var randColor = buttonColors[randNum];
//     $("#" + randColor).addClass("pressed");
//     var audio = new Audio("sounds/"+ randColor + ".mp3");
//     audio.play()
//     setTimeout(function(){
//         $("#" + randColor).removeClass("pressed");
//     }, 400);
//     gamePattern.push(randColor);
// }

   
// var level = 0;

// $(document).keypress(function() {
//   if (!started) {
//     $("#level-title").text("Level " + level);
//     nextSequence();
//     started = true;
//   }
// });


// $(".btn").on("click", function(){   
  
//    var clicked = $(this).attr("id");
//    var audio = new Audio("sounds/"+ clicked + ".mp3");
//    audio.play()
//    userClickedColors.push(clicked);
//    console.log(userClickedColors);
  
//    setTimeout(nextSequence(),400);
  
//    console.log(clicked != gamePattern[i])
//    console.log(gamePattern[i])

//    if(clicked !== gamePattern[i]){
//     $("h1").text("Game Over! Click A Key To Restart.");
//     $("body").addClass("red");
//     setTimeout(function(){
//         $("body").removeClass("red");
//     }, 300);
//     i = 0;
//     buttonColors.length = 0;
//     userClickedColors.length = 0;
//    }
// });
 

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}