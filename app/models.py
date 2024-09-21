from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Boolean, Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import ARRAY
from .database import Base
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
import uuid
from sqlalchemy.sql import func

Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, nullable=False)
    email = Column(String,nullable=False,unique=True)
    password = Column(String,nullable=False)
    firstName = Column(String)
    lastName = Column(String)
    dateCreated = Column(TIMESTAMP(timezone=True), nullable=False, server_default=func.now())  # Set default to current time
    class config:
        orm_mode=True