/**
 * @author : Sanu Vithanage
 * @since : 0.1.0
 **/

function loadAllCustomersForOption() {
    $("#selectCusID").empty();
    for (let cus of customers) {
        $("#selectCusID").append(`<option>${cus.id}</option>`);
    }

}
