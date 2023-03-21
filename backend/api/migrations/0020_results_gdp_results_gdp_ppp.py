# Generated by Django 4.0.3 on 2023-03-18 02:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_alter_percentile_percentile'),
    ]

    operations = [
        migrations.AddField(
            model_name='results',
            name='gdp',
            field=models.DecimalField(decimal_places=20, default=0, max_digits=30, verbose_name='GDP_per_capita'),
        ),
        migrations.AddField(
            model_name='results',
            name='gdp_ppp',
            field=models.DecimalField(decimal_places=20, default=0, max_digits=30, verbose_name='GDP_per_capita_PPP'),
        ),
    ]