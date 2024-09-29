from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.UserListCreate.as_view(), name='user-list-create'),
    path('users/<int:pk>/', views.UserRetrieveUpdateDestroy.as_view(), name='user-retrieve-update-destroy'),
    path('sessions/', views.SessionListCreate.as_view(), name='session-list-create'),
    path('sessions/<int:pk>/', views.SessionRetrieveUpdateDestroy.as_view(), name='session-retrieve-update-destroy'),
    path('user-messages/', views.UserMessageListCreate.as_view(), name='user-message-list-create'),
    path('user-messages/<int:pk>/', views.UserMessageRetrieveUpdateDestroy.as_view(), name='user-message-retrieve-update-destroy'),
    path('chatbot-messages/', views.ChatBotMessageListCreate.as_view(), name='chat-bot-message-list-create'),
    path('chatbot-messages/<int:pk>/', views.ChatBotMessageRetrieveUpdateDestroy.as_view(), name='chat-bot-message-retrieve-update-destroy'),
    # app specific endpoints
    path('start-conversation/', views.StartConversation.as_view(), name='start-conversation'),
    path('conversation/', views.PostMessage.as_view(), name='conversation'),
    path('conversation-history/', views.GetConversationHistory.as_view(), name='conversation-history'),
]   