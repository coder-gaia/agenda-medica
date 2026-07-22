import os

from dotenv import load_dotenv

load_dotenv()


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")

    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    MOCK_API_URL = os.getenv("MOCK_API_URL")

    LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")