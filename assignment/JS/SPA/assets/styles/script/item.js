/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

/**
 * @ Global Scope
 */
var items = [];


/**
 * load all Items Button
 * */
$("#btnViewAllItems").click(function () {
    loadAllItems();
});

/**
 * Table Listener Click and Load textFields
 * */
function tblClickEventsI() {
    $("#ItemTable>tr").click(function () {
        let code = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let qty = $(this).children().eq(2).text();
        let price = $(this).children().eq(3).text();

        $("#searchItemId").val(code);
        $("#updateItemName").val(name);
        $("#updateItemQty").val(qty);
        $("#updateItemPrice").val(price);

        $("#searchDItemId").val(code);
        $("#DItemName").val(name);
        $("#DItemQty").val(qty);
        $("#DItemPrice").val(price);
    });
}

/**
 * Table Listener double click and Click and Remove textFields
 * */
$("#ItemTable").dblclick(function () {
    Swal.fire({
        title: 'Do you want to Delete the Select row?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
            denyButton: 'order-3',
        }
    }).then((result) => {
        if (result.isConfirmed) {
            $(this).children('tr').eq(0).remove();
            Swal.fire('Delete!', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Select row are not Delete', '', 'info')
        }
    })

});


/**
 * Save Model
 * */

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

    /*console.log(items);*/

    loadAllItems();
});

/**
 * Auto Forces Input Fields Save
 * */

var regExItemCode = /^(I00-)[0-9]{3,4}$/;
var regExItemName = /^[A-z ]{3,20}$/;
var regExItemPrice = /^[0-9]{1,10}$/;
var regExItemQtyOnHand = /^[0-9]{1,3}$/;

$("#txtItemsId,#txtItemName,#txtItemQty,#txtItemPrice").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$('#txtItemsId').keypress(function (event) {
    let input = $("#txtItemsId").val();

    if (regExItemCode.test(input)) {
        $("#txtItemsId").css('border', '2px solid green');
        $("#lblItemId").text("");

        if (event.which === 13) {
            $('#txtItemName').focus();
        }
    } else {
        $("#txtItemsId").css('border', '2px solid red');
        $("#lblItemId").text("Wrong format : I00-001");
    }
});

$('#txtItemName').keypress(function (event) {
    let input = $("#txtItemName").val();

    if (regExItemName.test(input)) {
        $("#txtItemName").css('border', '2px solid green');
        $("#lblItemName").text("");

        if (event.which === 13) {
            $('#txtItemQty').focus();
        }
    } else {
        $("#txtItemName").css('border', '2px solid red');
        $("#lblItemName").text("Wrong format : Bun");
    }
});

$('#txtItemQty').keypress(function (event) {
    let input = $("#txtItemQty").val();

    if (regExItemQtyOnHand.test(input)) {
        $("#txtItemQty").css('border', '2px solid green');
        $("#lblItemQty").text("");

        if (event.which === 13) {
            $('#txtItemPrice').focus();
        }
    } else {
        $("#txtItemQty").css('border', '2px solid red');
        $("#lblItemQty").text("Wrong format : 5");
    }
});

$('#txtItemPrice').keypress(function (event) {
    let input = $("#txtItemPrice").val();

    if (regExItemPrice.test(input)) {
        $("#txtItemPrice").css('border', '2px solid green');
        $("#lblItemPrice").text("");

        if (event.which === 13) {
            $('#btnISave').focus();
        }
    } else {
        $("#txtItemPrice").css('border', '2px solid red');
        $("#lblItemPrice").text("Wrong format : 450");
    }
});

$('#btnISave').keypress(function (event) {
    if (event.which === 13) {
        $('#txtItemsId').focus();
    }
});


/**
 * clear input fields Values Method
 * */
function clearTextFieldsI() {
    txtItemsId.value = '';
    txtItemName.value = '';
    txtItemQty.value = '';
    txtItemPrice.value = '';
    $("#txtItemsId").focus();
}

/**
 * clear input fields Values Button
 * */
$("#btnClearI").click(function () {
    clearTextFieldsI();
});

/**
 * load all Items Method
 * */
function loadAllItems() {

    //remove all the table body content before adding data
    $("#ItemTable").empty();


    // get all items records from the array
    for (var item of items) {
        console.log(item);// items object

        // Using String Literals to do the same thing as above
        var row = `<tr><td>${item.code}</td><td>${item.name}</td><td>${item.qty}</td><td>${item.price}</td></tr>`;

        //then add it to the table body of items table
        $("#ItemTable").append(row);
    }
    tblClickEventsI();
}

/**
 * Search id and Load Table
 * */
