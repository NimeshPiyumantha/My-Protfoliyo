/**
 * @author : Sanu Vithanage
 * @since : 0.1.0
 **/

$(document).ready(function () {
    $("#HomeSection").css('display', 'block');
    $("#CustomerSection").css('display', 'none');
    $("#ItemSection").css('display', 'none');
    $("#OrderSection").css('display', 'none');
});

$("#homeBtn").click(function () {
    $("#HomeSection").css('display', 'block');
    $("#CustomerSection").css('display', 'none');
    $("#ItemSection").css('display', 'none');
    $("#OrderSection").css('display', 'none');
});

$("#customerBtn").click(function () {
    $("#HomeSection").css('display', 'none');
    $("#CustomerSection").css('display', 'block');
    $("#ItemSection").css('display', 'none');
    $("#OrderSection").css('display', 'none');
});

$("#itemBtn").click(function () {
    $("#HomeSection").css('display', 'none');
    $("#CustomerSection").css('display', 'none');
    $("#ItemSection").css('display', 'block');
    $("#OrderSection").css('display', 'none');
});

$("#orderBtn").click(function () {
    $("#HomeSection").css('display', 'none');
    $("#CustomerSection").css('display', 'none');
    $("#ItemSection").css('display', 'none');
    $("#OrderSection").css('display', 'block');

    setCurrentDate();
});
