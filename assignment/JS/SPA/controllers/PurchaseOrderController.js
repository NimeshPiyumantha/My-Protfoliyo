/**
 * @author : Sanu Vithanage
 * @since : 0.1.0
 **/

/**
 * Invoice Details
 * */

$("#btnPurchase").attr('disabled', true);
$("#btnAddToCart").attr('disabled', true);

/**
 * Invoice Details
 * Order ID
 * */
function generateOrderID() {
    /* $("#orderId").val("ODI-1001");*/
    value = "ODI-1001";
    $("#btnPurchase").click(function () {
        var newValue = value.split('-');
        var increase = newValue[1];
        increase++;
        value = "ODI-" + increase;

        $("#orderId").val(value);
    });
}

/**
 * Invoice Details
 * Order Date
 * */
function setCurrentDate() {
    let orderDate = $("#orderDate");
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
    $("#cmbCustomerId").empty();
    for (let cus of customers) {
        $("#cmbCustomerId").append(`<option>${cus.id}</option>`);
    }
}

$("#cmbCustomerId").click(function () {
    var rCmbC = customers.find(({id}) => id === $("#cmbCustomerId").val());
    $("#customerName").val(rCmbC.name);
    $("#customerAddress").val(rCmbC.address);
    $("#customerSalary").val(rCmbC.salary);
});


/**
 * Items Details
 * */

var itemCode;
var itemName;
var itemPrice;
var itemQty;
var itemOrderQty;

var total = 0;
var discount = 0;
var subTotal = 0;

/**
 * Items Details
 * Item Select Combo
 * */
function loadAllItemsForOption() {
    $("#cmbItemCode").empty();
    for (let item of items) {
        $("#cmbItemCode").append(`<option>${item.code}</option>`);
    }
}

$("#cmbItemCode").click(function () {
    var rCmbI = items.find(({code}) => code === $("#cmbItemCode").val());
    $("#itemName").val(rCmbI.name);
    $("#itemPrice").val(rCmbI.price);
    $("#qtyOnHand").val(rCmbI.qty);
});

/**
 * Logics
 * Place order
 * */

var tableRow = [];

$("#btnAddToCart").click(function () {
    var duplicate = false;

    for (var i = 0; i < $("#tblAddToCart tr").length; i++) {
        if ($("#cmbItemCode option:selected").text() === $("#tblAddToCart tr").children(':nth-child(1)')[i].innerText) {
            duplicate = true;

        }
    }
    if (duplicate !== true) {

        loadCartTableDetail();
        reduceQty($("#buyQty").val());
        calcTotal($("#buyQty").val() * $("#itemPrice").val());

    } else if (duplicate === true) {

        manageQtyOnHand(tableRow.children(':nth-child(4)').text(), $("#buyQty").val());
        $(tableRow).children(':nth-child(4)').text($("#buyQty").val());

        manageTotal(tableRow.children(':nth-child(5)').text(), $("#buyQty").val() * $("#itemPrice").val());
        $(tableRow).children(':nth-child(5)').text($("#buyQty").val() * $("#itemPrice").val());

    }

    /**
     * Logics
     * Place order
     * Table Add logic
     * */
    $("#tblAddToCart>tr").click('click', function () {

        tableRow = $(this);
        let itemCode = $(this).children(":eq(0)").text();
        let itemName = $(this).children(":eq(1)").text();
        let unitPrice = $(this).children(":eq(2)").text();
        let qty = $(this).children(":eq(3)").text();
        let total = $(this).children(":eq(4)").text();

        $("#cmbItemCode").val(itemCode);
        $("#itemName").val(itemName);
        $("#itemPrice").val(unitPrice);
        $("#buyQty").val(qty);
        $("#txtTotal").val(total);

    });
});

/**
 * Logics
 * Place order
 * Table Load
 * */
$("#tblAddToCart").empty();

function loadCartTableDetail() {
    itemCode = $("#cmbItemCode").val();
    itemName = $("#itemName").val();
    itemPrice = $("#itemPrice").val();
    itemQty = $("#qtyOnHand").val();
    itemOrderQty = $("#buyQty").val();

    let total = itemPrice * itemOrderQty;
    var row = `<tr><td>${itemCode}</td><td>${itemName}</td><td>${itemPrice}</td><td>${itemOrderQty}</td><td>${total}</td></tr>`;

    $("#tblAddToCart").append(row);

}

/**
 * Logics
 * Place order
 * Reduce QtyOnHand
 * */
function reduceQty(orderQty) {
    var minQty = parseInt(orderQty);
    var reduceQty = parseInt($("#qtyOnHand").val());
    reduceQty = reduceQty - minQty;
    $("#qtyOnHand").val(reduceQty);
}

/**
 * Logics
 * Place order
 * Calculate Total
 * */

function calcTotal(amount) {
    total += amount;
    $("#txtTotal").val(total);
}

/**
 * Logics
 * Place order
 * Manage Available Qty
 * */
