// Function to handle form submission
function submitForm() {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const dobInput = document.getElementById('dob');
  const termsCheckbox = document.getElementById('terms');

  // Check if all fields are filled and terms are accepted
  if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || passwordInput.value.trim() === '' || dobInput.value === '' || !termsCheckbox.checked) {
    alert('Please fill in all fields and accept the terms.');
    return;
  }

  // Create a new row for the table
  const tableBody = document.querySelector('#user-data tbody');
  const newRow = tableBody.insertRow();
  newRow.innerHTML = `
    <td>${nameInput.value}</td>
    <td>${emailInput.value}</td>
    <td>${passwordInput.value}</td>
    <td>${dobInput.value}</td>
    <td>${termsCheckbox.checked ? 'Yes' : 'No'}</td>
  `;

  // Clear the form fields after submission
  nameInput.value = '';
  emailInput.value = '';
  passwordInput.value = '';
  dobInput.value = '';
  termsCheckbox.checked = false;
}

// Add event listener for form submission
const form = document.getElementById('registration-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  const dobValue = new Date(document.getElementById('dob').value);
  const referenceYear = 1967; // Change this to the desired reference year
  const minDob = new Date(referenceYear + 18, dobValue.getMonth(), dobValue.getDate());
  const maxDob = new Date(referenceYear + 55, dobValue.getMonth(), dobValue.getDate());

  if (dobValue < minDob || dobValue > maxDob) {
    alert('Date of birth must be between 18 and 55 years old with respect to the year 1967.');
    return;
  }

  submitForm();
});

// Additional validation for date of birth input
const dobInput = document.getElementById('dob');
const dobError = document.getElementById('dobError');

dobInput.addEventListener('change', function() {
  const dobValue = new Date(dobInput.value);
  const referenceYear = 1967; // Change this to the desired reference year
  const minAgeDate = new Date(referenceYear + 18, dobValue.getMonth(), dobValue.getDate());
  const maxAgeDate = new Date(referenceYear + 55, dobValue.getMonth(), dobValue.getDate());

  if (dobValue < minAgeDate || dobValue > maxAgeDate) {
    dobError.textContent = 'Date of birth must be between 18 and 55 years old with respect to the year 1967.';
  } else {
    dobError.textContent = '';
  }
});
