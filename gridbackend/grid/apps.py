# grid/apps.py
from django.apps import AppConfig

class GridConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "grid"

    def ready(self):
        from . import signals
