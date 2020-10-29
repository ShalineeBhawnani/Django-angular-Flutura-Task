from django.urls import path, include ,re_path
from . import views
app_name = 'product'
urlpatterns = [ 
         path('category/', views.GetCategoryList.as_view(), name ='category'), 
         re_path(r'^getSetProduct/+(?P<id>\d+)?', views.GetSetProduct.as_view(), name ='product'),
         # path('getSetProduct/<id>/', views.ProductView.as_view(), name ='product'),   
         
]