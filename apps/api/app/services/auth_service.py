import logging

from werkzeug.security import check_password_hash

from app.models.user import User

logger = logging.getLogger(__name__)

class AuthService:
    
    @staticmethod
    def login(login: str, password: str):

        user = User.query.filter(
            (User.email == login) | (User.name == login)
        ).first()

        if not user:
            logger.warning("Tentativa de login com usuário inexistente.")
            return None

        if not check_password_hash(user.password, password):
            logger.warning(f"Senha inválida para {login}.")
            return None

        logger.info(f"Login realizado por {user.email}")

        return user