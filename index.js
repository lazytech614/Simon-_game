const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(".start-btn").click(function() {
    $(".start-btn").css("display","none");
    $("#score-card").css("display","initial");
    if (!started) {
        $(".level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);   
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function nextSequence(){
    userClickedPattern = [];
    level++;
    $(".level-title").text("Level "+level);
    var randomChosenColour;
    var randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour)
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        
        if (userClickedPattern.length === gamePattern.length){
            console.log("Success");
            setTimeout(function () {
              nextSequence();
            }, 1000);
          }
    }else{
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $(".level-title").text("☹️ Game Over, Press the Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false; 
    $(".start-btn").css("display","initial");
    $(".start-btn").text("Restart");
    $("#score-card").css("display","none");
}