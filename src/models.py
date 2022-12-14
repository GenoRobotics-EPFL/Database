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


class ParentModel(BaseModel):
    class Config:
        orm_mode = True


class Person(ParentModel):
    id: int
    name: str
    email: str


class Location(ParentModel):
    id: int
    collection_area: str
    gps: str
    elevation: int


class Sample(ParentModel):
    id: int
    person_id: int
    location_id: int
    timestamp: datetime
    image_url: str
    image_timestamp: datetime
    image_desc: str


class AmplificationMethod(ParentModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class Amplification(ParentModel):
    id: int
    sample_id: int
    amplification_method_id: int
    timestamp: datetime


class SequencingMethod(ParentModel):
    id: int
    name: str
    description: str
    type: str


class Sequencing(ParentModel):
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
    sequence_length: int
    barcode: str
    primer_desc: str


class PlantIdentification(ParentModel):
    id: int
    sample_id: int
    sequencing_id: int
    taxonomy_id: int
    identification_method_id: int
    timestamp: datetime
    sex: str or None
    lifestage: str or None
    reproduction: str or None


class IdentificationMethod(ParentModel):
    id: int
    name: str
    description: str
    type: str
    version: int


class Taxonomy(ParentModel):
    id: int
    domain: str
    kingdom: str
    phylum: str
    class_: str
    family: str
    species: str
