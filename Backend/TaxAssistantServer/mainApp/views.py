from django.shortcuts import render
from rest_framework import generics
from .models import User, Session, UserMessage, ChatBotMessage
from .serializers import UserSerializer, SessionSerializer, UserMessageSerializer, ChatBotMessageSerializer

# Create your views here for debuging database
class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class SessionListCreate(generics.ListCreateAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

class SessionRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

class UserMessageListCreate(generics.ListCreateAPIView):
    queryset = UserMessage.objects.all()
    serializer_class = UserMessageSerializer

class UserMessageRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserMessage.objects.all()
    serializer_class = UserMessageSerializer

class ChatBotMessageListCreate(generics.ListCreateAPIView):
    queryset = ChatBotMessage.objects.all()
    serializer_class = ChatBotMessageSerializer

class ChatBotMessageRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = ChatBotMessage.objects.all()
    serializer_class = ChatBotMessageSerializer

# Create your rest endpoints here
# create an ednpoint for starting a conversation that will create new session for anonymous user, that will be used as get request
# it can take optional user_id parameter to create a session for a specific user

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.utils import timezone

class StartConversation(APIView):
    def get(self, request):
        user_id = request.query_params.get('user_id', None)
        user = None
        if user_id:
            try:
                user = User.objects.get(user_id=user_id)
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        session = Session.objects.create(user=user, created_at=timezone.now())
        return Response({'session_id': session.session_id}, status=status.HTTP_201_CREATED)
    

#create an endpoint for receiving message that will contain session_id and message body, that will be used as post request
# when message arrives it should be saved in the database and chatbot should respond with a message
# for now chatbot will respond with the same mock message
chatbot_mock_response = 'Hello, I am a mock chatbot. I am here to help you with your taxes. How can I help you today?'

class ReceiveMessage(APIView):
    def post(self, request):
        session_id = request.data.get('session_id', None)
        body = request.data.get('body', None)
        if not session_id or not body:
            return Response({'error': 'Missing session_id or body'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            session = Session.objects.get(session_id=session_id)
        except Session.DoesNotExist:
            return Response({'error': 'Session not found'}, status=status.HTTP_404_NOT_FOUND)
        UserMessage.objects.create(session=session, body=body, created_at=timezone.now())
        ChatBotMessage.objects.create(session=session, verdict_body='mock verdict', partially_filled_template='mock template', response_body=chatbot_mock_response, created_at=timezone.now())
        return Response({'response': chatbot_mock_response}, status=status.HTTP_200_OK)