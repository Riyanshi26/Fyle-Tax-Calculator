
document.addEventListener('DOMContentLoaded', function() {   
    const inputFields = document.querySelectorAll('.form-control:not(#age)');

    inputFields.forEach(function(inputField) {
        const errorIcon = inputField.nextElementSibling;

        inputField.addEventListener('input', function() {
            const inputValue = inputField.value.trim();
            if (!isValidNumber(inputValue) || (inputValue)<0) {
                errorIcon.style.display = 'inline-block';
            } else {
                errorIcon.style.display = 'none';
            }
        });
    });

    function isValidNumber(value) {
        return !isNaN(value) && value !== '';
    }
});


function totalTax(grossIncome, extraIncome, age, deductions) {
    var totalIncome = grossIncome + extraIncome - deductions;
    var tax = 0;
    if (totalIncome > 800000) {
        switch (age) {
            case '<40':
                tax = 0.3 * (totalIncome - 800000);
                break;
            case '≥40 & <60':
                tax = 0.4 * (totalIncome - 800000);
                break;
            case '≥60':
                tax = 0.1 * (totalIncome - 800000);
                break;
        }
    }
    return tax;
}
function closeModal(){
    document.getElementById('resultModal').style.display='none';
}

function calculateTax(){
    var grossIncome= parseFloat((document.getElementById("grossIncome")).value);
    var extraIncome= parseFloat((document.getElementById("extraIncome")).value);
    var age= document.getElementById("age").value; 
    var deductions= parseFloat((document.getElementById("deductions")).value);
    var totalIncome = grossIncome + extraIncome - deductions;

    const ageErrorIcon = document.querySelector('#age + .fa-exclamation-circle');
    if (age.trim() === "") {
        ageErrorIcon.style.display = 'inline-block';
        return; 
    }
    else{ ageErrorIcon.style.display = 'none'; }

    if(!isNaN((document.getElementById("grossIncome")).value) && !isNaN((document.getElementById("extraIncome")).value) && !isNaN((document.getElementById("deductions")).value) 
        && grossIncome>0 && extraIncome>0 && deductions>0 && totalIncome>0
    ){
        var tax= totalTax(grossIncome,extraIncome,age,deductions);
        const modal=document.getElementById('resultModal');

        modal.style.display = 'block';
        document.getElementById('taxResult').innerHTML = '<p>Your tax amount is: &#8377;' + tax + '</p>'+ '<p>Your overall income will be: &#8377;' + (totalIncome - tax) + '</p>' ;
    }
    else{
        alert("Kindly enter the fields properly.")
    }
    
    

}