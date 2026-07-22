import logging

from werkzeug.security import check_password_hash

from app.models.user import User


class AuthService:

    @staticmethod
    def login(login: str, password: str):

        user = User.query.filter(
            (User.email == login) | (User.name == login)
        ).first()

        if not user:
            logging.warning("Tentativa de login com usuário inexistente.")
            return None

        if not check_password_hash(user.password, password):
            logging.warning(f"Senha inválida para {login}.")
            return None

        logging.info(f"Login realizado por {user.email}")

        return user