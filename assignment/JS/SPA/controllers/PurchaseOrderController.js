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

function loadAllItemsForOption() {
    $("#itemCode").empty();
    for (let item of items) {
        $("#itemCode").append(`<option>${item.code}</option>`);
    }

}
