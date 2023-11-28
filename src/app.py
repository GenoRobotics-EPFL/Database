import os
from typing import Annotated, Type, Union

from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import database

load_dotenv()

from models import (
    S3FileExists,
    S3UploadFileEnd,
    S3UploadFileStart,
    S3FileURL,
    Person,
    PersonNoId,
    Location,
    LocationNoId,
    Sequencing,
    SequencingNoId,
    SequencingMethod,
    SequencingMethodNoId,
    Sample,
    SampleNoId,
    ConsensusSegment,
    ConsensusSegmentNoId,
    PlantIdentification,
    PlantIdentificationNoId,
    AmplificationMethod,
    AmplificationMethodNoId,
    IdentificationMethod,
    IdentificationMethodNoId,
    Taxonomy,
    TaxonomyNoId,
)

from crud import CRUD
import s3
import exceptions as exc
import utils

API_KEY = os.environ.get("API_KEY")

s3.assert_bucket_exist()


def get_crud(model: Type[BaseModel]) -> CRUD:
    def inner():
        yield from CRUD.as_dependency(model)

    return inner


def auth_password(api_key: Annotated[Union[str, None], Header()] = None):
    if API_KEY is None:
        return
    if API_KEY != api_key:
        raise HTTPException(status_code=401, detail="Api-Key header invalid.")


app = FastAPI(dependencies=[Depends(auth_password)])


# Uncomment the following line to fill the database with mock data
# Note: this should only be done once and NOT on the prod db

if __name__ == "__main__":
    db_file = 'data/test.db'

    if not os.path.exists(db_file):
        database.create_database()
        utils.fill_db()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        # "https://genorobotics.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/files/download/url/{filename}")
def upload_file_url(filename: str) -> S3FileURL:
    url = s3.get_download_file_url(filename)
    return S3FileURL(url=url)


@app.get("/files/upload/url/{filename}")
def upload_file_url(filename: str) -> S3FileURL:
    url = s3.get_upload_file_url(filename)
    return S3FileURL(url=url)


@app.post("/files/upload/large-start/{filename}")
def upload_large_file_start(filename: str, n_parts: int) -> S3UploadFileStart:
    return s3.get_upload_large_file_data(filename, n_parts)


@app.post("/files/upload/large-complete/{filename}")
def upload_large_file_complete(filename: str, body: S3UploadFileEnd):
    s3.complete_upload_large_file(filename, body)


@app.get("/files/exists/{filename}")
def check_file_exists(filename: str) -> S3FileExists:
    exists = s3.file_exists(filename)
    return S3FileExists(exists=exists)


@app.delete("/files/{filename}")
def delete_file(filename: str):
    s3.delete_file(filename)


@app.get("/persons", response_model=list[Person])
def persons(crud: CRUD = Depends(get_crud(Person))):
    return crud.query()


@app.get("/persons/{id}", response_model=Person)
def persons(id: int, crud: CRUD = Depends(get_crud(Person))):
    item = crud.get(id)
    if item is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return item


@app.put("/persons/{id}", response_model=Person)
def persons(id: int, body: PersonNoId, crud: CRUD = Depends(get_crud(Person))):
    body.id = id
    updated = crud.update(id, body)
    if not updated:
        raise HTTPException(status_code=404, detail="Item not found")
    return body


@app.post("/persons", response_model=Person)
def persons(body: PersonNoId, crud: CRUD = Depends(get_crud(Person))):
    return crud.create(body)


@app.delete("/persons/{id}", response_model=Person)
def persons(id: int, crud: CRUD = Depends(get_crud(Person))):
    try:
        item = crud.delete(id)
    except exc.DeleteFailedException:
        raise HTTPException(status_code=400, detail=f"Can't delete item {id}")
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.get("/sequencing_methods", response_model=list[SequencingMethod])
def sequencing_methods(crud: CRUD = Depends(get_crud(SequencingMethod))):
    return crud.query()


@app.get("/sequencing_methods/{id}", response_model=SequencingMethod)
def sequencing_methods(id: int, crud: CRUD = Depends(get_crud(SequencingMethod))):
    item = crud.get(id)
    if item is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return item


@app.put("/sequencing_methods/{id}", response_model=SequencingMethod)
def sequencing_methods(
    id: int,
    body: SequencingMethodNoId,
    crud: CRUD = Depends(get_crud(SequencingMethod)),
):
    body.id = id
    updated = crud.update(id, body)
    if not updated:
        raise HTTPException(status_code=404, detail="Item not found")
    return body


@app.post("/sequencing_methods", response_model=SequencingMethod)
def sequencing_methods(
    body: SequencingMethodNoId,
    crud: CRUD = Depends(get_crud(SequencingMethod)),
):
    return crud.create(body)


@app.delete("/sequencing_methods/{id}", response_model=SequencingMethod)
def sequencing_methods(id: int, crud: CRUD = Depends(get_crud(SequencingMethod))):
    try:
        item = crud.delete(id)
    except exc.DeleteFailedException:
        raise HTTPException(status_code=400, detail=f"Can't delete item {id}")
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.get("/samples", response_model=list[Sample])
def samples(crud: CRUD = Depends(get_crud(Sample))):
    return crud.query()


