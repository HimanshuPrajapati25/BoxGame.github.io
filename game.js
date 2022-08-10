
let buttonColours = ["red", "green", "blue", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

var start = false;
var level = 0;

$(document).keypress(function(){
    if (!start) {
        $("#level-title").text("Level  " + level);
        nextSequence();
        start = true;
    }
})

$(".btn").click(function (){
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

       
})


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4)
    
    let randomChosenColor = buttonColours[randomNumber]
    gamePattern.push(randomChosenColor)

    $("#" +randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)

    playSound(randomChosenColor);
    animatePress(randomChosenColor);
    
}    

function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3")
    audio.play()
}

function animatePress(currentcolor){
    $("#" + currentcolor).addClass("pressed")

    setTimeout (function(){
        $("#" + currentcolor).removeClass("pressed")
    },100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]=== userClickedPattern[currentLevel]) {
        console.log("success");

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function(){
                nextSequence();
                
            }, 1000)
        }
        
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over")
        $("#level-title").text("Game Over, Press any key to restart")
        
            setTimeout(function(){
                $("body").removeClass("game-over");
            },100)
            startOver();
        
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    start = false;
}
