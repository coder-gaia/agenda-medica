import logging
import os

from flask import Flask
from flask_cors import CORS

from app.config import Config
from app.database.database import db


def create_app():

    app = Flask(__name__)

    app.config.from_object(Config)

    CORS(app)

    db.init_app(app)

    configure_logging()

    with app.app_context():
        db.create_all()

    @app.get("/health")
    def health():
        return {
            "status": "ok"
        }

    return app


def configure_logging():

    os.makedirs("app/logs", exist_ok=True)

    logging.basicConfig(
        filename="app/logs/app.log",
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(message)s"
    )