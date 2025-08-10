from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from schemas import JobCreate, JobInDB, JobUpdate
from crud import create_user_job, get_jobs, update_job, delete_job
from database import get_db
from dependencies import get_current_user
from models import User

router_jobs = APIRouter(
    prefix="/jobs",
    tags=["jobs"],
    dependencies=[Depends(get_current_user)],
    responses={404: {"description": "Not found"}},
)

@router_jobs.post("/", response_model=JobInDB, status_code=status.HTTP_201_CREATED)
def create_new_job(job: JobCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return create_user_job(db=db, job=job, user_id=current_user.id)

@router_jobs.get("/", response_model=List[JobInDB])
def read_jobs(
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user),
    status: Optional[str] = None
):
    jobs = get_jobs(db, user_id=current_user.id, status=status)
    return jobs

@router_jobs.put("/{job_id}", response_model=JobInDB)
def update_existing_job(job_id: int, job: JobUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_job = update_job(db=db, job_id=job_id, job_data=job, user_id=current_user.id)
    if db_job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return db_job

@router_jobs.delete("/{job_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_job(job_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    success = delete_job(db=db, job_id=job_id, user_id=current_user.id)
    if not success:
        raise HTTPException(status_code=404, detail="Job not found")