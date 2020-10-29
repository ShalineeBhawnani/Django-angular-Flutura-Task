from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=150,db_index=True)
    def __str__(self):
        return self.name


class Product(models.Model):
   
    name = models.CharField(max_length=150)
    description = models.TextField(null=True)
    image = models.ImageField(blank=True, null=True)
    color = models.CharField(max_length=16, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category,on_delete=models.CASCADE)


    def __str__(self):
        return self.name