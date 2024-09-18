import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database import get_db
from models import Base
from main import app

# use an in-memory SQLite database for testing (doesnt affect main db)
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# set up the test database
Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

# override func that gets db session to use the test database
def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

# replaces app dependency with testing get_db function
app.dependency_overrides[get_db] = override_get_db

# create test client that interacts with FastAPI app
client = TestClient(app)

# simulated client to send HTTP requests to FastAPI app
@pytest.fixture
def test_client():
    return client

# test creating multiple messages
def test_create_messages(test_client):
    messages = ["Hello", "How are you?", "Tell me a joke", "Goodbye"]
    for idx, msg in enumerate(messages):
        response = test_client.post("/messages/", json={"user_message": msg})
        assert response.status_code == 200
        assert response.json()["user_message"] == msg
        assert response.json()["bot_response"] == msg
        assert "timestamp" in response.json() 
        assert isinstance(response.json()["timestamp"], str)    # timestamp should be a string in ISO format

        # Check the length after each creation (it should incrament)
        all_messages = test_client.get("/messages/").json()
        assert len(all_messages) == idx + 1     


# test reading all messages
def test_read_messages(test_client):
    response = test_client.get("/messages/")
    assert response.status_code == 200
    assert len(response.json()) == 4    # 4 msg created above


# test updating each message
def test_update_messages(test_client):
    response = test_client.get("/messages/")
    messages = response.json()
    updated_messages = ["Updated 1", "Updated 2", "Updated 3", "Updated 4"]
    
    for idx, message in enumerate(messages):
        message_id = message["id"]
        update_response = test_client.put(f"/messages/{message_id}/", json={"user_message": updated_messages[idx]})
        assert update_response.status_code == 200
        assert update_response.json()["user_message"] == updated_messages[idx]
        assert update_response.json()["bot_response"] == updated_messages[idx]


# test deleting all messages (and check updated size)
def test_delete_messages(test_client):
    response = test_client.get("/messages/")
    messages = response.json()

    for idx, message in enumerate(messages):
        message_id = message["id"]
        delete_response = test_client.delete(f"/messages/{message_id}/")
        assert delete_response.status_code == 200
        assert delete_response.json() == {"detail": "Message deleted"}

        # length should decrement after each deletion
        curr_messages = test_client.get("/messages/").json()
        assert len(curr_messages) == len(messages) - (idx + 1)

    # verify that all messages are deleted
    response = test_client.get("/messages/")
    assert response.status_code == 200
    assert len(response.json()) == 0 


# edge case - test deleting non-existent msg
def test_delete_nonexistent_message(test_client):
    delete_response = test_client.delete("/messages/12345/")    # non-existent message ID
    assert delete_response.status_code == 404
    assert delete_response.json()["detail"] == "Message not found"


# edge case - stress test creating & deleting msg in a loop
def test_create_and_delete_loop(test_client):
    for i in range(100):
        create_response = test_client.post("/messages/", json={"user_message": f"Message {i}"})
        assert create_response.status_code == 200
        
        # check the length after each creation
        messages = test_client.get("/messages/").json()
        assert len(messages) == i + 1  

    for i in range(100):
        # always delete first msg
        all_messages = test_client.get("/messages/").json()
        message_id = all_messages[0]["id"] 
        
        delete_response = test_client.delete(f"/messages/{message_id}/")
        assert delete_response.status_code == 200
        
        # check the length after each deletion
        curr_messages = test_client.get("/messages/").json()
        assert len(curr_messages) == 99 - i 