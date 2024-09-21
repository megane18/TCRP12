from fastapi import APIRouter, Depends,status
from sqlalchemy.orm import Session
from ..database import engine,SessionLocal,get_db
from .. import models,schemas,utils
from fastapi.encoders import jsonable_encoder
from uuid import UUID
from ..utils import get_gemini_repsonse

router=APIRouter(
    prefix="/chat",
    tags=["chat"]
)

@router.post("/",status_code=status.HTTP_201_CREATED,response_model=schemas.ChatResponse)
async def get_response(chat: schemas.GetChat):
    response=await get_gemini_repsonse(chat.message)
    return {"message": response}