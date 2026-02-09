from .base import *  # noqa: F403,F401

DEBUG = os.getenv("DJANGO_DEBUG", "True").lower() == "true"  # noqa: F405