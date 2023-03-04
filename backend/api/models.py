from django.db import models
from django.utils import timezone

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
        

class Platforms(models.Model):
    GOALS_CHOICES = (
        ('1) No Poverty', 'https://sdgs.un.org/goals/goal1'), 
        ('2) Zero Hunger', 'https://sdgs.un.org/goals/goal2'),
        ('3) Good Health and Well-Being', 'https://sdgs.un.org/goals/goal3'), 
        ('4) Quality Education', 'https://sdgs.un.org/goals/goal4'),
        ('5) Gender Equality', 'https://sdgs.un.org/goals/goal5'), 
        ('6) Clean Water and Sanitation', 'https://sdgs.un.org/goals/goal6'),
        ('7) Affordable and Clean Energy', 'https://sdgs.un.org/goals/goal7'), 
        ('8) Decent Work and Economic Growth', 'https://sdgs.un.org/goals/goal8'),
        ('9) Industry, Innovation and Infrastructure', 'https://sdgs.un.org/goals/goal9'),
        ('10) Reduced Inequalities', 'https://sdgs.un.org/goals/goal10'),
        ('11) Sustainable Cities and Communities', 'https://sdgs.un.org/goals/goal11'), 
        ('12) Responsible Consumption and Production', 'https://sdgs.un.org/goals/goal12'),
        ('13) Climate Change', 'https://sdgs.un.org/goals/goal13'), 
        ('14) Life Below Water', 'https://sdgs.un.org/goals/goal14'),
        ('15) Life on Land', 'https://sdgs.un.org/goals/goal15'), 
        ('16) Peace, Justice and Strong Institutions', 'https://sdgs.un.org/goals/goal16'),
        ('17) Partnerships for the Goals', 'https://sdgs.un.org/goals/goal17'),
    )
    name = models.CharField(max_length=100)
    description = models.TextField()
    url = models.URLField()
    image = models.ImageField(upload_to='platforms')
    un_goals = models.CharField(max_length=100, choices=GOALS_CHOICES)
    
    
class Country(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='countries')
    platforms = models.ManyToManyField(Platforms)