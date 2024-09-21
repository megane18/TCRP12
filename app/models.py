from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Boolean, Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import ARRAY
from .database import Base
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
import uuid
from sqlalchemy.sql import func
from sqlalchemy import Column, Integer, String


Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, nullable=False)
    email = Column(String,nullable=False,unique=True)
    password = Column(String,nullable=False)
    # firstName = Column(String)
    # lastName = Column(String)
    firstName = Column(String, nullable=True)  # Set to nullable
    lastName = Column(String, nullable=True) 
    dateCreated = Column(TIMESTAMP(timezone=True), nullable=False, server_default=func.now())  # Set default to current time
    class config:
        orm_mode=True
        
class Event(Base):
    __tablename__ = "events"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    type = Column(String, index=True, nullable=False)
    description = Column(String, index=True, nullable=False)
    add_date = Column(TIMESTAMP(timezone=True), nullable=False, server_default=func.now())  # Set default to current time
    start_date = Column(TIMESTAMP(timezone=True), nullable=False)
    