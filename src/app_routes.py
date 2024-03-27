from fastapi import APIRouter, HTTPException, Depends
from typing import Annotated, Type, Union

from pydantic_schemas import *
from crud import CRUD
import exceptions as exc
import s3

router = APIRouter()

s3.assert_bucket_exist()

def get_crud(model: Type[BaseModel]) -> CRUD:
    def inner():
        yield from CRUD.as_dependency(model)

    return inner


@router.get("/files/download/url/{filename}")
def upload_file_url(filename: str) -> S3FileURL:
    url = s3.get_download_file_url(filename)
    return S3FileURL(url=url)


@router.get("/files/upload/url/{filename}")
def upload_file_url(filename: str) -> S3FileURL:
    url = s3.get_upload_file_url(filename)
    return S3FileURL(url=url)


@router.post("/files/upload/large-start/{filename}")
def upload_large_file_start(filename: str, n_parts: int) -> S3UploadFileStart:
    return s3.get_upload_large_file_data(filename, n_parts)


@router.post("/files/upload/large-complete/{filename}")
def upload_large_file_complete(filename: str, body: S3UploadFileEnd):
    s3.complete_upload_large_file(filename, body)


@router.get("/files/exists/{filename}")
def check_file_exists(filename: str) -> S3FileExists:
    exists = s3.file_exists(filename)
    return S3FileExists(exists=exists)


@router.delete("/files/{filename}")
def delete_file(filename: str):
    s3.delete_file(filename)


@router.get("/persons", response_model=list[Person])
def persons(crud: CRUD = Depends(get_crud(Person))):
    return crud.query()


@router.get("/persons/{id}", response_model=Person)
def persons(id: int, crud: CRUD = Depends(get_crud(Person))):
    item = crud.get(id)
    if item is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return item

@router.put("/persons/{id}", response_model=Person)
def persons(id: int, body: PersonNoId, crud: CRUD = Depends(get_crud(Person))):
    body.id = id
    updated = crud.update(id, body)
    if not updated:
        raise HTTPException(status_code=404, detail="Item not found")
    return body


@router.post("/persons", response_model=Person)
def persons(body: PersonNoId, crud: CRUD = Depends(get_crud(Person))):
    return crud.create(body)


@router.delete("/persons/{id}", response_model=Person)
def persons(id: int, crud: CRUD = Depends(get_crud(Person))):
    try:
        item = crud.delete(id)
    except exc.DeleteFailedException:
        raise HTTPException(status_code=400, detail=f"Can't delete item {id}")
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@router.get("/sequencing_methods", response_model=list[SequencingMethod])
def sequencing_methods(crud: CRUD = Depends(get_crud(SequencingMethod))):
    return crud.query()


@router.get("/sequencing_methods/{id}", response_model=SequencingMethod)
def sequencing_methods(id: int, crud: CRUD = Depends(get_crud(SequencingMethod))):
    item = crud.get(id)
    if item is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return item


@router.put("/sequencing_methods/{id}", response_model=SequencingMethod)
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


@router.post("/sequencing_methods", response_model=SequencingMethod)
def sequencing_methods(
    body: SequencingMethodNoId,
    crud: CRUD = Depends(get_crud(SequencingMethod)),
):
    return crud.create(body)


@router.delete("/sequencing_methods/{id}", response_model=SequencingMethod)
def sequencing_methods(id: int, crud: CRUD = Depends(get_crud(SequencingMethod))):
    try:
        item = crud.delete(id)
    except exc.DeleteFailedException:
        raise HTTPException(status_code=400, detail=f"Can't delete item {id}")
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@router.get("/samples", response_model=list[Sample])
def samples(crud: CRUD = Depends(get_crud(Sample))):
    return crud.query()


@router.get("/samples/{id}", response_model=Sample)
def samples(id: int, crud: CRUD = Depends(get_crud(Sample))):
    item = crud.get(id)
    if item is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return item


