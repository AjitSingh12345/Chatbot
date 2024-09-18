from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine, get_db
from models import Base, Message
from fastapi.middleware.cors import CORSMiddleware
from schemas import MessageCreate, MessageResponse, MessageUpdate

"""
Main handles backend API logic for chatbot

- initializes FastAPI app & sets up database
- defines data models to format API responses according to database schema
- implement get bot response logic
- define API endpoints
"""

app = FastAPI()     # create FastAPI app

# add CORS middleware to app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# creates all tables in database defined by ORM models (classes that inherit from Base)
Base.metadata.create_all(bind=engine)   # recreates tables with updated schema

# chatbot logic (currently simple echo bot)
def get_bot_response(user_message: str) -> str:
    return f"{user_message}"

# API endpoints

# POST /messages/ - create new message, save it to database & get bot response
@app.post("/messages/", response_model=MessageResponse)
def create_message(message: MessageCreate, db: Session = Depends(get_db)):
    """
    - client use this endpoint to send a msg to the chatbot 
    - param message is data user sends in MessageCreate Pydantic schema
    - param db is database session
    """
    # get bot response
    bot_response = get_bot_response(message.user_message)

    # create database entry (Message object) and commit it to session
    db_message = Message(user_message=message.user_message, bot_response=bot_response)
    db.add(db_message)  # add is for new objects not yet tracked by db session
    db.commit()
    db.refresh(db_message)

    # return new message with bot's response 
    return db_message

# GET /messages/ - retrieve all messages as list of MessageResponse objects
@app.get("/messages/", response_model=list[MessageResponse])
def read_messages(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    - handles logic for fetching messages
    - skip defines how many records to skip
    - limit defines max # messages to return
    - db is the database session
    """
    # queries Message table and returns all records within limit to client
    messages = db.query(Message).offset(skip).limit(limit).all()
    return messages

# PUT /messages/{message_id}/ - updates message with message id & returns MessageResponse object
@app.put("/messages/{message_id}/", response_model=MessageResponse)
def update_message(message_id: int, message: MessageUpdate, db: Session = Depends(get_db)):
    # retrieve message with param ID from database, if ID not found error out
    db_message = db.query(Message).filter(Message.id == message_id).first()
    if not db_message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    # update user message and bot response in the record (tracked by SQLAlchemy)
    db_message.user_message = message.user_message
    db_message.bot_response = get_bot_response(message.user_message)
    
    # save the updated record to the database - dont need to re-add bc record is in persistent state
    db.commit()
    db.refresh(db_message)

    # return the updates message
    return db_message

# DELETE /messages/{message_id}/ - delete message with given ID
@app.delete("/messages/{message_id}/")
def delete_message(message_id: int, db: Session = Depends(get_db)):
    # retrieve message w/ param ID from database, if not found error out
    db_message = db.query(Message).filter(Message.id == message_id).first()
    if not db_message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    # delete message from database and commit deletion
    db.delete(db_message)
    db.commit()

    # return confirmation of deleted message
    return {"detail": "Message deleted"}
