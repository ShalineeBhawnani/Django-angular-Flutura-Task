from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from . import database
import psycopg2
from . import get_insert_data
from pandas import Timestamp
from django.contrib import messages
from rest_framework import status
from .models import *
import pandas as pd
from datetime import datetime


# fetching user data for displaying contect details
class User(APIView):
    def get(self,request): 
        try:
            rows = get_insert_data.get_user_data()
            for index in rows:
                data = {
                        "address": index[2],
                        "phone_number": index[1]
                        }
            return Response(data,status=status.HTTP_200_OK) 
        except Exception as err:
            return HttpResponse("Error while fetching userdata",err)
          
# fetching & posting customer data
class CutomerForm(GenericAPIView):
    queryset = Cutomer.objects.all()

    def get(self, request,*args, **kwargs):
        try:
            property_list = self.filter_queryset(self.get_queryset())
            return Response(property_list.values(), status=status.HTTP_200_OK)
        except Exception:
            return Response(Exception, status=status.HTTP_403_FORBIDDEN)
    def post(self,request):
        try:
            data=request.data
            name=data.get('name')
            phone_number =  data.get('phone_number')
            email = data.get('email')
            property = data.get('property')
            service = data.get('service')
            message = data.get('message')
            get_insert_data.insert_customer_data(name,phone_number,email,property,service,message)
            return Response(status.HTTP_200_OK)
        except Exception as err:
            return Response(err,status=status.HTTP_403_FORBIDDEN)

#all customer detail list
class SelectPropertyType(GenericAPIView):
    property = PropertyTypes.objects.all()
    def get(self, request, *args, **kwargs):
        try:
            category_list = self.property.filter()
            context_dict = {'category_list': category_list} 
            return Response(category_list.values(),status=status.HTTP_200_OK)
        except Exception as err:
            return Response(err,status=status.HTTP_403_FORBIDDEN)

# list of property based on property type
class ProductView(GenericAPIView):
    queryset = Cutomer.objects.all()
    def get(self, request,pk, *args, **kwargs):
        category = PropertyTypes.objects.get(id=pk)
        try:
            property_list = self.filter_queryset(self.get_queryset()).filter(property=category)
            return Response(property_list.values(), status=status.HTTP_200_OK)
        except Exception as err:
            return Response(err, status=status.HTTP_403_FORBIDDEN)

# list of user data for highchart example
class DataFrameExample(GenericAPIView):
    def get(self, request,*args, **kwargs):
        userAge = {'Name':['Tom', 'nick', 'krish', 'jack'],
                'Age':[20, 21, 19, 18],
                }
        userAge = pd.DataFrame(userAge)
        userWeight = pd.DataFrame({
            'Name':['Tom', 'nick', 'krish', 'jack'],
            "weight": [65,68,50,32],
        })
        userData = pd.merge(userAge, userWeight, on="Name")
        return Response(userData, status=status.HTTP_200_OK)
 
# TimeSeries API For fetching & posting CSV Data
class TimeSeriesData(GenericAPIView):

    def get(self,request,pk):
        timeSeriesData = pd.DataFrame(passenger_movement.objects.all().values())
 
        try:
            if(pk =="mean" or  pk =="min" or  pk =="max"):
                arrivals = timeSeriesData.groupby(timeSeriesData['Date'].dt.year)['ArrivalsActualCounts'].agg([pk])
                departures = timeSeriesData.groupby(timeSeriesData['Date'].dt.year)['DeparturesActualCounts'].agg([pk])
                timeSeriesData = pd.merge(arrivals, departures, on="Date")
                timeSeriesData.reset_index(level=0, inplace=True)
               
                
            else :
                timeSeriesData = timeSeriesData[timeSeriesData['Date'].dt.year.isin([pk])]
                timeSeriesData['Date'] = timeSeriesData['Date'].dt.strftime('%d/%m/%Y')
                
            timeSeriesData.columns = ['year', 'arrival', 'departure']
            # converting to dict 
            timeSeriesData = timeSeriesData.to_dict(orient='records')
       
        except Exception as err:
            return Response("That was not valid option",status=status.HTTP_403_FORBIDDEN)
        return Response(timeSeriesData, status=status.HTTP_200_OK)
       
    def post(self,request):
        filename = request.FILES['file']
        
        if not filename.name.endswith('.csv'):
            return HttpResponse("THIS IS NOT A CSV FILE")
        try:
            missing_value_formats = ["n.a.","?","NA","n/a", "na", "--"]
            # Read csv file into a pandas dataframe
            df = pd.read_csv(filename, na_values = missing_value_formats)
            df['Date'].interpolate(method='linear', direction = 'forward', inplace=True) 
          
        except IOError as error:
            return HttpResponse("Could not read file:",error)
        Date = df['Date'].str.replace('M', '01')
        Date = pd.to_datetime(Date)
        df['Date'] = Date.dt.strftime('%Y-%d')
        df["Date"] = pd.to_datetime(df["Date"])
        
        engine = database.connect_sql__database()
        rows = get_insert_data.fetch_timeseries_data()
        if rows:
            get_insert_data.delete()
            df.to_sql('interiorwebsite_passenger_movement',engine,if_exists='append', index=False)
        else:
            df.to_sql('interiorwebsite_passenger_movement',engine,if_exists='append', index=False) 
       
        return HttpResponse("data stored succussfully in database",status=status.HTTP_200_OK)

  