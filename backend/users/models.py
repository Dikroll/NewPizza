from django.contrib.auth.models import AbstractUser
from django.db import models

class DimokUser(AbstractUser):
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
    ]

    phone = models.CharField(max_length=15, unique=True, blank=False, null=False,)
    bonus = models.PositiveIntegerField(default=300)
    first_name = models.CharField(max_length=30, null=False, blank=False)
    birthday = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES, null=True, blank=True)
    address = models.TextField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.username:
            self.username = self.phone
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username
    
class EmailLog(models.Model):
    subject = models.CharField(max_length=255)
    message = models.TextField()
    recipient = models.EmailField()
    sent_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.subject