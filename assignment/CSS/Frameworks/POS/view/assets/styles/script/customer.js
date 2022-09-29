/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

/**
 * @ Global Scope
 */
var customers = [];

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

}