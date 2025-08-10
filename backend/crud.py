from sqlalchemy.orm import Session
from typing import Optional
import models
import schemas
import auth

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password, first_name=user.first_name, last_name=user.last_name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_jobs(db: Session, user_id: int, status: Optional[str] = None, skip: int = 0, limit: int = 100):
    query = db.query(models.Job).filter(models.Job.owner_id == user_id)
    
    if status:
        query = query.filter(models.Job.status == status)
        
    return query.offset(skip).limit(limit).all()

def create_user_job(db: Session, job: schemas.JobCreate, user_id: int):
    db_job = models.Job(**job.model_dump(), owner_id=user_id)
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job
    
def update_job(db: Session, job_id: int, job_data: schemas.JobUpdate, user_id: int):
    db_job = db.query(models.Job).filter(models.Job.id == job_id, models.Job.owner_id == user_id).first()
    if db_job:
        for key, value in job_data.model_dump().items():
            setattr(db_job, key, value)
        db.commit()
        db.refresh(db_job)
    return db_job

def delete_job(db: Session, job_id: int, user_id: int):
    db_job = db.query(models.Job).filter(models.Job.id == job_id, models.Job.owner_id == user_id).first()
    if db_job:
        db.delete(db_job)
        db.commit()
        return True
    return False