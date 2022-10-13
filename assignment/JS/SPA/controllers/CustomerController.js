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
function dblRowClickEventsCus() {
    $("#customerTable>tr").on('dblclick', function () {
        let deleteCusID = $(this).children().eq(0).text();

        Swal.fire({
            title: 'Do you want to Delete the ' + deleteCusID + ' ?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't Delete`,
        }).then((result) => {
            if (result.isConfirmed) {
                if (deleteCustomer(deleteCusID)) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Delete Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    $(this).remove();
                } else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Delete Unsuccessfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            } else if (result.isDenied) {
                Swal.fire(deleteCusID + ' Delete Canceled!', '', 'info')
            }
        })

    });
}


/**
 * Search id and Load Table
 * */
$("#btnSearchCus").click(function () {
    var result = customers.find(({id}) => id === $("#searchCusId").val());
    console.log(result);

    if (result != null) {
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

    } else {
        let timerInterval
        Swal.fire({
            title: 'Empty Result!',
            html: 'I will close in <b></b> milliseconds.',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        })
        clearCDTextFields();
    }
});

/**
 * Auto Forces Input Fields Search
 * */
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


/**
 * clear Search input fields Values Button
 * */
$("#clearSearchCus").click(function () {
    searchCusId.value = '';
    clearCDTextFields();
    clearCUTextFields();
    loadAllCustomers();
});


/**
 * Save Model
 * */

/**
 * Save Model
 * Item ID
 * */
function generateCustomerID() {
    /*  $("#txtCustomerId").val("C00-1001");*/
    valueC = "C00-1001";
    $("#btnCSave").click(function () {
        var newValueC = valueC.split('-');
        var increaseC = newValueC[1];
        increaseC++;
        valueC = "C00-" + increaseC;

        $("#txtCustomerId").val(valueC);
    });
}

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
    loadAllCustomersForOption();
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
    checkValidityC();
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
    dblRowClickEventsCus();
}

/**
 * Update Model
 * */


/**
 * Auto Forces Input Fields update
 * */

let customerValidationsUpdate = [];
customerValidationsUpdate.push({
    reg: regExCusID,
    field: $('#searchCustomerId'),
    error: 'Customer ID Pattern is Wrong : C00-001'
});
customerValidationsUpdate.push({
    reg: regExCusName,
    field: $('#nameUpdate'),
    error: 'Customer Name Pattern is Wrong : A-z 3-20'
});
customerValidationsUpdate.push({
    reg: regExCusAddress,
    field: $('#addressUpdate'),
    error: 'Customer Address Pattern is Wrong : A-z 0-9 ,/'
});
customerValidationsUpdate.push({
    reg: regExSalary,
    field: $('#salaryUpdate'),
    error: 'Customer Salary Pattern is Wrong : 100 or 100.00'
});

//disable tab key of all four text fields using grouping selector in CSS
$("#searchCustomerId,#nameUpdate,#addressUpdate,#salaryUpdate").on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});


$("#searchCustomerId,#nameUpdate,#addressUpdate,#salaryUpdate").on('keyup', function (event) {
    checkValidityCU();
});

$("#searchCustomerId,#nameUpdate,#addressUpdate,#salaryUpdate").on('blur', function (event) {
    checkValidityCU();
});


$("#searchCustomerId").on('keydown', function (event) {
    if (event.key === "Enter" && checkCU(regExCusID, $("#searchCustomerId"))) {
        $("#nameUpdate").focus();
    } else {
        focusTextCU($("#searchCustomerId"));
    }
});


$("#nameUpdate").on('keydown', function (event) {
    if (event.key === "Enter" && checkCU(regExCusName, $("#nameUpdate"))) {
        focusTextCU($("#addressUpdate"));
    }
});


$("#addressUpdate").on('keydown', function (event) {
    if (event.key === "Enter" && checkCU(regExCusAddress, $("#addressUpdate"))) {
        focusTextCU($("#salaryUpdate"));
    }
});


$("#salaryUpdate").on('keydown', function (event) {
    if (event.key === "Enter" && checkCU(regExSalary, $("#salaryUpdate"))) {
        if (event.which === 13) {
            $('#bntUpdateCustomer').focus();
        }
    }
});

function checkValidityCU() {
    let errorCount = 0;
    for (let validation of customerValidationsUpdate) {
        if (checkCU(validation.reg, validation.field)) {
            textSuccessCU(validation.field, "");
        } else {
            errorCount = errorCount + 1;
            setTextErrorCU(validation.field, validation.error);
        }
    }
    setButtonStateCU(errorCount);
}

function checkCU(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function setTextErrorCU(txtField, error) {
    if (txtField.val().length <= 0) {
        defaultTextCU(txtField, "");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function textSuccessCU(txtField, error) {
    if (txtField.val().length <= 0) {
        defaultTextCU(txtField, "");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function defaultTextCU(txtField, error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function focusTextCU(txtField) {
    txtField.focus();
}

function setButtonStateCU(value) {
    if (value > 0) {
        $("#bntUpdateCustomer").attr('disabled', true);
    } else {
        $("#bntUpdateCustomer").attr('disabled', false);
    }
}

/**
 * Update Button
 * */
$("#bntUpdateCustomer").click(function () {
    let CustomerId = $("#searchCustomerId").val();
    let response2 = updateCustomers(CustomerId);
    if (response2) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Updated Successfully',
            showConfirmButton: false,
            timer: 1500
        })
        clearCUTextFields();
        checkValidityCU();
    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Updated Unsuccessfully',
            showConfirmButton: false,
            timer: 1500
        })
    }
});

/**
 * Update Methods
 * */
function updateCustomers(CustomerId) {
    let customer = searchCustomer(CustomerId);
    if (customer != null) {
        customer.id = $("#searchCustomerId").val();
        customer.name = $("#nameUpdate").val();
        customer.address = $("#addressUpdate").val();
        customer.salary = $("#salaryUpdate").val();
        loadAllCustomers();
        return true;
    } else {
        return false;
    }
}

function searchCustomer(cusId) {
    for (let customer of customers) {
        if (customer.id === cusId) {
            return customer;
        }
    }
    return null;
}


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


/**
 * Delete Model
 * Search id Enter Pressed And Load TextFields
 * */
$("#searchCIdDelete").keyup(function (event) {
    if (event.keyCode === 13) {
        var result = customers.find(({id}) => id === $("#searchCIdDelete").val());
        console.log(result);

        if (result != null) {
            $("#searchCIdDelete").val(result.id);
            $("#disabledNameDelete").val(result.name);
            $("#disabledAddressDelete").val(result.address);
            $("#disabledSalaryDelete").val(result.salary);

        } else {
            let timerInterval
            Swal.fire({
                title: 'Empty Result!',
                html: 'I will close in <b></b> milliseconds.',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
            })
            clearCDTextFields();
        }
    }
});

/**
 * Delete Button
 * */
$("#btnDeleteCustomer").click(function () {
    let deleteID = $("#searchCIdDelete").val();

    Swal.fire({
        title: 'Do you want to Delete the ' + deleteID + ' ?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Don't Delete`,
    }).then((result) => {
        if (result.isConfirmed) {
            if (deleteCustomer(deleteID)) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Delete Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                clearCDTextFields();
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Delete Unsuccessfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } else if (result.isDenied) {
            Swal.fire(deleteID + ' Delete Canceled!', '', 'info')
        }
    })

});

function deleteCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        let indexNumber = customers.indexOf(customer);
        customers.splice(indexNumber, 1);
        loadAllCustomers();
        clearCDTextFields();
        return true;
    } else {
        return false;
    }
}

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