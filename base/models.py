from django.db import models

# Create your models here.


class RoomMembers(models.Model):
    class Meta:
        verbose_name_plural = "RoomMembers"
    name = models.CharField(max_length=200)
    uid = models.CharField(max_length=200)
    room_name = models.CharField(max_length=200)

    def __str__(self):
        return self.name
