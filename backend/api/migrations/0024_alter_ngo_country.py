# Generated by Django 4.0.3 on 2023-03-24 11:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0023_countryname_ngo_project'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ngo',
            name='country',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ngos', to='api.countryname'),
        ),
    ]
