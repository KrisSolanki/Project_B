# Generated by Django 5.0 on 2024-03-05 16:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0012_cart_details_unique_cart_item'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='cart_details',
            name='unique_cart_item',
        ),
    ]
