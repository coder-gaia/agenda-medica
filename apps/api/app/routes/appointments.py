from flask import Blueprint, request

from app.exceptions.appointment_exceptions import (
    AppointmentApiInvalidResponseError,
    AppointmentApiUnavailableError,
)

from app.services.appointment_service import AppointmentService
from app.utils.responses import error, success

import logging

appointments_bp = Blueprint(
    "appointments",
    __name__,
)

@appointments_bp.get("/appointments")
def get_appointments():

    search = request.args.get(
        "search"
    )

    try:

        appointments = AppointmentService.get_all(
            search
        )

        if not appointments:

            return success(
                [],
                "Nenhum agendamento encontrado."
            )

        return success(
            appointments,
            "Agendamentos encontrados."
        )


    except AppointmentApiUnavailableError:

        return error(
            "Agendamentos temporariamente fora do ar.",
            503,
        )


    except AppointmentApiInvalidResponseError:

        return error(
            "Resposta inválida do servico de agendamentos.",
            502,
        )


    except Exception as exc:

        logging.exception(
        f"Erro inesperado: {exc}"
    )

    return error(
        "Erro interno do servidor.",
        500
    )