function manageQtyOnHand(preQty, nowQty) {
    var preQty = parseInt(preQty);
    var nowQty = parseInt(nowQty);
    var avaQty = parseInt($("#qtyOnHand").val());

    avaQty = avaQty + preQty;
    avaQty = avaQty - nowQty;

    $("#qtyOnHand").val(avaQty);
}


/**
 * Logics
 * Place order
 * Manage Total
 * */

function manageTotal(preTotal, nowTotal) {
    total -= preTotal;
    total += nowTotal;

    $("#txtTotal").val(total);
}

/**
 * Logics
 * Place order
 * Enter Discount and sub Total display
 * */

$(document).on("change keyup blur", "#txtDiscount", function () {
    discount = $("#txtDiscount").val();
    discount = (total / 100) * discount;
    subTotal = total - discount;

    $("#txtSubTotal").val(subTotal);
});


/**
 * Logics
 * Place order
 * Enter Cash and Balance display
 * */

$(document).on("change keyup blur", "#txtCash", function () {
    var cash = $("#txtCash").val();
    var balance = cash - subTotal;
    $("#txtBalance").val(balance);
    if (balance < 0) {
        $("#lblCheckSubtotal").parent().children('span').text(balance+" : plz enter valid Balance");
        $("#btnPurchase").attr('disabled', true);
    } else {
        $("#lblCheckSubtotal").parent().children('span').text("");
        $("#btnPurchase").attr('disabled', false);
    }
});

/**
 * Logics
 * Place order
 * placeOrder to Order Array
 * method
 * */
function placeOrder() {
    //create object
    let orderArrayList = new order(
        $("#orderId").val(),
        $("#cmbCustomerId").val(),
        $("#orderDate").val(),
        $("#txtSubTotal").val(),
        $("#txtDiscount").val()
    );

    orders.push(orderArrayList);
    console.log(orderArrayList);

    saveUpdateAlert("Place Ordering", "Successfully.");
}

/**
 * Logics
 * Place order
 * placeOrder to Order Details Array
 * method
 * */
function pushOrderDetails() {
    for (let i = 0; i < $("#tblAddToCart tr").length; i++) {
        let orderId = $("#orderId").val();
        let cusId = $("#cmbCustomerId").val();
        let itemId = $("#tblAddToCart tr").children(':nth-child(1)')[i].innerText;
        let qty = $("#tblAddToCart tr").children(':nth-child(4)')[i].innerText;
        let total = $("#tblAddToCart tr").children(':nth-child(5)')[i].innerText;


        var orderDetailArrayList = new orderDetail(orderId, cusId, itemId, qty, total);

        orderDetails.push(orderDetailArrayList);
        console.log(orderDetailArrayList);
    }
}

/**
 * Logics
 * Place order
 * Purchase Order button
 * */

$("#btnPurchase").click(function () {
    placeOrder();
    pushOrderDetails();
    generateOrderID();
    clearDetails();
    $("#tblAddToCart").empty();

});

/**
 * Logics
 * Place order
 * Clear Method
 * */
function clearDetails() {
    $('#cmbCustomerId,#customerName,#customerAddress,#customerSalary,#cmbItemCode,#itemName,#itemPrice,#qtyOnHand,#buyQty,#txtDiscount,#txtTotal,#txtDiscount,#txtSubTotal,#txtCash,#txtBalance').val("");

}

/**
 * Logics
 * Place order
 * Clear Button
 * */
$("#btnClearAll").click(function () {
    clearDetails();
});

/**
 * Logics
 * Place order
 * Remove Row
 * */

$("#tblAddToCart").dblclick(function () {
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
 * Logics
 * Place order
 * Update Items in buy Qty
 * */
$("#btnAddToCart").click(function () {
    let itemIdQ = $("#cmbItemCode").val();
    let response = updateItemQty(itemIdQ);
    if (response) {
    }
});

function updateItemQty(itemIdQ) {
    let itemQ = searchItemQty(itemIdQ);
    if (itemQ != null) {
        itemQ.qty = $("#qtyOnHand").val();
        loadAllItems();
        return true;
    } else {
        return false;
    }
}

function searchItemQty(itemIdQ) {
    for (let itemQ of items) {
        if (itemQ.code === itemIdQ) {
            return itemQ;
        }
    }
    return null;
}

/**
 * Logics
 * Place order
 * Enter BuyQty and Check Qty On Hand
 * */

$(document).on("change keyup blur", "#buyQty", function () {
    var qtyOnHand = $("#qtyOnHand").val();
    var buyQty = $("#buyQty").val();
    var buyOnHand = qtyOnHand - buyQty;
    if (buyOnHand < 0) {
        $("#lblCheckQty").parent().children('span').text(qtyOnHand + " : Empty On Stock..!!");
        $("#btnAddToCart").attr('disabled', true);
    } else {
        $("#lblCheckQty").parent().children('span').text("");
        $("#btnAddToCart").attr('disabled', false);
    }
});
