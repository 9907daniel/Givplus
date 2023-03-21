# Generated by Django 4.0.3 on 2023-03-11 15:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_alter_country_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='results',
            name='percentile',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=5, verbose_name='Percentile'),
        ),
    ]