from uuid import UUID
from pydantic import BaseModel,EmailStr
from typing import Optional,List
from datetime import datetime

class UserResponse(BaseModel):
    id: UUID  # The UUID of the user
    email: str
    firstName: Optional[str] = None
    lastName: Optional[str] = None

    class Config:
        orm_mode = True
# Refactor user schema and model: made firstName and lastName optional; updated user ID handling to support UUIDs

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    firstName: Optional[str]=None
    lastName: Optional[str]=None
    dateCreated: datetime = datetime.now()
    class config: 
        orm_mode=True

class Token(BaseModel):
    access_token: str
    token_type: str

class Request(BaseModel):
    id:int
    full_name:str
    email:str
    phone:str
    type:str
    description:str



# EVENTS
class EventCreate(BaseModel):
    name: str
    type: str
    description: str
    start_date: datetime

# Schema for responding with event data
class EventResponse(BaseModel):
    id: int
    name: str
    type: str
    description: str
    add_date: datetime
    start_date: datetime

    class Config:
        orm_mode = True

class GetChat(BaseModel):
    message: str

class ChatResponse(BaseModel):
    message: str

    class Config:
        orm_mode = True