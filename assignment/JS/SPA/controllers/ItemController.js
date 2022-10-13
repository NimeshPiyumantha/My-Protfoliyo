/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

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
function dblRowClickEventsItem() {
    $("#ItemTable>tr").on('dblclick', function () {
        let deleteItemID = $(this).children().eq(0).text();
        yesNoAlertDelete(deleteItemID);

    });
}


/**
 * Save Model
 * */

/**
 * Save Model
 * Item ID
 * */
function generateItemID() {
    /*  $("#txtItemsId").val("I00-1001");*/
    valueI = "I00-1001";
    $("#btnISave").click(function () {
        var newValueI = valueI.split('-');
        var increaseI = newValueI[1];
        increaseI++;
        valueI = "I00-" + increaseI;

        $("#txtItemsId").val(valueI);
    });
}

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
    saveUpdateAlert("Item", "saved.");

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
    loadAllItemsForOption();
});

/**
 * Auto Forces Input Fields Save
 * */
$("#txtItemsId").focus();
const regExItemCode = /^(I00-)[0-9]{4,5}$/;
const regExItemName = /^[A-z ]{3,20}$/;
const regExItemPrice = /^[0-9]{1,10}$/;
const regExItemQtyOnHand = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

let ItemsValidations = [];
ItemsValidations.push({
    reg: regExItemCode,
    field: $('#txtItemsId'),
    error: 'Item ID Pattern is Wrong : I00-001'
});
ItemsValidations.push({
    reg: regExItemName,
    field: $('#txtItemName'),
    error: 'Item Name Pattern is Wrong : A-z 3-20'
});
ItemsValidations.push({
    reg: regExItemPrice,
    field: $('#txtItemQty'),
    error: 'Item Qty Pattern is Wrong : 0-9 1-10'
});
ItemsValidations.push({
    reg: regExItemQtyOnHand,
    field: $('#txtItemPrice'),
    error: 'Item Salary Pattern is Wrong : 100 or 100.00'
});

//disable tab key of all four text fields using grouping selector in CSS
$("#txtItemsId,#txtItemName,#txtItemQty,#txtItemPrice").on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});


$("#txtItemsId,#txtItemName,#txtItemQty,#txtItemPrice").on('keyup', function (event) {
    checkValidity(ItemsValidations);
});

$("#txtItemsId,#txtItemName,#txtItemQty,#txtItemPrice").on('blur', function (event) {
    checkValidity(ItemsValidations);
});


$("#txtItemsId").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExItemCode, $("#txtItemsId"))) {
        $("#txtItemName").focus();
    } else {
        focusText($("#txtItemsId"));
    }
});


$("#txtItemName").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExItemName, $("#txtItemName"))) {
        focusText($("#txtItemQty"));
    }
});


$("#txtItemQty").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExItemPrice, $("#txtItemQty"))) {
        focusText($("#txtItemPrice"));
    }
});


$("#txtItemPrice").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExItemQtyOnHand, $("#txtItemPrice"))) {
        if (event.which === 13) {
            $('#btnISave').focus();
        }
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
    checkValidity(ItemsValidations);
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
    dblRowClickEventsItem();
}

/**
 * Search id and Load Table
 * */
$("#btnSearchItem").click(function () {
    var resultI = items.find(({code}) => code === $("#ItemIdSearch").val());
    console.log(resultI);

    if (resultI != null) {
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
    } else {
        emptyMassage();
        clearCDTextFields();
    }
});

/**
 * Auto Forces Input Fields Search
 * */

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


/**
 * clear Search input fields Values Button
 * */
$("#clearSearchItem").click(function () {
    ItemIdSearch.value = '';
    clearUTextFields();
    clearDTextFields();
    loadAllItems();
});

/**
 * Update Model
 * */


/**
 * Update Button
 * */
$("#btnUpdateItem").click(function () {
    let ItemId = $("#searchItemId").val();
    let response = updateItem(ItemId);
    if (response) {
        saveUpdateAlert(ItemId, "updated.");
        checkValidity(ItemsValidationsUpdate);
    } else {
        unSucsessUpdateAlert(ItemId);
    }
});

