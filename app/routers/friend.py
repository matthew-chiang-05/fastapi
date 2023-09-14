from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from .. import models, schemas, oauth2
from .. database import get_db
from typing import List, Optional
from sqlalchemy import func

router = APIRouter(
    prefix="/friends",
    tags=['Friends']
)

@router.post("/requests", status_code=status.HTTP_201_CREATED, response_model=schemas.FriendRequestOut)
def send_friend_request(friend: schemas.FriendRequest, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    
    user = db.query(models.User).filter(models.User.id==friend.id).first()
    
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id: {friend.id} does not exist")
    
    found_friend_request = db.query(models.Friend_Request).filter(
        models.Friend_Request.user_request_id==current_user.id, models.Friend_Request.user_recieve_id==friend.id).first()
    
    if found_friend_request:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"There is already an outgoing friend request to user {friend.id}")
    
    
    new_friend_request = models.Friend_Request(user_request_id=current_user.id, user_recieve_id=friend.id)
    
    db.add(new_friend_request)
    db.commit()
    db.refresh(new_friend_request)
    
    return new_friend_request

@router.get("/requests", response_model=List[schemas.FriendRecieveOut])
def get_posts(db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    # cursor.execute("""SELECT * FROM posts """)
    # posts = cursor.fetchall()
    
    #posts = db.query(models.Post).filter(models.Post.title.contains(search)).limit(limit).offset(skip).all()
    
    results = db.query(models.Friend_Request).filter(models.Friend_Request.user_recieve_id==current_user.id)
    
    
    return results