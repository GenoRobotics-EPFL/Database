from typing import Type, Any, Generator

from sqlalchemy.orm import Session
from pydantic import BaseModel

from .base import BaseCRUD
from ..database import Base, SessionLocal, engine
from .. import schemes

Base.metadata.create_all(bind=engine)


class SQLCRUD(BaseCRUD):
    def __init__(self, session: Session, scheme: Type[Base]) -> None:
        self._session = session
        self._scheme = scheme

    @classmethod
    def as_dependency(cls, model: Type[BaseModel]) -> Generator["SQLCRUD", None, None]:
        if not hasattr(schemes, model.__name__):
            raise NameError(f"Scheme '{model.__name__}' not found.")
        scheme = getattr(schemes, model.__name__)
        session = SessionLocal()
        try:
            yield cls(session, scheme)
        finally:
            session.close()

    def get(self, id: int) -> Any | None:
        return self._session.get(self._scheme, id)

    def query(self) -> list[Any]:
        return self._session.query(self._scheme).all()

    def update(self, id: int, data: BaseModel) -> bool:
        count = self._session.query(self._scheme).filter_by(id=id).update(data.dict())
        self._session.commit()
        return count == 1

    def create(self, data: BaseModel) -> Any:
        item = self._scheme(**data.dict())
        self._session.add(item)
        self._session.commit()
        self._session.refresh(item)
        return item

    def delete(self, id: int) -> Any | None:
        item = self._session.get(self._scheme, id)
        if item is None:
            return None
        self._session.delete(item)
        self._session.commit()
        return item
