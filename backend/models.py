from sqlalchemy import Column, Integer, String
from database import Base   # base class all models inherit from

'''
Defines database schema for the chatbot application
'''

class Message(Base):    
    __tablename__ = "messages"  # name of table in database

    id = Column(Integer, primary_key=True, index=True)  # unique ID for each message
    user_message = Column(String, index=True)           # message sent by the user
    bot_response = Column(String)                       # chatbot's response