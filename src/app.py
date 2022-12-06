from datetime import datetime
from uuid import uuid4
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


@app.get("/persons", response_model=list[Person])
def persons(db: Session = Depends(get_db)):
    return db.query(schemes.Person).all()


@app.get("/persons/{id}", response_model=Person)
def persons(id: int, db: Session = Depends(get_db)):
    person = db.get(schemes.Person, id)
    if person is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return person


@app.put("/persons/{id}", response_model=Person)
def persons(id: int, body: without_id(Person), db: Session = Depends(get_db)):
    body.id = id
    count = db.query(schemes.Person).filter_by(id=id).update(body.dict())
    if count == 0:
        raise HTTPException(status_code=404, detail="Person not found")
    db.commit()
    return body


@app.post("/persons", response_model=Person)
def persons(body: without_id(Person), db: Session = Depends(get_db)):
    new_person = schemes.Person(**body.dict())
    db.add(new_person)
    db.commit()
    db.refresh(new_person)
    return new_person


@app.delete("/persons/{id}", response_model=Person)
def persons(id: int, db: Session = Depends(get_db)):
    person = db.get(schemes.Person, id)
    if person is None:
        raise HTTPException(status_code=404, detail="Person not found")
    db.delete(person)
    db.commit()
    return person


@app.get("/sequencing_methods", response_model=list[SequencingMethod])
def sequencing_methods(db: Session = Depends(get_db)):
    return db.query(schemes.SequencingMethod).all()


@app.get("/sequencing_methods/{id}", response_model=SequencingMethod)
def sequencing_methods(id: int, db: Session = Depends(get_db)):
    sequencing_method = db.get(schemes.SequencingMethod, id)
    if sequencing_method is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return sequencing_method


@app.put("/sequencing_methods/{id}", response_model=SequencingMethod)
def sequencing_methods(
    id: int, body: without_id(SequencingMethod), db: Session = Depends(get_db)
):
    body.id = id
    count = db.query(schemes.SequencingMethod).filter_by(id=id).update(body.dict())
    if count == 0:
        raise HTTPException(status_code=404, detail="Sequencing method not found")
    db.commit()
    return body


@app.post("/sequencing_methods", response_model=SequencingMethod)
def sequencing_methods(
    body: without_id(SequencingMethod), db: Session = Depends(get_db)
):
    new_sequencing_method = schemes.SequencingMethod(**body.dict())
    db.add(new_sequencing_method)
    db.commit()
    db.refresh(new_sequencing_method)
    return new_sequencing_method


@app.delete("/sequencing_methods/{id}", response_model=SequencingMethod)
def sequencing_methods(id: int, db: Session = Depends(get_db)):
    sequencing_method = db.get(schemes.SequencingMethod, id)
    if sequencing_method is None:
        raise HTTPException(status_code=404, detail="Sequencing method not found")
    db.delete(sequencing_method)
    db.commit()
    return sequencing_method


@app.get("/samples", response_model=list[Sample])
def samples(db: Session = Depends(get_db)):
    return db.query(schemes.Sample).all()


@app.get("/samples/{id}", response_model=Sample)
def samples(id: int, db: Session = Depends(get_db)):
    sample = db.get(schemes.Sample, id)
    if sample is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return sample


@app.put("/samples/{id}", response_model=Sample)
def samples(id: int, body: without_id(Sample), db: Session = Depends(get_db)):
    body.id = id
    count = db.query(schemes.Sample).filter_by(id=id).update(body.dict())
    if count == 0:
        raise HTTPException(status_code=404, detail="Sample not found")
    db.commit()
    return body


@app.post("/samples", response_model=Sample)
def samples(body: without_id(Sample), db: Session = Depends(get_db)):
    new_sample = schemes.Sample(**body.dict())
    db.add(new_sample)
    db.commit()
    db.refresh(new_sample)
    return new_sample


@app.delete("/samples/{id}", response_model=Sample)
def samples(id: int, db: Session = Depends(get_db)):
    sample = db.get(schemes.Sample, id)
    if sample is None:
        raise HTTPException(status_code=404, detail="Sample not found")
    db.delete(sample)
    db.commit()
    return sample


@app.get("/amplifications", response_model=list[Amplification])
def amplifications(db: Session = Depends(get_db)):
    return db.query(schemes.Amplification).all()


@app.get("/amplifications/{id}", response_model=Amplification)
def amplifications(id: int, db: Session = Depends(get_db)):
    amplification = db.get(schemes.Amplification, id)
    if amplification is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return amplification


@app.put("/amplifications/{id}", response_model=Amplification)
def amplifications(
    id: int, body: without_id(Amplification), db: Session = Depends(get_db)
):
    body.id = id
    count = db.query(schemes.Amplification).filter_by(id=id).update(body.dict())
    if count == 0:
        raise HTTPException(status_code=404, detail="Amplification not found")
    db.commit()
    return body


