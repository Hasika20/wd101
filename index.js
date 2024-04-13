function submitForm() {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const dobInput = document.getElementById('dob');
  const termsCheckbox = document.getElementById('terms');

  if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || passwordInput.value.trim() === '' || dobInput.value === '' || !termsCheckbox.checked) {
    alert('Please fill in all fields and accept the terms.');
    return;
  }

  const tableBody = document.querySelector('#user-data tbody');
  const newRow = tableBody.insertRow();
  newRow.innerHTML = `
    <td>${nameInput.value}</td>
    <td>${emailInput.value}</td>
    <td>${passwordInput.value}</td>
    <td>${dobInput.value}</td>
    <td>${termsCheckbox.checked ? 'Yes' : 'No'}</td>
  `;

  nameInput.value = '';
  emailInput.value = '';
  passwordInput.value = '';
  dobInput.value = '';
  termsCheckbox.checked = false;
}

const form = document.getElementById('registration-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  submitForm();
});

const dobInput = document.getElementById('dob');
const dobError = document.getElementById('dobError');

dobInput.addEventListener('change', function() {
  const dobValue = new Date(dobInput.value);
  const currentDate = new Date();
  const minAgeDate = new Date(currentDate.getFullYear() - 55, currentDate.getMonth(), currentDate.getDate());
  const maxAgeDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

  if (dobValue < minAgeDate || dobValue > maxAgeDate) {
    dobError.textContent = 'Date of birth must be between 18 and 55 years old.';
  } else {
    dobError.textContent = '';
  }
});
