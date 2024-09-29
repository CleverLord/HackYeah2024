from django.db import models

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    pesel = models.CharField(max_length=11)  # Assuming a fixed length for pesel
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} {self.lastname}"

class Session(models.Model):
    session_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sessions', null=True, blank=True)  # Nullable for anonymous sessions
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Session {self.session_id} {'(Anonymous)' if not self.user else f'for {self.user}'}"

class UserMessage(models.Model):
    message_id = models.AutoField(primary_key=True)
    session = models.ForeignKey(Session, on_delete=models.CASCADE, related_name='user_messages')
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message {self.message_id} for Session {self.session}"

class ChatBotMessage(models.Model):
    message_id = models.AutoField(primary_key=True)
    session = models.ForeignKey(Session, on_delete=models.CASCADE, related_name='chatbot_messages')
    verdict_body = models.TextField()
    partially_filled_template = models.TextField()
    response_body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"ChatBot Message {self.message_id} for Session {self.session}"

#create a class that will hold information whether a certain form is suitable for a user case
# the class should have a form name as a string, and a condition string that will be used to evaluate if the form is suitable
class FormSuitability(models.Model):
    form_name = models.CharField(max_length=255)
    condition = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"FormSuitability {self.form_name} {self.condition}"
    
#create a class that will hold xml schema for a form
class FormSchema(models.Model):
    form_name = models.CharField(max_length=255)
    schema = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"FormSchema {self.form_name}"
