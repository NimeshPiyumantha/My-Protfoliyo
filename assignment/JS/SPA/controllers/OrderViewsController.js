/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

function loadAllOrders() {

    $("#tblOrder").empty();

    for (var orders of order) {
        console.log(orders);
        var row = `<tr><td>${orders.oId}</td><td>${orders.cId}</td><td>${orders.oDate}</td><td>${orders.subTotal}</td><td>${orders.discount}</td></tr>`;
        $("#tblOrder").append(row);
    }
}

function loadAllOrderDetails() {

    $("#tblOrderDetails").empty();

    for (var orderDetail of orderDetails) {
        console.log(orderDetail);
        var row = `<tr><td>${orderDetail.orderId}</td><td>${orderDetail.cusId}</td><td>${orderDetail.itemId}</td><td>${orderDetail.qty}</td><td>${orderDetail.total}</td></tr>`;
        $("#tblOrderDetails").append(row);
    }
}