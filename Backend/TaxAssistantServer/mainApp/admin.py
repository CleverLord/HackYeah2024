from django.contrib import admin

# Register your models here.
# make the models visible in the admin panel
from .models import User, Session, UserMessage, ChatBotMessage, FormSuitability, FormSchema

admin.site.register(User)
admin.site.register(Session)
admin.site.register(UserMessage)
admin.site.register(ChatBotMessage)
admin.site.register(FormSuitability)
admin.site.register(FormSchema)