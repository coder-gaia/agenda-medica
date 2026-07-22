from flask import Blueprint, request

from app.services.auth_service import AuthService
from app.utils.responses import error, success

from app.exceptions.database_exceptions import DatabaseConnectionError

auth_bp = Blueprint("auth", __name__)

@auth_bp.post("/login")
def login():

    body = request.get_json()

    if not body:
        return error("Corpo da requisição inválido.")

    login = body.get("login")
    password = body.get("password")

    if not login or not password:
        return error("Login e senha são obrigatórios.")

    try:
        user = AuthService.login(login, password)

    except DatabaseConnectionError:
        return error(
        "Não foi possível acessar o banco de dados.",
        500
    )

    if not user:
        return error(
            "Usuário ou senha inválidos.",
        401
    )

    return success(
        {
            "id": user.id,
            "name": user.name,
            "email": user.email
        },
        "Login realizado com sucesso."
    )