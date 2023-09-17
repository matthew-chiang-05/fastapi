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

@router.post("/requests/send/{id}", status_code=status.HTTP_201_CREATED, response_model=schemas.FriendRequestOut)
def send_friend_request(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    
    user = db.query(models.User).filter(models.User.id==id).first()
    
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id: {id} does not exist")
    
    found_friend_request = db.query(models.Friend_Request).filter(
        models.Friend_Request.user_request_id==current_user.id, models.Friend_Request.user_recieve_id==id).first()
    
    if found_friend_request:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"There is already an outgoing friend request to user {id}")
    
    found_incoming_request = db.query(models.Friend_Request).filter(
        models.Friend_Request.user_recieve_id==current_user.id,models.Friend_Request.user_request_id==id).first()
    
    if found_incoming_request:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,detail=f"User {id} has sent you a friend request already")
    
    already_friends = db.query(models.Friend).filter(models.Friend.user_id==current_user.id, models.Friend.friend_id==id).first()
    
    if already_friends:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"You are already friends with user {id}")
    
    
    new_friend_request = models.Friend_Request(user_request_id=current_user.id, user_recieve_id=id)
    
    db.add(new_friend_request)
    db.commit()
    db.refresh(new_friend_request)
    
    return new_friend_request

@router.get("/requests", response_model=List[schemas.FriendRecieveOut])
def get_friend_requests(db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    
    results = db.query(models.Friend_Request).filter(models.Friend_Request.user_recieve_id==current_user.id).all()
    
    return results

@router.post("/requests/accept/{id}")
def accept_friend_request(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    
    user = db.query(models.User).filter(models.User.id==id).first()
    
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id : {id} does not exist")
    
    already_friends = db.query(models.Friend).filter(models.Friend.user_id==current_user.id, models.Friend.friend_id==id).first()
    
    if already_friends:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"You are already friends with user {id}")
    
    accept_query = db.query(models.Friend_Request).filter(models.Friend_Request.user_request_id==id, models.Friend_Request.user_recieve_id==current_user.id)
    
    if not accept_query.first():
        raise HTTPException(status_code=status.HTTP_405_METHOD_NOT_ALLOWED,detail=f"Invalid: User {id} has not sent you a friend request")
    
    accept_query.delete(synchronize_session=False)
    
    friendlink1 = models.Friend(user_id=id, friend_id=current_user.id)
    friendlink2 = models.Friend(user_id=current_user.id, friend_id=id)
    
    #db.add(friendlink1, friendlink2)
    db.add(friendlink1)
    db.add(friendlink2)
    db.commit()
    #db.refresh(friendlink1, friendlink2)
    db.refresh(friendlink1)
    db.refresh(friendlink2)
    
    return({"message": f"You are now friends with user: {id}"})

@router.get("/", response_model=List[schemas.FriendlistOut])
def get_friends(db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    
    results = db.query(models.Friend).filter(models.Friend.user_id == current_user.id).all()
    
    return results
    
    
    
    