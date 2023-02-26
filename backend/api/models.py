from django.db import models

# Create your models here.
class Table(models.Model):
    title = models.CharField(max_length=100, default="", unique=True)
    description = models.TextField(max_length=300,)
    result = models.TextField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True) 
    un_17 = models.TextField(max_length=100)