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

  const userData = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
    dob: dobInput.value,
    terms: termsCheckbox.checked
  };
  saveUserData(userData);

  const tableBody = document.querySelector('#user-data tbody');
  const newRow = tableBody.insertRow();
  newRow.innerHTML = `
    <td>${userData.name}</td>
    <td>${userData.email}</td>
    <td>${userData.password}</td>
    <td>${userData.dob}</td>
    <td>${userData.terms ? 'Yes' : 'No'}</td>
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

  const dobValue = new Date(document.getElementById('dob').value);
  const referenceYear = 1967;
  const minDob = new Date(referenceYear + 18, dobValue.getMonth(), dobValue.getDate());
  const maxDob = new Date(referenceYear + 55, dobValue.getMonth(), dobValue.getDate());

  if (dobValue < minDob || dobValue > maxDob) {
    alert('Date of birth must be between 18 and 55 years old with respect to the year 1967.');
    return;
  }

  submitForm();
});

const dobInput = document.getElementById('dob');
const dobError = document.getElementById('dobError');

dobInput.addEventListener('change', function() {
  const dobValue = new Date(dobInput.value);
  const referenceYear = 1967;
  const minAgeDate = new Date(referenceYear + 18, dobValue.getMonth(), dobValue.getDate());
  const maxAgeDate = new Date(referenceYear + 55, dobValue.getMonth(), dobValue.getDate());

  if (dobValue < minAgeDate || dobValue > maxAgeDate) {
    dobError.textContent = 'Date of birth must be between 18 and 55 years old with respect to the year 1967.';
  } else {
    dobError.textContent = '';
  }
});

function saveUserData(userData) {
  const existingUserData = JSON.parse(localStorage.getItem('userList')) || [];
  existingUserData.push(userData);
  localStorage.setItem('userList', JSON.stringify(existingUserData));
}

function updateUserDataTable() {
  const userList = JSON.parse(localStorage.getItem('userList')) || [];
  const tableBody = document.querySelector('#user-data tbody');
  tableBody.innerHTML = '';

  userList.forEach((userData) => {
    const row = tableBody.insertRow();
    row.innerHTML = `
      <td>${userData.name}</td>
      <td>${userData.email}</td>
      <td>${userData.password}</td>
      <td>${userData.dob}</td>
      <td>${userData.terms ? 'Yes' : 'No'}</td>
    `;
  });
}

window.addEventListener('load', () => {
  updateUserDataTable();
});

function clearForm() {
  document.getElementById('registration-form').reset();
}
