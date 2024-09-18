from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

"""
Set up database connection and session management for chatbot using SQLAlchemy 
"""

SQLALCHEMY_DATABASE_URL = "sqlite:///./messages.db"     # location of SQLite database (messages.db file)

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})  # create SQLAlchemy engine
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)                 # create session for interacting with database

# Get database session & manages session lifecycle
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

