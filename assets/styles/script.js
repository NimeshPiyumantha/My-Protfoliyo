/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

    // execute after all the content fully loaded
    $(window).on('load', function () {
        console.log("Window on load");

        // $("#loader").css('display','none');
        $("#loader").fadeOut(1000);
        let style = document.createElement("style");
        style.innerHTML = `body::-webkit-scrollbar {display: block;}`;
        document.head.appendChild(style);

        let style2 = document.createElement("style");
        style2.innerHTML = `main {margin-top: 70px;}`;
        document.head.appendChild(style2);
});
    $(document).ready(function () {
        let style = document.createElement("style");
        style.innerHTML = `body::-webkit-scrollbar {display: none;}`;
        document.head.appendChild(style);
    })
