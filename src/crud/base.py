from abc import ABC, abstractmethod
from typing import Any, Type, Generator

from pydantic import BaseModel


class BaseCRUD(ABC):
    """
    Base class for CRUD operations
    """

    @classmethod
    @abstractmethod
    def as_dependency(cls, model: Type[BaseModel]) -> Generator["BaseCRUD", None, None]:
        """
        Yield a new instance of the CRUD class
        """

    @abstractmethod
    def get(self, id: int) -> Any | None:
        """
        Return the item with `id` or None if not found
        """

    @abstractmethod
    def query(self) -> list[Any]:
        """
        Return the items corresponding to the `query`

        NOTE: for now this doesn't support any arguments
        """

    @abstractmethod
    def create(self, data: BaseModel) -> Any:
        """
        Create an new item with `data`

        Return the new item
        """

    @abstractmethod
    def update(self, id: int, data: BaseModel) -> bool:
        """
        Update an item with `id`

        Return if the item could be updated
        """

    @abstractmethod
    def delete(self, id: int) -> Any | None:
        """
        Delete an item with `id`

        Return the item or None if not found
        """
