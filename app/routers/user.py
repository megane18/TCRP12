from fastapi import Depends,Response,HTTPException,status,APIRouter
from sqlalchemy.orm import Session
from ..database import engine,SessionLocal,get_db
from .. import models,schemas,utils
from fastapi.encoders import jsonable_encoder
from uuid import UUID

router=APIRouter(
    prefix="/users",
    tags=["users"]
)

@router.post("/",status_code=status.HTTP_201_CREATED,response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate,db: Session=Depends(get_db)):
    hashedPassword=utils.hash(user.password)
    user.password=hashedPassword
    user_in_db = db.query(models.User).filter(models.User.email == user.email).first()
    if user_in_db:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")
    
    newUser=models.User(**user.model_dump())
    db.add(newUser)
    db.commit()
    db.refresh(newUser)
    return newUser

#the reason i commented this line of code out is because when i tried to get the user, I get this error:
#"detail":[{"type":"int_parsing","loc":["path","id"],"msg":"Input should be a valid integer, unable to parse string as an integer"
#I fixed it by changin id: int to id: UUID and str(id) to id
# @router.get("/{id}",response_model=schemas.UserResponse)
# def get_user(id: int,db: Session=Depends(get_db)):
#     user=db.query(models.User).filter(models.User.id==str(id)).first()
#     if not user:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
#     return jsonable_encoder(user)

@router.get("/{id}",response_model=schemas.UserResponse)
def get_user(id: UUID,db: Session=Depends(get_db)):
    user=db.query(models.User).filter(models.User.id==id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return jsonable_encoder(user)