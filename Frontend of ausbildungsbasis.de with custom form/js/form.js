document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let valid = true;
    let messages = [];

    // Clear previous errors
    clearErrors();

    // Validate Full Name
    if (document.getElementById('fullName').value.trim() === '') {
        valid = false;
        messages.push('Full Name is required.');
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(document.getElementById('email').value)) {
        valid = false;
        messages.push('Invalid email format.');
    }

    // Validate Password
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordPattern.test(password)) {
        valid = false;
        messages.push('Password must be at least 8 characters, include an uppercase letter, a number, and a special character.');
    } else if (password !== confirmPassword) {
        valid = false;
        messages.push('Passwords do not match.');
    }

    // Validate Phone Number
    const phonePattern = /^\d{10}$/; // Assuming US phone number format
    if (!phonePattern.test(document.getElementById('phoneNumber').value)) {
        valid = false;
        messages.push('Phone number must be 10 digits.');
    }

    // Validate Date of Birth
    const dob = new Date(document.getElementById('dob').value);
    const age = new Date().getFullYear() - dob.getFullYear();
    if (isNaN(dob) || age < 18) {
        valid = false;
        messages.push('You must be at least 18 years old.');
    }

    // Validate Gender
    if (!document.querySelector('input[name="gender"]:checked')) {
        valid = false;
        messages.push('Please select your gender.');
    }

    // Validate Country
    if (document.getElementById('country').value === '') {
        valid = false;
        messages.push('Please select your country.');
    }

    // Validate Terms and Conditions
    if (!document.getElementById('terms').checked) {
        valid = false;
        messages.push('You must agree to the terms and conditions.');
    }

    // Display validation messages
    if (!valid) {
        displayModal(messages);
        return;
    }

    // Proceed with AJAX submission if valid
    submitForm();
});

function clearErrors() {
    document.getElementById('errorMessages').innerHTML = '';
}

function displayModal(messages) {
    const modal = document.getElementById('errorModal');
    const errorList = document.getElementById('errorMessages');

    messages.forEach(function(message) {
        let li = document.createElement('li');
        li.textContent = message;
        errorList.appendChild(li);
    });

    modal.style.display = 'flex';

    // Close the modal when the user clicks the close button
    document.querySelector('.close').onclick = function() {
        modal.style.display = 'none';
    };

    // Close the modal when the user clicks anywhere outside the modal content
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

function submitForm() {
    // Implement AJAX submission here
}
