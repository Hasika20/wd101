document.addEventListener('DOMContentLoaded', () => {
  const registrationForm = document.getElementById('registration-form');
  const userDataTableBody = document.querySelector('#user-data tbody');
  const dobError = document.getElementById('dobError');

  // Load user data on page load
  updateUserDataTable();

  registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const userData = {
      name: getValueById('name'),
      email: getValueById('email'),
      password: getValueById('password'),
      dob: getValueById('dob'),
      terms: document.getElementById('terms').checked
    };

    if (!validateUserData(userData)) {
      showError('Value must be 09/11/1967 or later');
    } else {
      saveUserData(userData);
      updateUserDataTable();
      clearForm();
    }
  });

  function getValueById(id) {
    return document.getElementById(id).value;
  }

  function validateUserData(userData) {
    const minAge = 18;
    const maxAge = 55;
    const today = new Date();
    const birthDate = new Date(userData.dob);
    const age = today.getFullYear() - birthDate.getFullYear();

    return age >= minAge && age <= maxAge;
  }

  function saveUserData(userData) {
    const existingUserData = JSON.parse(localStorage.getItem('userList')) || [];
    existingUserData.push(userData);
    localStorage.setItem('userList', JSON.stringify(existingUserData));
  }

  function updateUserDataTable() {
  userDataTableBody.innerHTML = '';
  const userList = JSON.parse(localStorage.getItem('userList')) || [];

  userList.forEach((userData) => {
    const userDataRow = createUserDataTableRow(userData);
    userDataTableBody.appendChild(userDataRow);
  });

  const userDataTable = document.getElementById('user-data');
  if (userList.length > 0) {
    userDataTable.classList.remove('hidden');
  } else {
    userDataTable.classList.add('hidden');
  }
}

  function createUserDataTableRow(userData) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${userData.name}</td>
        <td>${userData.email}</td>
        <td>${userData.password}</td>
        <td>${userData.dob}</td>
        <td>${userData.terms ? 'true' : 'false'}</td>
    `;
    return row;
  }

  function clearForm() {
    registrationForm.reset();
  }

  function showError(message) {
    dobError.textContent = message;
  }
});
