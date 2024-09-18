from pydantic import BaseModel
import datetime

# Pydantic database schemes
class MessageCreate(BaseModel):
    user_message: str

class MessageUpdate(BaseModel):
    user_message: str

class MessageResponse(BaseModel):
    id: int
    user_message: str
    bot_response: str
    timestamp: datetime.datetime

    # allows automatic conversion btwn db_message and Pydantic models
    class Config:
        from_attributes = True