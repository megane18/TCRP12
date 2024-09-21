from fastapi import APIRouter, Depends, HTTPException, status,Response
from sqlalchemy.orm import Session
from .. import schemas,models, utils, oauth2
from fastapi.security.oauth2 import OAuth2PasswordRequestForm


from ..database import SessionLocal, get_db

router = APIRouter(tags=["Authentication"])

@router.post("/login", response_model=schemas.Token)
def login(userCredentials: OAuth2PasswordRequestForm = Depends(),db: Session = Depends(get_db)):
    user=db.query(models.User).filter(models.User.email==userCredentials.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Invalid credentials")
    if not utils.verifyPassword(userCredentials.password,user.password):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Invalid password")
    
    
    accessToken = oauth2.create_access_token(data={"userId": user.id})
    return {"access_token": accessToken, "token_type": "bearer", "userId": user.id}