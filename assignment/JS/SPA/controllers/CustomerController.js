/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

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
$("#txtCustomerId").focus();
const regExCusID = /^(C00-)[0-9]{3,4}$/;
const regExCusName = /^[A-z ]{3,20}$/;
const regExCusAddress = /^[A-z0-9/ ]{4,30}$/;
const regExSalary = /[0-9]{4,19}$/;

let customerValidations = [];
customerValidations.push({reg: regExCusID, field: $('#txtCustomerId'),error:'Customer ID Pattern is Wrong : C00-001'});
customerValidations.push({reg: regExCusName, field: $('#txtCustomerName'),error:'Customer Name Pattern is Wrong : A-z 5-20'});
customerValidations.push({reg: regExCusAddress, field: $('#txtCustomerAddress'),error:'Customer Address Pattern is Wrong : A-z 0-9 ,/'});
customerValidations.push({reg: regExSalary, field: $('#txtCustomerSalary'),error:'Customer Salary Pattern is Wrong : 100 or 100.00'});

//disable tab key of all four text fields using grouping selector in CSS
$("#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});


$("#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").on('keyup', function (event) {
    checkValidity();
});

$("#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").on('blur', function (event) {
    checkValidity();
});


$("#txtCustomerId").on('keydown', function (event) {
    if (event.key == "Enter" && check(regExCusID, $("#txtCustomerId"))) {
        $("#txtCustomerName").focus();
    } else {
        focusText($("#txtCustomerId"));
    }
});


$("#txtCustomerName").on('keydown', function (event) {
    if (event.key == "Enter" && check(regExCusName, $("#txtCustomerName"))) {
        focusText($("#txtCustomerAddress"));
    }
});


$("#txtCustomerAddress").on('keydown', function (event) {
    if (event.key == "Enter" && check(regExCusAddress, $("#txtCustomerAddress"))) {
        focusText($("#txtCustomerSalary"));
    }
});


$("#txtCustomerSalary").on('keydown', function (event) {
    if (event.key == "Enter" && check(regExSalary, $("#txtCustomerSalary"))) {
        let res = confirm("Do you want to add this customer.?");
        if (res) {
            clearAllTexts();
        }
    }
});


function checkValidity() {
    let errorCount=0;
    for (let validation of customerValidations) {
        if (check(validation.reg,validation.field)) {
            textSuccess(validation.field,"");
        } else {
            errorCount=errorCount+1;
            setTextError(validation.field,validation.error);
        }
    }
    setButtonState(errorCount);
}

function check(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function setTextError(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField,"");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function textSuccess(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField,"");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function defaultText(txtField,error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function focusText(txtField) {
    txtField.focus();
}

function setButtonState(value){
    if (value>0){
        $("#btnCSave").attr('disabled',true);
    }else{
        $("#btnCSave").attr('disabled',false);
    }
}


/**
 * clear input fields Values Method
 * */
function clearTextFields() {
    $("#txtCustomerId").focus();
    $("#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").val("");
    checkValidity();
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


