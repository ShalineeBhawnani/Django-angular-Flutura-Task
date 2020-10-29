from django.db import models
from django.shortcuts import reverse
from django.conf import settings
from django.contrib.auth.models import User
# category model
class Category(models.Model):
    name = models.CharField(max_length=150,db_index=True)
    slug = models.SlugField(max_length=150, unique=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    class Meta:
        ordering = ('name',)
        verbose_name = 'category'
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name
    
     
class Subcategory(models.Model):
    category = models.ForeignKey(Category,
                                 related_name='subcategory',on_delete=models.CASCADE)
    name = models.CharField(max_length=200,
                            db_index=True)
    slug = models.SlugField(max_length=200,
                            db_index=True)

    def __str__(self):
        return self.name

# product model
class Product(models.Model):
    category = models.ForeignKey(Subcategory,related_name='products',on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    slug = models.SlugField(max_length=150, unique=True,db_index=True)
    price = models.DecimalField(max_digits=100, decimal_places=2)
    available = models.BooleanField(default=True)
    description = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    picture = models.ImageField(blank=True, null=True)


    # class Meta:
    #     ordering = ('name',)
    #     index_together = (('id', 'slug'),)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("product:product", kwargs={
            "pk" : self.pk
        
        })

    def get_add_to_cart_url(self) :
        return reverse("product:add-to-cart", kwargs={
            "pk" : self.pk
        })



class OrderItem(models.Model):
    user = models.ForeignKey(User,on_delete = models.CASCADE)
    product = models.ForeignKey(Product,related_name='products',on_delete = models.CASCADE)
    # price = models.DecimalField(max_digits=100, decimal_places=2)
    ordered = models.BooleanField(default=False)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return '{}'.format(self.product)

    def __str__(self):
        return f"{self.quantity} of {self.product.name}"

class Order(models.Model) :
    user = models.ForeignKey(User,on_delete = models.CASCADE)
    products = models.ManyToManyField(OrderItem)
    ordered = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username
        
        
        
        