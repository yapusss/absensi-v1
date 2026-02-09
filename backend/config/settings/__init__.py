import os

env_name = os.getenv("DJANGO_ENV", "local").lower()

if env_name == "production":
    from .production import *  # noqa: F403,F401
else:
    from .local import *  # noqa: F403,F401