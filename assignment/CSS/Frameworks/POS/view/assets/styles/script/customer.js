/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

/**
 * @ Global Scope
 */
var customers = [];


/**
 * load all customers Button
 * */
$("#btnViewAllCustomer").click(function () {
    loadAllCustomers();
});

/**
 * Table Listener Click and Load textFields
 * */
function blindClickEvents() {
    $("#customerTable>tr").click(function () {
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let salary = $(this).children().eq(3).text();
        console.log(id, name, address, salary);

        $("#searchCustomerId").val(id);
        $("#nameUpdate").val(name);
        $("#addressUpdate").val(address);
        $("#salaryUpdate").val(salary);

        $("#searchCIdDelete").val(id);
        $("#disabledNameDelete").val(name);
        $("#disabledAddressDelete").val(address);
        $("#disabledSalaryDelete").val(salary);
    });
}

/**
 * Table Listener double click and Click and Remove textFields
 * */
$("#customerTable").dblclick(function () {
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
 * Search id and Load Table
 * */
$("#btnSearchCus").click(function () {
    var result = customers.find(({id}) => id === $("#searchCusId").val());
    console.log(result);

    $("#customerTable").empty();
    var row = `<tr><td>${result.id}</td><td>${result.name}</td><td>${result.address}</td><td>${result.salary}</td></tr>`;
    $("#customerTable").append(row);

    $("#searchCustomerId").val(result.id);
    $("#nameUpdate").val(result.name);
    $("#addressUpdate").val(result.address);
    $("#salaryUpdate").val(result.salary);

    $("#searchCIdDelete").val(result.id);
    $("#disabledNameDelete").val(result.name);
    $("#disabledAddressDelete").val(result.address);
    $("#disabledSalaryDelete").val(result.salary);

});

/**
 * Auto Forces Input Fields Search
 * */
$(document).ready(function () {
    $('#searchCusId').keypress(function (event) {
        if (event.which === 13) {
            $('#btnSearchCus').focus();
        }
    });
    $('#btnSearchCus').keypress(function (event) {
        if (event.which === 13) {
            $('#searchCusId').focus();
        }
    });
});

/**
 * clear Search input fields Values Button
 * */
$("#clearSearchCus").click(function () {
    searchCusId.value = '';
    clearDTextFields();
    clearUTextFields();
});


/**
 * Save Model
 * */


/**
 * Button Add New Customer
 * */
$("#btnCSave").click(function () {

    //select all the four text fields and then get their typed values
    let customerID = $("#txtCustomerId").val();
    let customerName = $("#txtCustomerName").val();
    let customerAddress = $("#txtCustomerAddress").val();
    let customerSalary = $("#txtCustomerSalary").val();
    clearTextFields();

    //Alert Save
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Customer has been saved',
        showConfirmButton: false,
        timer: 2500
    })

    // customer object
    var customerObject = {
        id: customerID,
        name: customerName,
        address: customerAddress,
        salary: customerSalary
    }

    //Add the customer object to the array
    customers.push(customerObject);

    /* console.log(customers);*/

    loadAllCustomers();
});

/**
 * Auto Forces Input Fields Save
 * */
var regExCusID = /^(C00-)[0-9]{3,4}$/;
var regExCusName = /^[A-z ]{3,20}$/;
var regExCusAddress = /^[A-z0-9/ ]{4,30}$/;
var regExSalary = /[0-9]{4,19}$/;

$('#txtCustomerId').keypress(function (event) {
    let input = $("#txtCustomerId").val();

    if (regExCusID.test(input)) {
        $("#txtCustomerId").css('border', '2px solid green');
        $("#lblCusID").text("");

        if (event.which === 13) {
            $('#txtCustomerName').focus();
        }
    } else {
        $("#txtCustomerId").css('border', '2px solid red');
        $("#lblCusID").text("Wrong format : C00-001");
    }
});

$('#txtCustomerName').keypress(function (event) {
    let input = $("#txtCustomerName").val();

    if (regExCusName.test(input)) {
        $("#txtCustomerName").css('border', '2px solid green');
        $("#lblCusName").text("");

        if (event.which === 13) {
            $('#txtCustomerAddress').focus();
        }
    } else {
        $("#txtCustomerName").css('border', '2px solid red');
        $("#lblCusName").text("Wrong format : Nimesh");
    }
});

$('#txtCustomerAddress').keypress(function (event) {
    let input = $("#txtCustomerAddress").val();

    if (regExCusAddress.test(input)) {
        $("#txtCustomerAddress").css('border', '2px solid green');
        $("#lblCusAddress").text("");

        if (event.which === 13) {
            $('#txtCustomerSalary').focus();
        }
    } else {
        $("#txtCustomerAddress").css('border', '2px solid red');
        $("#lblCusAddress").text("Wrong format : Galle");
    }
});

