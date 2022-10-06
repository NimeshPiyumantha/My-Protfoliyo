/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

$("#all").click(function () {
    $("#1").css('display', 'block');
    $("#2").css('display', 'block');
    $("#3").css('display', 'block');
    $("#4").css('display', 'block');
    $("#5").css('display', 'block');
    $("#6").css('display', 'block');
    $("#7").css('display', 'block');
    $("#8").css('display', 'block');
});

$("#java").click(function () {
    $("#1").css('display', 'block');
    $("#2").css('display', 'block');
    $("#3").css('display', 'block');
    $("#4").css('display', 'block');
    $("#5").css('display', 'block');
    $("#6").css('display', 'block');
    $("#7").css('display', 'none');
    $("#8").css('display', 'none');
});

$("#javaScript").click(function () {
    $("#1").css('display', 'none');
    $("#2").css('display', 'none');
    $("#3").css('display', 'none');
    $("#4").css('display', 'none');
    $("#5").css('display', 'none');
    $("#6").css('display', 'none');
    $("#7").css('display', 'block');
    $("#8").css('display', 'block');
});

// execute after all the content fully loaded
$(window).on('load', function () {
    console.log("Window on load");

    // $("#loader").css('display','none');
    $("#loader").fadeOut(1000);
});