from django.db import models
from django.utils import timezone
# from django.utils.translation import gettext as _

# Create your models here.
class Table(models.Model):
    title = models.CharField(max_length=100, default="", unique=True)
    description = models.TextField(max_length=300,)
    result = models.TextField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True) 
    un_17 = models.TextField(max_length=100)
    
    
class Results(models.Model):
    country = models.CharField(("Country"), max_length=40)
    currency = models.CharField(("Currency"), max_length=50)
    currency_abbreviation = models.CharField(("Currency_abbreviation"), max_length=10)
    ppp_log = models.DecimalField(("PPP_log"), decimal_places=15, max_digits=18)
    forex_score = models.DecimalField(("Forex_score"), decimal_places=15, max_digits=18)
    final_score = models.DecimalField(("Final_score"), decimal_places=15, max_digits=18) 
    createdAt = models.DateTimeField(auto_now_add=True)