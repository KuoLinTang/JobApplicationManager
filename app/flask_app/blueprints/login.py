from flask import Blueprint, render_template, request
from flask_mail import Message
from src.db_connection.connect import get_connection


blueprint_login = Blueprint(
    'login',  # blueprint name, can be used to specify static file path
    __name__,
    # we must go back to the main directory where app.py is located, using relative path
    template_folder='../templates',
    static_folder='../static'
)


@blueprint_login.route('/')
def sign_in():
    return render_template('login.html')


@blueprint_login.route('/signup/')
def sign_up():
    return render_template('signup.html')


@blueprint_login.route('/reset-password/')
def reset_password():
    return render_template('reset-pw-request.html')


@blueprint_login.route('/reset-password-requested/', methods=['POST'])
def request_reset_password():
    data = request.json
    email = data['email']

    # TO DO: first check if the email is registered before sending an email. If not registered,

    from app import mail
    msg = Message("Reset Password",
                  recipients=[email])

    # provide a button to verify email (link to /verify-email/ with prefix "login")
    msg.html = f"""
        <h3>You are resetting your password!</h3>
        <section>
            We are resetting password for email: <span style='font-weight:bold;'>{email}</span>. <br>
            Please use the button below to reset your password.
        </section>
        <form action='127.0.0.1/login/verify-email/{email}' style='margin-top:10px;'>
            <button type="submit">Reset Password</button>
        </form>
        <p>If this is not you, please ignore this email</p>
    """

    try:
        mail.send(msg)
        return {'message': 'Success', 'status_code': 200}

    except Exception as e:
        return {'message': str(e), 'status_code': 400}


@blueprint_login.route('/reset-password-requested/success/', methods=['GET'])
def request_reset_password_success():
    email_address = request.args.get('email')
    return render_template('reset-pw-request-sent.html', email_address=email_address)


@blueprint_login.route('/create-account/', methods=['POST'])
def create_account():
    data = request.json
    email = data['email']
    password = data['password']

    conn = get_connection()
    cursor = conn.cursor()
    try:
        query_insert = f"INSERT INTO dim_users (u_email, u_password) VALUES (%s, %s)"
        data_insert = (email, password)
        cursor.execute(operation=query_insert, params=data_insert)
        conn.commit()
        return {'message': 'Success', 'status_code': 200}

    except Exception as e:
        return {'message': str(e), 'status_code': 400}


@blueprint_login.route('/create-account/success/', methods=['GET'])
def create_account_success():

    from app import mail
    email = request.args.get('email')
    msg = Message("Email Verification",
                  recipients=[email])

    # provide a button to verify email (link to /verify-email/ with prefix "login")
    msg.html = f"""
        <h3>Thank you for joining us!</h3>
        <section>
            Please verify your email: <span style='font-weight:bold;'>{email}</span> by clicking the button below 
            before having fun with us.
        </section>
        <form action='127.0.0.1/login/verify-email/{email}' style='margin-top:10px;'>
            <button type="submit">Verify My Email</button>
        </form>
    """
    mail.send(msg)

    return render_template('signup-success.html')


@blueprint_login.route('/verify-email/<email_address>', methods=['GET'])
def verify_email(email_address):
    print(email_address)

    conn = get_connection()
    cursor = conn.cursor()

    try:
        query_update = f"UPDATE dim_users SET is_verified = TRUE WHERE u_email = '{email_address}'"
        cursor.execute(operation=query_update)
        conn.commit()

        return render_template('verify-email.html', email_address=email_address)

    except Exception as e:
        print(f"Verification Error: {e}")
        return render_template('verify-email.html')