$("#btnSearchItem").click(function () {
    var resultI = items.find(({code}) => code === $("#ItemIdSearch").val());
    console.log(resultI);

    $("#ItemTable").empty();
    var row = `<tr><td>${resultI.code}</td><td>${resultI.name}</td><td>${resultI.qty}</td><td>${resultI.price}</td></tr>`;
    $("#ItemTable").append(row);

    $("#searchItemId").val(resultI.code);
    $("#updateItemName").val(resultI.name);
    $("#updateItemQty").val(resultI.qty);
    $("#updateItemPrice").val(resultI.price);

    $("#searchDItemId").val(resultI.code);
    $("#DItemName").val(resultI.name);
    $("#DItemQty").val(resultI.qty);
    $("#DItemPrice").val(resultI.price);

});

/**
 * Auto Forces Input Fields Search
 * */
$(document).ready(function () {
    $('#ItemIdSearch').keypress(function (event) {
        if (event.which === 13) {
            $('#btnSearchItem').focus();
        }
    });
    $('#btnSearchItem').keypress(function (event) {
        if (event.which === 13) {
            $('#ItemIdSearch').focus();
        }
    });
});

/**
 * clear Search input fields Values Button
 * */
$("#clearSearchItem").click(function () {
    ItemIdSearch.value = '';
    clearUTextFields();
    clearDTextFields();
});

/**
 * Update Model
 * */

/*

/!**
 * Update Model
 * Search id Enter Pressed And Load TextFields
 * *!/
$("#searchItemId").keyup(function (event) {
    if (event.keyCode === 13) {
        var resultI = items.find(({code}) => code === $("#searchItemId").val());
        console.log(resultI);

        $("#searchItemId").val(resultI.code);
        $("#updateItemName").val(resultI.name);
        $("#updateItemQty").val(resultI.qty);
        $("#updateItemPrice").val(resultI.price);

    }
});

*/

/**
 * Auto Forces Input Fields Update
 * */
$("#searchItemId,#updateItemName,#updateItemQty,#updateItemPrice").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$('#searchItemId').keypress(function (event) {
    let input = $("#searchItemId").val();

    if (regExItemCode.test(input)) {
        $("#searchItemId").css('border', '2px solid green');
        $("#lblUItemId").text("");

        if (event.which === 13) {
            $('#updateItemName').focus();
        }
    } else {
        $("#searchItemId").css('border', '2px solid red');
        $("#lblUItemId").text("Wrong format : I00-001");
    }
});

$('#updateItemName').keypress(function (event) {
    let input = $("#updateItemName").val();

    if (regExItemName.test(input)) {
        $("#updateItemName").css('border', '2px solid green');
        $("#lblUItemName").text("");

        if (event.which === 13) {
            $('#updateItemQty').focus();
        }
    } else {
        $("#updateItemName").css('border', '2px solid red');
        $("#lblUItemName").text("Wrong format : Bun");
    }
});

$('#updateItemQty').keypress(function (event) {
    let input = $("#updateItemQty").val();

    if (regExItemQtyOnHand.test(input)) {
        $("#updateItemQty").css('border', '2px solid green');
        $("#lblUItemQty").text("");

        if (event.which === 13) {
            $('#updateItemPrice').focus();
        }
    } else {
        $("#updateItemQty").css('border', '2px solid red');
        $("#lblUItemQty").text("Wrong format : 5");
    }
});

$('#updateItemPrice').keypress(function (event) {
    let input = $("#updateItemPrice").val();

    if (regExItemPrice.test(input)) {
        $("#updateItemPrice").css('border', '2px solid green');
        $("#lblUItemPrice").text("");

        if (event.which === 13) {
            $('#btnUpdateItem').focus();
        }
    } else {
        $("#updateItemPrice").css('border', '2px solid red');
        $("#lblUItemPrice").text("Wrong format : 450");
    }
});

$('#btnUpdateItem').keypress(function (event) {
    if (event.which === 13) {
        $('#searchItemId').focus();
    }
});


/**
 * clear input fields Values Method
 * */
function clearUTextFields() {
    searchItemId.value = '';
    updateItemName.value = '';
    updateItemQty.value = '';
    updateItemPrice.value = '';
}

/**
 * clear input fields Values Button
 * */
$("#btnUclearI").click(function () {
    clearUTextFields();
});


/**
 * Delete Model
 * */

/*

/!**
 * Delete Model
 * Search id Enter Pressed And Load TextFields
 * *!/
$("#searchDItemId").keyup(function (event) {
    if (event.keyCode === 13) {
        var resultI = items.find(({code}) => code === $("#searchDItemId").val());
        console.log(resultI);

        $("#searchDItemId").val(resultI.code);
        $("#DItemName").val(resultI.name);
        $("#DItemQty").val(resultI.qty);
        $("#DItemPrice").val(resultI.price);

    }
});
*/


/**
 * clear input fields Values Method
 * */
function clearDTextFields() {
    searchDItemId.value = '';
    DItemName.value = '';
    DItemQty.value = '';
    DItemPrice.value = '';
}

/**
 * clear input fields Values Button
 * */
$("#btnDclearI").click(function () {
    clearDTextFields();
});