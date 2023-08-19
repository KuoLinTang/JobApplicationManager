function create_account() {
    emailElem = document.getElementById('email');
    pwElem = document.getElementById('pw');
    pwConElem = document.getElementById('pw-confirm');

    if (pwElem.value === pwConElem.value) {
        console.log("Email:" + emailElem.value);
        console.log('Password:' + pwElem.value);
    } else {
        console.log('Error: Passwords do not match')
    };
};