from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import schemas
import crud
from database import get_db
from dependencies import get_current_user

router_users = APIRouter(
    prefix="/users",
    tags=["users"],
)

@router_users.post("/", response_model=schemas.UserInDB)
def create_new_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)


@router_users.get("/me", response_model=schemas.UserInDB)
async def read_users_me(current_user: schemas.UserInDB = Depends(get_current_user)):
    return current_user