from flask import Flask
from flask_cors import CORS

from app.config import Config
from app.database.database import db

from app.routes.auth import auth_bp

from app.routes import register_routes

from app.utils.logger import setup_logger

def create_app():

    app = Flask(__name__)
    
    setup_logger()

    app.config.from_object(Config)

    CORS(app)

    db.init_app(app)
    
    register_routes(app)

    with app.app_context():
        db.create_all()

    @app.get("/health")
    def health():
        return {
            "status": "ok"
        }

    return app


