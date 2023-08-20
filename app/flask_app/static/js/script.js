function create_account() {
    elem_email = document.getElementById('email');
    elem_pw = document.getElementById('password');
    elem_veri_pw = document.getElementById('verify-password');
    elem_warn = document.getElementById('acc-warn');

    str_email = elem_email.value;
    str_pw = elem_pw.value;
    str_veri_pw = elem_veri_pw.value;
    elem_warn.innerHTML = "";

    if (str_email === "" || str_pw === "" || str_veri_pw === "") {

        elem_warn.style.display = 'block';
        if (str_email === "") {
            elem_warn.innerHTML = 'Error: Empty email';
        } else if (str_pw === "") {
            elem_warn.innerHTML = 'Error: Empty password';
        } else if (str_veri_pw === "") {
            elem_warn.innerHTML = 'Error: Cannot verify password';
        }
    } else {
        if (str_pw === str_veri_pw) {
            elem_warn.style.display = 'none';
            console.log('Succeed!')
        } else {
            elem_warn.style.display = 'block';
            elem_warn.innerHTML = 'Error: Passwords do not match';
        }
    }

};