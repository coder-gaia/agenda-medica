import logging

import requests
from requests.exceptions import ConnectionError, HTTPError, Timeout

from app.config import Config
from app.exceptions.appointment_exceptions import (
    AppointmentApiInvalidResponseError,
    AppointmentApiUnavailableError,
)


logger = logging.getLogger(__name__)


class AppointmentService:

    REQUIRED_FIELDS = {
        "paciente",
        "cpf",
        "medico",
        "especialidade",
        "data",
        "horario",
        "convenio",
        "status",
    }

    @classmethod
    def get_all(cls, search=None):

        appointments = cls._fetch_appointments()

        cls._validate_response(
            appointments
        )

        if search:
            appointments = cls._filter(
                appointments,
                search
            )

        return appointments

    @staticmethod
    def _fetch_appointments():

        try:

            response = requests.get(
                f"{Config.MOCK_API_URL}/appointments",
                timeout=5,
            )

            response.raise_for_status()

            return response.json()

        except (
            ConnectionError,
            Timeout,
            HTTPError,
        ) as error:

            logger.exception(
                "Erro ao consultar API de agendamentos."
            )

            raise AppointmentApiUnavailableError() from error

    @classmethod
    def _validate_response(
        cls,
        appointments
    ):

        if not isinstance(
            appointments,
            list
        ):
            logger.error(
                "Resposta da API não é uma lista."
            )

            raise AppointmentApiInvalidResponseError()

        for appointment in appointments:

            missing = (
                cls.REQUIRED_FIELDS
                -
                appointment.keys()
            )

            if missing:

                logger.error(
                    f"Campos ausentes: {missing}"
                )

                raise AppointmentApiInvalidResponseError()

    @staticmethod
    def _filter(
        appointments,
        search
    ):

        term = search.lower()

        return [
            appointment
            for appointment in appointments
            if (
                term in appointment["paciente"].lower()
                or term in appointment["cpf"]
                or term in appointment["medico"].lower()
            )
        ]