@app.post("/amplifications", response_model=Amplification)
def amplifications(body: without_id(Amplification), db: Session = Depends(get_db)):
    new_amplification = schemes.Amplification(**body.dict())
    db.add(new_amplification)
    db.commit()
    db.refresh(new_amplification)
    return new_amplification


@app.delete("/amplifications/{id}", response_model=Amplification)
def amplifications(id: int, db: Session = Depends(get_db)):
    amplification = db.get(schemes.Amplification, id)
    if amplification is None:
        raise HTTPException(status_code=404, detail="Amplification not found")
    db.delete(amplification)
    db.commit()
    return amplification


@app.get("/sequencings", response_model=list[Sequencing])
def sequencings(db: Session = Depends(get_db)):
    return db.query(schemes.Sequencing).all()


@app.get("/sequencings/{id}", response_model=Sequencing)
def sequencings(id: int, db: Session = Depends(get_db)):
    sequencing = db.get(schemes.Sequencing, id)
    if sequencing is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return sequencing


@app.put("/sequencings/{id}", response_model=Sequencing)
def sequencings(id: int, body: without_id(Sequencing), db: Session = Depends(get_db)):
    body.id = id
    count = db.query(schemes.Sequencing).filter_by(id=id).update(body.dict())
    if count == 0:
        raise HTTPException(status_code=404, detail="Sequencing not found")
    db.commit()
    return body


@app.post("/sequencings", response_model=Sequencing)
def sequencings(body: without_id(Sequencing), db: Session = Depends(get_db)):
    new_sequencing = schemes.Sequencing(**body.dict())
    db.add(new_sequencing)
    db.commit()
    db.refresh(new_sequencing)
    return new_sequencing


@app.delete("/sequencings/{id}", response_model=Sequencing)
def sequencings(id: int, db: Session = Depends(get_db)):
    sequencing = db.get(schemes.Sequencing, id)
    if sequencing is None:
        raise HTTPException(status_code=404, detail="Sequencing not found")
    db.delete(sequencing)
    db.commit()
    return sequencing


@app.get("/plant_identifications", response_model=list[PlantIdentification])
def plant_identifications(db: Session = Depends(get_db)):
    return db.query(schemes.PlantIdentification).all()


@app.get("/plant_identifications/{id}", response_model=PlantIdentification)
def plant_identifications(id: int, db: Session = Depends(get_db)):
    plant_identification = db.get(schemes.PlantIdentification, id)
    if plant_identification is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return plant_identification


@app.put("/plant_identifications/{id}", response_model=PlantIdentification)
def plant_identifications(
    id: int, body: without_id(PlantIdentification), db: Session = Depends(get_db)
):
    body.id = id
    count = db.query(schemes.PlantIdentification).filter_by(id=id).update(body.dict())
    if count == 0:
        raise HTTPException(status_code=404, detail="PlantIdentification not found")
    db.commit()
    return body


@app.post("/plant_identifications", response_model=PlantIdentification)
def plant_identifications(
    body: without_id(PlantIdentification), db: Session = Depends(get_db)
):
    new_plant_identification = schemes.PlantIdentification(**body.dict())
    db.add(new_plant_identification)
    db.commit()
    db.refresh(new_plant_identification)
    return new_plant_identification


@app.delete("/plant_identifications/{id}", response_model=PlantIdentification)
def plant_identifications(id: int, db: Session = Depends(get_db)):
    plant_identification = db.get(schemes.PlantIdentification, id)
    if plant_identification is None:
        raise HTTPException(status_code=404, detail="PlantIdentification not found")
    db.delete(plant_identification)
    db.commit()
    return plant_identification


@app.get("/amplification_methods", response_model=list[AmplificationMethod])
def amplification_methods(db: Session = Depends(get_db)):
    return db.query(schemes.AmplificationMethod).all()


@app.get("/amplification_methods/{id}", response_model=AmplificationMethod)
def amplification_methods(id: int, db: Session = Depends(get_db)):
    amplification_method = db.get(schemes.AmplificationMethod, id)
    if amplification_method is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return amplification_method


@app.put("/amplification_methods/{id}", response_model=AmplificationMethod)
def amplification_methods(
    id: int, body: without_id(AmplificationMethod), db: Session = Depends(get_db)
):
    body.id = id
    count = db.query(schemes.AmplificationMethod).filter_by(id=id).update(body.dict())
    if count == 0:
        raise HTTPException(status_code=404, detail="AmplificationMethod not found")
    db.commit()
    return body


@app.post("/amplification_methods", response_model=AmplificationMethod)
def amplification_methods(
    body: without_id(AmplificationMethod), db: Session = Depends(get_db)
):
    new_amplification_method = schemes.AmplificationMethod(**body.dict())
    db.add(new_amplification_method)
    db.commit()
    db.refresh(new_amplification_method)
    return new_amplification_method


