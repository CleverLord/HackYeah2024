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
        return f"Message {self.message_id} for Session {self.session_id}"

class ChatBotMessage(models.Model):
    message_id = models.AutoField(primary_key=True)
    session = models.ForeignKey(Session, on_delete=models.CASCADE, related_name='chatbot_messages')
    verdict_body = models.TextField()
    partially_filled_template = models.TextField()
    response_body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"ChatBot Message {self.message_id} for Session {self.session_id}"
