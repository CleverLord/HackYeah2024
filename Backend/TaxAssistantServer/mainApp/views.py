from django.shortcuts import render
from rest_framework import generics
from .models import User, Session, UserMessage, ChatBotMessage, FormSuitability, FormSchema
from .serializers import UserSerializer, SessionSerializer, UserMessageSerializer, ChatBotMessageSerializer, FormSuitabilitySerializer, FormSchemaSerializer

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

class PostMessage(APIView):
    def post(self, request):
        session_id = request.data.get('session_id', None)
        body = request.data.get('message', None)
        if not session_id:
            return Response({'error': 'Missing session_id'}, status=status.HTTP_400_BAD_REQUEST)
        if not body:
            return Response({'error': 'Missing body'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            session = Session.objects.get(session_id=session_id)
        except Session.DoesNotExist:
            return Response({'error': 'Session not found'}, status=status.HTTP_404_NOT_FOUND)
        UserMessage.objects.create(session=session, body=body, created_at=timezone.now())
        ChatBotMessage.objects.create(session=session, verdict_body='mock verdict', partially_filled_template='mock template', response_body=chatbot_mock_response, created_at=timezone.now())
        return Response({'response': chatbot_mock_response}, status=status.HTTP_200_OK)
    

class GetConversationHistory(APIView):

    def get(self, request):
        session_id = request.query_params.get('session_id', None)
        if not session_id:
            return Response({'error': 'Missing session_id'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            session = Session.objects.get(session_id=session_id)
        except Session.DoesNotExist:
            return Response({'error': 'Session not found'}, status=status.HTTP_404_NOT_FOUND)
        
        class Message:
            def __init__(self, body, created_at, is_user):
                self.body = body
                self.created_at = created_at
                self.is_user = is_user
        from rest_framework import serializers
        class MessageSerializer(serializers.Serializer):
            body = serializers.CharField()
            created_at = serializers.DateTimeField()
            is_user = serializers.BooleanField()

        user_messages = UserMessage.objects.filter(session=session)
        chatbot_messages = ChatBotMessage.objects.filter(session=session)
        user_messages_data = [Message(message.body, message.created_at, True) for message in user_messages]
        chatbot_messages_data = [Message(message.response_body, message.created_at, False) for message in chatbot_messages]
        all_messages = user_messages_data + chatbot_messages_data
        all_messages.sort(key=lambda x: x.created_at)
        serialized_messages = MessageSerializer(all_messages, many=True)
        return Response(serialized_messages.data, status=status.HTTP_200_OK)


# create an endpoint for returning last partially_filled_template as it is ready to be sent to the user

from rest_framework.renderers import JSONRenderer
from rest_framework_xml.renderers import XMLRenderer  # Import XMLRenderer

from django.http import HttpResponse

class GetLastPartiallyFilledTemplate(APIView):
    # Only JSONRenderer is needed since XML is handled separately
    renderer_classes = [JSONRenderer]

    def get(self, request):
        session_id = request.query_params.get('session_id', None)
        if not session_id:
            return Response({'error': 'Missing session_id'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            session = Session.objects.get(session_id=session_id)
        except Session.DoesNotExist:
            return Response({'error': 'Session not found'}, status=status.HTTP_404_NOT_FOUND)

        chatbot_message = ChatBotMessage.objects.filter(session=session).last()
        if not chatbot_message:
            return Response({'error': 'No chatbot messages for this session'}, status=status.HTTP_404_NOT_FOUND)

        partially_filled_template = chatbot_message.partially_filled_template

        # Determine if the client expects XML
        accept_header = request.headers.get('Accept', '')
        if 'application/xml' in accept_header:
            return HttpResponse(partially_filled_template, content_type='application/xml')
        else:
            return Response({'partially_filled_template': partially_filled_template}, status=status.HTTP_200_OK)


### CHATBOT stuff
#create simple function AskChatbot that will take message as an argument and return chatbot response
def AskChatbot(message):
    response_text=model.invoke(message)
    return response_text

# create an endpoint that will talk to the chatbot
from langchain_community.llms.ollama import Ollama
MODEL_NAME="Lexi-Llama-3-8B-Uncensored_Q8_0.gguf"
model = Ollama(model=MODEL_NAME)

class PostMessageToChatBot(APIView):
    def post(self, request):
        message = request.data.get('message', None)
        if not message:
            return Response({'error': 'Missing message'}, status=status.HTTP_400_BAD_REQUEST)
        response_text=model.invoke(message)
        return Response({'response': response_text}, status=status.HTTP_200_OK)

#create a function that will go through all formsSutaibility objects and will ask chat if the message user provided suits the form
# the function will return true if any form is suitable
# the function will return false if no form is suitable
def CheckFormSutaibility(message):
    result=""
    for form in FormSuitability.objects.all():
        message="Czy formularz "+form.form_name+" jest odpowiedni dla osoby, która opisuje swoją sytuację następująco: \""+message+"\" uwzględniając że ten formularz jest odpowiedni w takich sytuacjach: "+form.condition
        message+="Odpowiedz jednym słowem: tak/nie"
        # print(message)
        response_text=model.invoke(message)
        short_response_text=response_text[0:3]
        print("Sytuacja: "+ message+"\n", "Short response: "+short_response_text+"\n", "Response: "+response_text+"\n\n")
        #check if response is other than yes or no
        if short_response_text.lower() not in ['tak', 'nie']:
            result+="Dla formularza "+form.form_name+" odpowiedź nie była jednoznaczna. Chat odpowiada: "+response_text+". "
        if short_response_text.lower() == 'tak':
            result+="Formularz "+form.form_name+" jest odpowiedni. "
        if short_response_text.lower() == 'nie':
            result+="Formularz "+form.form_name+" nie jest odpowiedni. "
    print(result)
    return result

class CheckFormSuitability(APIView):
    def post(self, request):
        message = request.data.get('message', None)
        if not message:
            return Response({'error': 'Missing message'}, status=status.HTTP_400_BAD_REQUEST)
        result = CheckFormSutaibility(message)
        return Response({'response': result}, status=status.HTTP_200_OK)

# this time create a true endpoint for starting a conversation
# the endpoint should be a post request that will take session_id as a parameter
# the endpoint will merge the session with the last chatbot response
# if there was no previous response, the function will first iterate over all formsSutaibility objects and will ask chat if the message user provided suits the form
# if the form is suitable, the chatbot will return true for this formSutaibility object
# then the function will fetch the form schema for the form that is suitable, and ask chatbot again to fill the form
# the chatbot will return the filled form and the partially filled template and the response to the user about missing fields
# if the form is not suitable, the chatbot will provide a response to the user that will reference users message