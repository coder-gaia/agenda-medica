from werkzeug.security import generate_password_hash

from app.app import create_app
from app.database.database import db
from app.models.user import User

app = create_app()

with app.app_context():

    db.create_all()

    user = User.query.filter_by(
        email="admin@email.com"
    ).first()

    if not user:

        user = User(
            name="Administrador",
            email="admin@email.com",
            password=generate_password_hash("123456")
        )

        db.session.add(user)

        db.session.commit()

        print("Usuário criado com sucesso!")

    else:

        print("Usuário já existe.")