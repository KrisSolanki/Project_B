# Generated by Django 5.0 on 2024-01-02 17:41

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_alter_user_email_alter_user_password'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.CharField(default=datetime.datetime(2024, 1, 2, 17, 41, 30, 512221, tzinfo=datetime.timezone.utc), max_length=50, unique=True),
            preserve_default=False,
        ),
    ]
