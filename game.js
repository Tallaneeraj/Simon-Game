var gamePattern = [];
var started = false;
var level = 0;
var userClickedPattern = [];

const buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
    userClickedPattern = [];
    level += 1;
    $("#level-title").html("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn1").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(name) {
    $("#" + name).addClass("pressed");
    setTimeout(function() {
        $("#" + name).removeClass("pressed");
    }, 100);
}

$(".btn").click(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    $(".title").addClass("hidden");
    $(".container-fluid").removeClass("hidden");
    $("#score-display").addClass("hidden");
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 500);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        showScore();
        startOver();
    }
}

function showScore() {
    $("#score-text").text("Your Score: " + (level - 1));
    $("#score-display").removeClass("hidden");
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    $(".title").removeClass("hidden");
    $(".container-fluid").addClass("hidden");
}
