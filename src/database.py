import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

if os.environ.get("USE_SQLITE") is not None:
    SQLALCHEMY_DATABASE_URL = "sqlite://"
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
