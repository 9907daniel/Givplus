# Generated by Django 4.0.3 on 2023-03-27 18:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0031_alter_results_today_rate'),
    ]

    operations = [
        migrations.AddField(
            model_name='results',
            name='rank',
            field=models.IntegerField(default=0, verbose_name='id'),
            preserve_default=False,
        ),
    ]