from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Float
from sqlalchemy.orm import relationship
from .database import Base


class Person(Base):
    __allow_unmapped__ = True
    __tablename__ = "Person"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100))

    samples = relationship("Sample", back_populates="person")


class Location(Base):
    __allow_unmapped__ = True
    __tablename__ = "Location"

    id = Column(Integer, primary_key=True, index=True)
    collection_area = Column(String(500))
    gps = Column(String(100))
    elevation = Column(Integer)

    samples = relationship("Sample", back_populates="location")


class Sample(Base):
    __allow_unmapped__ = True
    __tablename__ = "Sample"
    id = Column(Integer, primary_key=True, index=True)
    person_id = Column(Integer, ForeignKey("Person.id"))
    location_id = Column(Integer, ForeignKey("Location.id"))
    timestamp = Column(DateTime(timezone=True))
    sex = Column(String(100))
    lifestage = Column(String(100))
    reproduction = Column(String(100))
    image_url = Column(String(500))
    image_timestamp = Column(DateTime(timezone=True))
    image_desc: Column(String(500))

    person = relationship("Person", back_populates="samples")
    location = relationship("Location", back_populates="samples")

    amplifications = relationship("Amplification", back_populates="sample")
    sequencings = relationship("Sequencing", back_populates="sample")
    plant_identifications = relationship("PlantIdentification", back_populates="sample")
    taxonomy = relationship("Taxonomy", back_populates="sample")


class AmplificationMethod(Base):
    __allow_unmapped__ = True
    __tablename__ = "AmplificationMethod"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))

    amplifications = relationship(
        "Amplification", back_populates="amplification_method"
    )


class Amplification(Base):
    __allow_unmapped__ = True
    __tablename__ = "Amplification"
    id = Column(Integer, primary_key=True, index=True)
    sample_id = Column(Integer, ForeignKey("Sample.id"))
    amplification_method_id = Column(Integer, ForeignKey("AmplificationMethod.id"))
    timestamp = Column(DateTime(timezone=True))

    sample = relationship("Sample", back_populates="amplifications")
    amplification_method = relationship(
        "AmplificationMethod", back_populates="amplifications"
    )

    sequencings = relationship("Sequencing", back_populates="amplification")


class ConsensusSegment(Base):
    __allow_unmapped__ = True
    __tablename__ = "Consensus_segment"
    id = Column(Integer, primary_key=True, index=True)
    sequencing_id = Column(Integer, ForeignKey("Sequencing.id"))
    segment_sequence = Column(String(500))
    primer_name = Column(String(100))
    primer_desc = Column(String(500))
    primer2_name = Column(String(100))
    primer2_desc = Column(String(500))
    DNA_region = Column(String(100))
    sequence_length = Column(Integer)


class SequencingMethod(Base):
    __allow_unmapped__ = True
    __tablename__ = "SequencingMethod"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    description = Column(String(500))
    type = Column(Integer)

    sequencings = relationship("Sequencing", back_populates="sequencing_method")


class Sequencing(Base):
    __allow_unmapped__ = True
    __tablename__ = "Sequencing"
    id = Column(Integer, primary_key=True, index=True)
    sample_id = Column(Integer, ForeignKey("Sample.id"))
    amplification_id = Column(Integer, ForeignKey("Amplification.id"))
    sequencing_method_id = Column(Integer, ForeignKey("SequencingMethod.id"))
    timestamp = Column(DateTime(timezone=True))
    base_calling_file = Column(String(100))

    sample = relationship("Sample", back_populates="sequencings")
    sequencing_method = relationship("SequencingMethod", back_populates="sequencings")
    amplification = relationship("Amplification", back_populates="sequencings")
    # consensus_segment = relationship("ConsensusSegment", back_populates="sequencings")
    plant_identifications = relationship(
        "PlantIdentification", back_populates="sequencing"
    )


class PlantIdentification(Base):
    __allow_unmapped__ = True
    __tablename__ = "PlantIdentification"
    id = Column(Integer, primary_key=True, index=True)
    sample_id = Column(Integer, ForeignKey("Sample.id"))
    sequencing_id = Column(Integer, ForeignKey("Sequencing.id"))
    identification_method_id = Column(Integer, ForeignKey("IdentificationMethod.id"))
    timestamp = Column(DateTime(timezone=True))
    seq1_score = Column(Float)
    seq2_score = Column(Float)
    seq3_score = Column(Float)
    seq4_score = Column(Float)
    sample = relationship("Sample", back_populates="plant_identifications")
    identification_method = relationship(
        "IdentificationMethod", back_populates="plant_identifications"
    )
    sequencing = relationship("Sequencing", back_populates="plant_identifications")
    taxonomy = relationship("Taxonomy", back_populates="plant_identifications")


class IdentificationMethod(Base):
    __allow_unmapped__ = True
    __tablename__ = "IdentificationMethod"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    description = Column(String(500))
    type = Column(String(100))
    version = Column(Integer)

    plant_identifications = relationship(
        "PlantIdentification", back_populates="identification_method"
    )


class Taxonomy(Base):
    __allow_unmapped__ = True
    __tablename__ = "Taxonomy"
    id = Column(Integer, primary_key=True, index=True)
    sample_id = Column(Integer, ForeignKey("Sample.id"))
    identification_id = Column(Integer, ForeignKey("Plant_identification.id"))
    domain = Column(String(100))
    kingdom = Column(String(100))
    phylum = Column(String(100))
    class_ = Column(String(100))
    family = Column(String(100))
    species = Column(String(100))

    plant_identifications = relationship(
        "PlantIdentification", back_populates="taxonomy"
    )
