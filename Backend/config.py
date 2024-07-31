from decouple import config
import os

BASE_DIR = os.path.dirname(os.path.realpath(__file__))
print(f"BASE_DIR: {BASE_DIR}")

class Config:
    SECRET_KEY = config("SECRET_KEY")
    SQLALCHEMY_TRACK_MODIFICATIONS = config('SQLALCHEMY_TRACK_MODIFICATIONS', cast=bool, default=False)

class DevConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(BASE_DIR, 'dev.db')
    SQLALCHEMY_ECHO = config('SQLALCHEMY_ECHO', cast=bool, default=True)

class ProdConfig(Config):
    SQLALCHEMY_DATABASE_URI = config("DATABASE_URL", default="sqlite:///" + os.path.join(BASE_DIR, 'prod.db'))
