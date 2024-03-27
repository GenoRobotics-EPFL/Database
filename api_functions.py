import datetime

def person(name: str, email: str):
    return {"name": name, "email": email}

def sequencing_methods(name: str, description: str, type: str):
    return {"name": name, "description": description, "type": type}

def samples(person_id: int,
            location_id: int,
            name: str,
            timestamp: datetime,  # TODO check
            sex: str,
            lifestage: str,
            reproduction: str,
            image_url: str,
            image_timestamp: datetime, # TODO check
            image_desc: str ):
    return {
        "person_id": person_id,
        "location_id": location_id,
        "name": name,
        "timestamp": timestamp,
        "sex": sex,
        "lifestage": lifestage,
        "reproduction": reproduction,
        "image_url": image_url,
        "image_timestamp": image_timestamp,
        "image_desc": image_desc}

def consensus_segments(sequencing_ids: int,
                       segment_sequence: str,
                       primer_forw_name: str,
                       primer_forw_seq: str,
                       primer_rev_name: str,
                       primer_rev_seq:str,
                       DNA_region: str,
                       sequence_length: int):
    return {
        "sequencing_id": sequencing_ids,
        "segment_sequence": segment_sequence,
        "primer_forw_name": primer_forw_name,
        "primer_forw_seq": primer_forw_seq,
        "primer_rev_name": primer_rev_name,
        "primer_rev_seq": primer_rev_seq,
        "DNA_region": DNA_region,
        "sequence_length": sequence_length}

def sequencings(sample_id: int,
                sequencing_method_id: int,
                amplification_method_id: int,
                amplification_timestamp: datetime,
                timestamp: datetime,
                base_calling_file: str):
    return {
        "sample_id": sample_id,
        "sequencing_method_id": sequencing_method_id,
        "amplification_method_id": amplification_method_id,
        "amplification_timestamp": amplification_timestamp,
        "timestamp": timestamp,
        "base_calling_file": base_calling_file}

def plant_identifications(sample_id: int,
                          sequencing_id: int,
                          taxonomy_id: int,
                          identification_method_id: int,
                          timestamp: datetime,
                          seq1_score: int,
                          seq2_score: int,
                          seq3_score: int,
                          seq4_score: int):
    return {
        "sample_id": sample_id,
        "sequencing_id": sequencing_id,
        "taxonomy_id": taxonomy_id,
        "identification_method_id": identification_method_id,
        "timestamp": timestamp,
        "seq1_score": seq1_score,
        "seq2_score": seq2_score,
        "seq3_score": seq3_score,
        "seq4_score": seq4_score}
    
def amplification_methods(name: str):
    return {"name": name}
    
def identification_methods(name: str, description: str, type: str, version: int):
    return {
        "name": name,
        "description": description,
        "type": type,
        "version": version}
    
def locations(collection_area: str, gps: str, elevation: int):
    return {
        "collection_area": collection_area,
        "gps": gps,
        "elevation": elevation}
    
def taxonomies(domain: str,
               kingdom: str,
               phylum: str,
               class_: str,
               family: str,
               species: str):
    return {
        "domain": domain,
        "kingdom": kingdom,
        "phylum": phylum,
        "class_": class_,
        "family": family,
        "species": species}
    
