from pydantic import BaseModel, Field
from datetime import date
from typing import List, Optional

class JobBase(BaseModel):
    title: str
    company: str
    location: Optional[str] = None
    status: str
    date_applied: date

class JobCreate(JobBase):
    pass

class JobUpdate(JobBase):
    pass

class JobInDB(JobBase):
    id: int
    owner_id: int

    class Config:
        from_attributes = True


class UserBase(BaseModel):
    email: str
    first_name: str = Field(..., alias='firstName')
    last_name: str = Field(..., alias='lastName')

class UserCreate(UserBase):
    password: str

class UserInDB(UserBase):
    id: int
    jobs: List[JobInDB] = []

    class Config:
        from_attributes = True
        populate_by_name = True


class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None