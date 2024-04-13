function getValueAndCheckExistence(id) {
  const element = document.getElementById(id);
  return element ? element.value : null;
}

const form = document.getElementById('registration-form');
const dataTable = document.getElementById('user-data');
const tableBody = dataTable.querySelector('tbody');
const dobInput = document.getElementById('dob');
const dobError = document.getElementById('dobError');

window.addEventListener('load', () => {
  updateTable();
});

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const data = {
    name: getValueAndCheckExistence('name'),
    email: getValueAndCheckExistence('email'),
    password: getValueAndCheckExistence('password'),
    dob: getValueAndCheckExistence('dob'),
    terms: document.getElementById('terms').checked
  };

  if (!validateData(data)) {
    displayErrorMessage('Value must be 09/11/1967 or later', dobInput);
  } else {
    saveData(data);
    updateTable();
    clearForm();
  }
}

function validateData(data) {
  const minAge = 18;
  const maxAge = 55;

  if (!data.dob) return false; // Handle missing date of birth
  const today = new Date();
  const birthDate = new Date(data.dob);
  const age = today.getFullYear() - birthDate.getFullYear();

  return age >= minAge && age <= maxAge;
}

function saveData(data) {
  const existingData = JSON.parse(localStorage.getItem('userData')) || [];
  existingData.push(data);
  localStorage.setItem('userData', JSON.stringify(existingData));
}

function updateTable() {
  tableBody.innerHTML = '';

  const dataList = JSON.parse(localStorage.getItem('userData')) || [];
  dataList.forEach(data => {
    const row = createTableRow(data);
    tableBody.appendChild(row);
  });

  dataTable.classList.toggle('hidden', dataList.length === 0);
}

function createTableRow(data) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${data.name}</td>
    <td>${data.email}</td>
    <td>${data.password}</td>
    <td>${data.dob}</td>
    <td>${data.terms ? 'true' : 'false'}</td>
  `;
  return row;
}

function clearForm() {
  form.reset();
}

function displayErrorMessage(message, targetElement) {
  const errorMessage = document.createElement('p');
  errorMessage.textContent = message;
  errorMessage.classList.add('error-message');
  targetElement.parentNode.appendChild(errorMessage);
}
