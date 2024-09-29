from rest_framework import serializers
from .models import User, Session, UserMessage, ChatBotMessage, FormSuitability, FormSchema

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class SessionSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)  # User is nullable for anonymous sessions

    class Meta:
        model = Session
        fields = '__all__'

class UserMessageSerializer(serializers.ModelSerializer):
    session = serializers.PrimaryKeyRelatedField(queryset=Session.objects.all())

    class Meta:
        model = UserMessage
        fields = '__all__'

class ChatBotMessageSerializer(serializers.ModelSerializer):
    session = serializers.PrimaryKeyRelatedField(queryset=Session.objects.all())

    class Meta:
        model = ChatBotMessage
        fields = '__all__'

class FormSuitabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = FormSuitability
        fields = '__all__'

class FormSchemaSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormSchema
        fields = '__all__'