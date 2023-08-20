from flask import Blueprint, render_template

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
