from django.urls import path, include 
from . import views
urlpatterns = [ 
         path('user/', views.User.as_view(), name ='user'),
         path('form/', views.CutomerForm.as_view(), name ='form'),
         path('property/', views.SelectPropertyType.as_view(), name ='property'),
         path('product/<pk>/', views.ProductView.as_view(), name ='product'),
         path('data/', views.DataFrameExample.as_view(), name ='data'),
         path('upload/', views.TimeSeriesData.as_view(), name ='upload'),
         path('getArivalDepatureData/<pk>/', views.TimeSeriesData.as_view(), name ='seriesdata'),
         path('getYearValueData/<pk>/', views.TimeSeriesData.as_view(), name ='seriesdata'),
         
         
         
]  