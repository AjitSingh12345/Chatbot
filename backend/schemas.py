from pydantic import BaseModel, ConfigDict
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
    model_config = ConfigDict(from_attributes=True)