$('#txtCustomerSalary').keypress(function (event) {
    let input = $("#txtCustomerSalary").val();

    if (regExSalary.test(input)) {
        $("#txtCustomerSalary").css('border', '2px solid green');
        $("#lblCusSalary").text("");

        if (event.which === 13) {
            $('#btnCSave').focus();
        }
    } else {
        $("#txtCustomerSalary").css('border', '2px solid red');
        $("#lblCusSalary").text("Wrong format : 70000");
    }
});

$('#btnCSave').keypress(function (event) {
    if (event.which === 13) {
        $('#txtCustomerId').focus();
    }
});


/**
 * clear input fields Values Method
 * */
function clearTextFields() {
    txtCustomerId.value = '';
    txtCustomerName.value = '';
    txtCustomerAddress.value = '';
    txtCustomerSalary.value = '';
}

/**
 * clear input fields Values Button
 * */
$("#btnClearC").click(function () {
    clearTextFields();
});

/**
 * load all customers Method
 * */
function loadAllCustomers() {

    //remove all the table body content before adding data
    $("#customerTable").empty();


    // get all customer records from the array
    for (var customer of customers) {
        console.log(customer);// customer object

        // Using String Literals to do the same thing as above
        var row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.salary}</td></tr>`;

        //then add it to the table body of customer table
        $("#customerTable").append(row);
    }
    blindClickEvents();
}

/**
 * Update Model
 * */


/**
 * Auto Forces Input Fields update
 * */
$(document).ready(function () {
    $('#searchCustomerId').keypress(function (event) {
        let input = $("#searchCustomerId").val();

        if (regExCusID.test(input)) {
            $("#searchCustomerId").css('border', '2px solid green');
            $("#lblUCusId").text("");

            if (event.which === 13) {
                $('#nameUpdate').focus();
            }
        } else {
            $("#searchCustomerId").css('border', '2px solid red');
            $("#lblUCusId").text("Wrong format : C00-001");
        }
    });

    $('#nameUpdate').keypress(function (event) {
        let input = $("#nameUpdate").val();

        if (regExCusName.test(input)) {
            $("#nameUpdate").css('border', '2px solid green');
            $("#lblUCusName").text("");

            if (event.which === 13) {
                $('#addressUpdate').focus();
            }
        } else {
            $("#nameUpdate").css('border', '2px solid red');
            $("#lblUCusName").text("Wrong format : Nimesh");
        }
    });

    $('#addressUpdate').keypress(function (event) {
        let input = $("#addressUpdate").val();

        if (regExCusAddress.test(input)) {
            $("#addressUpdate").css('border', '2px solid green');
            $("#lblUCusAddress").text("");

            if (event.which === 13) {
                $('#salaryUpdate').focus();
            }
        } else {
            $("#addressUpdate").css('border', '2px solid red');
            $("#lblUCusAddress").text("Wrong format : Galle");
        }
    });

    $('#salaryUpdate').keypress(function (event) {
        let input = $("#salaryUpdate").val();

        if (regExSalary.test(input)) {
            $("#salaryUpdate").css('border', '2px solid green');
            $("#lblUCusSalary").text("");

            if (event.which === 13) {
                $('#bntUpdateCustomer').focus();
            }
        } else {
            $("#salaryUpdate").css('border', '2px solid red');
            $("#lblUCusSalary").text("Wrong format : 70000");
        }
    });

    $('#bntUpdateCustomer').keypress(function (event) {
        if (event.which === 13) {
            $('#searchCustomerId').focus();
        }
    });

});

/*
/!**
 * Update Model
 * Search id Enter Pressed And Load TextFields
 * *!/
$("#searchCustomerId").keyup(function (event) {
    if (event.keyCode === 13) {
        var result = customers.find(({id}) => id === $("#searchCustomerId").val());
        console.log(result);

        $("#searchCustomerId").val(result.id);
        $("#nameUpdate").val(result.name);
        $("#addressUpdate").val(result.address);
        $("#salaryUpdate").val(result.salary);

    }
});*/

/**
 * clear input fields Values Method
 * */
function clearUTextFields() {
    searchCustomerId.value = '';
    nameUpdate.value = '';
    addressUpdate.value = '';
    salaryUpdate.value = '';
}

/**
 * clear input fields Values Button
 * */
$("#btnUclearC").click(function () {
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
$("#searchCIdDelete").keyup(function (event) {
    if (event.keyCode === 13) {
        var result = customers.find(({id}) => id === $("#searchCIdDelete").val());
        console.log(result);

        $("#searchCIdDelete").val(result.id);
        $("#disabledNameDelete").val(result.name);
        $("#disabledAddressDelete").val(result.address);
        $("#disabledSalaryDelete").val(result.salary);

    }
});
*/

/**
 * clear input fields Values Method
 * */
function clearDTextFields() {
    searchCIdDelete.value = '';
    disabledNameDelete.value = '';
    disabledAddressDelete.value = '';
    disabledSalaryDelete.value = '';
}

/**
 * clear input fields Values Button
 * */
$("#btnDclearC").click(function () {
    clearDTextFields();
});