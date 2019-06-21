from django.http import HttpResponse
import datetime as dt
from django.shortcuts import render
from .models import *
import schedule
import time
import random
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import  Task
from .serializer import TaskSerializer


now=dt.datetime.now()
def actual_time(request):
    global now
    date = dt.datetime.now().strftime("%A, %b %d, %Y %I:%M:%S%p")
    time=dt.datetime.now()
    hours=int(time.strftime("%S"))-int(now.strftime("%S"))
    all_tasks=Task.objects.all().delete()
    

    return render(request, 'index.html',{'actualdate':date, 'hours':hours,})

def date(request):
    date = dt.datetime.now().strftime("%A, %b %d, %Y %I:%M:%S%p")
    # time=dt.datetime.now()
    hours=abs(int(time.strftime("%S"))-int(now.strftime("%S")))
    # start_tasks()
    return render(request, 'base.html',{'actualdate':date, 'hours':hours,})

class TaskList(APIView):
    def get(self, request, format=None):
        all_tasks = Task.objects.all()
        serialized = TaskSerializer(all_tasks, many=True)
        return Response(serialized.data)
    
    def post(self, request, format=None):
        serialized = TaskSerializer(data=request.data)
        if serialized.is_valid():
            serialized.save()
            return Response(serialized.data, status=status.HTTP_201_CREATED)
        return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST) 
    
    def delete(self, request, pk, format=None):
        all_tasks=Task.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