@router.put("/samples/{id}", response_model=Sample)
def samples(id: int, body: SampleNoId, crud: CRUD = Depends(get_crud(Sample))):
    body.id = id
    updated = crud.update(id, body)
    if not updated:
        raise HTTPException(status_code=404, detail="Item not found")
    return body


@router.post("/samples", response_model=Sample)
def samples(body: SampleNoId, crud: CRUD = Depends(get_crud(Sample))):
    return crud.create(body)


@router.delete("/samples/{id}", response_model=Sample)
def samples(id: int, crud: CRUD = Depends(get_crud(Sample))):
    try:
        item = crud.delete(id)
    except exc.DeleteFailedException:
        raise HTTPException(status_code=400, detail=f"Can't delete item {id}")
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@router.get("/consensus_segments", response_model=list[ConsensusSegment])
def consensus_segments(crud: CRUD = Depends(get_crud(ConsensusSegment))):
    return crud.query()


@router.get("/consensus_segments/{id}", response_model=ConsensusSegment)
def consensus_segments(id: int, crud: CRUD = Depends(get_crud(ConsensusSegment))):
    item = crud.get(id)
    if item is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return item


@router.put("/consensus_segments/{id}", response_model=ConsensusSegment)
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


@router.post("/consensus_segments", response_model=ConsensusSegment)
def consensus_segments(
    body: ConsensusSegmentNoId,
    crud: CRUD = Depends(get_crud(ConsensusSegment)),
):
    return crud.create(body)


@router.delete("/consensus_segments/{id}", response_model=ConsensusSegment)
def consensus_segments(id: int, crud: CRUD = Depends(get_crud(ConsensusSegment))):
    try:
        item = crud.delete(id)
    except exc.DeleteFailedException:
        raise HTTPException(status_code=400, detail=f"Can't delete item {id}")
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@router.get("/sequencings", response_model=list[Sequencing])
def sequencings(crud: CRUD = Depends(get_crud(Sequencing))):
    return crud.query()


@router.get("/sequencings/{id}", response_model=Sequencing)
def sequencings(id: int, crud: CRUD = Depends(get_crud(Sequencing))):
    item = crud.get(id)
    if item is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return item


@router.put("/sequencings/{id}", response_model=Sequencing)
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


@router.post("/sequencings", response_model=Sequencing)
def sequencings(body: SequencingNoId, crud: CRUD = Depends(get_crud(Sequencing))):
    return crud.create(body)


@router.delete("/sequencings/{id}", response_model=Sequencing)
def sequencings(id: int, crud: CRUD = Depends(get_crud(Sequencing))):
    try:
        item = crud.delete(id)
    except exc.DeleteFailedException:
        raise HTTPException(status_code=400, detail=f"Can't delete item {id}")
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@router.get("/plant_identifications", response_model=list[PlantIdentification])
def plant_identifications(crud: CRUD = Depends(get_crud(PlantIdentification))):
    return crud.query()


@router.get("/plant_identifications/{id}", response_model=PlantIdentification)
def plant_identifications(id: int, crud: CRUD = Depends(get_crud(PlantIdentification))):
    item = crud.get(id)
    if item is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return item


@router.put("/plant_identifications/{id}", response_model=PlantIdentification)
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


@router.post("/plant_identifications", response_model=PlantIdentification)
def plant_identifications(
    body: PlantIdentificationNoId,
    crud: CRUD = Depends(get_crud(PlantIdentification)),
):
    return crud.create(body)


@router.delete("/plant_identifications/{id}", response_model=PlantIdentification)
def plant_identifications(id: int, crud: CRUD = Depends(get_crud(PlantIdentification))):
    try:
        item = crud.delete(id)
    except exc.DeleteFailedException:
        raise HTTPException(status_code=400, detail=f"Can't delete item {id}")
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@router.get("/amplification_methods", response_model=list[AmplificationMethod])
def amplification_methods(crud: CRUD = Depends(get_crud(AmplificationMethod))):
    return crud.query()


