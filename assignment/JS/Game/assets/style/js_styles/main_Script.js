/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

$(document).ready(function () {
    idleAnimationStart();
    createBoxes();
    hide_components();
    start();
    $("#btnSound").addClass("sound-on");
});

/**
 * All Audio
 **/
let audio1 = new Audio();
audio1.src = "assets/audio/BridgeZone.mp3";
audio1.play();
audio1.loop = true;

let audio2 = new Audio();
audio2.src = "assets/audio/RingCollect.mp3";

let audio3 = new Audio();
audio3.src = "assets/audio/GameOver2.wav";

let audio4 = new Audio();
audio4.src = "assets/audio/GameOver.mp3";

let audio5 = new Audio();
audio5.src = "assets/audio/ActCleared.mp3";


let $boy = $("#boy");
let idleAnimationNumber = 0;
let idleImageNumber = 1;

let boxAnimationId = 0;

//Idle Animation
function idleAnimation() {
    idleImageNumber = idleImageNumber + 1;

    if (idleImageNumber === 11) {
        idleImageNumber = 1;
    }

    $boy.attr("src", "assets/img/png/Idle%20("+idleImageNumber+").png");
}

function idleAnimationStart() {
    idleAnimationNumber = setInterval(idleAnimation, 200);
}

//Run Animation
let runImageNumber = 1;
let runAnimationNumber = 0;

function runAnimation() {
    runImageNumber = runImageNumber + 1;
    if (runImageNumber === 9) {
        runImageNumber = 1;
    }

    $boy.attr("src", "assets/img/png/Run%20("+runImageNumber+").png");
}

function runAnimationStart() {
    runAnimationNumber = setInterval(runAnimation, 100);
    clearInterval(idleAnimationNumber);
}


let backgroundImagePositionX = 0;
let moveBackgroundAnimationId = 0;

let score = 0;

/**
 * Move Background
 **/
function moveBackground() {
    backgroundImagePositionX = backgroundImagePositionX - 20;

    $("#background").css("background-position-x", +backgroundImagePositionX + "px");

    score = score + 1;
    $("#score").text(score);
    if (score >= 510) {
        winResults();
    }
}

//jump Animation
let jumpAnimationNumber = 0;
let jumpImageNumber = 1;
let boyMarginTop = 510;

function jumpAnimation() {
    jumpImageNumber = jumpImageNumber + 1;

    if (jumpImageNumber <= 6) {
        boyMarginTop = boyMarginTop - 35;
        boy.style.marginTop = boyMarginTop + "px";
    }

    if (jumpImageNumber >= 7) {
        boyMarginTop = boyMarginTop + 35;
        boy.style.marginTop = boyMarginTop + "px";
    }

    if (jumpImageNumber === 11) {
        jumpImageNumber = 1;
        clearInterval(jumpAnimationNumber);
        jumpAnimationNumber = 0;
        runImageNumber = 0;
        runAnimationStart();
    }

    $boy.attr("src","assets/img/png/Jump%20("+jumpImageNumber+").png" );
}

function jumpAnimationStart() {
    clearInterval(idleAnimationNumber);
    runImageNumber = 0;
    clearInterval(runAnimationNumber);
    jumpAnimationNumber = setInterval(jumpAnimation, 100);
}


//dead
let deadAnimationNumber = 0;
let deadImageNumber = 1;

function boyDeadAnimation() {
    deadImageNumber = deadImageNumber + 1;

    if (deadImageNumber === 11) {
        deadImageNumber = 10;
    }

    $boy.attr("src","assets/img/png/Dead%20("+deadImageNumber+").png");
    game_over();
}

function start() {
    $(document).on('keypress', function (e) {
        if (e.keyCode === 13) {
            if (runAnimationNumber === 0) {
                runAnimationStart();
                audio2.play();
            }
            if (moveBackgroundAnimationId === 0) {
                moveBackgroundAnimationId = setInterval(moveBackground, 100)
            }
            if (boxAnimationId === 0) {
                boxAnimationId = setInterval(boxAnimation, 100);
            }
        }

        if (e.keyCode === 32) {
            if (jumpAnimationNumber === 0) {
                jumpAnimationStart();
                audio2.play();
            }
        }
        if (moveBackgroundAnimationId === 0) {
            moveBackgroundAnimationId = setInterval(moveBackground, 100)
        }
        if (boxAnimationId === 0) {
            boxAnimationId = setInterval(boxAnimation, 100);
        }
    });
}

/**
 * Other Options
 **/

function playBgTrack() {
    if ($("#btnSound").hasClass("sound-on")) {
        audio1.play();
    } else {
        audio1.pause();
    }
}

$("#btn_goToMenu").click(function (e) {
    window.location.href = "index.html";
});

$("#btnSound").click(function (e) {
    if (!audio1.paused) {
        audio1.pause();
        $("#btnSound").removeClass("sound-on");
    } else {
        audio1.play();
        $("#btnSound").addClass("sound-on");
    }
});

function blurComponents() {
    $("#bg-container1").addClass("bg-blur");
}

function remove_blur() {
    $("#bg-container1").removeClass("bg-blur");
}

function pauseAll() {
    clearInterval(runAnimationNumber);
    runAnimationNumber = -1;

    clearInterval(jumpAnimationNumber);
    jumpAnimationNumber = -1;

    clearInterval(moveBackgroundAnimationId);
    moveBackgroundAnimationId = -1;

    clearInterval(boxAnimationId);
}

$("#btnPause").click(function (e) {
    $("body").css("pointer-events", "none");
    $("#btnPause").css("pointer-events", "none");
    $("#btnResume").css("pointer-events", "auto");
    $("#btnRestart").css("pointer-events", "auto");
    pauseAll();

    $("#btnPause").addClass("pause");
    $("#btnResume").removeClass("pause");

    blurComponents();

    $("#pause-bg").css("display", "block");
    $("#title-img").css("display", "block");

    audio1.pause();
});

$("#btnResume").click(function (e) {
    $("body").css("pointer-events", "auto");
    $("#btnPause").css("pointer-events", "auto");
    $("#btnPause").removeClass("pause");
    $("#btnRestart").removeClass("pause");
    $("#btnResume").addClass("pause");
    $(document).off("32");
    $(document).off("13");
    location.reload();

    remove_blur();
    hide_components();
    playBgTrack();

});

$("#btnRestart").click(function (e) {
    location.reload();
});

function hide_components() {
    $("#pause-bg").css("display", "none");
    $("#title-img").css("display", "none");

    $("#gameOver-bg").css("display", "none");
    $("#gameOver_title-img").css("display", "none");

    $("#gameWin-bg").css("display", "none");
    $("#gameWin_title-img").css("display", "none");
    $("#btnNext").css("display", "none");
}

$(function () {
    $("#game-controls").draggable({
        containment: "window"
    });
});

$("#game-controls").hover(function () {
    // over
    $("#game-controls").css("cursor", "grab");

}, function () {
    // out
    $("#game-controls").css("cursor", "pointer");
});

function game_over() {
    blurComponents();

    $("#gameOver-bg").css("display", "block");
    $("#gameOver_title-img").css("display", "block");

    audio1.pause();
    audio4.play();
    $("#btnSound").removeClass("sound-on");

    $boy.css("display", "none");

}

function winResults() {

    $(document).off("32");
    $(document).off("13");

    blurComponents();

    $("#gameWin-bg").css("display", "block");
    $("#gameWin_title-img").css("display", "block");
    $("#btnNext").css("display", "block");

    pauseAll();

    audio1.pause();
    audio5.play();
    $("#btnSound").removeClass("sound-on");
}