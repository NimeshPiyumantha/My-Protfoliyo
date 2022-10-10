/**
 * @author : Sanu Vithanage
 * @since : 0.1.0
 **/

/**
 * Invoice Details
 * */

/**
 * Invoice Details
 * Order ID
 * */
function generateOrderID() {
    $("#orderId").val("ODI-001");
}

/**
 * Invoice Details
 * Order Date
 * */
function setCurrentDate() {
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

$("#btnAddToCart").click(function () {

    var tableRow = [];

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
function loadCartTableDetail() {
    $("#tblAddToCart").empty();

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
function manageQtyOnHand(prevQty, nowQty) {
    var preQty = parseInt(preQty);
    var nowQty = parseInt(nowQty);
    var avQty = parseInt($("#qtyOnHand").val());

    avQty = avQty + preQty;
    avQty = avQty - nowQty;

    $("#qtyOnHand").val(avQty);

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
    console.log(discount);
    discount = (total / 100) * discount;
    console.log(discount);

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
});