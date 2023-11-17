import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from schemes import Base
import logging
from sqlalchemy.exc import SQLAlchemyError

logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s:     %(message)s"
)

if os.environ.get("USE_SQLITE") is not None:
    SQLALCHEMY_DATABASE_URL = "sqlite:///test.db"
elif os.environ.get("USE_MYSQL") is not None:
    ENGINE = "mysql+pymysql"
    USERNAME = os.environ["MYSQLUSER"]
    PASSWORD = os.environ["MYSQLPASSWORD"]
    HOST = os.environ["MYSQLHOST"]
    PORT = os.environ["MYSQLPORT"]
    DATABASE = os.environ["MYSQLDATABASE"]
    SQLALCHEMY_DATABASE_URL = (
        f"{ENGINE}://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}"
    )
else:
    ENGINE = "postgresql+psycopg2"
    USERNAME = os.environ["PGUSER"]
    PASSWORD = os.environ["PGPASSWORD"]
    HOST = os.environ["PGHOST"]
    PORT = os.environ["PGPORT"]
    DATABASE = os.environ["PGDATABASE"]
    SQLALCHEMY_DATABASE_URL = (
        f"{ENGINE}://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}"
    )


engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def create_database():
    try:
        Base.metadata.create_all(engine)
        logging.info(f"SQLALCHEMY URL: {SQLALCHEMY_DATABASE_URL}")
        logging.info("Database creation completed.")
    except SQLAlchemyError as e:
        logging.error(f"Error occurred during database creation: {e}")
        raise
