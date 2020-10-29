from django.shortcuts import render
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework import status
from rest_framework.status import (HTTP_200_OK,HTTP_201_CREATED,HTTP_400_BAD_REQUEST,HTTP_404_NOT_FOUND)
from .models import Product,Category
from rest_framework.generics import GenericAPIView
from .serializer import ProductSerializer
import datetime
# Create your views here.
class GetCategoryList(GenericAPIView):

    category = Category.objects.all()
    
    def get(self, request):
        
        try:
            """
                This view should fetch all categories from database.
            """
            category_list = self.category.filter()
            context_dict = {'category_list': category_list} 
            return Response(category_list.values(),status=status.HTTP_200_OK)
        except Exception:
            return Response(Exception, status=status.HTTP_403_FORBIDDEN)
 
class GetSetProduct(GenericAPIView):

    def get(self, request,id=None):
        startDate= request.query_params.get("start")
        endDate = request.query_params.get("end")
        try:
            """
                This view should fetch product from database.
            """
            if id:
                if startDate == "1970-01-01T00:00:00.000Z":
                    productList = Product.objects.all().filter(category=Category.objects.get(id=id)) 
                else:
                    productList = Product.objects.all().filter(category=Category.objects.get(id=id),
                    created_at__gte=startDate, created_at__lte=endDate)  
                    # productList = productList.filter(created_at__gte=startDate, created_at__lte=endDate)
            else:
                productList = Product.objects.all().order_by('-id')[:5] 
            return Response(productList.values(), status=status.HTTP_200_OK)
        except Exception:
            return Response(Exception, status=status.HTTP_403_FORBIDDEN)
      
    def post(self, request):
        product_serializer = ProductSerializer(data=request.data)

        try:
            """
                This view should save a product in database.
            """
            if product_serializer.is_valid():
                product_serializer.save()
                return Response(product_serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(product_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(Exception, status=status.HTTP_403_FORBIDDEN)


