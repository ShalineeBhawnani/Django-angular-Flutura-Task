from django.urls import path, include 
from . import views
app_name = 'product'
urlpatterns = [ 
         path('category/', views.CategoryView.as_view(), name ='category'), 
         path('product/', views.ProductView.as_view(), name ='product'),
        #  path('product/<category_slug>/', views.ProductView.as_view(), name ='product'),
         path('product/<pk>/', views.ProductView.as_view(), name ='product'),
        #  path('product/<pk>/<pk>/', views.ProductView.as_view(), name ='product'),
         path('cart/', views.OrderView.as_view(), name ='cart'),
         path('category/', views.CategoryView.as_view(), name ='category'),
         path('subcategory/<pk>/', views.SubCategoryView.as_view(), name ='subcategory'),
         path('add-to-cart/<pk>/', views.add_to_cart, name='add-to-cart'),
        #  path('subcategory/<slug>/', views.SubCategoryView.as_view(), name ='subcategory'),
        #  path('category/<category_slug>/', views.CategoryView.as_view(), name ='category'),
         

] 