from django.contrib import admin
from .models import DimokUser, EmailLog



@admin.register(DimokUser)
class UserAdmin(admin.ModelAdmin):
    list_display = ('phone', 'username')
    search_fields = ('username',)

@admin.register(EmailLog)
class EmailAdmin(admin.ModelAdmin):
    list_display = ('subject',)

