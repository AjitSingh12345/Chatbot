from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import declarative_base
import datetime

"""
Defines database schema for the chatbot application
All database tables inherit from Base
"""

Base = declarative_base()   # SQLAlchemy function creates base class for ORM models

class Message(Base):    
    __tablename__ = "messages"  # name of table in database

    id = Column(Integer, primary_key=True, index=True)  # unique ID for each message
    user_message = Column(String, index=True)           # message sent by the user
    bot_response = Column(String)                       # chatbot's response
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)  # time message was sent
