from uuid import UUID
from pydantic import BaseModel,EmailStr
from typing import Optional,List
from datetime import datetime

class UserResponse(BaseModel):
    id: UUID  # The UUID of the user
    email: str
    firstName: Optional[str]
    lastName: Optional[str]

    class Config:
        orm_mode = True


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    firstName: Optional[str]
    lastName: Optional[str]
    dateCreated: datetime = datetime.now()
    class config: 
        orm_mode=True

class Token(BaseModel):
    access_token: str
    token_type: str


# EVENTS
class EventBase(BaseModel):
    name: str

class EventCreate(EventBase):
    pass

class EventResponse(EventBase):
    id: int

    class Config:
        orm_mode = True
