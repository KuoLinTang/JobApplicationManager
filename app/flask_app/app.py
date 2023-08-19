from flask import Flask, render_template

app = Flask(
    import_name='__name__', 
    static_folder='static', 
    template_folder='template'
    )

@app.route('/')
@app.route('/login/')
def sign_in():
    return render_template('login.html')

@app.route('/signup/')
def sign_up():
    return render_template('signup.html')

@app.route('/reset-password/')
def reset_password():
    return render_template('reset-password.html')

if __name__=="__main__":
    app.run(
        host='0.0.0.0', 
        port=80,
        debug=True
        )