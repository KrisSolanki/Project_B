# Generated by Django 5.0 on 2024-03-05 10:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0010_alter_cart_m_offer_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart_m',
            name='Subtotal',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]