@app.get("/samples/{id}", response_model=Sample)
def samples(id: int, crud: CRUD = Depends(get_crud(Sample))):
    item = crud.get(id)
    if item is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return item


@app.put("/samples/{id}", response_model=Sample)
def samples(id: int, body: SampleNoId, crud: CRUD = Depends(get_crud(Sample))):
    body.id = id
    updated = crud.update(id, body)
    if not updated:
        raise HTTPException(status_code=404, detail="Item not found")
    return body


@app.post("/samples", response_model=Sample)
def samples(body: SampleNoId, crud: CRUD = Depends(get_crud(Sample))):
    return crud.create(body)


@app.delete("/samples/{id}", response_model=Sample)
def samples(id: int, crud: CRUD = Depends(get_crud(Sample))):
    try:
        item = crud.delete(id)
    except exc.DeleteFailedException:
        raise HTTPException(status_code=400, detail=f"Can't delete item {id}")
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.get("/consensus_segments", response_model=list[ConsensusSegment])
def consensus_segments(crud: CRUD = Depends(get_crud(ConsensusSegment))):
    return crud.query()


@app.get("/consensus_segments/{id}", response_model=ConsensusSegment)
def consensus_segments(id: int, crud: CRUD = Depends(get_crud(ConsensusSegment))):
    item = crud.get(id)
    if item is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return item


@app.put("/consensus_segments/{id}", response_model=ConsensusSegment)
def consensus_segments(
    id: int,
    body: ConsensusSegmentNoId,
    crud: CRUD = Depends(get_crud(ConsensusSegment)),
):
    body.id = id
    updated = crud.update(id, body)
    if not updated:
        raise HTTPException(status_code=404, detail="Item not found")
    return body


@app.post("/consensus_segments", response_model=ConsensusSegment)
def consensus_segments(
    body: ConsensusSegmentNoId,
    crud: CRUD = Depends(get_crud(ConsensusSegment)),
):
    return crud.create(body)


@app.delete("/consensus_segments/{id}", response_model=ConsensusSegment)
def consensus_segments(id: int, crud: CRUD = Depends(get_crud(ConsensusSegment))):
    try:
        item = crud.delete(id)
    except exc.DeleteFailedException:
        raise HTTPException(status_code=400, detail=f"Can't delete item {id}")
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.get("/sequencings", response_model=list[Sequencing])
def sequencings(crud: CRUD = Depends(get_crud(Sequencing))):
    return crud.query()


@app.get("/sequencings/{id}", response_model=Sequencing)
def sequencings(id: int, crud: CRUD = Depends(get_crud(Sequencing))):
    item = crud.get(id)
    if item is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return item


@app.put("/sequencings/{id}", response_model=Sequencing)
def sequencings(
    id: int,
    body: SequencingNoId,
    crud: CRUD = Depends(get_crud(Sequencing)),
):
    body.id = id
    updated = crud.update(id, body)
    if not updated:
        raise HTTPException(status_code=404, detail="Item not found")
    return body


@app.post("/sequencings", response_model=Sequencing)
def sequencings(body: SequencingNoId, crud: CRUD = Depends(get_crud(Sequencing))):
    return crud.create(body)


@app.delete("/sequencings/{id}", response_model=Sequencing)
def sequencings(id: int, crud: CRUD = Depends(get_crud(Sequencing))):
    try:
        item = crud.delete(id)
    except exc.DeleteFailedException:
        raise HTTPException(status_code=400, detail=f"Can't delete item {id}")
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.get("/plant_identifications", response_model=list[PlantIdentification])
def plant_identifications(crud: CRUD = Depends(get_crud(PlantIdentification))):
    return crud.query()


@app.get("/plant_identifications/{id}", response_model=PlantIdentification)
def plant_identifications(id: int, crud: CRUD = Depends(get_crud(PlantIdentification))):
    item = crud.get(id)
    if item is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return item


@app.put("/plant_identifications/{id}", response_model=PlantIdentification)
def plant_identifications(
    id: int,
    body: PlantIdentificationNoId,
    crud: CRUD = Depends(get_crud(PlantIdentification)),
):
    body.id = id
    updated = crud.update(id, body)
    if not updated:
        raise HTTPException(status_code=404, detail="Item not found")
    return body


@app.post("/plant_identifications", response_model=PlantIdentification)
def plant_identifications(
    body: PlantIdentificationNoId,
    crud: CRUD = Depends(get_crud(PlantIdentification)),
):
    return crud.create(body)


@app.delete("/plant_identifications/{id}", response_model=PlantIdentification)
def plant_identifications(id: int, crud: CRUD = Depends(get_crud(PlantIdentification))):
    try:
        item = crud.delete(id)
    except exc.DeleteFailedException:
        raise HTTPException(status_code=400, detail=f"Can't delete item {id}")
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.get("/amplification_methods", response_model=list[AmplificationMethod])
def amplification_methods(crud: CRUD = Depends(get_crud(AmplificationMethod))):
    return crud.query()


