from flask import Flask
from config import DevConfig, ProdConfig
from exts import db
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_restx import Api
from flask_cors import CORS
from auth import auth_ns, login_manager, load_user  # import load_use
from models import Lands, Users
from lands import lands_ns


def create_app(config_class=DevConfig):
    app = Flask(__name__)
    app.config.from_object(config_class)
    db.init_app(app)
    CORS(app)
    login_manager.init_app(app)
    migrate = Migrate(app, db)
    
    api = Api(app, title="LandQuest API", version="1.0", description="API for LandQuest Application")
    api.add_namespace(lands_ns, path='/api/plot')
    api.add_namespace(auth_ns, path='/api/auth')

    return app

app = create_app()

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'Users': Users, 'Lands': Lands, 'app': app}

