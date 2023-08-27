from flask import Flask, render_template
from flask_mail import Mail
from blueprints.login import blueprint_login
from blueprints.main import blueprint_main
from src.secret_config.secret_config import MailSecrets

app = Flask(
    import_name='__name__',
    static_folder=None,
    template_folder=None
)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = MailSecrets.MAIL_USERNAME
app.config['MAIL_DEFAULT_SENDER'] = MailSecrets.MAIL_ADDRESS
app.config['MAIL_PASSWORD'] = MailSecrets.MAIL_PASSWORD
mail = Mail(app)

# All related urls will have this prefix
app.register_blueprint(blueprint_login, url_prefix='/login')
app.register_blueprint(blueprint_main, url_prefix='/main')


if __name__ == "__main__":
    app.run(
        host='0.0.0.0',
        port=80,
        debug=True
    )
