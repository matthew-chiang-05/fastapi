from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from typing import Literal

class PostBase(BaseModel):
    title: str
    content: str
    published: bool = True
    
class PostCreate(PostBase):
    pass

class UserOut(BaseModel):
    id: int
    email: EmailStr
    created_at: datetime
    
    class Config:
        from_attributes = True
    
class Post(PostBase):
    id: int
    created_at: datetime
    owner_id: int
    owner: UserOut
    
    class Config:
        from_attributes = True

class PostOut(BaseModel):
    Post: Post
    votes: int
    
    class Config:
        from_attributes = True

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str
    
class Token(BaseModel):
    access_token: str
    token_type: str
    
class TokenData(BaseModel):
    id: Optional[str] = None

class Vote(BaseModel):
    post_id: int
    
class UserFriendOut(BaseModel):
    id: int
    email: str
    
class FriendRequest(BaseModel):
    id: int
    
class FriendRequestOut(BaseModel):
    
    user_recieve: UserFriendOut  
    created_at: datetime
    class Config:
        from_attributes = True
class FriendRecieveOut(BaseModel):
    
    user_request: UserFriendOut
    created_at: datetime
    
    class Config:
        from_attributes = True

class FriendlistOut(BaseModel):
    
    friend: UserFriendOut