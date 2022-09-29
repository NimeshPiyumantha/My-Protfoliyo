/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

/**
 * @ Global Scope
 */
var items = [];

/**
 * Button Add New Item
 * */
$("#btnISave").click(function () {

    //select all the four text fields and then get their typed values
    let itemCode = $("#txtItemsId").val();
    let itemName = $("#txtItemName").val();
    let itemQty = $("#txtItemQty").val();
    let itemUnitPrice = $("#txtItemPrice").val();
    clearTextFieldsI();

    //Alert Save
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Item has been saved',
        showConfirmButton: false,
        timer: 2500
    })

    // items object
    var itemObject = {
        code: itemCode,
        name: itemName,
        qty: itemQty,
        price: itemUnitPrice
    }

    //Add the item object to the array
    items.push(itemObject);

     console.log(items);


});

/**
 * clear input fields Values Method
 * */
function clearTextFieldsI() {
    txtItemsId.value = '';
    txtItemName.value = '';
    txtItemQty.value = '';
    txtItemPrice.value = '';
}

/**
 * clear input fields Values Button
 * */
$("#btnClearI").click(function () {
    clearTextFieldsI();
});