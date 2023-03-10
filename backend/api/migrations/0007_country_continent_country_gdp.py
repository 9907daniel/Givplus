# Generated by Django 4.0.3 on 2023-03-09 06:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_country_location_lat_country_location_lng'),
    ]

    operations = [
        migrations.AddField(
            model_name='country',
            name='continent',
            field=models.CharField(default='', max_length=200, verbose_name='Continent'),
        ),
        migrations.AddField(
            model_name='country',
            name='gdp',
            field=models.IntegerField(default=0, verbose_name='GDP'),
        ),
    ]
