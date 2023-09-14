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

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.FriendRequestOut)
def send_friend_request(friend: schemas.FriendRequest, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    # cursor.execute("""INSERT INTO posts (title, content, published) VALUES (%s, %s, %s) RETURNING * """, 
    #                 (post.title, post.content, post.published))
    # new_post = cursor.fetchone()
    # conn.commit()
    new_friend_request = models.Friend_Request(user_request_id=current_user.id, user_recieve_id=friend.id)
    db.add(new_friend_request)
    db.commit()
    db.refresh(new_friend_request)
    return new_friend_request