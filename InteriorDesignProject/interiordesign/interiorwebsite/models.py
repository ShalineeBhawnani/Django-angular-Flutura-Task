from django.db import models

#contect model for Customer queries
class ContectDetails(models.Model):
    name = models.CharField(max_length=60)

#contect model for address & contect number,contect number may be same for all service provider
class Contect(models.Model):
    user_id = models.ForeignKey(ContectDetails,on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15) 
    address = models.CharField(max_length=200)

#property type model
class PropertyTypes(models.Model):
    name = models.CharField(max_length=150,db_index=True)
    def __str__(self):
        return self.name
        
# customer detail with property type
class Cutomer(models.Model):
    name = models.CharField(max_length=60, blank=True)
    phone_number = models.CharField(max_length=10, unique=True) 
    email = models.EmailField(max_length = 100)
    property = models.ForeignKey(PropertyTypes,on_delete=models.CASCADE)
    service = models.CharField(max_length=60, blank=True)
    message = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.name

# passenger movement count 
from .table_creation import DateTimeWithoutTZField as DateTimeField
class passenger_movement(models.Model):
    
    Date = DateTimeField(primary_key = True)
    ArrivalsActualCounts = models.IntegerField() 
    DeparturesActualCounts = models.IntegerField() 

