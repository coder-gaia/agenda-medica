from flask import Blueprint

from app.services.appointment_service import AppointmentService
from app.utils.responses import error, success


appointments_bp = Blueprint(
    "appointments",
    __name__,
)


@appointments_bp.get("/appointments")
def get_appointments():

    try:

        appointments = AppointmentService.get_all()

        return success(
            appointments,
            "Agendamentos encontrados."
        )

    except Exception:

        return error(
            "Erro ao buscar agendamentos.",
            500
        )