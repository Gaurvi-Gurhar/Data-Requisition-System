// Toggle Password Visibility
document.getElementById('toggle-password').addEventListener('change', function () {
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirm-password');
    const type = this.checked ? 'text' : 'password';
    passwordField.type = type;
    confirmPasswordField.type = type;
});

// Add password strength indicator
const passwordField = document.getElementById('password');
passwordField.addEventListener('input', function () {
    const strengthIndicator = document.getElementById('password-strength');
    const password = passwordField.value;
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (strongRegex.test(password)) {
        strengthIndicator.textContent = 'Strong password';
        strengthIndicator.style.color = 'green';
    } else if (password.length >= 6) {
        strengthIndicator.textContent = 'Moderate password';
        strengthIndicator.style.color = 'orange';
    } else {
        strengthIndicator.textContent = 'Weak password';
        strengthIndicator.style.color = 'red';
    }
});

// Enhanced validation logic in validateRegistration
function validateRegistration(username, email, password, confirmPassword) {
    const existingUsernames = ["user1", "admin", "john_doe"];
    if (existingUsernames.includes(username)) {
        alert('Username already taken. Please choose another one.');
        return false;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
        return false;
    }

    return true;
}
