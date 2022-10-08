/**
 * @author : Sanu Vithanage
 * @since : 0.1.0
 **/

/**
 * Invoice Details
 * */

/**
 * Invoice Details
 * Order Date
 * */
function setCurrentDate(){
    let orderDate = $('#orderDate');
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    orderDate.val(today);
}

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
