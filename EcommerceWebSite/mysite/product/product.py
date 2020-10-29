from django.shortcuts import render
from rest_framework.response import Response
from django.http import HttpResponse
from django.contrib import messages
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny,DjangoModelPermissions
from rest_framework.status import (HTTP_200_OK,HTTP_201_CREATED,HTTP_400_BAD_REQUEST,HTTP_404_NOT_FOUND)
from django.views.decorators.csrf import csrf_exempt
from .models import Product,Category,OrderItem,Subcategory, Order
from product.serializers import ProductSerializer,CategorySerializer,OrderSerializer,SubcategorySerializer
from rest_framework import generics
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.models import User
# Create your views here.

@permission_classes((AllowAny,))
class CategoryView(generics.GenericAPIView):

    category = Category.objects.all()
    category = Category.objects.filter().order_by('name')
    print("new",category)
    subcategories = Subcategory.objects.all()
    def get(self, request, *args, **kwargs):
        category_list = self.category.filter()
        subcategories_list = Subcategory.objects.filter()
        context_dict = {'category_list': category_list, 'subcategories_list':subcategories_list} 
        return Response(category_list.values(),status=status.HTTP_200_OK)

@permission_classes((AllowAny,))
class SubCategoryView(generics.GenericAPIView):

    category = Category.objects.all()
    print(" cat category",category)
    
    subcategories = Subcategory.objects.all()
    print(subcategories)
    def get(self,request,pk):
        category = Category.objects.get(id=pk)
        print(category)
        subcategories_list = Subcategory.objects.filter(category=category)
        return Response(subcategories_list.values(),status=status.HTTP_200_OK)

class ProductView(generics.GenericAPIView):

    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get(self, request,pk, *args, **kwargs):
        category = Category.objects.get(id=pk)
        subcategories = Subcategory.objects.filter(category=category)
        subcategories = Subcategory.objects.get(id=pk)

        try:
            if category:
                product_list = self.filter_queryset(self.get_queryset()).filter(category=subcategories)
            else:
                product_list = self.filter_queryset(self.get_queryset()).filter(available=True)
                print(product_list)
            return Response(product_list.values(), status=status.HTTP_200_OK)
        except Exception:
            return Response(Exception, status=status.HTTP_403_FORBIDDEN)


class OrderView(generics.GenericAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderSerializer
    
    def get(self, request, *args, **kwargs):
     
        cart_list = self.queryset.filter()
        return Response(cart_list.values(), status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        # import pdb; 
        # pdb.set_trace()
        # user_id=request.objects.get('user')
        # print(user_id)
        token = request.headers.get('Token')
        username=User.objects.get(username=token)
        user=User.objects.get(username=username)
        print(user.id)
        serializer = OrderSerializer(data=request.data)
        print(serializer)
       
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        else:
            error_details = []
            for key in serializer.errors.keys():
                error_details.append({"field": key, "message": serializer.errors[key][0]})

            data = {
                    "Error": {
                        "status": 400,
                        "message": "some error is there please check..",
                        "error": error_details
                        }
                    }

            return Response(data, status=status.HTTP_400_BAD_REQUEST)

@login_required
def add_to_cart(request,pk) :
    product = get_object_or_404(Product, pk = pk )
    order_product, created = OrderItem.objects.get_or_create(
        product=product,
        user = request.user,
        ordered = False
    )
    order_qs = Order.objects.filter(user=request.user, ordered= False)

    if order_qs.exists() :
        order = order_qs[0]
        
        if order.products.filter(product__pk = product.pk).exists() :
            order_product.quantity += 1
            order_product.save()
            messages.info(request, "Added quantity product")
            return redirect("product:product", pk = pk)
        else: 
            order.products.add(order_product)
            messages.info(request, "Item added to your cart")
            return redirect("product:product", pk = pk)
    else:
        order = Order.objects.create(user=request.user)
        order.products.add(order_product)
        messages.info(request, "Item added to your cart")
        return redirect("product:product", pk = pk)
        
        
        
        
        
        today
        
        
            product = get_object_or_404(Product,id=request.data['product'])
            order_item, created= OrderItem.objects.get_or_create(user=user,product=product,price=request.data['price'])
            orders = Order.objects.filter(user=user,ordered=False)

            if orders.exists():
                order = orders[0]
                # check if the order product is in the order
                id= request.data['product']
                qs=order.products.filter(user=user).exists()
                print(qs)
                if qs:
                    order_item.quantity += 1
                    order_item.save()
                    # return Response(status=status.HTTP_200_OK)
            else:
                order = Order.objects.create(user=user)
                order.products.add(order_item)
                print("done")
                return Response("added in cardt",status=status.HTTP_200_OK)
            return Response("added in cardt",status=status.HTTP_200_OK)