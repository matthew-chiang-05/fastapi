from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP
from .database import Base
from sqlalchemy.orm import relationship

class Post(Base):
    __tablename__ = "posts"
    
    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    published = Column(Boolean, server_default= 'True')
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default= text('NOW()'))
    owner_id = Column(Integer, ForeignKey("users.id",ondelete="CASCADE"), nullable=False)
    
    owner = relationship("User")
    
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default= text('NOW()'))
    
class Vote(Base):
    __tablename__ = "votes"
    
    user_id = Column(Integer, ForeignKey("users.id",ondelete="CASCADE"), primary_key=True)
    post_id = Column(Integer, ForeignKey("posts.id", ondelete="CASCADE"), primary_key=True)
    

class Friend_Request(Base):
    __tablename__ = "friend_requests"
    
    user_request_id = Column(Integer, ForeignKey("users.id",ondelete="CASCADE"), primary_key=True)
    
    user_recieve_id = Column(Integer, ForeignKey("users.id",ondelete="CASCADE"), primary_key=True)
    
    user_request = relationship("User", foreign_keys=[user_request_id])
    
    user_recieve = relationship("User", foreign_keys=[user_recieve_id])
    

class Friend(Base):
    __tablename__ = "friends"
    
    user_id = Column(Integer, ForeignKey("users.id",ondelete="CASCADE"), primary_key=True)
    
    friend_id = Column(Integer, ForeignKey("users.id",ondelete="CASCADE"), primary_key=True)
    
    user = relationship("User", foreign_keys=[user_id])
    
    friend = relationship("User", foreign_keys=[friend_id])