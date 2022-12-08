import os
import json
import uuid
from typing import Type, Any, Generator

from pydantic import BaseModel

from .base import BaseCRUD

FOLDER = ".db"
FILENAME = "data.json"


class FileCRUD(BaseCRUD):
    def __init__(self, data: dict) -> None:
        self._data = data

    @classmethod
    def as_dependency(cls, model: Type[BaseModel]) -> Generator["FileCRUD", None, None]:

        filepath = os.path.join(FOLDER, FILENAME)
        if not os.path.exists(filepath):
            os.makedirs(FOLDER, exist_ok=True)
            data = {}
        else:
            with open(filepath, "r") as file:
                data = json.load(file)
                # cast keys as json only store string keys
                data = {int(k): v for k, v in data.items()}

        crud = cls(data)
        try:
            yield crud
        finally:
            with open(filepath, "w") as file:
                json.dump(crud._data, file, indent=2)

    def get(self, id: int) -> Any | None:
        return self._data.get(id)

    def query(self) -> list[Any]:
        return list(self._data.values())

    def update(self, id: int, data: BaseModel) -> bool:
        if id not in self._data:
            return False
        self._data[id] = data.dict()
        return True

    def create(self, data: BaseModel) -> Any:
        id = uuid.uuid4().int
        self._data[id] = data.dict() | {"id": id}
        return self._data[id]

    def delete(self, id: int) -> Any | None:
        return self._data.pop(id, None)
