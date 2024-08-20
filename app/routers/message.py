from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from .. import models, schemas, oauth2
from .. database import get_db
from typing import List, Optional
from sqlalchemy import func, or_, and_

router = APIRouter(
    prefix="/messages",
    tags=['Messages']
)

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.MessageOut)
def create_messages(message: schemas.MessageIn, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    
    friends = db.query(models.Friend).filter(models.Friend.user_id == current_user.id, models.Friend.friend_id == message.receiver_id ).first()
    
    if not friends:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id: {message.receiver_id} is not your friend")
    
    new_message = models.Message(sender_id = current_user.id, **message.model_dump())
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    return new_message

@router.get("/{id}", response_model=List[schemas.MessageOut])
def get_messages(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):

    messages = db.query(models.Message).filter(or_(and_(models.Message.sender_id == id, models.Message.receiver_id == current_user.id), and_(models.Message.sender_id == current_user.id,models.Message.receiver_id == id))).order_by(models.Message.created_at).all()

    return messages