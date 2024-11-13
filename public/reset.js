document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    if (!reset()) {
        return; // Stop the form submission if validation fails
    }

    const email = document.getElementById('email').value;

    // Make the POST request to the server for password reset
    fetch('/send-password-reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Password reset email sent! Redirecting to reset password page.');
            window.location.href = data.redirectUrl;
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred.');
    });
});

function reset() {
    var email = document.getElementById('email').value;
    var error = document.getElementById('error');
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|biz|info)$/;

    if (!emailPattern.test(email)) {
        error.style.display = 'block';
        error.textContent = 'Please enter a valid E-mail address (e.g., example@domain.com).';
        return false;
    } else {
        error.style.display = 'none';
        return true;
    }
}
