/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

//boxes
let boxMarginLeft = 2040;

function createBoxes() {
    for (let i = 0; i <= 30; i++) {

        $("#background").append("<div class='box1' style='margin-left: " + boxMarginLeft + "px' id='box1" + i + "'></div>");

        if (i < 15) {
            boxMarginLeft = boxMarginLeft + 1200;
        }
        if (i >= 15) {
            boxMarginLeft = boxMarginLeft + 1000;
        }
    }
}

function boxAnimation() {
    for (let i = 0; i < 30; i++) {
        let box = parseInt($("#box1" + i).css("margin-left"));

        let newMarginLeft = box - 30;
        $("#box1" + i).css("margin-left", newMarginLeft - 30 + "px");

        if (newMarginLeft >= -110 & newMarginLeft <= 100) {
            if (boyMarginTop > 500) {
                clearInterval(boxAnimationId);

                clearInterval(runAnimationNumber);
                runAnimationNumber = -1;

                clearInterval(jumpAnimationNumber);
                jumpAnimationNumber = -1;

                clearInterval(moveBackgroundAnimationId);
                moveBackgroundAnimationId = -1;

                deadAnimationNumber = setInterval(boyDeadAnimation, 100);
            }
        }
    }
}

$("#btnNext").click(function (e) {
    window.location.href = "index3.html";
});