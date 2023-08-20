from flask import Blueprint, render_template, request
from src.db_connection.connect import get_connection

login_page = Blueprint(
    'login',
    __name__,
    template_folder='templates',
    static_folder='static'
)


@login_page.route('/')
@login_page.route('/login/')
def sign_in():
    return render_template('login.html')


@login_page.route('/signup/')
def sign_up():
    return render_template('signup.html')


@login_page.route('/reset-password/')
def reset_password():
    return render_template('reset-password.html')


@login_page.route('/create-account/', methods=['POST'])
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


@login_page.route('/create-account/success/', methods=['GET'])
def create_account_success():
    return render_template('signup-success.html')
