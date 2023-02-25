from django.db import models
from random import choices
from django.utils import timezone

# Create your models here.

# class Listings(models.Model):
#     title = models.CharField(max_length=100)
#     description = models.TextField(null=True, blank=True)
#     area_options = (
#         ('Turkiye', 'Turkiye'),
#         ('Greece', 'Greece'),
#         ('Chile', 'Chile'),
#     )
#     area = models.CharField(max_length=50, choices = area_options, blank=True, null=True)
#     link = models.CharField(max_length=200, null=True, blank=True)
#     type_options = (
#         ('Animal Awareness', 'Animal Awareness'),
#         ('Food poverty', 'Food poverty'),
#         ('Digital Divide', 'Digital Divide'),
#         ('Natural Disaster', 'Natural Disaster'),
#         ('Health', 'Health'),
#     )
#     listing_type = models.CharField(max_length=100, choices = type_options, blank=True, null=True)
#     currency = models.DecimalsField(max_length=50, decimal_places=0)
#     date_posted = models.DateTimeField(default=timezone.now)
    
    