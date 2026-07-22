import logging
import os

from app.config import Config


def setup_logger():

    os.makedirs(
        "app/logs",
        exist_ok=True
    )

    logging.basicConfig(
        level=Config.LOG_LEVEL,
        format=(
            "%(asctime)s "
            "%(levelname)s "
            "%(name)s "
            "%(message)s"
        ),
        handlers=[
            logging.FileHandler(
                "app/logs/app.log"
            ),
            logging.StreamHandler()
        ]
    )