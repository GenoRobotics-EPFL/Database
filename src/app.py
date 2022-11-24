from datetime import datetime
from uuid import uuid4
from typing import List
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import schemes
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
from .database import Base, engine, SessionLocal

Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

person = Person(
    id=1,
    name="Bob",
    email="bob@epfl.ch",
)
sequencing = Sequencing(
    id=1,
    sample_id=1,
    amplification_id=1,
    sequencing_method_id=1,
    timestamp=datetime.now(),
    base_calling_file="",
    primer_code="",
    sequence_length=10,
    barcode="",
    primer_desc="",
)
seq_method = SequencingMethod(
    id=1,
    name="",
    description="",
    type="",
)
sample = Sample(
    id=1,
    person_id=1,
    location_id=1,
    timestamp=datetime.now(),
    image_url="",
    image_timestamp=datetime.now(),
    image_desc="",
)
amplification = Amplification(
    id=1,
    sample_id=1,
    amplification_method_id=1,
    timestamp=datetime.now(),
)

amp_method = AmplificationMethod(
    id=1,
    name="",
)

plant_identification = PlantIdentification(
    id=1,
    sample_id=1,
    sequencing_id=1,
    taxonomy_id=1,
    identification_method_id=1,
    timestamp=datetime.now(),
    sex="",
    lifestage="",
    reproduction="",
)
id_method = IdentificationMethod(
    id=1,
    name="",
    description="",
    type="",
    version=1,
)

taxonomy = Taxonomy(
    id=1,
    domain="",
    kingdom="",
    phylum="",
    class_="",
    family="",
    species="",
)


@app.get("/persons", response_model=List[Person])
def persons(db: Session = Depends(get_db)):
    return db.query(schemes.Person).all()


@app.get("/persons/{id}", response_model=Person)
def persons(id: int):
    if id != person.id:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return person.dict()


@app.put("/persons/{id}", response_model=Person)
def persons(body: Person):
    return body.dict()


@app.post("/persons", response_model=Person)
def persons(body: without_id(Person), db: Session = Depends(get_db)):
    new_person = schemes.Person(name=body.name, email=body.email)
    db.add(new_person)
    db.commit()
    db.refresh(new_person)
    return new_person


@app.delete("/persons/{id}", response_model=Person)
def persons(id: int):
    return person.dict()


@app.get("/sequencing_methods", response_model=List[SequencingMethod])
def sequencing_methods():
    return [seq_method.dict()]


@app.get("/sequencing_methods/{id}", response_model=SequencingMethod)
def sequencing_methods(id: int):
    if id != seq_method.id:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return seq_method.dict()


@app.put("/sequencing_methods/{id}", response_model=SequencingMethod)
def sequencing_methods(body: SequencingMethod):
    return body.dict()


@app.post("/sequencing_methods", response_model=SequencingMethod)
def sequencing_methods(body: without_id(SequencingMethod)):
    body.id = uuid4().int
    return body.dict()


@app.delete("/sequencing_methods/{id}", response_model=SequencingMethod)
def sequencing_methods(id: int):
    return seq_method.dict()


@app.get("/samples", response_model=List[Sample])
def samples():
    return [sample.dict()]


@app.get("/samples/{id}", response_model=Sample)
def samples(id: int):
    if id != sample.id:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return sample.dict()


@app.put("/samples/{id}", response_model=Sample)
def samples(body: Sample):
    return body.dict()


@app.post("/samples", response_model=Sample)
def samples(body: without_id(Sample)):
    body.id = uuid4().int
    return body.dict()


@app.delete("/samples/{id}", response_model=Sample)
def samples(id: int):
    return sample.dict()


@app.get("/amplifications", response_model=List[Amplification])
def amplifications():
    return [amplification.dict()]


@app.get("/amplifications/{id}", response_model=Amplification)
def amplifications(id: int):
    if id != amplification.id:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return amplification.dict()


@app.put("/amplifications/{id}", response_model=Amplification)
def amplifications(body: Amplification):
    return body.dict()


@app.post("/amplifications", response_model=Amplification)
def amplifications(body: without_id(Amplification)):
    body.id = uuid4().int
    return body.dict()


@app.delete("/amplifications/{id}", response_model=Amplification)
def amplifications(id: int):
    return amplification.dict()


@app.get("/sequencings", response_model=List[Sequencing])
def sequencings():
    return [sequencing.dict()]


@app.get("/sequencings/{id}", response_model=Sequencing)
def sequencings(id: int):
    if id != sequencing.id:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return sequencing.dict()


@app.put("/sequencings/{id}", response_model=Sequencing)
def sequencings(body: Sequencing):
    return body.dict()


@app.post("/sequencings", response_model=Sequencing)
def sequencings(body: without_id(Sequencing)):
    body.id = uuid4().int
    return body.dict()


@app.delete("/sequencings/{id}", response_model=Sequencing)
def sequencings(id: int):
    return sequencing.dict()


@app.get("/plant_identifications", response_model=List[PlantIdentification])
def plant_identifications():
    return [plant_identification.dict()]


@app.get("/plant_identifications/{id}", response_model=PlantIdentification)
def plant_identifications(id: int):
    if id != plant_identification.id:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return plant_identification.dict()


@app.put("/plant_identifications/{id}", response_model=PlantIdentification)
def plant_identifications(body: PlantIdentification):
    return body.dict()


@app.post("/plant_identifications", response_model=PlantIdentification)
def plant_identifications(body: without_id(PlantIdentification)):
    body.id = uuid4().int
    return body.dict()


@app.delete("/plant_identifications/{id}", response_model=PlantIdentification)
def plant_identifications(id: int):
    return plant_identification.dict()