@app.delete("/amplification_methods/{id}", response_model=AmplificationMethod)
def amplification_methods(id: int, db: Session = Depends(get_db)):
    amplification_method = db.get(schemes.AmplificationMethod, id)
    if amplification_method is None:
        raise HTTPException(status_code=404, detail="AmplificationMethod not found")
    db.delete(amplification_method)
    db.commit()
    return amplification_method


@app.get("/identification_methods", response_model=list[IdentificationMethod])
def identification_methods(db: Session = Depends(get_db)):
    return db.query(schemes.IdentificationMethod).all()


@app.get("/identification_methods/{id}", response_model=IdentificationMethod)
def identification_methods(id: int, db: Session = Depends(get_db)):
    identification_method = db.get(schemes.IdentificationMethod, id)
    if identification_method is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return identification_method


@app.put("/identification_methods/{id}", response_model=IdentificationMethod)
def identification_methods(
    id: int, body: without_id(IdentificationMethod), db: Session = Depends(get_db)
):
    body.id = id
    count = db.query(schemes.IdentificationMethod).filter_by(id=id).update(body.dict())
    if count == 0:
        raise HTTPException(status_code=404, detail="IdentificationMethod not found")
    db.commit()
    return body


@app.post("/identification_methods", response_model=IdentificationMethod)
def identification_methods(
    body: without_id(IdentificationMethod), db: Session = Depends(get_db)
):
    new_identification_method = schemes.IdentificationMethod(**body.dict())
    db.add(new_identification_method)
    db.commit()
    db.refresh(new_identification_method)
    return new_identification_method


@app.delete("/identification_methods/{id}", response_model=IdentificationMethod)
def identification_methods(id: int, db: Session = Depends(get_db)):
    identification_method = db.get(schemes.IdentificationMethod, id)
    if identification_method is None:
        raise HTTPException(status_code=404, detail="IdentificationMethod not found")
    db.delete(identification_method)
    db.commit()
    return identification_method


@app.get("/locations", response_model=list[Location])
def locations(db: Session = Depends(get_db)):
    return db.query(schemes.Location).all()


@app.get("/locations/{id}", response_model=Location)
def locations(id: int, db: Session = Depends(get_db)):
    location = db.get(schemes.Location, id)
    if location is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return location


@app.put("/locations/{id}", response_model=Location)
def locations(id: int, body: without_id(Location), db: Session = Depends(get_db)):
    body.id = id
    count = db.query(schemes.Location).filter_by(id=id).update(body.dict())
    if count == 0:
        raise HTTPException(status_code=404, detail="Location not found")
    db.commit()
    return body


@app.post("/locations", response_model=Location)
def locations(body: without_id(Location), db: Session = Depends(get_db)):
    new_location = schemes.Location(**body.dict())
    db.add(new_location)
    db.commit()
    db.refresh(new_location)
    return new_location


@app.delete("/locations/{id}", response_model=Location)
def locations(id: int, db: Session = Depends(get_db)):
    location = db.get(schemes.Location, id)
    if location is None:
        raise HTTPException(status_code=404, detail="Location not found")
    db.delete(location)
    db.commit()
    return location


@app.get("/taxonomies", response_model=list[Taxonomy])
def taxonomies(db: Session = Depends(get_db)):
    return db.query(schemes.Taxonomy).all()


@app.get("/taxonomies/{id}", response_model=Taxonomy)
def taxonomies(id: int, db: Session = Depends(get_db)):
    taxonomy = db.get(schemes.Taxonomy, id)
    if taxonomy is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return taxonomy


@app.put("/taxonomies/{id}", response_model=Taxonomy)
def taxonomies(id: int, body: without_id(Taxonomy), db: Session = Depends(get_db)):
    body.id = id
    count = db.query(schemes.Taxonomy).filter_by(id=id).update(body.dict())
    if count == 0:
        raise HTTPException(status_code=404, detail="Taxonomy not found")
    db.commit()
    return body


@app.post("/taxonomies", response_model=Taxonomy)
def taxonomies(body: without_id(Taxonomy), db: Session = Depends(get_db)):
    new_taxonomy = schemes.Taxonomy(**body.dict())
    db.add(new_taxonomy)
    db.commit()
    db.refresh(new_taxonomy)
    return new_taxonomy


@app.delete("/taxonomies/{id}", response_model=Taxonomy)
def taxonomies(id: int, db: Session = Depends(get_db)):
    taxonomy = db.get(schemes.Taxonomy, id)
    if taxonomy is None:
        raise HTTPException(status_code=404, detail="Taxonomy not found")
    db.delete(taxonomy)
    db.commit()
    return taxonomy
