document.getElementById('resetPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Validate the password before proceeding
    if (!newpass()) {
        return; // Stop form submission if validation fails
    }

    const resetKey = document.getElementById('resetKey').value;
    const newPassword = document.getElementById('newPassword').value;

    // Make the POST request to reset the password
    fetch('/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resetKey: resetKey, newPassword: newPassword })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Your password has been reset successfully.');
            window.location.href = 'index.html'; // Redirect to login page
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred.');
    });
});

// Password validation function
function newpass() {
    var password = document.getElementById('newPassword').value.trim();
    var error = document.getElementById('error');
    var minlength = 8;
    var maxlength = 24;
    const specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>_]/;

    // Check if password contains special characters
    if (!specialCharacterPattern.test(password)) {
        error.style.display = 'block';
        error.textContent = 'Password should contain at least one special character.';
        return false;
    }

    // Check if password is empty or only contains whitespaces
    if (password === '') {
        error.style.display = 'block';
        error.textContent = 'Password does not allow only whitespaces... Try again.';
        return false;
    }

    // Check if password length is within allowed range
    if (password.length < minlength) {
        error.style.display = 'block';
        error.textContent = 'Password should be at least 8 characters long. No whitespaces included.';
        return false;
    } else if (password.length > maxlength) {
        error.style.display = 'block';
        error.textContent = 'Password can only be a maximum of 24 characters. No whitespaces included.';
        return false;
    }

    // If validation passes
    error.style.display = 'none';
    alert('Password is valid.');
    return true;
}