/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/


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
    clearCDTextFields();
    clearCUTextFields();
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
    clearTextFieldsC();

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
$("#txtCustomerId").focus();
const regExCusID = /^(C00-)[0-9]{3,4}$/;
const regExCusName = /^[A-z ]{3,20}$/;
const regExCusAddress = /^[A-z0-9/ ]{4,30}$/;
const regExSalary = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

let customerValidations = [];
customerValidations.push({
    reg: regExCusID,
    field: $('#txtCustomerId'),
    error: 'Customer ID Pattern is Wrong : C00-001'
});
customerValidations.push({
    reg: regExCusName,
    field: $('#txtCustomerName'),
    error: 'Customer Name Pattern is Wrong : A-z 3-20'
});
customerValidations.push({
    reg: regExCusAddress,
    field: $('#txtCustomerAddress'),
    error: 'Customer Address Pattern is Wrong : A-z 0-9 ,/'
});
customerValidations.push({
    reg: regExSalary,
    field: $('#txtCustomerSalary'),
    error: 'Customer Salary Pattern is Wrong : 100 or 100.00'
});

//disable tab key of all four text fields using grouping selector in CSS
$("#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});


$("#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").on('keyup', function (event) {
    checkValidityC();
});

$("#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").on('blur', function (event) {
    checkValidityC();
});


$("#txtCustomerId").on('keydown', function (event) {
    if (event.key === "Enter" && checkC(regExCusID, $("#txtCustomerId"))) {
        $("#txtCustomerName").focus();
    } else {
        focusTextC($("#txtCustomerId"));
    }
});


$("#txtCustomerName").on('keydown', function (event) {
    if (event.key === "Enter" && checkC(regExCusName, $("#txtCustomerName"))) {
        focusTextC($("#txtCustomerAddress"));
    }
});


$("#txtCustomerAddress").on('keydown', function (event) {
    if (event.key === "Enter" && checkC(regExCusAddress, $("#txtCustomerAddress"))) {
        focusTextC($("#txtCustomerSalary"));
    }
});


$("#txtCustomerSalary").on('keydown', function (event) {
    if (event.key === "Enter" && checkC(regExSalary, $("#txtCustomerSalary"))) {
        if (event.which === 13) {
            $('#btnCSave').focus();
        }
    }
});

function checkValidityC() {
    let errorCount = 0;
    for (let validation of customerValidations) {
        if (checkC(validation.reg, validation.field)) {
            textSuccessC(validation.field, "");
        } else {
            errorCount = errorCount + 1;
            setTextErrorC(validation.field, validation.error);
        }
    }
    setButtonStateC(errorCount);
}

function checkC(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function setTextErrorC(txtField, error) {
    if (txtField.val().length <= 0) {
        defaultTextC(txtField, "");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function textSuccessC(txtField, error) {
    if (txtField.val().length <= 0) {
        defaultTextC(txtField, "");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function defaultTextC(txtField, error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function focusTextC(txtField) {
    txtField.focus();
}

function setButtonStateC(value) {
    if (value > 0) {
        $("#btnCSave").attr('disabled', true);
    } else {
        $("#btnCSave").attr('disabled', false);
    }
}

/**
 * clear input fields Values Method
 * */
function clearTextFieldsC() {
    txtCustomerId.value = '';
    txtCustomerName.value = '';
    txtCustomerAddress.value = '';
    txtCustomerSalary.value = '';
    $("#txtCustomerId").focus();
}

/**
 * clear input fields Values Button
 * */
$("#btnClearC").click(function () {
    clearTextFieldsC();
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

$("#searchCustomerId,#nameUpdate,#addressUpdate,#salaryUpdate").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

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
function clearCUTextFields() {
    searchCustomerId.value = '';
    nameUpdate.value = '';
    addressUpdate.value = '';
    salaryUpdate.value = '';
}

/**
 * clear input fields Values Button
 * */
$("#btnUclearC").click(function () {
    clearCUTextFields();
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
function clearCDTextFields() {
    searchCIdDelete.value = '';
    disabledNameDelete.value = '';
    disabledAddressDelete.value = '';
    disabledSalaryDelete.value = '';
}

/**
 * clear input fields Values Button
 * */
$("#btnDclearC").click(function () {
    clearCDTextFields();
});