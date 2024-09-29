from django.test import TestCase

# Create your tests here.
# test if http://127.0.0.1:8000/ returns 404

from django.test import TestCase

class TestHomePage(TestCase):
    def test_home_page(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 404)

# create tests that will check if pages return 200

# users/ [name='user-list-create']
# users/<int:pk>/ [name='user-retrieve-update-destroy']
# sessions/ [name='session-list-create']
# user-messages/ [name='user-message-list-create']
# chatbot-messages/ [name='chat-bot-message-list-create']

class TestUserListCreate(TestCase):
    def test_user_list_create(self):
        response = self.client.get('/users/')
        self.assertEqual(response.status_code, 200)

class TestUserRetrieveUpdateDestroy(TestCase):
    def test_user_retrieve_update_destroy(self):
        response = self.client.get('/users/1/')
        self.assertEqual(response.status_code, 404)

class TestSessionListCreate(TestCase):
    def test_session_list_create(self):
        response = self.client.get('/sessions/')
        self.assertEqual(response.status_code, 200)

class TestUserMessageListCreate(TestCase):
    def test_user_message_list_create(self):
        response = self.client.get('/user-messages/')
        self.assertEqual(response.status_code, 200)

class TestChatBotMessageListCreate(TestCase):
    def test_chat_bot_message_list_create(self):
        response = self.client.get('/chatbot-messages/')
        self.assertEqual(response.status_code, 200)

class TestStartConversation(TestCase):
    def test_start_conversation(self):
        response = self.client.get('/start-conversation/')
        self.assertEqual(response.status_code, 201)

class TestPostMessage(TestCase):
    def test_post_message(self):
        #create body with session_id=1 and message='test'
        body = {
            'session_id': 1,
            'message': 'test'}
        response = self.client.post('/conversation/', body)
        self.assertEqual(response.status_code, 200)