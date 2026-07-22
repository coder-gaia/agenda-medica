from app.routes.auth import auth_bp

from app.routes.auth import auth_bp
from app.routes.appointments import appointments_bp

def register_routes(app):
    app.register_blueprint(auth_bp, url_prefix="/api")

def register_routes(app):

    app.register_blueprint(
        auth_bp,
        url_prefix="/api"
    )

    app.register_blueprint(
        appointments_bp,
        url_prefix="/api"
    )