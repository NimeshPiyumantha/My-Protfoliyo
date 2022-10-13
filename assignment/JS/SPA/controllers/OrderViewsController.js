/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

function loadAllOrders() {

    $("#tblOrder").empty();

    for (var order of orders) {
        console.log(order);
        var row = `<tr><td>${order.oId}</td><td>${order.cId}</td><td>${order.oDate}</td><td>${order.subTotal}</td><td>${order.discount}</td></tr>`;
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