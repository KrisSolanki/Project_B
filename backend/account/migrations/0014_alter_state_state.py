# Generated by Django 5.0 on 2024-01-11 20:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0013_city_roles_state_status_user_gender_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='state',
            name='State',
            field=models.CharField(max_length=30, null=True),
        ),
    ]
