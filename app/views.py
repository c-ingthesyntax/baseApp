"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
 """
from app import app, Config
from flask import render_template, request, redirect, url_for, flash,  session,  send_from_directory,  abort, jsonify 
from werkzeug.utils import secure_filename 
from werkzeug.security import check_password_hash
from os import getcwd
from os.path import join 
from .function import DB, Mqtt
 
# Add instance of Database class below


###
# Routing for your application.
###

@app.route('/data', methods=["GET"])
def data():
    """ Return data """
    if request.method == "GET":
        # Process GET requests
        VARIABLE = request.args.get("variable")
        START = int(request.args.get("start"))
        END = int(request.args.get("end"))
        data = mongo.plotStaticGraph(VARIABLE,START, END)
        return jsonify(data) 
    return render_template('404.html'), 404


# @app.route('/')
# def home():
#     """Render website's home page."""
#     return render_template('home.html')


# # Add other routes below
# @app.route('/<file_name>.txt')
# def send_text_file(file_name):
#     """Send your static text file."""
#     file_dot_text = file_name + '.txt'
#     return app.send_static_file(file_dot_text)


# @app.after_request
# def add_header(response):
#     """
#     Add headers to both force latest IE rendering engine or Chrome Frame,
#     and also tell the browser not to cache the rendered page. If we wanted
#     to we could change max-age to 600 seconds which would be 10 minutes.
#     """
#     response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
#     response.headers['Cache-Control'] = 'public, max-age=0'
#     return response


# @app.errorhandler(404)
# def page_not_found(error):
#     """Custom 404 page."""
#     return render_template('404.html'), 404

# @app.route('/about')
# def about():
#     """Render website's About page."""
#     return render_template('about.html', name="my Home Automation System")

# @app.route('/calculation')
# def calculation():
#     """Render website's Calculation page."""
#     return render_template('calculation.html', name="Calculation page")

# @app.route('/dashboard')
# def dashboard():
#     """Render website's Dashboard page."""
#     return render_template('dashboard.html', name="Dashboard page")

# @app.route('/text', methods=["GET","POST"])
# def text():
#     """Returns text"""
#     if request.method == "GET":
#         # Process GET requests
#         return "Hello World!."
#     if request.method == "POST":
#         # Process POST requests
#         return "Hello World!."
#     return render_template('404.html'), 404

# @app.route('/json', methods=["GET","POST"])
# def json_object():
#     """Returns Json object"""
#     if request.method == "GET":
#         # Process GET requests
#         message = {"status":"GET request received"}
#         return jsonify(message)
#     if request.method == "POST":
#         # Process POST requests
#         message = {"status":"POST request received"}
#         return jsonify(message) 
#     return render_template('404.html'), 404

# @app.route('/file/<name>', methods=["GET"])
# def file_stored(name):
#     """Returns a file"""
#     if request.method == "GET":
#         # Process GET requests
#         path = join( getcwd(),Config.SYSFILES) 
#         return send_from_directory( path, name)
#     return render_template('404.html'), 404

# @app.route('/sum/<firstnumber>/<secondnumber>', methods=["GET"])
# def sumTwoNumbers(firstnumber, secondnumber):
#     """Return the Sum of two numbers"""
#     if request.method == "GET":
#         # Process GET requests 
#         summedNumbers = int(firstnumber) + int(secondnumber)
#         return f"The sum of {firstnumber} and {secondnumber} is {summedNumbers}"
#     return render_template('404.html'), 404

# @app.route('/sum', methods=["GET"])
# def sum2Numbers():
#     """Return the Sum of two numbers"""
#     if request.method == "GET":
#         # Process GET requests
#         num1 = request.args.get("number1")
#         num2 = request.args.get("number2")
#         summedNumbers = int(num1) + int(num2)
#         return f"The sum of {num1} and {num2} is {summedNumbers}"
#     return render_template('404.html'), 404

# @app.route('/mul', methods=["POST"])
# def mul2Numbers():
#     """Return the Product of two numbers"""
#     if request.method == "POST":
#         # Process POST requests 
#         data = request.get_json()
#         num1 = data["number1"]
#         num2 = data["number2"]
#         mulNumbers = int(num1) * int(num2)
#         return f"The product of {num1} and {num2} is {mulNumbers}"
#     return render_template('404.html'), 404 

# @app.route('/conv', methods=["POST"])
# def convTemp():
#     """Return the Product of two numbers"""
#     if request.method == "POST":
#         # Process POST requests 
#         data = request.get_json()
#         Celctemp = data["number1"]
#         # Do Fahrenheit temp conversion
#         Fahrtemp = (int(Celctemp) * 9/5) + 32
#         # Fahrtemp = int(Fahrtemp) 
#         return f"{Celctemp}°C is {Fahrtemp}°F"
#     return render_template('404.html'), 404 
 

###
# The functions below should be applicable to all Flask apps.
###


# Flash errors from the form if validation fails
def flash_errors(form):
    for field, errors in form.errors.items():
        for error in errors:
            flash(u"Error in the %s field - %s" % (
                getattr(form, field).label.text,
                error
            ), 'danger')




if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="8080")