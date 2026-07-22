from flask import Blueprint, request

from app.services.auth_service import AuthService
from app.utils.responses import error, success

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

    user = AuthService.login(login, password)

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