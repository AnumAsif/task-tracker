from django.db import models

class Task(models.Model):
    name=models.CharField(max_length=20, blank=False)
    message=models.IntegerField(default=0)
    program_time=models.TimeField(auto_now=False, auto_now_add=False)
    actual_time=models.TimeField(auto_now=False)
    