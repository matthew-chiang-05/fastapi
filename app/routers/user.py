from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from .. import models, schemas, utils
from .. database import get_db
from typing import List, Optional


router = APIRouter(
    prefix="/users",
    tags = ['Users']
)

@router.get("/", response_model=List[schemas.UserOut])
def get_users(db: Session = Depends(get_db), limit: int = 10, skip: int = 0, search: Optional[str] = ""):
    
    results = db.query(models.User).filter(models.User.email.contains(search)).limit(limit).offset(skip).all()
    
    return results

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    
    # Hash the password
    hashed_password = utils.hash(user.password)
    user.password = hashed_password
    
    new_user = models.User(**user.model_dump())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.get("/{id}", response_model=schemas.UserOut)
def get_user(id: int, db: Session = Depends(get_db)):
    
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"user with id: {id} was not found")
    
    return user

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(id: int, db: Session = Depends(get_db)):
    
    pass