@app.get("/amplification_methods/{id}", response_model=AmplificationMethod)
def amplification_methods(id: int, crud: CRUD = Depends(get_crud(AmplificationMethod))):
    item = crud.get(id)
    if item is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return item


@app.put("/amplification_methods/{id}", response_model=AmplificationMethod)
def amplification_methods(
    id: int,
    body: AmplificationMethodNoId,
    crud: CRUD = Depends(get_crud(AmplificationMethod)),
):
    body.id = id
    updated = crud.update(id, body)
    if not updated:
        raise HTTPException(status_code=404, detail="Item not found")
    return body


@app.post("/amplification_methods", response_model=AmplificationMethod)
def amplification_methods(
    body: AmplificationMethodNoId,
    crud: CRUD = Depends(get_crud(AmplificationMethod)),
):
    return crud.create(body)


@app.delete("/amplification_methods/{id}", response_model=AmplificationMethod)
def amplification_methods(id: int, crud: CRUD = Depends(get_crud(AmplificationMethod))):
    try:
        item = crud.delete(id)
    except exc.DeleteFailedException:
        raise HTTPException(status_code=400, detail=f"Can't delete item {id}")
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.get("/identification_methods", response_model=list[IdentificationMethod])
def identification_method(crud: CRUD = Depends(get_crud(IdentificationMethod))):
    return crud.query()


@app.get("/identification_methods/{id}", response_model=IdentificationMethod)
def identification_method(
    id: int, crud: CRUD = Depends(get_crud(IdentificationMethod))
):
    item = crud.get(id)
    if item is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return item


@app.put("/identification_methods/{id}", response_model=IdentificationMethod)
def identification_method(
    id: int,
    body: IdentificationMethodNoId,
    crud: CRUD = Depends(get_crud(IdentificationMethod)),
):
    body.id = id
    updated = crud.update(id, body)
    if not updated:
        raise HTTPException(status_code=404, detail="Item not found")
    return body


@app.post("/identification_methods", response_model=IdentificationMethod)
def identification_method(
    body: IdentificationMethodNoId,
    crud: CRUD = Depends(get_crud(IdentificationMethod)),
):
    return crud.create(body)


@app.delete("/identification_methods/{id}", response_model=IdentificationMethod)
def identification_method(
    id: int, crud: CRUD = Depends(get_crud(IdentificationMethod))
):
    try:
        item = crud.delete(id)
    except exc.DeleteFailedException:
        raise HTTPException(status_code=400, detail=f"Can't delete item {id}")
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.get("/locations", response_model=list[Location])
def locations(crud: CRUD = Depends(get_crud(Location))):
    return crud.query()


@app.get("/locations/{id}", response_model=Location)
def locations(id: int, crud: CRUD = Depends(get_crud(Location))):
    item = crud.get(id)
    if item is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return item


@app.put("/locations/{id}", response_model=Location)
def locations(id: int, body: LocationNoId, crud: CRUD = Depends(get_crud(Location))):
    body.id = id
    updated = crud.update(id, body)
    if not updated:
        raise HTTPException(status_code=404, detail="Item not found")
    return body


@app.post("/locations", response_model=Location)
def locations(body: LocationNoId, crud: CRUD = Depends(get_crud(Location))):
    return crud.create(body)


@app.delete("/locations/{id}", response_model=Location)
def locations(id: int, crud: CRUD = Depends(get_crud(Location))):
    try:
        item = crud.delete(id)
    except exc.DeleteFailedException:
        raise HTTPException(status_code=400, detail=f"Can't delete item {id}")
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.get("/taxonomies", response_model=list[Taxonomy])
def taxonomies(crud: CRUD = Depends(get_crud(Taxonomy))):
    return crud.query()


@app.get("/taxonomies/{id}", response_model=Taxonomy)
def taxonomies(id: int, crud: CRUD = Depends(get_crud(Taxonomy))):
    item = crud.get(id)
    if item is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return item


@app.put("/taxonomies/{id}", response_model=Taxonomy)
def taxonomies(id: int, body: TaxonomyNoId, crud: CRUD = Depends(get_crud(Taxonomy))):
    body.id = id
    updated = crud.update(id, body)
    if not updated:
        raise HTTPException(status_code=404, detail="Item not found")
    return body


@app.post("/taxonomies", response_model=Taxonomy)
def taxonomies(body: TaxonomyNoId, crud: CRUD = Depends(get_crud(Taxonomy))):
    return crud.create(body)


@app.delete("/taxonomies/{id}", response_model=Taxonomy)
def taxonomies(id: int, crud: CRUD = Depends(get_crud(Taxonomy))):
    try:
        item = crud.delete(id)
    except exc.DeleteFailedException:
        raise HTTPException(status_code=400, detail=f"Can't delete item {id}")
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

