# Generated by Django 4.0.3 on 2023-03-09 08:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_country_need_help_in_country_religion'),
    ]

    operations = [
        migrations.AddField(
            model_name='country',
            name='currency',
            field=models.CharField(default='', max_length=20, verbose_name='Currency'),
        ),
    ]
