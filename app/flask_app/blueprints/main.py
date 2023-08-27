from flask import Blueprint, render_template, request
from flask_mail import Message
from src.db_connection.connect import get_connection


blueprint_main = Blueprint(
    'main',  # blueprint name, can be used to specify static file path
    __name__,
    # we must go back to the main directory where app.py is located, using relative path
    template_folder='../templates/main',
    static_folder='../static'
)


@blueprint_main.route('/', methods=["GET"])
def main_page():
    return render_template('main-page.html')
