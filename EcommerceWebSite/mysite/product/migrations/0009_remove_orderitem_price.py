# Generated by Django 3.0.7 on 2020-07-30 03:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0008_orderitem_ordered'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderitem',
            name='price',
        ),
    ]
