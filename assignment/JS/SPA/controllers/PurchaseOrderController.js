/**
 * @author : Sanu Vithanage
 * @since : 0.1.0
 **/

function loadAllCustomersForOption() {
    $("#customerId").empty();
    for (let cus of customers) {
        $("#customerId").append(`<option>${cus.id}</option>`);
    }

}


