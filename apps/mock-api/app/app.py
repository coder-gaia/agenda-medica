from flask import Flask, jsonify

from app.data import appointments


def create_app():
    app = Flask(__name__)

    @app.get("/health")
    def health():
        return {"status": "ok"}

    @app.get("/appointments")
    def appointments_route():
        return jsonify(appointments)

    return app