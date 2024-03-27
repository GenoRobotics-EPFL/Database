from datetime import datetime
from typing import Optional
import logging

from sqlalchemy import ForeignKey, String, DateTime, create_engine
from sqlalchemy.orm import relationship, mapped_column, Mapped, sessionmaker, DeclarativeBase
from sqlalchemy.ext.declarative import declarative_base


logger = logging.getLogger("uvicorn")

ENGINE = create_engine("sqlite:///data/test.db")


# SessionLocal()

# # class Base(DeclarativeBase):
# #     type_annotation_map = {
# #         str: String(100),
# #     }
# Base.metadata.create_all(engine)
SESSION_LOCAL = sessionmaker(autocommit=False, autoflush=False, bind=ENGINE)
logging.info("Created database engine and session")


class Base(DeclarativeBase):
    type_annotation_map = {
        str: String(100),
    }


class Person(Base):
    __tablename__ = "Person"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str]
    email: Mapped[str]

    samples = relationship("Sample", back_populates="person")


class Location(Base):
    __tablename__ = "Location"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    collection_area: Mapped[str] = mapped_column(String(500))
    gps: Mapped[str]
    elevation: Mapped[int]

    samples = relationship("Sample", back_populates="location")


class Sample(Base):
    __tablename__ = "Sample"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    person_id: Mapped[int] = mapped_column(ForeignKey("Person.id"))
    location_id: Mapped[int] = mapped_column(ForeignKey("Location.id"))
    name: Mapped[str]
    timestamp: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    sex: Mapped[Optional[str]]  # three: male, female, hermaphrodite
    lifestage: Mapped[Optional[str]]
    reproduction: Mapped[Optional[str]]
    image_url: Mapped[str] = mapped_column(String(500))
    image_timestamp: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    image_desc: Mapped[str] = mapped_column(String(500))

    person = relationship("Person", back_populates="samples")
    location = relationship("Location", back_populates="samples")

    sequencings = relationship("Sequencing", back_populates="sample")
    plant_identifications = relationship("PlantIdentification", back_populates="sample")


class AmplificationMethod(Base):
    __tablename__ = "AmplificationMethod"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str]

    sequencings = relationship("Sequencing", back_populates="amplification_method")


class ConsensusSegment(Base):
    __tablename__ = "Consensus_segment"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    sequencing_id: Mapped[int] = mapped_column(ForeignKey("Sequencing.id"))
    segment_sequence: Mapped[str] = mapped_column(String(500))
    primer_forw_name: Mapped[str]
    primer_forw_seq: Mapped[str] = mapped_column(String(1000))
    primer_rev_name: Mapped[str]
    primer_rev_seq: Mapped[str] = mapped_column(String(1000))
    DNA_region: Mapped[str]
    sequence_length: Mapped[int]


class SequencingMethod(Base):
    __tablename__ = "SequencingMethod"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str]
    description: Mapped[str] = mapped_column(String(500))
    type: Mapped[str]

    sequencings = relationship("Sequencing", back_populates="sequencing_method")


class Sequencing(Base):
    __tablename__ = "Sequencing"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    sample_id: Mapped[int] = mapped_column(ForeignKey("Sample.id"))
    amplification_method_id: Mapped[int] = mapped_column(
        ForeignKey("AmplificationMethod.id")
    )
    amplification_timestamp: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    sequencing_method_id: Mapped[int] = mapped_column(ForeignKey("SequencingMethod.id"))
    timestamp: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    base_calling_file: Mapped[str]

    sample = relationship("Sample", back_populates="sequencings")
    amplification_method = relationship(
        "AmplificationMethod", back_populates="sequencings"
    )
    sequencing_method = relationship("SequencingMethod", back_populates="sequencings")
    plant_identifications = relationship(
        "PlantIdentification", back_populates="sequencing"
    )


class PlantIdentification(Base):
    __tablename__ = "PlantIdentification"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    sample_id: Mapped[int] = mapped_column(ForeignKey("Sample.id"))
    sequencing_id: Mapped[int] = mapped_column(ForeignKey("Sequencing.id"))
    identification_method_id: Mapped[int] = mapped_column(
        ForeignKey("IdentificationMethod.id")
    )
    taxonomy_id: Mapped[int] = mapped_column(ForeignKey("Taxonomy.id"))
    timestamp: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    seq1_score: Mapped[float]
    seq2_score: Mapped[float]
    seq3_score: Mapped[float]
    seq4_score: Mapped[float]
    sample = relationship("Sample", back_populates="plant_identifications")
    identification_method = relationship(
        "IdentificationMethod", back_populates="plant_identifications"
    )
    sequencing = relationship("Sequencing", back_populates="plant_identifications")
    taxonomy = relationship("Taxonomy", back_populates="plant_identifications")


class IdentificationMethod(Base):
    __tablename__ = "IdentificationMethod"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str]
    description: Mapped[str] = mapped_column(String(500))
    type: Mapped[str]
    version: Mapped[int]

    plant_identifications = relationship(
        "PlantIdentification", back_populates="identification_method"
    )


class Taxonomy(Base):
    __tablename__ = "Taxonomy"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    domain: Mapped[str]
    kingdom: Mapped[str]
    phylum: Mapped[str]
    class_: Mapped[str]
    family: Mapped[str]
    species: Mapped[str]

    plant_identifications = relationship(
        "PlantIdentification", back_populates="taxonomy"
    )
