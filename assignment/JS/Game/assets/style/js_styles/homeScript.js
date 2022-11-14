/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
let audio1 = new Audio();
audio1.src = "assets/audio/TitleScreen.mp3";
audio1.play();

(function () {

    if (!audio1.paused) {
        $("div#controller-icons>button#sound-icon").addClass("pressed");
    } else {
        $("div#controller-icons>button#sound-icon").removeClass("pressed");
    }

   /* $("#help").css("display", "none");
    console.log($("div#controller-icons>button#sound-icon").hasClass("pressed"));*/
})();



$("#sound-icon").click(function (e) {
    if (!audio1.paused) {
        audio1.pause();
        $("div#controller-icons>button#sound-icon").removeClass("pressed");
    } else {
        audio1.play();
        $("div#controller-icons>button#sound-icon").addClass("pressed");
    }
});

$("#btnPlay").click(function (e) {
    window.location.href = "index1.html";
});

/*$("#help-icon").click(function (e) {
    $("#help").css("display", "block");
    $("div#controller-icons>button#help-icon").css("pointer-events", "none");
    $("#home-bg").addClass("bg-blur");
    $("div#controller-icons>button#help-icon").addClass("pressed");
});

$("#btnClose").click(function (e) {
    $("#help").css("display", "none");
    $("div#controller-icons>button#help-icon").css("pointer-events", "auto");
    $("#home-bg").removeClass("bg-blur")
    $("div#controller-icons>button#help-icon").removeClass("pressed");
});*/


/*
$("#help").hover(function () {
        // over
        $("#help").css("cursor", "grab");

    }, function () {
        // out
        $("#help").css("cursor", "pointer");
    }
);

$(function () {
    $("#help").draggable({
        containment: "window"
    });
});

$("#help").hover(function () {
        // over
        $("#help").css("cursor", "grab");


    }, function () {
        // out
        $("#help").css("cursor", "pointer");
    }
);
*/

$(function () {
    $("#controller-icons").draggable({
        containment: "window"
    });
});

$("#controller-icons").hover(function () {
        // over
        $("#controller-icons").css("cursor", "grab");


    }, function () {
        // out
        $("#controller-icons").css("cursor", "pointer");
    }
);
