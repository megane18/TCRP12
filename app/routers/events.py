from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db
import logging
from typing import List
import uuid
import os
from datetime import datetime


router = APIRouter(
    prefix="/events",
    tags=["events"]
)

IMAGEDIR = "images/"

# Set up basic logging
logging.basicConfig(level=logging.INFO)

from fastapi import Form

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.EventResponse)
async def create_event(
    name: str = Form(...),
    type: str = Form(...),
    description: str = Form(...),
    start_date: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    logging.info(f"Creating a new event with name: {name}")

    try:
        parsed_start_date = datetime.fromisoformat(start_date)  # Accepts ISO 8601 with timezone
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid start_date format. Expected format: 'YYYY-MM-DD HH:MM:SS.ssssss±HH:MM'.")

    os.makedirs(IMAGEDIR, exist_ok=True)

    
    # Generate a unique filename and save the file
    file.filename = f"{uuid.uuid4()}.jpg"
    contents = await file.read()

    with open(f"{IMAGEDIR}{file.filename}", "wb") as f:
        f.write(contents)

    # Create the event record
    new_event = models.Event(
        name=name,
        type=type,
        description=description,
        start_date=parsed_start_date,
        filename=file.filename
    )

    # Save the event in the database
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    logging.info(f"Event created with ID: {new_event.id}")

    return new_event


@router.put("/{id}", response_model=schemas.EventResponse)
def update_event(id: int, event: schemas.EventCreate, db: Session = Depends(get_db)):
    # Query the database for the event by ID
    event_in_db_query = db.query(models.Event).filter(models.Event.id == id)
    event_in_db = event_in_db_query.first()
    
    if not event_in_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
    
    # Update the event with the new data
    event_in_db_query.update({
        "name": event.name,
        "type": event.type,
        "description": event.description,
        "start_date": event.start_date,
        "filename": event_in_db.filename
    })
    
    db.commit()
    
    logging.info(f"Event with ID {id} updated")
    return event_in_db

@router.get("/", response_model=List[schemas.EventResponse])
def get_events(db: Session = Depends(get_db)):
    events = db.query(models.Event).all()
    logging.info(f"Fetching {len(events)} events from the database")
    
    if not events:
        return []
    return events

@router.get("/{id}", response_model=schemas.EventResponse)
def get_event(id: int, db: Session = Depends(get_db)):
    # Query the database for the event by ID
    event = db.query(models.Event).filter(models.Event.id == id).first()
    
    if not event:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
    
    logging.info(f"Fetching event with ID {id}")
    return event



@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_event(id: int, db: Session = Depends(get_db)):
    # Find the event by id
    event = db.query(models.Event).filter(models.Event.id == id).first()
    
    if event is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
    
    # Delete the event from the database
    db.delete(event)
    db.commit()
    
    logging.info(f"Event with ID {id} deleted")
    return {"message": "Event deleted successfully"}
