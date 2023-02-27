import os
from typing import Type

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from dotenv import load_dotenv
from dotenv import find_dotenv

from .models import (
    Person,
    Location,
    Sequencing,
    SequencingMethod,
    Sample,
    Amplification,
    PlantIdentification,
    AmplificationMethod,
    IdentificationMethod,
    Taxonomy,
    without_id,
)

from .crud.base import BaseCRUD
from .crud.file import FileCRUD

load_dotenv(find_dotenv(raise_error_if_not_found=True))


DB_TYPE = os.environ.get("DB_TYPE", "sql")
assert DB_TYPE in ("sql", "json"), "DB_TYPE must be one of: sql, json"

# only imports SQL CRUD if it is going to be used:
# that way a mysql setup is not required to test the api
if DB_TYPE == "sql":
    from .crud.sql import SQLCRUD

    CRUD = SQLCRUD
else:
    CRUD = FileCRUD


def get_crud(model: Type[BaseModel]) -> BaseCRUD:
    def inner():
        yield from CRUD.as_dependency(model)

    return inner


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/persons", response_model=list[Person])
def persons(crud: BaseCRUD = Depends(get_crud(Person))):
    return crud.query()


@app.get("/persons/{id}", response_model=Person)
def persons(id: int, crud: BaseCRUD = Depends(get_crud(Person))):
    item = crud.get(id)
    if item is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return item


@app.put("/persons/{id}", response_model=Person)
def persons(
    id: int, body: without_id(Person), crud: BaseCRUD = Depends(get_crud(Person))
):
    body.id = id
    updated = crud.update(id, body)
    if not updated:
        raise HTTPException(status_code=404, detail="Item not found")
    return body


@app.post("/persons", response_model=Person)
def persons(body: without_id(Person), crud: BaseCRUD = Depends(get_crud(Person))):
    return crud.create(body)


@app.delete("/persons/{id}", response_model=Person)
def persons(id: int, crud: BaseCRUD = Depends(get_crud(Person))):
    item = crud.delete(id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.get("/sequencing_methods", response_model=list[SequencingMethod])
def sequencing_methods(crud: BaseCRUD = Depends(get_crud(SequencingMethod))):
    return crud.query()


@app.get("/sequencing_methods/{id}", response_model=SequencingMethod)
def sequencing_methods(id: int, crud: BaseCRUD = Depends(get_crud(SequencingMethod))):
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
    body: without_id(SequencingMethod),
    crud: BaseCRUD = Depends(get_crud(SequencingMethod)),
):
    body.id = id
    updated = crud.update(id, body)
    if not updated:
        raise HTTPException(status_code=404, detail="Item not found")
    return body


@app.post("/sequencing_methods", response_model=SequencingMethod)
def sequencing_methods(
    body: without_id(SequencingMethod),
    crud: BaseCRUD = Depends(get_crud(SequencingMethod)),
):
    return crud.create(body)


