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

            fetch('/login/create-account/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": str_email,
                    "password": str_pw
                })
            })
                .then(response => response.json())
                .then(function (data) {
                    msg = data['message'];
                    status_cd = data['status_code'];

                    if (status_cd === 400) {
                        if (msg.includes('Duplicate entry')) {
                            elem_warn.style.display = 'block';
                            elem_warn.innerHTML = 'Error: Email already in use';
                        } else {
                            console.log('Error:' + msg);
                        }
                    } else {
                        console.log('Message:' + msg);
                        window.location.href = '/login/create-account/success/?email=' + str_email;
                    }
                })

        } else {
            elem_warn.style.display = 'block';
            elem_warn.innerHTML = 'Error: Passwords do not match';
        }
    }

};