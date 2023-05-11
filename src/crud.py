from typing import Any, Type, Generator

from sqlalchemy.orm import Session, DeclarativeBase
from sqlalchemy.exc import DatabaseError
from pydantic import BaseModel

from database import SessionLocal
import schemes
from exceptions import DeleteFailedException


class CRUD:
    def __init__(self, session: Session, scheme: Type[DeclarativeBase]) -> None:
        self._session = session
        self._scheme = scheme

    @classmethod
    def as_dependency(cls, model: Type[BaseModel]) -> Generator["CRUD", None, None]:
        """
        Yield a new instance of the CRUD class
        """
        if not hasattr(schemes, model.__name__):
            raise NameError(f"Scheme '{model.__name__}' not found.")
        scheme = getattr(schemes, model.__name__)
        session = SessionLocal()
        try:
            yield cls(session, scheme)
        finally:
            session.close()

    def get(self, id: int) -> Any | None:
        """
        Return the item with `id` or None if not found
        """
        return self._session.get(self._scheme, id)

    def query(self) -> list[Any]:
        """
        Return the items corresponding to the `query`

        NOTE: for now this doesn't support any arguments
        """
        return self._session.query(self._scheme).all()

    def create(self, data: BaseModel) -> Any:
        """
        Create an new item with `data`

        Return the new item
        """
        item = self._scheme(**data.dict())
        self._session.add(item)
        self._session.commit()
        self._session.refresh(item)
        return item

    def update(self, id: int, data: BaseModel) -> bool:
        """
        Update an item with `id`

        Return if the item could be updated
        """
        count = self._session.query(self._scheme).filter_by(id=id).update(data.dict())
        self._session.commit()
        return count == 1

    def delete(self, id: int) -> Any | None:
        """
        Delete an item with `id`

        Return the item or None if not found
        """
        item = self._session.get(self._scheme, id)
        if item is None:
            return None
        self._session.delete(item)
        try:
            self._session.commit()
        except DatabaseError:
            raise DeleteFailedException()
        return item