@router.get("/amplification_methods/{id}", response_model=AmplificationMethod)
def amplification_methods(id: int, crud: CRUD = Depends(get_crud(AmplificationMethod))):
    item = crud.get(id)
    if item is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return item


@router.put("/amplification_methods/{id}", response_model=AmplificationMethod)
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


@router.post("/amplification_methods", response_model=AmplificationMethod)
def amplification_methods(
    body: AmplificationMethodNoId,
    crud: CRUD = Depends(get_crud(AmplificationMethod)),
):
    return crud.create(body)


@router.delete("/amplification_methods/{id}", response_model=AmplificationMethod)
def amplification_methods(id: int, crud: CRUD = Depends(get_crud(AmplificationMethod))):
    try:
        item = crud.delete(id)
    except exc.DeleteFailedException:
        raise HTTPException(status_code=400, detail=f"Can't delete item {id}")
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@router.get("/identification_methods", response_model=list[IdentificationMethod])
def identification_method(crud: CRUD = Depends(get_crud(IdentificationMethod))):
    return crud.query()


@router.get("/identification_methods/{id}", response_model=IdentificationMethod)
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


@router.put("/identification_methods/{id}", response_model=IdentificationMethod)
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


@router.post("/identification_methods", response_model=IdentificationMethod)
def identification_method(
    body: IdentificationMethodNoId,
    crud: CRUD = Depends(get_crud(IdentificationMethod)),
):
    return crud.create(body)


@router.delete("/identification_methods/{id}", response_model=IdentificationMethod)
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


@router.get("/locations", response_model=list[Location])
def locations(crud: CRUD = Depends(get_crud(Location))):
    return crud.query()


@router.get("/locations/{id}", response_model=Location)
def locations(id: int, crud: CRUD = Depends(get_crud(Location))):
    item = crud.get(id)
    if item is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return item


@router.put("/locations/{id}", response_model=Location)
def locations(id: int, body: LocationNoId, crud: CRUD = Depends(get_crud(Location))):
    body.id = id
    updated = crud.update(id, body)
    if not updated:
        raise HTTPException(status_code=404, detail="Item not found")
    return body


@router.post("/locations", response_model=Location)
def locations(body: LocationNoId, crud: CRUD = Depends(get_crud(Location))):
    return crud.create(body)


@router.delete("/locations/{id}", response_model=Location)
def locations(id: int, crud: CRUD = Depends(get_crud(Location))):
    try:
        item = crud.delete(id)
    except exc.DeleteFailedException:
        raise HTTPException(status_code=400, detail=f"Can't delete item {id}")
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@router.get("/taxonomies", response_model=list[Taxonomy])
def taxonomies(crud: CRUD = Depends(get_crud(Taxonomy))):
    return crud.query()


@router.get("/taxonomies/{id}", response_model=Taxonomy)
def taxonomies(id: int, crud: CRUD = Depends(get_crud(Taxonomy))):
    item = crud.get(id)
    if item is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return item


@router.put("/taxonomies/{id}", response_model=Taxonomy)
def taxonomies(id: int, body: TaxonomyNoId, crud: CRUD = Depends(get_crud(Taxonomy))):
    body.id = id
    updated = crud.update(id, body)
    if not updated:
        raise HTTPException(status_code=404, detail="Item not found")
    return body


@router.post("/taxonomies", response_model=Taxonomy)
def taxonomies(body: TaxonomyNoId, crud: CRUD = Depends(get_crud(Taxonomy))):
    return crud.create(body)


@router.delete("/taxonomies/{id}", response_model=Taxonomy)
def taxonomies(id: int, crud: CRUD = Depends(get_crud(Taxonomy))):
    try:
        item = crud.delete(id)
    except exc.DeleteFailedException:
        raise HTTPException(status_code=400, detail=f"Can't delete item {id}")
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item
