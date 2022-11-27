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

person = Person(
    id=1,
    name="Bob",
    email="bob@epfl.ch",
)
location = Location(
    id=1,
    collection_area="",
    gps="",
    elevation=1
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


@app.get("/persons", response_model=list[Person])
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
def persons(person_id: int, body: Person, q: str | None = None):
    result = {"id": person_id, **body.dict()}
    if q:
        result.update({"q":q})
    return result


@app.post("/persons", response_model=Person)
def persons(body: without_id(Person), db: Session = Depends(get_db)):
    new_person = schemes.Person(name=body.name, email=body.email)
    db.add(new_person)
    db.commit()
    db.refresh(new_person)
    return new_person


@app.delete("/persons/{id}", response_model=Person)
def persons(id: int):
    with Session(engine) as session:
        person = session.get(Person, id)
        if not person:
            raise HTTPException(status_code=404, detail="Person not found")
        session.delete(person)
        session.commit()
        return {"ok":True}


@app.get("/sequencing_methods", response_model=list[SequencingMethod])
def sequencing_methods(db: Session = Depends(get_db)):
    return db.query(schemes.SequencingMethod).all()


@app.get("/sequencing_methods/{id}", response_model=SequencingMethod)
def sequencing_methods(id: int):
    if id != seq_method.id:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return seq_method.dict()


@app.put("/sequencing_methods/{id}", response_model=SequencingMethod)
def sequencing_methods(sequencing_method_id: int, body: SequencingMethod, q: str | None = None):
    result = {"id": sequencing_method_id, **body.dict()}
    if q:
        result.update({"q":q})
    return result


@app.post("/sequencing_methods", response_model=SequencingMethod)
def sequencing_methods(body: without_id(SequencingMethod), db: Session = Depends(get_db)):
    new_seq_method = schemes.SequencingMethod(name=seq_method.name, description=seq_method.description,type=seq_method.type)
    db.add(new_seq_method)
    db.commit()
    db.refresh(new_seq_method)
    return new_seq_method


@app.delete("/sequencing_methods/{id}", response_model=SequencingMethod)
def sequencing_methods(id: int):
    with Session(engine) as session:
        sequencing_method = session.get(SequencingMethod, id)
        if not sequencing_method:
            raise HTTPException(status_code=404, detail="Sequencing method not found")
        session.delete(sequencing_method)
        session.commit()
        return {"ok":True}


@app.get("/samples", response_model=list[Sample])
def samples(db: Session = Depends(get_db)):
    return db.query(schemes.Sample).all()


@app.get("/samples/{id}", response_model=Sample)
def samples(id: int):
    if id != sample.id:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return sample.dict()


@app.put("/samples/{id}", response_model=Sample)
def samples(sample_id: int, body: Sample, q: str | None = None):
    result = {"id": sample_id, **body.dict()}
    if q:
        result.update({"q":q})
    return result


@app.post("/samples", response_model=Sample)
def samples(body: without_id(Sample), db: Session = Depends(get_db)):
    new_sample=schemes.Sample(person_id=sample.person_id, location_id=sample.location_id,
         timestamp=sample.timestamp, image_url=sample.image_url, image_timestamp=sample.image_timestamp,
          image_desc=sample.image_desc)
    db.add(new_sample)
    db.commit()
    db.refresh(new_sample)
    return new_sample


@app.delete("/samples/{id}", response_model=Sample)
def samples(id: int):
    with Session(engine) as session:
        sample = session.get(Sample, id)
        if not sample:
            raise HTTPException(status_code=404, detail="Sample not found")
        session.delete(sample)
        session.commit()
        return {"ok":True}


@app.get("/amplifications", response_model=list[Amplification])
def amplifications(db: Session = Depends(get_db)):
    return db.query(schemes.Amplification).all()


@app.get("/amplifications/{id}", response_model=Amplification)
def amplifications(id: int):
    if id != amplification.id:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return amplification.dict()


@app.put("/amplifications/{id}", response_model=Amplification)
def amplifications(amplification_id: int, body: Amplification, q: str | None = None):
    result = {"id": amplification_id, **body.dict()}
    if q:
        result.update({"q":q})
    return result


@app.post("/amplifications", response_model=Amplification)
def amplifications(body: without_id(Amplification),db: Session = Depends(get_db)):
    new_amplification=schemes.Amplification(sample_id=amplification.sample_id, amplification_method_id=amplification.amplification_method_id,
        timestamp=amplification.timestamp)
    db.add(new_amplification)
    db.commit()
    db.refresh(new_amplification)
    return new_amplification


@app.delete("/amplifications/{id}", response_model=Amplification)
def amplifications(id: int):
    with Session(engine) as session:
        amplification = session.get(Amplification, id)
        if not amplification:
            raise HTTPException(status_code=404, detail="Amplification not found")
        session.delete(amplification)
        session.commit()
        return {"ok":True}


@app.get("/sequencings", response_model=list[Sequencing])
def sequencings(db: Session = Depends(get_db)):
    return db.query(schemes.Sequencing).all()


@app.get("/sequencings/{id}", response_model=Sequencing)
def sequencings(id: int):
    if id != sequencing.id:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return sequencing.dict()


@app.put("/sequencings/{id}", response_model=Sequencing)
def sequencings(sequencing_id: int, body: Sequencing, q: str | None = None):
    result = {"id": sequencing_id, **body.dict()}
    if q:
        result.update({"q":q})
    return result


@app.post("/sequencings", response_model=Sequencing)
def sequencings(body: without_id(Sequencing), db: Session = Depends(get_db)):
    new_sequencing=schemes.Sequencing(sample_id=sequencing.sample_id, amplification_id=sequencing.amplification_id,
        sequencing_method_id=sequencing.sequencing_method_id, timestamp=sequencing.timestamp,
        base_calling_file=sequencing.base_calling_file,primer_code=sequencing.primer_code,
        sequence_length=sequencing.sequence_length,barcode=sequencing.barcode,primer_desc=sequencing.primer_code)
    db.add(new_sequencing)
    db.commit()
    db.refresh(new_sequencing)
    return new_sequencing


@app.delete("/sequencings/{id}", response_model=Sequencing)
def sequencings(id: int):
    with Session(engine) as session:
        sequencing = session.get(Sequencing, id)
        if not sequencing:
            raise HTTPException(status_code=404, detail="Sequencing not found")
        session.delete(sequencing)
        session.commit()
        return {"ok":True}


@app.get("/plant_identifications", response_model=list[PlantIdentification])
def plant_identifications(db: Session = Depends(get_db)):
    return db.query(schemes.PlantIdentification).all()


@app.get("/plant_identifications/{id}", response_model=PlantIdentification)
def plant_identifications(id: int):
    if id != plant_identification.id:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return plant_identification.dict()


@app.put("/plant_identifications/{id}", response_model=PlantIdentification)
def plant_identifications(plant_identification_id: int, body: PlantIdentification, q: str | None = None):
    result = {"id": plant_identification_id, **body.dict()}
    if q:
        result.update({"q":q})
    return result


@app.post("/plant_identifications", response_model=PlantIdentification)
def plant_identifications(body: without_id(PlantIdentification),db: Session = Depends(get_db)):
    new_plant_identification=schemes.PlantIdentification(sample_id=plant_identification.sample_id, sequencing_id=plant_identification.sequencing_id,
        taxonomy_id=plant_identification.taxonomy_id, identification_method_id=plant_identification.identification_method_id, timestamp=plant_identification.timestamp,
        sex=plant_identification.sex,lifestage=plant_identification.lifestage,reproduction=plant_identification.reproduction)
    db.add(new_plant_identification)
    db.commit()
    db.refresh(new_plant_identification)
    return new_plant_identification


@app.delete("/plant_identifications/{id}", response_model=PlantIdentification)
def plant_identifications(id: int):
    with Session(engine) as session:
        plant_identification = session.get(PlantIdentification, id)
        if not plant_identification:
            raise HTTPException(status_code=404, detail="Plant identification not found")
        session.delete(plant_identification)
        session.commit()
        return {"ok":True}




@app.get("/amplification_methods", response_model=list[AmplificationMethod])
def amplification_methods(db: Session = Depends(get_db)):
    return db.query(schemes.AmplificationMethod).all()


@app.get("/amplification_methods/{id}", response_model=AmplificationMethod)
def amplification_methods(id: int):
    if id != amp_method.id:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return amp_method.dict()


@app.put("/amplification_methods/{id}", response_model=AmplificationMethod)
def amplification_methods(amplification_method_id: int, body: AmplificationMethod, q: str | None = None):
    result = {"id": amplification_method_id, **body.dict()}
    if q:
        result.update({"q":q})
    return result


@app.post("/amplification_methods", response_model=AmplificationMethod)
def amplification_methods(body: without_id(AmplificationMethod), db: Session = Depends(get_db)):
    new_amplification_method=schemes.AmplificationMethod(name=amp_method.name)
    db.add(new_amplification_method)
    db.commit()
    db.refresh(new_amplification_method)
    return new_amplification_method


@app.delete("/amplification_methods/{id}", response_model=AmplificationMethod)
def amplification_methods(id: int):
    with Session(engine) as session:
        amplification_method = session.get(AmplificationMethod, id)
        if not amplification_method:
            raise HTTPException(status_code=404, detail="Amplification method not found")
        session.delete(amplification_method)
        session.commit()
        return {"ok":True}




@app.get("/identification_methods", response_model=list[IdentificationMethod])
def identification_methods(db: Session = Depends(get_db)):
    return db.query(schemes.IdentificationMethod).all()


@app.get("/identification_methods/{id}", response_model=IdentificationMethod)
def identification_methods(id: int):
    if id != id_method.id:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return id_method.dict()


@app.put("/identification_methods/{id}", response_model=IdentificationMethod)
def identification_methods(identification_method_id: int, body: IdentificationMethod, q: str | None = None):
    result = {"id": identification_method_id, **body.dict()}
    if q:
        result.update({"q":q})
    return result


@app.post("/identification_methods", response_model=IdentificationMethod)
def identification_methods(body: without_id(IdentificationMethod), db: Session = Depends(get_db)):
    new_identification_method=schemes.IdentificationMethod(name=id_method.name,description=id_method.description,type=id_method.type,version=id_method.version)
    db.add(new_identification_method)
    db.commit()
    db.refresh(new_identification_method)
    return new_identification_method


@app.delete("/identification_methods/{id}", response_model=IdentificationMethod)
def identification_methods(id: int):
    with Session(engine) as session:
        identification_method = session.get(IdentificationMethod, id)
        if not identification_method:
            raise HTTPException(status_code=404, detail="Identification method not found")
        session.delete(identification_method)
        session.commit()
        return {"ok":True}



@app.get("/locations", response_model=list[Location])
def locations(db: Session = Depends(get_db)):
    return db.query(schemes.Location).all()


@app.get("/locations/{id}", response_model=Location)
def locations(id: int):
    if id != location.id:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return location.dict()


@app.put("/locations/{id}", response_model=Location)
def locations(location_id: int, body: Location, q: str | None = None):
    result = {"id": location_id, **body.dict()}
    if q:
        result.update({"q":q})
    return result


@app.post("locations", response_model=Location)
def locations(body: without_id(Location), db: Session = Depends(get_db)):
    new_location=schemes.Location(collection_area=location.collection_area,gps=location.gps,elevation=location.elevation)
    db.add(new_location)
    db.commit()
    db.refresh(new_location)
    return new_location


@app.delete("/locations/{id}", response_model=Location)
def locations(id: int):
    with Session(engine) as session:
        location = session.get(Location, id)
        if not location:
            raise HTTPException(status_code=404, detail="Location not found")
        session.delete(location)
        session.commit()
        return {"ok":True}



@app.get("/taxonomies", response_model=list[Taxonomy])
def taxonomies(db: Session = Depends(get_db)):
    return db.query(schemes.Taxonomy).all()


@app.get("/taxonomies/{id}", response_model=Taxonomy)
def taxonomies(id: int):
    if id != taxonomy.id:
        raise HTTPException(
            status_code=400,
            detail="Invalid ID.",
        )
    return taxonomy.dict()


@app.put("/taxonomies/{id}", response_model=Taxonomy)
def taxonomies(taxonomy_id: int, body: Taxonomy, q: str | None = None):
    result = {"id": taxonomy_id, **body.dict()}
    if q:
        result.update({"q":q})
    return result


@app.post("/taxonomies", response_model=Taxonomy)
def taxonomies(body: without_id(Taxonomy), db: Session = Depends(get_db)):
    new_taxonomy=schemes.Taxonomy(domain=taxonomy.domain,kingdom=taxonomy.kingdom,phylum=taxonomy.phylum,class_=taxonomy.class_,family=taxonomy.family,species=taxonomy.species)
    db.add(new_taxonomy)
    db.commit()
    db.refresh(new_taxonomy)
    return new_taxonomy


@app.delete("/taxonomies/{id}", response_model=Taxonomy)
def taxonomies(id: int):
    with Session(engine) as session:
        taxonomy = session.get(Taxonomy, id)
        if not taxonomy:
            raise HTTPException(status_code=404, detail="Taxonomy not found")
        session.delete(taxonomy)
        session.commit()
        return {"ok":True}