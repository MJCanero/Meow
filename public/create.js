document.querySelector('.form-container').addEventListener('submit', function(event) {
    event.preventDefault();

    // Shared variables
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const fullName = document.getElementById('fullName').value;
    const birthday = document.getElementById('birthday').value;
    const gender = document.getElementById('gender').value;
    const role = document.getElementById('role').value;

    if (!sign_up(email, password, confirmPassword)) {
        return;
    }

    fetch(this.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            password: password,
            fullName: fullName,
            birthday: birthday,
            gender: gender,
            role: role
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Account created successfully!');
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

function sign_up(email, password, confirmPassword) {
    var error = document.getElementById('error');
    var minlength = 8;
    var maxlength = 24;

    const specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>_]/;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|biz|info)$/;

    if (!emailPattern.test(email)) {
        error.style.display = 'block';
        error.textContent = 'Please enter a valid E-mail address (e.g., example@domain.com).';
        return false;
    }

    if (!specialCharacterPattern.test(password)) {
        error.style.display = 'block';
        error.textContent = 'Password should contain at least one special character.';
        return false;
    }

    if (password === '') {
        error.style.display = 'block';
        error.textContent = 'Password cannot consist only of whitespaces. Try again.';
        return false;
    }

    if (password.length < minlength) {
        error.style.display = 'block';
        error.textContent = 'Password must be at least 8 characters long.';
        return false;
    } else if (password.length > maxlength) {
        error.style.display = 'block';
        error.textContent = 'Password can be a maximum of 24 characters.';
        return false;
    }

    if (password !== confirmPassword) {
        error.style.display = 'block';
        error.textContent = 'Passwords do not match. Please try again.';
        return false;
    }

    error.style.display = 'none';
    return true;
}

// Toggle password visibility
function check() {
    var passInput = document.getElementById('passkey');
    var toggle = document.querySelector('.toggle');

    if (passInput.type === 'password') {
        passInput.type = 'text';
        toggle.textContent = 'Hide';
    } else {
        passInput.type = 'password';
        toggle.textContent = 'Show Password';
    }
}
