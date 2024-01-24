# Generated by Django 5.0 on 2024-01-24 19:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0006_alter_cart_m_total'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order_details',
            name='Subtotal',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='order_m',
            name='Total',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
    ]
