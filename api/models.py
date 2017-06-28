from django.db import models

app_name = 'api'


class Border(models.Model):
    country_id = models.CharField(primary_key=True, max_length=3)
    border_data = models.TextField(null=False, blank=False)

    def __str__(self):
        return self.country_id


def get_upload_path(instance, filename):
    f_type = filename.split('.')[1]
    print(f_type)
    f_name = instance.name + '.' + f_type
    print(f_name)
    return 'images/stadiums/%s' % f_name


class Stadium(models.Model):
    city = models.CharField(primary_key=True, max_length=30)
    name = models.CharField(unique=True, blank=False, null=False, max_length=30)
    latitude = models.FloatField()
    longitude = models.FloatField()
    photo = models.ImageField(upload_to=get_upload_path, null=True, blank=True)

    def __str__(self):
        return self.city
