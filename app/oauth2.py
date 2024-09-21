from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from uuid import UUID
from fastapi import HTTPException, Depends, status
from sqlalchemy.orm import Session
from . import schemas, database, models, oauth2
from .config import settings
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = oauth2.OAuth2PasswordBearer(tokenUrl="login")

SECRET_KEY = settings.secret_key
ALGORITHM = settings.algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = settings.access_token_expire_minutes

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    # Convert UUID to string if necessary
    if 'userId' in to_encode and isinstance(to_encode['userId'], UUID):
        to_encode['userId'] = str(to_encode['userId'])
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("userId")
        if user_id is None:
            raise credentials_exception
        # Convert user_id to UUID
        token_data = schemas.TokenData(userId=UUID(user_id))
        return token_data
    except (JWTError, ValueError) as e:
        raise credentials_exception

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(database.get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    # Verify the token and retrieve user data
    token_data = verify_token(token, credentials_exception)

    # Query the user from the database
    user = db.query(models.User).filter(models.User.id == token_data.userId).first()
    
    if user is None:
        raise credentials_exception  # User not found
    
    return user