@app.delete("/sequencing_methods/{id}", response_model=SequencingMethod)
def sequencing_methods(id: int, crud: BaseCRUD = Depends(get_crud(SequencingMethod))):
    item = crud.delete(id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.get("/samples", response_model=list[Sample])
def samples(crud: BaseCRUD = Depends(get_crud(Sample))):
    return crud.query()


@app.get("/samples/{id}", response_model=Sample)
def samples(id: int, crud: BaseCRUD = Depends(get_crud(Sample))):
    item = crud.get(id)
    if item is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return item


@app.put("/samples/{id}", response_model=Sample)
def samples(
    id: int, body: without_id(Sample), crud: BaseCRUD = Depends(get_crud(Sample))
):
    body.id = id
    updated = crud.update(id, body)
    if not updated:
        raise HTTPException(status_code=404, detail="Item not found")
    return body


@app.post("/samples", response_model=Sample)
def samples(body: without_id(Sample), crud: BaseCRUD = Depends(get_crud(Sample))):
    return crud.create(body)


@app.delete("/samples/{id}", response_model=Sample)
def samples(id: int, crud: BaseCRUD = Depends(get_crud(Sample))):
    item = crud.delete(id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.get("/amplifications", response_model=list[Amplification])
def amplifications(crud: BaseCRUD = Depends(get_crud(Amplification))):
    return crud.query()


@app.get("/amplifications/{id}", response_model=Amplification)
def amplifications(id: int, crud: BaseCRUD = Depends(get_crud(Amplification))):
    item = crud.get(id)
    if item is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return item


@app.put("/amplifications/{id}", response_model=Amplification)
def amplifications(
    id: int,
    body: without_id(Amplification),
    crud: BaseCRUD = Depends(get_crud(Amplification)),
):
    body.id = id
    updated = crud.update(id, body)
    if not updated:
        raise HTTPException(status_code=404, detail="Item not found")
    return body


@app.post("/amplifications", response_model=Amplification)
def amplifications(
    body: without_id(Amplification), crud: BaseCRUD = Depends(get_crud(Amplification))
):
    return crud.create(body)


@app.delete("/amplifications/{id}", response_model=Amplification)
def amplifications(id: int, crud: BaseCRUD = Depends(get_crud(Amplification))):
    item = crud.delete(id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.get("/sequencings", response_model=list[Sequencing])
def sequencings(crud: BaseCRUD = Depends(get_crud(Sequencing))):
    return crud.query()


@app.get("/sequencings/{id}", response_model=Sequencing)
def sequencings(id: int, crud: BaseCRUD = Depends(get_crud(Sequencing))):
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
    body: without_id(Sequencing),
    crud: BaseCRUD = Depends(get_crud(Sequencing)),
):
    body.id = id
    updated = crud.update(id, body)
    if not updated:
        raise HTTPException(status_code=404, detail="Item not found")
    return body


@app.post("/sequencings", response_model=Sequencing)
def sequencings(
    body: without_id(Sequencing), crud: BaseCRUD = Depends(get_crud(Sequencing))
):
    return crud.create(body)


@app.delete("/sequencings/{id}", response_model=Sequencing)
def sequencings(id: int, crud: BaseCRUD = Depends(get_crud(Sequencing))):
    item = crud.delete(id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.get("/plant_identifications", response_model=list[PlantIdentification])
def plant_identifications(crud: BaseCRUD = Depends(get_crud(PlantIdentification))):
    return crud.query()


@app.get("/plant_identifications/{id}", response_model=PlantIdentification)
def plant_identifications(
    id: int, crud: BaseCRUD = Depends(get_crud(PlantIdentification))
):
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
    body: without_id(PlantIdentification),
    crud: BaseCRUD = Depends(get_crud(PlantIdentification)),
):
    body.id = id
    updated = crud.update(id, body)
    if not updated:
        raise HTTPException(status_code=404, detail="Item not found")
    return body


@app.post("/plant_identifications", response_model=PlantIdentification)
def plant_identifications(
    body: without_id(PlantIdentification),
    crud: BaseCRUD = Depends(get_crud(PlantIdentification)),
):
    return crud.create(body)


@app.delete("/plant_identifications/{id}", response_model=PlantIdentification)
def plant_identifications(
    id: int, crud: BaseCRUD = Depends(get_crud(PlantIdentification))
):
    item = crud.delete(id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.get("/amplification_methods", response_model=list[AmplificationMethod])
def amplification_methods(crud: BaseCRUD = Depends(get_crud(AmplificationMethod))):
    return crud.query()


@app.get("/amplification_methods/{id}", response_model=AmplificationMethod)
def amplification_methods(
    id: int, crud: BaseCRUD = Depends(get_crud(AmplificationMethod))
):
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
    body: without_id(AmplificationMethod),
    crud: BaseCRUD = Depends(get_crud(AmplificationMethod)),
):
    body.id = id
    updated = crud.update(id, body)
    if not updated:
        raise HTTPException(status_code=404, detail="Item not found")
    return body


@app.post("/amplification_methods", response_model=AmplificationMethod)
def amplification_methods(
    body: without_id(AmplificationMethod),
    crud: BaseCRUD = Depends(get_crud(AmplificationMethod)),
):
    return crud.create(body)


@app.delete("/amplification_methods/{id}", response_model=AmplificationMethod)
def amplification_methods(
    id: int, crud: BaseCRUD = Depends(get_crud(AmplificationMethod))
):
    item = crud.delete(id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.get("/identification_method", response_model=list[IdentificationMethod])
def identification_method(crud: BaseCRUD = Depends(get_crud(IdentificationMethod))):
    return crud.query()


@app.get("/identification_method/{id}", response_model=IdentificationMethod)
def identification_method(
    id: int, crud: BaseCRUD = Depends(get_crud(IdentificationMethod))
):
    item = crud.get(id)
    if item is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return item


@app.put("/identification_method/{id}", response_model=IdentificationMethod)
def identification_method(
    id: int,
    body: without_id(IdentificationMethod),
    crud: BaseCRUD = Depends(get_crud(IdentificationMethod)),
):
    body.id = id
    updated = crud.update(id, body)
    if not updated:
        raise HTTPException(status_code=404, detail="Item not found")
    return body


@app.post("/identification_method", response_model=IdentificationMethod)
def identification_method(
    body: without_id(IdentificationMethod),
    crud: BaseCRUD = Depends(get_crud(IdentificationMethod)),
):
    return crud.create(body)


@app.delete("/identification_method/{id}", response_model=IdentificationMethod)
def identification_method(
    id: int, crud: BaseCRUD = Depends(get_crud(IdentificationMethod))
):
    item = crud.delete(id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.get("/locations", response_model=list[Location])
def locations(crud: BaseCRUD = Depends(get_crud(Location))):
    return crud.query()


@app.get("/locations/{id}", response_model=Location)
def locations(id: int, crud: BaseCRUD = Depends(get_crud(Location))):
    item = crud.get(id)
    if item is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return item


@app.put("/locations/{id}", response_model=Location)
def locations(
    id: int, body: without_id(Location), crud: BaseCRUD = Depends(get_crud(Location))
):
    body.id = id
    updated = crud.update(id, body)
    if not updated:
        raise HTTPException(status_code=404, detail="Item not found")
    return body


@app.post("/locations", response_model=Location)
def locations(body: without_id(Location), crud: BaseCRUD = Depends(get_crud(Location))):
    return crud.create(body)


@app.delete("/locations/{id}", response_model=Location)
def locations(id: int, crud: BaseCRUD = Depends(get_crud(Location))):
    item = crud.delete(id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.get("/taxonomies", response_model=list[Taxonomy])
def taxonomies(crud: BaseCRUD = Depends(get_crud(Taxonomy))):
    return crud.query()


@app.get("/taxonomies/{id}", response_model=Taxonomy)
def taxonomies(id: int, crud: BaseCRUD = Depends(get_crud(Taxonomy))):
    item = crud.get(id)
    if item is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return item


@app.put("/taxonomies/{id}", response_model=Taxonomy)
def taxonomies(
    id: int, body: without_id(Taxonomy), crud: BaseCRUD = Depends(get_crud(Taxonomy))
):
    body.id = id
    updated = crud.update(id, body)
    if not updated:
        raise HTTPException(status_code=404, detail="Item not found")
    return body


@app.post("/taxonomies", response_model=Taxonomy)
def taxonomies(
    body: without_id(Taxonomy), crud: BaseCRUD = Depends(get_crud(Taxonomy))
):
    return crud.create(body)


@app.delete("/taxonomies/{id}", response_model=Taxonomy)
def taxonomies(id: int, crud: BaseCRUD = Depends(get_crud(Taxonomy))):
    item = crud.delete(id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item
