from django.db import models

app_name = 'api'


class Border(models.Model):
    country_id = models.CharField(primary_key=True, max_length=3)
    border_data = models.TextField(null=False, blank=False)

    def __str__(self):
        return self.country_id


class Stadium(models.Model):
    city = models.CharField(primary_key=True, max_length=30)
    name = models.CharField(unique=True, blank=False, null=False, max_length=30)
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return self.city
