from flask import Flask, render_template
from login import login_page

app = Flask(
    import_name='__name__',
    static_folder=None,
    template_folder=None
)

app.register_blueprint(login_page)


if __name__ == "__main__":
    app.run(
        host='0.0.0.0',
        port=80,
        debug=True
    )
