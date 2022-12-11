import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


USERNAME = os.environ["MYSQL_USERNAME"]
PASSWORD = os.environ["MYSQL_PASSWORD"]
DATABASE = "genorobotics"

SQLALCHEMY_DATABASE_URL = (
    f"mysql+mysqldb://{USERNAME}:{PASSWORD}@localhost:3306/{DATABASE}"
)
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
