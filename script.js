
const form = document.getElementById("registration-form");

const fullname = document.getElementById("fullname");
const mail = document.getElementById("mail");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const phone = document.getElementById("phone");
const country = document.getElementById("country");

const genderInputs = document.querySelectorAll(
    'input[name="gender"]'
);

const hobbyInputs = document.querySelectorAll(
    'input[name="hobbies"]'
);

const successMessage = document.getElementById("success-message");

// Display an error message and highlight the invalid field
function showError(field, message) {
    field.classList.add("invalid");

    const error = document.getElementById(field.id + "-error");
    if (error) {
        error.textContent = message;
    }
}

// Clear an error message
function clearError(field) {
    field.classList.remove("invalid");

    const error = document.getElementById(field.id + "-error");
    if (error) {
        error.textContent = "";
    }
}

// Validate one field
function validateField(field) {
    const value = field.value.trim();

    clearError(field);

    if (field === fullname) {
        if (value === "") {
            showError(field, "Full name cannot be empty.");
            return false;
        }
    }

    if (field === mail) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (value === "") {
            showError(field, "Email address is required.");
            return false;
        }

        if (!emailPattern.test(value)) {
            showError(field, "Please enter a valid email address.");
            return false;
        }
    }

    if (field === password) {
        if (value.length < 6) {
            showError(field, "Password must contain at least 6 characters.");
            return false;
        }
    }

    if (field === confirmPassword) {
        if (value === "") {
            showError(field, "Please confirm your password.");
            return false;
        }

        if (value !== password.value) {
            showError(field, "Passwords do not match.");
            return false;
        }
    }

    if (field === phone) {
        if (!/^\d+$/.test(value)) {
            showError(field, "Phone number must contain digits only.");
            return false;
        }

        if (value.length < 10) {
            showError(field, "Phone number must have at least 10 digits.");
            return false;
        }
    }

    if (field === country) {
        if (value === "") {
            showError(field, "Please select your country.");
            return false;
        }
    }

    return true;
}

// Validate gender selection
function validateGender() {
    const selected = document.querySelector(
        'input[name="gender"]:checked'
    );

    const error = document.getElementById("gender-error");

    if (!selected) {
        error.textContent = "Please select your gender.";
        return false;
    }

    error.textContent = "";
    return true;
}

// Validate that at least one hobby is selected
function validateHobbies() {
    const selected = document.querySelector(
        'input[name="hobbies"]:checked'
    );

    const error = document.getElementById("hobbies-error");

    if (!selected) {
        error.textContent = "Please select at least one hobby.";
        return false;
    }

    error.textContent = "";
    return true;
}

// Real-time validation while typing
const fields = [
    fullname,
    mail,
    password,
    confirmPassword,
    phone,
    country
];

fields.forEach(function(field) {
    field.addEventListener("input", function() {
        validateField(field);

        // Recheck confirmation if the original password changes
        if (field === password && confirmPassword.value !== "") {
            validateField(confirmPassword);
        }

        successMessage.hidden = true;
    });

    field.addEventListener("change", function() {
        validateField(field);
        successMessage.hidden = true;
    });
});

// Validate gender and hobbies when changed
genderInputs.forEach(function(input) {
    input.addEventListener("change", function() {
        validateGender();
        successMessage.hidden = true;
    });
});

hobbyInputs.forEach(function(input) {
    input.addEventListener("change", function() {
        validateHobbies();
        successMessage.hidden = true;
    });
});

// Validate everything when submitting
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const fieldResults = fields.map(function(field) {
        return validateField(field);
    });

    const genderValid = validateGender();
    const hobbiesValid = validateHobbies();

    const formIsValid =
        fieldResults.every(Boolean) &&
        genderValid &&
        hobbiesValid;

    if (!formIsValid) {
        successMessage.hidden = true;

        const firstInvalid = form.querySelector(
            ".invalid"
        );

        if (firstInvalid) {
            firstInvalid.focus();
        }

        return;
    }

    successMessage.textContent =
        "Registration form completed successfully!";

    successMessage.hidden = false;
});
