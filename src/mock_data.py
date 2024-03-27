import sys
from datetime import date, datetime, timedelta
import logging


sys.path.append("src")

import pydantic_schemas
from crud import *
import sqlalchemy_database

logger = logging.getLogger("uvicorn")


PERSON_NO_ID = pydantic_schemas.PersonNoId(
    name="Bob",
    email="bob@epfl.ch",
)

PERSON = pydantic_schemas.Person(
    id=1,
    **PERSON_NO_ID.model_dump(),
)

LOCATION_NO_ID = pydantic_schemas.LocationNoId(
    collection_area="Rolex",
    gps="46.518387, 6.569276",
    elevation=380,
)

LOCATION = pydantic_schemas.Location(
    id=1,
    **LOCATION_NO_ID.model_dump(),
)

SAMPLE_NO_ID = pydantic_schemas.SampleNoId(
    person_id=1,
    location_id=1,
    name="Test sample",
    timestamp=datetime.now(),
    sex=None,
    lifestage="adult",
    reproduction=None,
    image_url="sample.png",
    image_timestamp=datetime.now(),
    image_desc="",
)

SAMPLE = pydantic_schemas.Sample(
    id=1,
    **SAMPLE_NO_ID.model_dump(),
)

AMPLIFICATION_METHOD_NO_ID = pydantic_schemas.AmplificationMethodNoId(
    name="Test amplification method",
)

AMPLIFICATION_METHOD = pydantic_schemas.AmplificationMethod(
    id=1,
    **AMPLIFICATION_METHOD_NO_ID.model_dump(),
)

SEQUENCING_METHOD_NO_ID = pydantic_schemas.SequencingMethodNoId(
    name="Test sequencing method",
    description="Test desc",
    type="Test type",
)

AMPLIFICATION_METHOD = pydantic_schemas.AmplificationMethod(
    id=1,
    **AMPLIFICATION_METHOD_NO_ID.model_dump(),
)

SEQUENCING_NO_ID = pydantic_schemas.SequencingNoId(
    sample_id=1,
    sequencing_method_id=1,
    amplification_method_id=1,
    amplification_timestamp=datetime.now(),
    timestamp=datetime.now(),
    base_calling_file="file.fasta",
)

SEQUENCING = pydantic_schemas.Sequencing(
    id=1,
    **SEQUENCING_NO_ID.model_dump(),
)

CONSENSUS_SEGMENT_NO_ID = pydantic_schemas.ConsensusSegmentNoId(
    sequencing_id=1,
    segment_sequence="Test segment sequence",
    primer_forw_name="Test primer forw name",
    primer_forw_seq="Test primer forw seq",
    primer_rev_name="Test primer rev name",
    primer_rev_seq="Test primer rev seq",
    DNA_region="Test DNA region",
    sequence_length=21,
)

CONSENSUS_SEGMENT = pydantic_schemas.ConsensusSegment(
    id=1,
    **CONSENSUS_SEGMENT_NO_ID.model_dump(),
)

PLANT_IDENTIFICATION_NO_ID = pydantic_schemas.PlantIdentificationNoId(
    sample_id=1,
    sequencing_id=1,
    taxonomy_id=1,
    identification_method_id=1,
    timestamp=datetime.now(),
    seq1_score=1.0,
    seq2_score=1.0,
    seq3_score=1.0,
    seq4_score=1.0,
)

PLANT_IDENTIFICATION = pydantic_schemas.PlantIdentification(
    id=1,
    **PLANT_IDENTIFICATION_NO_ID.model_dump(),
)

IDENTIFICATION_METHOD_NO_ID = pydantic_schemas.IdentificationMethodNoId(
    name="Test identification method",
    description="Test desc",
    type="Test type",
    version=1,
)

IDENTIFICATION_METHOD = pydantic_schemas.IdentificationMethod(
    id=1,
    **IDENTIFICATION_METHOD_NO_ID.model_dump(),
)

TAXONOMY_NO_ID = pydantic_schemas.TaxonomyNoId(
    sample_id=1,
    identification_id=1,
    domain="Test domain",
    kingdom="Test kingdom",
    phylum="Test phylum",
    class_="Test class_",
    family="Test family",
    species="Test species",
)

TAXONOMY = pydantic_schemas.Taxonomy(
    id=1,
    **TAXONOMY_NO_ID.model_dump(),
)


def fill_db():
    session = sqlalchemy_database.SESSION_LOCAL()
    try:
        CRUD(session, sqlalchemy_database.Person).create(PERSON_NO_ID)
        CRUD(session, sqlalchemy_database.Location).create(LOCATION_NO_ID)
        CRUD(session, sqlalchemy_database.AmplificationMethod).create(
            AMPLIFICATION_METHOD_NO_ID
        )
        CRUD(session, sqlalchemy_database.IdentificationMethod).create(
            IDENTIFICATION_METHOD_NO_ID
        )
        CRUD(session, sqlalchemy_database.SequencingMethod).create(SEQUENCING_METHOD_NO_ID)
        CRUD(session, sqlalchemy_database.Taxonomy).create(TAXONOMY_NO_ID)
        CRUD(session, sqlalchemy_database.Sample).create(SAMPLE_NO_ID)
        CRUD(session, sqlalchemy_database.Sequencing).create(SEQUENCING_NO_ID)
        CRUD(session, sqlalchemy_database.ConsensusSegment).create(CONSENSUS_SEGMENT_NO_ID)
        CRUD(session, sqlalchemy_database.PlantIdentification).create(
            PLANT_IDENTIFICATION_NO_ID
        )
        logging.info("Filled the database with mock data")
    except Exception as e:
        session.rollback()
        logging.error(f"Error occurred while filling the database: {e}")
        raise
    finally:
        session.close()