/**
 * Update Methods
 * */
function updateItem(itemId) {
    let item = searchItem(itemId);
    if (item != null) {
        item.code = $("#searchItemId").val();
        item.name = $("#updateItemName").val();
        item.qty = $("#updateItemQty").val();
        item.price = $("#updateItemPrice").val();
        loadAllItems();
        return true;
    } else {
        return false;
    }
}

function searchItem(itemID) {
    for (let item of items) {
        if (item.code === itemID) {
            return item;
        }
    }
    return null;
}

/**
 * Auto Forces Input Fields Update
 * */

let ItemsValidationsUpdate = [];
ItemsValidationsUpdate.push({
    reg: regExItemCode,
    field: $('#searchItemId'),
    error: 'Item ID Pattern is Wrong : I00-001'
});
ItemsValidationsUpdate.push({
    reg: regExItemName,
    field: $('#updateItemName'),
    error: 'Item Name Pattern is Wrong : A-z 3-20'
});
ItemsValidationsUpdate.push({
    reg: regExItemPrice,
    field: $('#updateItemQty'),
    error: 'Item Qty Pattern is Wrong : 0-9 1-10'
});
ItemsValidationsUpdate.push({
    reg: regExItemQtyOnHand,
    field: $('#updateItemPrice'),
    error: 'Item Salary Pattern is Wrong : 100 or 100.00'
});

//disable tab key of all four text fields using grouping selector in CSS
$("#searchItemId,#updateItemName,#updateItemQty,#updateItemPrice").on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});

$("#searchItemId,#updateItemName,#updateItemQty,#updateItemPrice").on('keyup', function (event) {
    checkValidity(ItemsValidationsUpdate);
});

$("#searchItemId,#updateItemName,#updateItemQty,#updateItemPrice").on('blur', function (event) {
    checkValidity(ItemsValidationsUpdate);
});

$("#searchItemId").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExItemCode, $("#searchItemId"))) {
        $("#updateItemName").focus();
    } else {
        focusText($("#searchItemId"));
    }
});

$("#updateItemName").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExItemName, $("#updateItemName"))) {
        focusText($("#updateItemQty"));
    }
});

$("#updateItemQty").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExItemPrice, $("#updateItemQty"))) {
        focusText($("#updateItemPrice"));
    }
});

$("#updateItemPrice").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExItemQtyOnHand, $("#updateItemPrice"))) {
        if (event.which === 13) {
            $('#btnUpdateItem').focus();
        }
    }
});

function setButtonStateIU(value) {
    if (value > 0) {
        $("#btnUpdateItem").attr('disabled', true);
    } else {
        $("#btnUpdateItem").attr('disabled', false);
    }
}


/**
 * clear input fields Values Method
 * */
function clearUTextFields() {
    searchItemId.value = '';
    updateItemName.value = '';
    updateItemQty.value = '';
    updateItemPrice.value = '';
    checkValidity(ItemsValidationsUpdate);
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


/**
 * Delete Model
 * Search id Enter Pressed And Load TextFields
 * */
$("#searchDItemId").keyup(function (event) {
    if (event.keyCode === 13) {
        var resultI = items.find(({code}) => code === $("#searchDItemId").val());
        console.log(resultI);

        if (resultI != null) {
            $("#searchDItemId").val(resultI.code);
            $("#DItemName").val(resultI.name);
            $("#DItemQty").val(resultI.qty);
            $("#DItemPrice").val(resultI.price);
        } else {
           emptyMassage();
            clearCDTextFields();
        }
    }
});

/**
 * Delete Button
 * */
$("#btnDeleteItems").click(function () {
    let deleteIID = $("#searchDItemId").val();

    yesNoAlertDelete(deleteIID);
});

function deleteItems(itemID) {
    let item = searchItem(itemID);
    if (item != null) {
        let indexNumber1 = items.indexOf(item);
        items.splice(indexNumber1, 1);
        loadAllItems();
        clearDTextFields();
        return true;
    } else {
        return false;
    }
}


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