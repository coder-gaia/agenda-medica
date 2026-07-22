import logging

import requests

from app.config import Config


class AppointmentService:

    REQUIRED_FIELDS = [
        "paciente",
        "cpf",
        "medico",
        "especialidade",
        "data",
        "horario",
        "convenio",
        "status",
    ]

    @classmethod
    def get_all(cls):

        appointments = cls._fetch_appointments()

        cls._validate_response(appointments)

        return appointments

    @staticmethod
    def _fetch_appointments():

        response = requests.get(
            f"{Config.MOCK_API_URL}/appointments",
            timeout=5,
        )

        response.raise_for_status()

        return response.json()

    @classmethod
    def _validate_response(cls, appointments):

        if not isinstance(appointments, list):
            logging.error(
                "Resposta da API de agendamentos não é uma lista."
            )

            raise ValueError(
                "Resposta inválida da API."
            )

        for appointment in appointments:

            missing_fields = [
                field
                for field in cls.REQUIRED_FIELDS
                if field not in appointment
            ]

            if missing_fields:
                logging.error(
                    f"Campos ausentes: {missing_fields}"
                )

                raise ValueError(
                    "Campos obrigatórios ausentes na resposta da API."
                )