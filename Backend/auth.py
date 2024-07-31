from flask import request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from models import Users
from exts import db
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_restx import Namespace, Resource, fields
from sqlalchemy import or_
from PIL import Image
import os
import secrets

auth_ns = Namespace("auth", description="Namespace for authentication")

# Define your models here
signup_model = auth_ns.model('SignUp', {
    'userName': fields.String(required=True, description='User username'),
    'firstName': fields.String(required=True, description='User first name'),
    'lastName': fields.String(required=True, description='User last name'),
    'email': fields.String(required=True, description='User email'),
    'password': fields.String(required=True, description='User password'),
    'number': fields.Integer(required=True, description='User phone number'),
    'image_file': fields.String(description='User image file', default='default.jpg')
})

login_model = auth_ns.model('Login', {
    'email': fields.String(required=True, description='User email'),
    'password': fields.String(required=True, description='User password')
})

update_info_model = auth_ns.model('UpdateInfo', {
    'firstName': fields.String(required=False, description='User first name'),
    'lastName': fields.String(required=False, description='User last name'),
    'email': fields.String(required=False, description='User email'),
    'number': fields.Integer(required=False, description='User phone number'),
    'userName': fields.String(required=False, description='User username'),
    'image_file': fields.String(required=False, description='User image file')
})

change_password_model = auth_ns.model('ChangePassword', {
    'currentPassword': fields.String(required=True, description='Current password'),
    'newPassword': fields.String(required=True, description='New password')
})

login_manager = LoginManager()

@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(int(user_id))

@auth_ns.route('/login')
class LoginResource(Resource):
    @auth_ns.expect(login_model)
    def post(self):
        data = request.get_json()
        user = Users.query.filter_by(email=data['email']).first()
        if user and check_password_hash(user.password, data['password']):
            login_user(user)
            return {"message": "Login successful", "status": 200}, 200
        return {"message": "Invalid credentials", "status": 401}, 401

@auth_ns.route('/signup')
class SignupResource(Resource):
    @auth_ns.expect(signup_model)
    def post(self):
        data = request.get_json()
        user = Users.query.filter(or_(Users.email == data['email'], Users.userName == data['userName'])).first()
        if user:
            return {"message": "User already exists", "status": 400}, 400

        hashed_password = generate_password_hash(data['password'])
        new_user = Users(
            userName=data['userName'],
            firstName=data['firstName'],
            lastName=data['lastName'],
            email=data['email'],
            password=hashed_password,
            number=data['number'],
            image_file=data.get('image_file', 'default.jpg')
        )
        db.session.add(new_user)
        db.session.commit()
        return {"message": "User created successfully", "status": 201}, 201

@auth_ns.route('/logout')
class LogoutResource(Resource):
    @login_required
    def get(self):
        logout_user()
        return {"message": "Logged out successfully", "status": 200}, 200

@auth_ns.route('/check')
class LoginCheck(Resource):
    @login_required
    def get(self):
        if current_user.is_authenticated:
            return {
                "id": current_user.id,
                "userName": current_user.userName,
                "email": current_user.email,
                "number": current_user.number,
                "image_file": f"/static/profile_pics/{current_user.image_file}",
                "firstName": current_user.firstName,
                "lastName": current_user.lastName,
            }
        else:
            return {"message": "Not logged in", "status": 401}, 401

def save_picture(form_picture):
    random_hex = secrets.token_hex(8)
    _, ext = os.path.splitext(form_picture.filename)
    profile_fn = random_hex + ext
    output_size = (500, 500)
    i = Image.open(form_picture)
    i.thumbnail(output_size)
    file_path = os.path.join(current_app.root_path, "static/profile_pics", profile_fn)
    i.save(file_path)
    return profile_fn

@auth_ns.route('/update-info')
class UpdateInfoResource(Resource):
    @auth_ns.expect(update_info_model)
    @login_required
    def put(self):
        # Handle general information update
        data = request.form
        image_file = request.files.get('image_file')

        if 'firstName' in data:
            current_user.firstName = data['firstName']
        if 'lastName' in data:
            current_user.lastName = data['lastName']
        if 'email' in data:
            current_user.email = data['email']
        if 'number' in data:
            current_user.number = data['number']
        if 'userName' in data:
            current_user.userName = data['userName']

        if image_file:
            img_filename = save_picture(image_file)
            current_user.image_file = img_filename
        
        db.session.commit()
        return {"message": "User information and/or image updated successfully", "status": 200}, 200

@auth_ns.route('/change-password')
class ChangePasswordResource(Resource):
    @auth_ns.expect(change_password_model)
    @login_required
    def put(self):
        data = request.get_json()
        user = current_user

        if not check_password_hash(user.password, data['currentPassword']):
            return {"message": "Current password is incorrect", "status": 400}, 400

        user.password = generate_password_hash(data['newPassword'])
        db.session.commit()
        return {"message": "Password changed successfully", "status": 200}, 200
