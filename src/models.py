from datetime import datetime
from pydantic import BaseModel, create_model, Field

from typing import Type, Union


def without_id(model: Type[BaseModel]) -> Type[BaseModel]:
    """
    Return the same class with the `id` field optional
    """
    return create_model(
        f"Unidentified{model.__name__}",
        id=(Union[int, None], None),
        __base__=model,
    )


class Person(BaseModel):
    id: int
    name: str
    email: str


class Location(BaseModel):
    id: int
    collection_area: str
    gps: str
    elevation: int


class Sample(BaseModel):
    id: int
    person_id: int
    location_id: int
    timestamp: datetime
    image_url: str
    image_timestamp: datetime
    image_desc: str


class AmplificationMethod(BaseModel):
    id: int
    name: str


class Amplification(BaseModel):
    id: int
    sample_id: int
    amplification_method_id: int
    timestamp: datetime


class SequencingMethod(BaseModel):
    id: int
    name: str
    description: str
    type: str


class Sequencing(BaseModel):
    id: int
    sample_id: int
    amplification_id: int
    sequencing_method_id: int
    timestamp: datetime
    base_calling_file: str
    """
    Store the location of the file
    """
    primer_code: str
    sequence_length: str
    barcode: str
    primer_desc: str


class PlantIdentification(BaseModel):
    id: int
    sample_id: int
    sequencing_id: int
    taxonomy_id: int
    identification_method_id: int
    timestamp: datetime
    sex: str | None
    lifestage: str | None
    reproduction: str | None


class IdentificationMethod(BaseModel):
    id: int
    name: str
    description: str
    type: str
    version: int


class Taxonomy(BaseModel):
    id: int
    domain: str
    kingdom: str
    phylum: str
    class_: str
    family: str
    species: str
    