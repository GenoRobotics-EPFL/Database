from database import SessionLocal, engine
import schemes
import mock_data as mock
from crud import CRUD


def fill_db():
    schemes.Base.metadata.create_all(bind=engine)
    with SessionLocal() as session:
        CRUD(session, schemes.Person).create(mock.PERSON_NO_ID)
        CRUD(session, schemes.Location).create(mock.LOCATION_NO_ID)
        CRUD(session, schemes.AmplificationMethod).create(
            mock.AMPLIFICATION_METHOD_NO_ID
        )
        CRUD(session, schemes.IdentificationMethod).create(
            mock.IDENTIFICATION_METHOD_NO_ID
        )
        CRUD(session, schemes.SequencingMethod).create(mock.SEQUENCING_METHOD_NO_ID)
        CRUD(session, schemes.Taxonomy).create(mock.TAXONOMY_NO_ID)
        CRUD(session, schemes.Sample).create(mock.SAMPLE_NO_ID)
        CRUD(session, schemes.Sequencing).create(mock.SEQUENCING_NO_ID)
        CRUD(session, schemes.ConsensusSegment).create(mock.CONSENSUS_SEGMENT_NO_ID)
        CRUD(session, schemes.PlantIdentification).create(
            mock.PLANT_IDENTIFICATION_NO_ID
        )
