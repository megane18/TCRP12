from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db
import logging
from typing import List

router = APIRouter(
    prefix="/events",
    tags=["events"]
)

# Set up basic logging
logging.basicConfig(level=logging.INFO)

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.EventResponse)
def create_event(event: schemas.EventCreate, db: Session = Depends(get_db)):
    logging.info(f"Creating a new event with name: {event.name}")
    
    new_event = models.Event(
        name=event.name,
        type=event.type,
        description=event.description,
        start_date=event.start_date
    )
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
        "start_date": event.start_date
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
