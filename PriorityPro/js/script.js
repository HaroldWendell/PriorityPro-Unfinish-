// hides registration container and show sigh up registration form
function toggleSignUpRegForm() {
    const registrationContainer = document.querySelector('.registrationContainer');
    const signUpRegFormContainer = document.getElementById('signUpRegFormContainer');
    
    registrationContainer.style.display = 'none';
    signUpRegFormContainer.style.display = 'block';
  }
// hides registration container and show log in registration form
function toogleLoginRegForm() {
    const registrationContainer = document.querySelector('.registrationContainer');
    const loginRegFormContainer = document.getElementById('loginRegFormContainer');
    
    registrationContainer.style.display = 'none';
    loginRegFormContainer.style.display = 'block';
  }
  function backButton() {
    const backButton = document.querySelector('.back');
    const registrationContainer = document.querySelector('.registrationContainer');
    const signUpRegFormContainer = document.getElementById('signUpRegFormContainer');
    
    signUpRegFormContainer.style.display = 'none';
    backButton.style.display = 'block';
    registrationContainer.style.display = 'block';
  }
  function backButton1() {
    const backButton1 = document.querySelector('.back1');
    const registrationContainer = document.querySelector('.registrationContainer');
    const loginRegFormContainer = document.getElementById('loginRegFormContainer');
    
    loginRegFormContainer.style.display = 'none';
    backButton1.style.display = 'block';
    registrationContainer.style.display = 'block';
  }

  
// Sign Up Form Validation
const form = document.getElementById('signUpRegFormContainer');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const usernameError = document.getElementById('usernameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    resetErrors();

    const isValid = validateForm();

    if (isValid) {
      // Perform registration logic here
      console.log('Registration successful');
      form.reset();
    }
  });

  function validateForm() {
    let isValid = true;

    const usernameValue = usernameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value;
    const confirmPasswordValue = confirmPasswordInput.value;

    if (usernameValue === '') {
      displayError(usernameError, 'Username is required');
      isValid = false;
    }

    if (emailValue === '') {
      displayError(emailError, 'Email is required');
      isValid = false;
    } else if (!isValidEmail(emailValue)) {
      displayError(emailError, 'Invalid email format');
      isValid = false;
    }

    if (passwordValue === '') {
      displayError(passwordError, 'Password is required');
      isValid = false;
    } else if (passwordValue.length < 8) {
      displayError(passwordError, 'Password must be at least 8 characters');
      isValid = false;
    }

    if (confirmPasswordValue === '') {
      displayError(confirmPasswordError, 'Confirm Password is required');
      isValid = false;
    } else if (passwordValue !== confirmPasswordValue) {
      displayError(confirmPasswordError, 'Passwords do not match');
      isValid = false;
    }

    return isValid;
  }

  function displayError(element, message) {
    element.textContent = message;
  }

  function resetErrors() {
    usernameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    confirmPasswordError.textContent = '';
  }

  function isValidEmail(email) {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  