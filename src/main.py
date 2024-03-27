import os
import sys
from typing import Annotated, Union
import logging

from fastapi import FastAPI, HTTPException, Depends, Header
# from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import SQLAlchemyError
from dotenv import load_dotenv

from app_routes import router
import crud as CRUD
from sqlalchemy_database import Base, ENGINE
import mock_data

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s:     %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.StreamHandler(sys.stderr),
    ]
)
logger = logging.getLogger("uvicorn")

# Envorinmental variables
load_dotenv()
API_KEY = os.environ.get("API_KEY")
SQLALCHEMY_DATABASE_URL = "sqlite:///data/test.db"
logger.info("Loaded environmental variables")

# FastAPI initialization
def auth_password(api_key: Annotated[Union[str, None], Header()] = None):
    if API_KEY is None:
        return
    if API_KEY != api_key:
        raise HTTPException(status_code=401, detail="Api-Key header invalid.")

app = FastAPI(dependencies=[Depends(auth_password)])
app.include_router(router)
logger.info("Defined the app and routes")

# Database setup
# Fill in the database with mock data if it doesn't exist
db_file = 'data/test.db'
if not os.path.exists(db_file):
    logger.info("No database file as of yet")
    try:
        Base.metadata.create_all(ENGINE)
        logger.info(f"SQLALCHEMY URL: {SQLALCHEMY_DATABASE_URL}")
        logger.info("Database creation completed.")
    except SQLAlchemyError as e:
        logger.error(f"Error occurred during database creation: {e}")
        raise
    mock_data.fill_db()
    logger.info("Filled in the database with mock data")
else:
    logger.info("Using the preexisting database file")

    




