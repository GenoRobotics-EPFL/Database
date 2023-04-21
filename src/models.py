from datetime import datetime
from pydantic import BaseModel


class S3FileURL(BaseModel):
    url: str


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
        orm_mode = True


class PersonNoId(ParentModel):
    name: str
    email: str


class Person(PersonNoId):
    id: int


class LocationNoId(ParentModel):
    collection_area: str
    gps: str
    elevation: int


class Location(LocationNoId):
    id: int


class SampleNoId(ParentModel):
    person_id: int
    location_id: int
    timestamp: datetime
    sex: str | None
    lifestage: str | None
    reproduction: str | None
    image_url: str
    image_timestamp: datetime
    image_desc: str


class Sample(SampleNoId):
    id: int


class AmplificationMethodNoId(ParentModel):
    name: str


class AmplificationMethod(AmplificationMethodNoId):
    id: int


class AmplificationNoId(ParentModel):
    sample_id: int
    amplification_method_id: int
    timestamp: datetime


class Amplification(AmplificationNoId):
    id: int


class SequencingMethodNoId(ParentModel):
    name: str
    description: str
    type: str


class SequencingMethod(SequencingMethodNoId):
    id: int


class SequencingNoId(ParentModel):
    sample_id: int
    amplification_id: int
    sequencing_method_id: int
    timestamp: datetime
    base_calling_file: str
    """
    Store the location of the file
    """


class Sequencing(SequencingNoId):
    id: int


class ConsensusSegmentNoId(ParentModel):
    sequence_id: int
    segment_sequence: str
    primer_name: str
    primer_desc: str
    primer2_name: str
    primer2_desc: str
    DNA_region: str
    sequence_length: int


class ConsensusSegment(ConsensusSegmentNoId):
    id: int


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


class IdentificationMethodNoId(ParentModel):
    name: str
    description: str
    type: str
    version: int


class IdentificationMethod(IdentificationMethodNoId):
    id: int


class TaxonomyNoId(ParentModel):
    sample_id: int
    identification_id: int
    domain: str
    kingdom: str
    phylum: str
    class_: str
    family: str
    species: str


class Taxonomy(TaxonomyNoId):
    id: int
