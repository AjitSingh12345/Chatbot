from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base

'''
Set up database connection and session management for chatbot using SQLAlchemy 
'''

SQLALCHEMY_DATABASE_URL = "sqlite:///./messages.db"     # location of SQLite database (messages.db file)

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})  # connect to database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)                 # create session for interacting with database

Base.metadata.create_all(bind=engine)   # created tables in database based on Message model
