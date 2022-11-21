from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class Person(Base):
    __tablename__ = "Person"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)

    samp_pers = relationship("Sample", back_populates="person")


class Location(Base):
    __tablename__ = "Location"

    id = Column(Integer, primary_key=True, index=True)
    collection_area = Column(String)
    gps = Column(String)
    elevation = Column(Integer)

    samp_loc = relationship("Sample", back_populates="location")


class Sample(Base):
    __tablename__ = "Sample"
    id = Column(Integer, primary_key=True, index=True)
    person_id = Column(Integer, ForeignKey("Person.id"))
    location_id = Column(Integer, ForeignKey("Location.id"))
    timestamp = Column(datetime)
    image_url = Column(String)
    image_timestamp = Column(datetime)
    image_desc: Column(String)

    person = relationship("Person", back_populates = "samp_pers")
    location = relationship("Location", back_populates = "samp_loc")

    amp_samp = relationship("Amplification", back_populates = "sample")
    seq_samp = relationship("Sequencing", back_populates = "sample")
    plantid_samp = relationship("PlantIdentification", back_populates="sample")

class AmplificationMethod(Base):
    __tablename__="AmplificationMethod"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)

    amp_ampmeth = relationship("Amplification", back_populates="ampmeth")

class Amplification(Base):
    __tablename__ = "Amplification"
    id = Column(Integer, primary_key=True, index=True)
    sample_id = Column(Integer, ForeignKey("Sample.id"))
    amplification_method_id = Column(Integer, ForeignKey("AmplificationMethod.id"))
    timestamp = Column(datetime)

    sample = relationship("Sample", back_populates = "amp_samp")
    ampmeth = relationship("AmplificationMethod", back_populates = "amp_ampmeth")

    seq_amp = relationship("Sequencing", back_populates="amp")

class SequencingMethod(Base):
    __tablename__ = "SequencingMethod"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    type = Column(Integer)

    seq_seqmeth = relationship("Sequencing", back_populates="seqmeth")

class Sequencing(Base):
    __tablename__ = "Sequencing"
    id = Column(Integer, primary_key=True, index=True)
    sample_id = Column(Integer, ForeignKey("Sample.id"))
    amplification_id = Column(Integer, ForeignKey("Amplification.id"))
    sequencing_method_id = Column(Integer, ForeignKey("SequencingMethod.id"))
    timestamp = Column(datetime)
    base_calling_file = Column(String)
    primer_code = Column(String)
    sequence_length = Column(String)
    barcode = Column(String)
    primer_desc = Column(String)

    sample = relationship("Sample", back_populates="seq_samp")
    seqmeth = relationship("SequencingMethod", back_populates="seq_seqmeth")
    amp = relationship("Amplification", back_populates="seq_amp")

    plantid_seq = relationship("PlantIdentification", back_populates="seq")

class PlantIdentification(Base):
    __tablename__ = "PlantIdentification"
    id = Column(Integer, primary_key=True, index=True)
    sample_id = Column(Integer, ForeignKey("Sample.id"))
    sequencing_id = Column(Integer, ForeignKey("Sequencing.id"))
    taxonomy_id = Column(Integer, ForeignKey("Taxonomy.id"))
    identification_method_id = Column(Integer, ForeignKey("IdentificationMethod.id"))
    timestamp = Column(datetime)
    sex = Column(String)
    lifestage = Column(String)
    reproduction = Column(String)

    sample = relationship("Sample", back_populates="plantid_samp")
    idmeth = relationship("IdentificationMethod", back_populates="plantid_idmeth")
    seq = relationship("Sequencing", back_populates="plantid_seq")
    tax = relationship("Taxonomy", back_populates="plantid_tax")

class IdentificationMethod(Base):
    __tablename__ = "IdentificationMethod"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    type = Column(String)
    version = Column(Integer)

    plant_idmeth = relationship("Identification", back_populates="idmeth")


class Taxonomy(Base):
    __tablename__ = "Taxonomy"
    id = Column(Integer, primary_key=True, index=True)
    domain = Column(String)
    kingdom = Column(String)
    phylum = Column(String)
    class_ = Column(String)
    family = Column(String)
    species = Column(String)

    plantid_tax = relationship("Sequencing", back_populates="tax")