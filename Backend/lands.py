from flask_restx import Namespace, Resource, fields
from models import Lands
from flask_login import login_required, current_user
from flask import request, current_app
from uuid import uuid4
from PIL import Image
from models import Users
import os
import secrets

lands_ns = Namespace("plot", description="A namespace for lands")

lands_model = lands_ns.model('Lands', {
    'id': fields.Integer(readOnly=True, description='The unique identifier of a land record'),
    'upi': fields.Integer(required=True, description='The UPI of the land'),
    'size': fields.Integer(required=True, description='The size of the land'),
    'location': fields.String(required=True, description='The location of the land'),
    'price': fields.Integer(required=True, description='The price of the land'),
    'info': fields.String(required=True, description='Additional information about the land'),
    'img': fields.String(required=True, description='Image of the land', default='default.jpg'),
    'user_id': fields.Integer(readOnly=True, description='The ID of the user who owns the land')
})

def save_picture(form_picture):
    random_hex = secrets.token_hex(8)
    _, ext = os.path.splitext(form_picture.filename)
    profile_fn = random_hex + ext
    output_size = (500, 500)
    i = Image.open(form_picture)
    i.thumbnail(output_size)
    file_path = os.path.join(current_app.root_path, "static/lands_pics", profile_fn)
    i.save(file_path)
    return profile_fn

@lands_ns.route("/lands")
class LandsResource(Resource):
    @lands_ns.marshal_list_with(lands_model)
    def get(self):
        lands = Lands.query.all()
        
        for land in lands:
            land.img = f"/static/lands_pics/{land.img}"
        return lands, 200

    @lands_ns.expect(lands_model)
    @lands_ns.marshal_with(lands_model, code=201)
    @login_required
    def post(self):
        data = request.form
        file = request.files.get('img')
        img_filename = 'default.jpg'
        if file:
            img_filename = save_picture(file)
        
        new_land = Lands(
            id=uuid4().int & (1<<63)-1,
            location=data.get("location"),
            size=data.get("size"),
            price=data.get("price"),
            info=data.get("info"),
            upi=data.get("upi"),
            img=img_filename,
            user_id=current_user.id
        )
        new_land.save()
        return new_land, 201

@lands_ns.route("/lands/me")
class UserLandsResource(Resource):
    @lands_ns.marshal_list_with(lands_model)
    @login_required
    def get(self):
        lands = Lands.query.filter_by(user_id=current_user.id).all()
        # Construct the URL for each land's image
        for land in lands:
            land.img = f"/static/lands_pics/{land.img}"
        return lands, 200

@lands_ns.route("/land/<int:id>")
class LandResource(Resource):
    @lands_ns.marshal_with(lands_model)
    @login_required
    def get(self, id):
        land = Lands.query.get_or_404(id)
        land.img = f"/static/lands_pics/{land.img}"
        return land, 200

    @login_required
    def delete(self, id):
        land = Lands.query.get_or_404(id)
        if land.user_id != current_user.id:
            return {'message': 'You do not have permission to delete this land'}, 403
        land.delete()
        return {'message': 'Land record deleted'}, 204

@lands_ns.route("/land/owner/<int:id>")
class LandResource(Resource):
    def get(self, id):
        user = Users.query.get(id)  
        if user is None:
            return {"message": "User not found"}, 404 
        return {
            "id": user.id,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email": user.email,
            "number": user.number,
            "userName": user.userName,
            "image_file":f'/static/profile_pics/{user.image_file}'
        }
