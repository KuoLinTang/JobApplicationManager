from flask import Blueprint, render_template

account_page = Blueprint(
    'account', 
    __name__, 
    template_folder='templates', 
    static_folder='static'
    )


@account_page.route('/create-account/')
def create_account():
    return render_template('signup.html')