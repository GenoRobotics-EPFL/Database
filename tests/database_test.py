import pytest
import sys
import os
import inspect
from typing import Type
from dotenv import load_dotenv

from pydantic import BaseModel
from sqlalchemy.orm import DeclarativeBase

sys.path.append("src")

load_dotenv()

os.environ["USE_SQLITE"] = "true"

import sqlalchemy_database
import pydantic_schemas


# extract all schemes
SCHEMES: list[tuple[str, Type[DeclarativeBase]]] = []
for key, item in sqlalchemy_database.__dict__.items():
    if key == "Base":
        continue
    if inspect.isclass(item) and issubclass(item, sqlalchemy_database.Base):
        SCHEMES.append((key, item))


@pytest.mark.parametrize("name,scheme", SCHEMES)
def test_scheme_model_db_match(name: str, scheme: Type[DeclarativeBase]):
    """
    Check that all models match exactly their scheme counterpart
    i.e. the model fields must match the scheme ones
    """
    model_name = f"{name}NoId"
    model: Type[BaseModel] = pydantic_schemas.__dict__.get(model_name, None)
    assert model is not None, f"Model not found: {model_name}"

    scheme_anns = {}
    for col in scheme.__table__.columns:
        _type = col.type.python_type
        if col.nullable:
            _type = _type | None
        scheme_anns[col.key] = _type

    # we compare with the NoId models
    scheme_anns.pop("id")

    model_anns = model.__annotations__

    assert set(model_anns.items()) == set(
        scheme_anns.items()
    ), f"Model {name}: field mismatch"
