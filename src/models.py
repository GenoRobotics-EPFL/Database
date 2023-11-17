from datetime import datetime
from pydantic import BaseModel
from typing import Union


class S3FileURL(BaseModel):
    url: str


class S3FileExists(BaseModel):
    exists: bool


class S3UploadFileStart(BaseModel):
    upload_id: str
    urls: list[str]


class S3UploadFilePart(BaseModel):
    part: int
    etag: str


class S3UploadFileEnd(BaseModel):
    upload_id: str
    parts: list[S3UploadFilePart]


class ParentModel(BaseModel):
    class Config:
        from_attributes = True


class PersonNoId(ParentModel):
    name: str
    email: str


class Person(PersonNoId):
    id: int

    class Config:
        from_attributes = True


class LocationNoId(ParentModel):
    collection_area: str
    gps: str
    elevation: int


class Location(LocationNoId):
    id: int

    class Config:
        from_attributes = True


class SampleNoId(ParentModel):
    person_id: int
    location_id: int
    name: str
    timestamp: datetime
    sex: Union[str, None]
    lifestage: Union[str, None]
    reproduction: Union[str, None]
    image_url: str
    image_timestamp: datetime
    image_desc: str


class Sample(SampleNoId):
    id: int

    class Config:
        from_attributes = True


class AmplificationMethodNoId(ParentModel):
    name: str


class AmplificationMethod(AmplificationMethodNoId):
    id: int

    class Config:
        from_attributes = True


class SequencingMethodNoId(ParentModel):
    name: str
    description: str
    type: str


class SequencingMethod(SequencingMethodNoId):
    id: int

    class Config:
        from_attributes = True


class SequencingNoId(ParentModel):
    sample_id: int
    sequencing_method_id: int
    amplification_method_id: int
    amplification_timestamp: datetime
    timestamp: datetime
    base_calling_file: str
    """
    Store the location of the file
    """


class Sequencing(SequencingNoId):
    id: int

    class Config:
        from_attributes = True


class ConsensusSegmentNoId(ParentModel):
    sequencing_id: int
    segment_sequence: str
    primer_forw_name: str
    primer_forw_seq: str
    primer_rev_name: str
    primer_rev_seq: str
    DNA_region: str
    sequence_length: int


class ConsensusSegment(ConsensusSegmentNoId):
    id: int

    class Config:
        from_attributes = True    


class PlantIdentificationNoId(ParentModel):
    sample_id: int
    sequencing_id: int
    taxonomy_id: int
    identification_method_id: int
    timestamp: datetime
    seq1_score: float
    seq2_score: float
    seq3_score: float
    seq4_score: float


class PlantIdentification(PlantIdentificationNoId):
    id: int

    class Config:
        from_attributes = True

class IdentificationMethodNoId(ParentModel):
    name: str
    description: str
    type: str
    version: int


class IdentificationMethod(IdentificationMethodNoId):
    id: int

    class Config:
        from_attributes = True

class TaxonomyNoId(ParentModel):
    domain: str
    kingdom: str
    phylum: str
    class_: str
    family: str
    species: str


class Taxonomy(TaxonomyNoId):
    id: int


    class Config:
        from_attributes = True