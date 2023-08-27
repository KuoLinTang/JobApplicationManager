function create_account() {

    let elem_email = document.getElementById('email');
    let elem_pw = document.getElementById('password');
    let elem_veri_pw = document.getElementById('verify-password');
    let elem_warn = document.getElementById('warn');

    let str_email = elem_email.value.toLowerCase();  // convert email address to lower case (avoid some duplicates)
    let str_pw = elem_pw.value;
    let str_veri_pw = elem_veri_pw.value;
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


function reset_password() {

    let elem_email = document.getElementById('email');
    let elem_warn = document.getElementById('warn');
    let str_email = elem_email.value.toLowerCase();  // convert email address to lower case (avoid some duplicates)
    elem_warn.innerHTML = "";

    if (str_email === "") {
        elem_warn.style.display = 'block';
        elem_warn.innerHTML = 'Error: Empty email';
    } else {
        elem_warn.style.display = 'none';

        fetch('/login/reset-password-requested/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": str_email
            })
        })
            .then(response => response.json())
            .then(function (data) {
                msg = data['message'];
                status_cd = data['status_code'];

                if (status_cd === 400) {
                    console.log('Error:' + msg);
                } else if (status_cd === 300) {
                    elem_warn.style.display = 'block';
                    elem_warn.innerHTML = 'Error: Email does not exist';
                } else {
                    window.location.href = '/login/reset-password-requested/success/?email=' + encodeURIComponent(btoa(str_email));
                }
            })
    }

};


function send_new_password() {

    let str_email = document.getElementById('hidden-email').textContent;
    let elem_pw = document.getElementById('password');
    let elem_veri_pw = document.getElementById('verify-password');
    let elem_warn = document.getElementById('warn');
    let str_pw = elem_pw.value;
    let str_veri_pw = elem_veri_pw.value;
    elem_warn.innerHTML = "";

    if (str_pw === "" || str_veri_pw === "") {

        elem_warn.style.display = 'block';
        if (str_pw === "") {
            elem_warn.innerHTML = 'Error: Empty password';
        } else if (str_veri_pw === "") {
            elem_warn.innerHTML = 'Error: Cannot verify password';
        }

    } else {
        elem_warn.style.display = 'none';

        fetch('/login/reset-password/send-new-password/', {
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
                    console.log('Error:' + msg);
                } else {
                    window.location.href = '/login/reset-password/password-updated/?email=' + encodeURIComponent(btoa(str_email));
                }
            })
    }
};


function sign_in() {
    let elem_email = document.getElementById('email');
    let elem_pw = document.getElementById('password');
    let elem_warn = document.getElementById('warn');
    let str_email = elem_email.value;
    let str_pw = elem_pw.value;
    elem_warn.innerHTML = "";

    if (str_email === "" | str_pw === "") {
        elem_warn.style.display = 'block';
        if (str_email === "") {
            elem_warn.innerHTML = 'Error: Empty email';
        } else if (str_pw === "") {
            elem_warn.innerHTML = 'Error: Empty password';
        }
    } else {
        elem_warn.style.display = 'none';

        fetch('/login/verify/', {
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
                    console.log('Error:' + msg);
                } else if (status_cd === 300) {
                    elem_warn.style.display = 'block';
                    elem_warn.innerHTML = 'Error: Email or password does not match';
                } else if (status_cd === 301) {
                    elem_warn.style.display = 'block';
                    elem_warn.innerHTML = 'Error: Email is not verified';
                } else {
                    window.location.href = '/main/?email=' + encodeURIComponent(btoa(str_email)) + '&password=' + encodeURIComponent(btoa(str_pw));
                }
            })
    }
}