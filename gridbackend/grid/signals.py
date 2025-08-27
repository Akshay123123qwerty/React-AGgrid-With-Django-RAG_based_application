from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import gridmodels
from sentence_transformers import SentenceTransformer

_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

@receiver(post_save, sender=gridmodels)
def update_embedding(sender, instance, **kwargs):
    text = instance.category or ""
    vec = _model.encode([text])[0].tolist()
    gridmodels.objects.filter(pk=instance.pk).update(embedding=vec)
