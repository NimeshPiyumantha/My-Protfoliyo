/**
 * @author : Sanu Vithanage
 * @since : 0.1.0
 **/

/**
 * Invoice Details
 * */

/**
 * Invoice Details
 * Customer Select Combo
 * */
function loadAllCustomersForOption() {
    $("#customerId").empty();
    for (let cus of customers) {
        $("#customerId").append(`<option>${cus.id}</option>`);
    }

}


/**
 * Items Details
 * */

/**
 * Items Details
 * Item Select Combo
 * */
function loadAllItemsForOption() {
    $("#itemCode").empty();
    for (let item of items) {
        $("#itemCode").append(`<option>${item.code}</option>`);
    }

}
