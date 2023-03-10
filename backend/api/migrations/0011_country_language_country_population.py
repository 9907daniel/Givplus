# Generated by Django 4.0.3 on 2023-03-09 06:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_alter_country_gdp'),
    ]

    operations = [
        migrations.AddField(
            model_name='country',
            name='language',
            field=models.CharField(default='English', max_length=200, verbose_name='Language'),
        ),
        migrations.AddField(
            model_name='country',
            name='population',
            field=models.IntegerField(default=0, verbose_name='Population'),
        ),
    ]
