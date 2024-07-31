from exts import db
from flask_login import UserMixin

class Lands(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    upi = db.Column(db.Integer, nullable=False)
    size = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    info = db.Column(db.Text, nullable=False)
    img = db.Column(db.String(20), nullable=False, default='default.jpg')
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __repr__(self):
        return f"<Land> {self.id} {self.upi}"
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

class Users(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String(20), nullable=False, unique=True)
    firstName = db.Column(db.String(20), nullable=False)
    lastName = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    image_file = db.Column(db.String, nullable=False, default='default.jpg')
    number = db.Column(db.Integer, nullable=False)
    lands = db.relationship('Lands', backref='seller', lazy=True)
    
    def __repr__(self):
        return f"<User> {self.id} {self.email}"
        
    def save(self):
        db.session.add(self)
        db.session.commit()
