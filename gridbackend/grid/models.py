from django.db import models
from pgvector.django import VectorField

class gridmodels(models.Model):
    inputValue = models.CharField(max_length=200,blank=True,null=True)
    derivedOption = models.CharField(max_length=200,blank=True,null=True)
    category = models.CharField(max_length=200,blank=True,null=True)

    embedding = VectorField(null=True, blank=True)

    def __str__(self):
        return f"{self.inputValue} - {self.derivedoption} - {self.category}"
    
"""class userModels(models.Model):
    username = models.CharField(max_length=100,blank=False,null=False)
    password = models.CharField(max_length=100,blank=False,null=False)

    def __str__(self):
        return f"{self.username}" """

